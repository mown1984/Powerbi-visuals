/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.data {
    import RoleKindByQueryRef = DataViewAnalysis.RoleKindByQueryRef;

    export interface DataViewRegressionRunOptions {
        dataViewMappings: DataViewMapping[];
        visualDataViews: DataView[];
        dataRoles: VisualDataRole[];
        objectDescriptors: DataViewObjectDescriptors;
        objectDefinitions: DataViewObjectDefinitions;
        colorAllocatorFactory: IColorAllocatorFactory;
        transformSelects: DataViewSelectTransform[];
        metadata: DataViewMetadata;
        projectionActiveItems: DataViewProjectionActiveItems;
    }

    export module DataViewRegression {
        // TODO VSTS 6842046: Currently we are using a constant queryName since we don't have a way to generate
        // unique ones. There is a bug filed to do this by lawong, so this part will be fixed with that bug.
        const regressionXQueryName: string = 'RegressionX';
        const regressionSeriesQueryName: string = 'RegressionSeries';
        export const regressionYQueryName: string = 'RegressionY';

        export function run(options: DataViewRegressionRunOptions): DataView[] {
            debug.assertValue(options, 'options');

            let dataViewMappings: DataViewMapping[] = options.dataViewMappings;
            let visualDataViews: DataView[] = options.visualDataViews;
            let dataRoles: VisualDataRole[] = options.dataRoles;
            let objectDescriptors: DataViewObjectDescriptors = options.objectDescriptors;
            let objectDefinitions: DataViewObjectDefinitions = options.objectDefinitions;
            let colorAllocatorFactory: IColorAllocatorFactory = options.colorAllocatorFactory;
            let transformSelects: DataViewSelectTransform[] = options.transformSelects;
            let projectionActiveItems = options.projectionActiveItems;
            let metadata: DataViewMetadata = options.metadata;

            if (!_.isEmpty(visualDataViews) && transformSelects && metadata) {
                // compute linear regression line if applicable
                let roleKindByQueryRef: RoleKindByQueryRef = DataViewSelectTransform.createRoleKindFromMetadata(transformSelects, metadata);
                let projections: QueryProjectionsByRole = DataViewSelectTransform.projectionsFromSelects(transformSelects, projectionActiveItems);
                if (!roleKindByQueryRef || !projections || _.isEmpty(dataViewMappings) || !objectDescriptors || !objectDefinitions)
                    return visualDataViews;

                let applicableDataViewMappings: DataViewMapping[] = DataViewAnalysis.chooseDataViewMappings(projections, dataViewMappings, roleKindByQueryRef, objectDescriptors, objectDefinitions).supportedMappings;

                if (applicableDataViewMappings) {
                    let regressionDataViewMapping: DataViewMapping = _.find(applicableDataViewMappings, (dataViewMapping) => {
                        return dataViewMapping.usage && dataViewMapping.usage.regression;
                    });

                    if (regressionDataViewMapping) {
                        let regressionDataViews: DataView[] = [];
                        for (let visualDataView of visualDataViews) {
                            let regressionDataView: DataView = this.linearRegressionTransform(visualDataView, dataRoles, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory);

                            if (regressionDataView)
                                regressionDataViews.push(regressionDataView);
                        }

                        if (!_.isEmpty(regressionDataViews))
                            visualDataViews.push(...regressionDataViews);
                    }
                }
            }

            return visualDataViews;
        }

        /**
         * This function will compute the linear regression algorithm on the sourceDataView and create a new dataView.
         * It works on scalar axis only.
         * The algorithm is as follows
         *
         * 1. Find the cartesian X and Y roles and the columns that correspond to those roles
         * 2. Order the X-Y value pairs by the X values
         * 3. Compute the actual regression:
         *    i.   xBar: average of X values, yBar: average of Y values
         *    ii.  ssXX: sum of squares of X values = Sum(xi - xBar)^2
         *    iii. ssXY: sum of squares of X and Y values  = Sum((xi - xBar)(yi - yBar)
         *    iv.  Slope: ssXY / ssXX
         *    v.   Intercept: yBar - xBar * slope
         * 4. Compute the X and Y points for regression line using Y = Slope * X + Intercept
         * 5. Create the new dataView using the points computed above
         */
        export function linearRegressionTransform(
            sourceDataView: DataView,
            dataRoles: VisualDataRole[],
            regressionDataViewMapping: DataViewMapping,
            objectDescriptors: DataViewObjectDescriptors,
            objectDefinitions: DataViewObjectDefinitions,
            colorAllocatorFactory: IColorAllocatorFactory): DataView {
            debug.assertValue(sourceDataView, 'sourceDataView');
            debug.assertValue(sourceDataView.categorical, 'sourceDataView.categorical');
            debug.assertValue(dataRoles, 'dataRoles');
            debug.assertValue(objectDescriptors, 'objectDescriptors');
            debug.assertValue(objectDefinitions, 'objectDefinitions');
            debug.assertValue(colorAllocatorFactory, 'colorAllocatorFactory');

            if (!sourceDataView.categorical)
                return;

            // Step 1
            let xColumns: DataViewCategoricalColumn[] = getColumnsForCartesianRoleKind(CartesianRoleKind.X, sourceDataView.categorical, dataRoles);
            let yColumns: DataViewCategoricalColumn[] = getColumnsForCartesianRoleKind(CartesianRoleKind.Y, sourceDataView.categorical, dataRoles);

            if (_.isEmpty(xColumns) || _.isEmpty(yColumns))
                return;

            let xColumnSource = xColumns[0].source;
            let yColumnSource = yColumns[0].source;

            let dataPointSets: DataPointSet[] = extractDataPoints(xColumns, yColumns);

            let combineSeries = true;
            if (regressionDataViewMapping.usage
                && regressionDataViewMapping.usage.regression
                && regressionDataViewMapping.usage.regression['combineSeries']
                && sourceDataView.metadata.objects) {
                combineSeries = DataViewObjects.getValue<boolean>(sourceDataView.metadata.objects, regressionDataViewMapping.usage.regression['combineSeries'], true);
            }

            if (combineSeries) {
                dataPointSets = [{
                    xValues: _.chain(dataPointSets).map((dataPoint) => dataPoint.xValues).flatten().value(),
                    yValues: _.chain(dataPointSets).map((dataPoint) => dataPoint.yValues).flatten().value()
                }];
            }

            let categoriesByTrendLines: PrimitiveValue[][] = [];
            let lineDefs: LineDefinition[] = [];
            for (let dataPointSet of dataPointSets) {
                let unsortedXValues: PrimitiveValue[] = dataPointSet.xValues;
                let unsortedYValues: PrimitiveValue[] = dataPointSet.yValues;

                if (_.isEmpty(unsortedXValues) || _.isEmpty(unsortedYValues))
                    return;

                // get the data type for each column; we will have null type when dataPoints have different type or if a value is null
                let xDataType: string = getDataType(unsortedXValues);
                if (!xDataType)
                    return;
                let yDataType: string = getDataType(unsortedYValues);
                if (!yDataType)
                    return;

                // Step 2
                let sortedDataPointSet: DataPointSet = sortValues(unsortedXValues, unsortedYValues);
                let minCategoryValue: PrimitiveValue = sortedDataPointSet.xValues[0];
                let maxCategoryValue: PrimitiveValue = sortedDataPointSet.xValues[sortedDataPointSet.xValues.length - 1];

                // Step 3
                let lineDef: LineDefinition = computeRegressionLine(sortedDataPointSet.xValues, sortedDataPointSet.yValues);

                categoriesByTrendLines.push([minCategoryValue, maxCategoryValue]);
                lineDefs.push(lineDef);
            }

            // Step 4
            let flattenedCategories: PrimitiveValue[] = _.flatten<PrimitiveValue>(categoriesByTrendLines);
            let valuesByTrend: number[][] = [];
            let minCategoryValue: any = _.min(flattenedCategories);
            let maxCategoryValue: any = _.max(flattenedCategories);

            for (let trend of lineDefs) {
                valuesByTrend.push([minCategoryValue * trend.slope + trend.intercept, maxCategoryValue * trend.slope + trend.intercept]);
            }

            // Step 5
            let regressionDataView: DataView = createRegressionDataView(xColumnSource, yColumnSource, [minCategoryValue, maxCategoryValue], valuesByTrend, sourceDataView, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory);

            return regressionDataView;
        }

        function getColumnsForCartesianRoleKind(roleKind: CartesianRoleKind, categorical: DataViewCategorical, roles: VisualDataRole[]): DataViewCategoricalColumn[] {
            debug.assertValue(roleKind, 'roleKind');
            debug.assertValue(categorical, 'categorical');

            let columns = getColumnsWithRoleKind(roleKind, categorical.values, roles);
            if (!_.isEmpty(columns))
                return columns;

            let categories = categorical.categories;
            if (_.isEmpty(categories))
                return;

            debug.assert(categories.length === 1, 'composite category columns not supported');
            let categoryColumn = categories[0];
            columns = getColumnsWithRoleKind(roleKind, [categoryColumn], roles);
            if (!_.isEmpty(columns))
                return columns;
        }

        function getColumnsWithRoleKind(roleKind: CartesianRoleKind, columns: DataViewCategoricalColumn[], roles: VisualDataRole[]): DataViewCategoricalColumn[] {
            if (_.isEmpty(columns))
                return;

            return _.filter(columns, (column) => {
                for (let roleName in column.source.roles) {
                    if (!column.source.roles[roleName])
                        continue;

                    let role = _.find(roles, (role) => role.name === roleName);
                    if (role && role.cartesianKind === roleKind)
                        return true;
                }

                return false;
            });
        }

        function getDataType(values: PrimitiveValue[]): string {
            let firstNonNull: PrimitiveValue = _.find(values, (value) => value != null);
            if (firstNonNull == null)
                return;

            let dataType: string = typeof firstNonNull;

            if (_.some(values, (value) => value != null && typeof value !== dataType))
                return;

            return dataType;
        }

        function extractDataPoints(xColumn: DataViewCategoricalColumn[], yColumn: DataViewCategoricalColumn[]): DataPointSet[] {
            let dataPoints: DataPointSet[] = [];
            let xValueArray: PrimitiveValue[][] = _.map(xColumn, (column) => column.values);
            let seriesYValues: PrimitiveValue[][] = _.map(yColumn, (column) => column.values);

            let multipleXValueColumns: boolean = xColumn.length > 1;
            for (let i = 0; i < seriesYValues.length; i++) {
                dataPoints.push({
                    xValues: multipleXValueColumns ? xValueArray[i] : xValueArray[0],
                    yValues: seriesYValues[i],
                });
            }

            return dataPoints;
        }

        function sortValues(unsortedXValues: PrimitiveValue[], unsortedYValues: PrimitiveValue[]): DataPointSet {
            debug.assertValue(unsortedXValues, 'unsortedXValues');
            debug.assertValue(unsortedYValues, 'unsortedYValues');

            let zippedValues = _.zip(unsortedXValues, unsortedYValues);
            let [xValues, yValues] = _.chain(zippedValues)
                .filter((valuePair) => valuePair[0] != null && valuePair[1] != null)
                .sortBy((valuePair) => valuePair[0])
                .unzip()
                .value();

            return {
                xValues: xValues,
                yValues: yValues
            };
        }

        function computeRegressionLine(xValues: number[], yValues: number[]): LineDefinition {
            debug.assertValue(xValues, 'xValues');
            debug.assertValue(yValues, 'yValues');

            let xBar = _.sum(xValues) / xValues.length;
            let yBar = _.sum(yValues) / yValues.length;

            let ssXX = _.chain(xValues)
                .map((x) => {
                    return (x - xBar) ** 2;
                })
                .sum();

            let ssXY = _.chain(xValues)
                .map((x, i) => {
                    return (x - xBar) * (yValues[i] - yBar);
                })
                .sum();

            let slope = ssXY / ssXX;
            let intercept = yBar - (xBar * slope);

            return {
                slope: slope,
                intercept: intercept
            };
        }

        function createRegressionDataView(
            xColumnSource: DataViewMetadataColumn,
            yColumnSource: DataViewMetadataColumn,
            newCategories: PrimitiveValue[],
            newValues: PrimitiveValue[][],
            sourceDataView: DataView,
            regressionDataViewMapping: DataViewMapping,
            objectDescriptors: DataViewObjectDescriptors,
            objectDefinitions: DataViewObjectDefinitions,
            colorAllocatorFactory: IColorAllocatorFactory): DataView {
            debug.assertValue(xColumnSource, 'xColumnSource');
            debug.assertValue(yColumnSource, 'yColumnSource');
            debug.assertValue(newCategories, 'newCategories');
            debug.assertValue(newValues, 'newValues');
            debug.assertValue(sourceDataView, 'sourceDataView');
            debug.assertValue(objectDescriptors, 'objectDescriptors');
            debug.assertValue(objectDefinitions, 'objectDefinitions');
            debug.assertValue(colorAllocatorFactory, 'colorAllocatorFactory');

            let xRole: string = (<DataViewRoleForMapping>regressionDataViewMapping.categorical.categories).for.in;
            let grouped = (<DataViewGroupedRoleMapping>regressionDataViewMapping.categorical.values).group;
            let yRole: string;
            let seriesRole: string;
            if (grouped && !_.isEmpty(grouped.select)) {
                yRole = (<DataViewRoleForMapping>grouped.select[0]).for ?
                    (<DataViewRoleForMapping>grouped.select[0]).for.in :
                    (<DataViewRoleBindMapping>grouped.select[0]).bind.to;
                seriesRole = grouped.by;
            }
            if (!yRole || !seriesRole)
                return;

            let categoricalRoles: { [name: string]: boolean } = {[xRole]: true};
            let valueRoles: { [name: string]: boolean } = {[yRole]: true};
            let seriesRoles: { [name: string]: boolean } = {[seriesRole]: true};

            let groupedValues: string[] = [];
            let valuesBySeries: DataViewBuilderSeriesData[][] = [];
            for (let index in newValues) {
                groupedValues.push('regression' + index);
                valuesBySeries.push([{ values: newValues[index] }]);
            }

            let regressionDataView: DataView = createCategoricalDataViewBuilder()
                .withCategory({
                    source: {
                        displayName: xColumnSource.displayName,
                        queryName: regressionXQueryName,
                        type: xColumnSource.type,
                        isMeasure: false,
                        roles: categoricalRoles
                    },
                    values: newCategories,
                    identityFrom: {
                        fields: [SQExprBuilder.columnRef(SQExprBuilder.entity('s', 'RegressionEntity'), 'RegressionCategories')],
                    },
                })
                .withGroupedValues({
                    groupColumn: {
                        source: {
                            displayName: yColumnSource.displayName + 'Regression',
                            queryName: regressionSeriesQueryName,
                            type: yColumnSource.type,
                            isMeasure: yColumnSource.isMeasure,
                            roles: seriesRoles
                        },
                        values: groupedValues,
                        identityFrom: {
                            fields: [SQExprBuilder.columnRef(SQExprBuilder.entity('s', 'RegressionEntity'), 'RegressionSeries')],
                        }
                    },
                    valueColumns: [{
                        source: {
                            displayName: yColumnSource.displayName,
                            queryName: regressionYQueryName,
                            type: yColumnSource.type,
                            isMeasure: yColumnSource.isMeasure,
                            roles: valueRoles
                        },
                    }],
                    data: valuesBySeries
                })
                .build();
            DataViewTransform.transformObjects(regressionDataView, data.StandardDataViewKinds.Categorical, objectDescriptors, objectDefinitions, [], colorAllocatorFactory);
            return regressionDataView;
        }
    }

    interface DataPointSet {
        xValues: any[];
        yValues: any[];
    }

    interface LineDefinition {
        slope: number;
        intercept: number;
    }
}
