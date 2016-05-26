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

module powerbitests.customVisuals.sampleDataViews {
    export interface DataViewBuilderColumnOptions extends powerbi.data.DataViewBuilderColumnOptions {
        values: any[];
    }

    export interface DataViewBuilderCategoryColumnOptions extends DataViewBuilderColumnOptions {
        objects?: powerbi.DataViewObjects[];
    }

    export interface DataViewBuilderGroupedValuesOptions extends DataViewBuilderColumnOptions {
        columns: powerbi.data.DataViewBuilderValuesColumnOptions[];
    }

    export class DataViewBuilder {
        static DataViewName: string = "Data";

        static setDefaultQueryName(source: powerbi.DataViewMetadataColumn): powerbi.DataViewMetadataColumn {
            if(!source.queryName) {
                debug.assertValue(source && source.displayName, "source.displayName is not defined");
                source.queryName = DataViewBuilder.DataViewName + "." + source.displayName;
            }

            return source;
        }

        static getDataViewBuilderColumnIdentitySource(options: DataViewBuilderColumnOptions): powerbi.data.DataViewBuilderColumnIdentitySource {
            debug.assertValue(options && options.source && options.source.displayName, "source.displayName is not defined");

            let categoryField = powerbi.data.SQExprBuilder.columnRef(
                powerbi.data.SQExprBuilder.entity(undefined, DataViewBuilder.DataViewName), options.source.displayName);
            return { 
                    fields: [categoryField],
                    identities: options.values.map(mocks.dataViewScopeIdentity)
                };
        }

        static filterDataViewBuilderValuesColumnOptionsByDisplayName<T extends powerbi.data.DataViewBuilderColumnOptions>(
            columns: T[],
            displayNames: string[]): T[] {
            return displayNames ? (columns && columns.filter(x => _.contains(displayNames, x.source.displayName))) : columns;
        }

        static generateTree(dataView: powerbi.DataView): powerbi.DataView {
            let category = dataView.categorical.categories[0];
            if(!category) {
                return dataView;
            }

            //This function is complited only for one category.
            dataView.tree = {
                root: {
                    childIdentityFields: category.identityFields,
                    children: category.values.map((v,i) => <any>{ values: [v], name: v, identity: category.identity[i] })
                }
            };

            return dataView;
        }

        protected createCategoricalDataViewBuilder(
            categories: DataViewBuilderCategoryColumnOptions[],
            values: powerbi.data.DataViewBuilderValuesColumnOptions[],
            grouped: DataViewBuilderGroupedValuesOptions,
            columnNames: string[]) {
            let builder = powerbi.data.createCategoricalDataViewBuilder();

            categories = DataViewBuilder.filterDataViewBuilderValuesColumnOptionsByDisplayName(categories, columnNames);
            values = DataViewBuilder.filterDataViewBuilderValuesColumnOptionsByDisplayName(values, columnNames);;

            if(!_.isEmpty(grouped) && DataViewBuilder.filterDataViewBuilderValuesColumnOptionsByDisplayName([grouped], columnNames).length === 0) {
                if(!values) {
                    values = grouped.columns;
                } else {
                    values.concat(grouped.columns);
                }

                grouped = null;
            }

            if(!_.isEmpty(categories)) {
                builder.withCategories(categories.map(category => {
                    category = _.clone(category);
                    if(_.isEmpty(values)) {
                        category.values = _.unique(category.values);
                    }

                    let identityFrom = DataViewBuilder.getDataViewBuilderColumnIdentitySource(category);
                    return <powerbi.DataViewCategoryColumn> {
                        source: DataViewBuilder.setDefaultQueryName(category.source),
                        values: category.values,
                        objects: category.objects,
                        identity: identityFrom.identities,
                        identityFields: identityFrom.fields
                    };
                }));
            }

            if(!_.isEmpty(values)) {
                values.forEach(x => DataViewBuilder.setDefaultQueryName(x.source));
                builder.withValues({ columns: values });
            }

            if(!_.isEmpty(grouped)) {
                let groupedColumns = DataViewBuilder.filterDataViewBuilderValuesColumnOptionsByDisplayName(grouped.columns, columnNames);
                let categoryValues = categories && categories[0] && categories[0].values || [];
                let uniqueCategoryValues =_.unique(categoryValues) || [undefined];
                let uniqueGroupedValues = _.unique(grouped.values);

                builder.withGroupedValues({
                    groupColumn: <powerbi.data.DataViewBuilderCategoryColumnOptions>{
                            source: DataViewBuilder.setDefaultQueryName(grouped.source),
                            values: uniqueGroupedValues,
                            identityFrom: DataViewBuilder.getDataViewBuilderColumnIdentitySource(grouped)
                        },
                    valueColumns: groupedColumns.map(x => <DataViewBuilderColumnOptions>{ source: DataViewBuilder.setDefaultQueryName(x.source) }),
                    data: uniqueGroupedValues.map(groupedValue => groupedColumns.map((column, columnIndex) => 
                        <powerbi.data.DataViewBuilderSeriesData>{
                            values: column.values && uniqueCategoryValues
                                .map(categoryValue => {
                                    let index = _.findIndex(d3.range(categoryValues.length), 
                                        i => categoryValues[i] === categoryValue && grouped.values[i] === groupedValue);
                                    return column.values[index] === undefined ? null : column.values[index];
                                }),
                            highlights: column.highlights,
                            minLocal: column.minLocal,
                            maxLocal: column.maxLocal
                        }))
                    }); 
            } 

            return builder;
        }
    }
}