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

/// <reference path="../../_references.ts"/>

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import ValueFormatter = powerbi.visuals.valueFormatter;

    export interface AreaRangeChartConstructorOptions {
        animator?: IGenericAnimator;
    }

    export interface AreaRangeChartSeries {
        name: string;
        data: AreaRangeChartDataPoint[];
        color: string;
        identity: SelectionId;
    }

    export interface AreaRangeChartDataPoint extends SelectableDataPoint, TooltipEnabledDataPoint, LabelEnabledDataPoint {
        x: number;
        y0: number;
        y1: number;
    }

    export interface AreaRangeChartSettings {
        displayName?: string;
        fillColor?: string;
        precision: number;
    }

    export interface AreaRangeChartData {
        series: AreaRangeChartSeries[];
        categories: any[];
        legendData: LegendData;
        xAxisProperties: IAxisProperties;
        yAxisProperties: IAxisProperties;
        settings: AreaRangeChartSettings;
        formatter: IValueFormatter;
    }

    export class AreaRangeChart implements IVisual {

        private static properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: 'dataPoint',
                    propertyName: 'fill'
                }
            },
            labels: {
                labelPrecision: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "labelPrecision"
                }
            }
        };

        private static RoleNames = {
            Category: "Category",
            Series: "Series",
            Lower: "Lower",
            Upper: "Upper",
        };
        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: AreaRangeChart.RoleNames.Category,
                    kind: powerbi.VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Category")
                },
                {
                    name: AreaRangeChart.RoleNames.Series,
                    kind: powerbi.VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Series")
                },
                {
                    name: AreaRangeChart.RoleNames.Lower,
                    kind: powerbi.VisualDataRoleKind.Measure,
                    displayName: 'Lower'
                },
                {
                    name: AreaRangeChart.RoleNames.Upper,
                    kind: powerbi.VisualDataRoleKind.Measure,
                    displayName: 'Upper'
                },
            ],
            dataViewMappings: [{
                conditions: [
                    { "Category": { max: 1 }, "Series": { max: 1 }, "Lower": { max: 1 }, "Upper": { max: 1 } },
                ],
                categorical: {
                    categories: {
                        for: { in: AreaRangeChart.RoleNames.Category },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: {
                        group: {
                            by: AreaRangeChart.RoleNames.Series,
                            select: [{ bind: { to: AreaRangeChart.RoleNames.Lower } }, { bind: { to: AreaRangeChart.RoleNames.Upper } }]
                        },
                    },
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter('Visual_General'),
                    properties: {
                        formatString: {
                            type: { formatting: { formatString: true } },
                        },
                    },
                },
                label: {
                    displayName: 'Label',
                    properties: {
                        fill: {
                            displayName: 'Fill',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                }
            }
        };

        private static VisualClassName = 'areaRangeChart';

        private static AreaRangeChart: ClassAndSelector = {
            class: 'chart',
            selector: '.chart'
        };

        private static Area: ClassAndSelector = {
            class: 'area',
            selector: '.area'
        };

        private static Axis: ClassAndSelector = {
            class: 'axis',
            selector: '.axis'
        };

        private static DimmedFillOpacity = 0.5;
        private static FillOpacity = 0.9;

        private svg: D3.Selection;

        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;
        private dataView: DataView;
        private viewport: IViewport;

        private animator: IGenericAnimator;
        private margin: IMargin;
        private legend: ILegend;

        private static DefaultSettings: AreaRangeChartSettings = {
            displayName: "Area Range Chart",
            precision: 2
        };

        private static DefaultMargin: IMargin = {
            top: 20,
            bottom: 50,
            right: 0,
            left: 50,
        };

        private chart: D3.Selection;
        private axis: D3.Selection;
        private axisX: D3.Selection;
        private axisY: D3.Selection;

        public constructor(options?: AreaRangeChartConstructorOptions) {
            if (options) {
                this.animator = options.animator;
            }

            this.margin = AreaRangeChart.DefaultMargin;
        }

        public init(options: VisualInitOptions): void {
            let element = options.element;
            this.selectionManager = new SelectionManager({ hostServices: options.host });

            this.colors = options.style.colorPalette.dataColors;
            this.legend = createLegend(element, false, null);

            this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(AreaRangeChart.VisualClassName, true);

            this.chart = this.svg
                .append('g')
                .classed(AreaRangeChart.AreaRangeChart.class, true);

            this.axis = this.svg
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);

            this.axisX = this.axis
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);

            this.axisY = this.axis
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0]) {
                return;
            }

            let dataView = this.dataView = options.dataViews[0];

            this.setSize(options.viewport);
            let data = this.converter(dataView, this.colors);

            let duration = AnimatorCommon.GetAnimationDuration(this.animator, options.suppressAnimations);
            this.render(data, duration);
        }

        private render(data: AreaRangeChartData, duration: number): void {
            if (!data || !data.settings) {
                this.svg.empty();
                return;
            }

            let legendData = data.legendData;

            this.renderAxis(data, duration);
            this.renderChart(data, duration);

            this.legend.changeOrientation(LegendPosition.Top);
            this.legend.drawLegend(legendData, this.viewport);
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height = viewport.height - this.margin.top - this.margin.bottom;
            width = viewport.width - this.margin.left - this.margin.right;

            this.viewport = {
                height: height,
                width: width
            };

            this.updateElements(viewport.height, viewport.width);
        }

        private updateElements(height: number, width: number): void {
            this.svg.attr({
                'height': height,
                'width': width
            });
            this.chart.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top));
            this.axisY.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top));
            this.axisX.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top + this.viewport.height));
        }

        public converter(dataView: DataView, colors: IDataColorPalette): AreaRangeChartData {
            let settings: AreaRangeChartSettings,
                categories: any[],
                valueColumns: DataViewValueColumns,
                valueFormatter: IValueFormatter;

            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].values ||
                !(dataView.categorical.categories[0].values.length > 0) ||
                !dataView.categorical.values) {
                return;
            }

            settings = this.parseSettings(dataView);
            if (!settings) {
                return;
            }

            let categoryColumn = dataView.categorical.categories[0];
            categories = categoryColumn.values;
            valueColumns = dataView.categorical.values;
            let grouped = valueColumns.grouped();
            let lowerMeasureIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, AreaRangeChart.RoleNames.Lower);
            let upperMeasureIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, AreaRangeChart.RoleNames.Upper);
            let colorHelper = new ColorHelper(this.colors, AreaRangeChart.properties.fill, settings.fillColor);
            let hasDynamicSeries = !!valueColumns.source;

            if (lowerMeasureIndex < 0 || upperMeasureIndex < 0)
                return;

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(dataView.categorical.categories[0].source, AreaRangeChart.properties.general.formatString),
                value: valueColumns[0],
                precision: settings.precision
            });

            let series: AreaRangeChartSeries[] = [];
            for (let seriesIndex = 0; seriesIndex < grouped.length; seriesIndex++) {
                let group = grouped[seriesIndex];
                let color = colorHelper.getColorForSeriesValue(group.objects, valueColumns.identityFields, group.name);
                let id = SelectionIdBuilder
                    .builder()
                    .withSeries(valueColumns, group)
                    .createSelectionId();

                let dataPoints: AreaRangeChartDataPoint[] = [];
                for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
                    let y0 = group.values[lowerMeasureIndex].values[categoryIndex];
                    let y1 = group.values[upperMeasureIndex].values[categoryIndex];
                    let pointId = SelectionIdBuilder
                        .builder()
                        .withSeries(valueColumns, group)
                        .withCategory(categoryColumn, categoryIndex)
                        .createSelectionId();

                    dataPoints.push({
                        x: categoryIndex,
                        y0: y0,
                        y1: y1,
                        tooltipInfo: this.getTooltipData(categoryColumn, categoryIndex, y0, y1, settings, valueFormatter),
                        identity: pointId,
                        selected: false,
                    });
                }

                series.push({
                    name: group.name,
                    color: color,
                    data: dataPoints,
                    identity: id,
                });
            };

            let legendTitle = hasDynamicSeries ? valueColumns.source.displayName : "";

            return {
                xAxisProperties: this.getXAxisProperties(categoryColumn),
                yAxisProperties: this.getYAxisProperties(valueColumns, lowerMeasureIndex, upperMeasureIndex),
                settings: settings,
                series: series,
                legendData: this.getLegend(series, legendTitle),
                categories: categories,
                formatter: valueFormatter,
            };
        }

        private calculateYDomain(valueColumns: DataViewValueColumns, lowerMeasureIndex: number, upperMeasureIndex: number): number[] {
            let min, max;
            for (let valueColumn of valueColumns) {
                let range = AxisHelper.getRangeForColumn(valueColumn);
                if (min == null || range.min < min)
                    min = range.min;
                if (max == null || range.max > max)
                    max = range.max;
            }

            return [min || 0, max || 0];
        }

        private getXAxisProperties(categoryColumn: DataViewCategoricalColumn): IAxisProperties {
            let xDomain = _.range(0, categoryColumn.values.length);

            //let isScalar = !AxisHelper.isOrdinal(categoryColumn.source.type);
            //let categoryThickness = this.viewport.width / xDomain.length;
            let categoryThickness = this.viewport.width / (xDomain.length + (CartesianChart.OuterPaddingRatio * 2));
            categoryThickness = Math.max(categoryThickness, CartesianChart.MinOrdinalRectThickness);

            let xAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.width,
                dataDomain: xDomain,
                metaDataColumn: categoryColumn.source,
                formatStringProp: AreaRangeChart.properties.formatString,
                outerPadding: 0,
                isScalar: false, //isScalar,
                isVertical: false,
                useTickIntervalForDisplayUnits: true,
                getValueFn: (index, type) => categoryColumn.values[index],
                categoryThickness: categoryThickness, //CartesianChart.getCategoryThickness(data.series, origCatgSize, this.getAvailableWidth(), xDomain, isScalar),
                isCategoryAxis: true,
                scaleType: powerbi.axisScale.linear,
            });

            return xAxisProperties;
        }

        private getYAxisProperties(valueColumns: DataViewValueColumns, lowerMeasureIndex: number, upperMeasureIndex: number): IAxisProperties {
            let grouped = valueColumns.grouped();
            let yDomain = this.calculateYDomain(valueColumns, lowerMeasureIndex, upperMeasureIndex);

            let yAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.height,
                dataDomain: yDomain,
                metaDataColumn: grouped[0].values[lowerMeasureIndex].source,
                formatStringProp: AreaRangeChart.properties.formatString,
                outerPadding: 0,
                isScalar: true,
                isVertical: true,
                useTickIntervalForDisplayUnits: true,
                isCategoryAxis: false,
                scaleType: powerbi.axisScale.linear,
            });

            return yAxisProperties;
        }

        private renderAxis(data: AreaRangeChartData, duration: number): void {
            let xAxis = data.xAxisProperties.axis;
            let yAxis = data.yAxisProperties.axis;

            xAxis.orient('bottom');

            yAxis.orient('left');

            this.axisX
                .transition()
                .duration(duration)
                .call(xAxis);

            this.axisY
                .transition()
                .duration(duration)
                .call(yAxis);
        }

        private renderChart(data: AreaRangeChartData, duration: number): void {
            let series: AreaRangeChartSeries[] = data.series,
                xScale: D3.Scale.OrdinalScale = <D3.Scale.OrdinalScale>data.xAxisProperties.scale,
                yScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.yAxisProperties.scale,
                sm = this.selectionManager;

            let area: D3.Svg.Area = d3.svg.area()
                .x((d: AreaRangeChartDataPoint) => (xScale(d.x) + xScale.rangeBand() / 2))
                .y0((d: AreaRangeChartDataPoint) => yScale(d.y0))
                .y1((d: AreaRangeChartDataPoint) => yScale(d.y1));

            let selection = this.chart.selectAll(AreaRangeChart.Area.selector).data(series);

            selection
                .enter()
                .append('svg:path')
                .classed(AreaRangeChart.Area.class, true);

            selection
                .attr('fill', (d: AreaRangeChartSeries) => d.color)
                .attr('stroke', (d: AreaRangeChartSeries) => d.color)
                .attr('d', (d: AreaRangeChartSeries) => area(d.data))
                .style('fill-opacity', AreaRangeChart.DimmedFillOpacity)
                .on('click', function (d: AreaRangeChartSeries) {
                    sm.select(d.identity).then(ids => {
                        if (ids.length > 0) {
                            selection.style('fill-opacity', AreaRangeChart.DimmedFillOpacity);
                            d3.select(this).transition()
                                .duration(duration)
                                .style('fill-opacity', AreaRangeChart.FillOpacity);
                        } else {
                            selection.style('fill-opacity', AreaRangeChart.DimmedFillOpacity);
                        }
                    });
                    d3.event.stopPropagation();
                });

            selection.exit().remove();
            this.renderTooltip(selection);
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<AreaRangeChartDataPoint>tooltipEvent.data[0]).tooltipInfo;
            });
        }

        private getLegend(series: AreaRangeChartSeries[], title: string): LegendData {
            let legendItems: LegendDataPoint[] = [];
            for (let value of series) {
                if (!value.identity.hasIdentity())
                    continue;

                legendItems.push({
                    label: value.name,
                    color: value.color,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: value.identity,
                });
            }

            return {
                dataPoints: legendItems,
                title: title,
            };
        }

        private getTooltipData(categoryColumn: DataViewCategoricalColumn, categoryIndex: number, y0: number, y1: number, settings: AreaRangeChartSettings, valueFormatter: IValueFormatter): TooltipDataItem[] {
            return [
                {
                    displayName: categoryColumn.source.displayName,
                    value: categoryColumn.values[categoryIndex],
                }, {
                    displayName: 'Min:',
                    value: valueFormatter.format(y0)
                }, {
                    displayName: 'Max:',
                    value: valueFormatter.format(y1)
                }];
        }

        private parseSettings(dataView: DataView): AreaRangeChartSettings {
            let settings: AreaRangeChartSettings = <AreaRangeChartSettings>{},
                objects: DataViewObjects;

            settings.displayName = AreaRangeChart.DefaultSettings.displayName;
            settings.fillColor = AreaRangeChart.DefaultSettings.fillColor;

            objects = this.getObjectsFromDataView(dataView);

            if (objects) {
                settings.precision = this.getPrecision(objects);
            }
            return settings;
        }

        private getPrecision(objects: DataViewObjects): number {
            let precision: number = DataViewObjects.getValue(
                objects,
                AreaRangeChart.properties.labels.labelPrecision,
                AreaRangeChart.DefaultSettings.precision);

            //if (precision <= this.minPrecision) {
            //    return this.minPrecision;
            //}

            return precision;
        }

        private getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return this.dataView.metadata.objects;
        }

    }
}
