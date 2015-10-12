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
        svg?: D3.Selection;
        margin?: IMargin;
    }
    
    export interface AreaRangeChartData {
        x: number;
        y0: number;
        y1: number;
        color?: string;
        value?: number;
        label?: string;
        identity?: SelectionId;
        tooltipInfo?: TooltipDataItem[];
    }

    export interface AreaRangeChartSettings {
        displayName?: string;
        fillColor?: string;
        precision: number;
    }
    
    export interface AreaRangeChartDataView {
        data: AreaRangeChartData[][];
        categories: any[];
        legendData: LegendData;
        xScale?: D3.Scale.OrdinalScale;
        yScale?: D3.Scale.LinearScale;
        settings: AreaRangeChartSettings;
        formatter: IValueFormatter;
    }

    export class AreaRangeChart implements IVisual {

    private static Properties: any = {
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

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: powerbi.VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Category")
                },
                {
                    name: 'Y',
                    kind: powerbi.VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Value")
                },
            ],
            dataViewMappings: [{
                conditions: [
                ],
                categorical: {
                    categories: {
                        for: { in: 'Category' },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: {
                        select: [{ bind: { to: 'Y' } }]
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
        private QuantityLabelsOnAxisY: number = 5;

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

        private static OpacityMin = 0.5;
        private static OpacityMax = 0.9;
        private MinPrecision: number = 0;

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
            fillColor: "teal",
            precision: 2
        };

        private static DefaultMargin: IMargin = {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        };

        private suppressAnimations: boolean = false;
        private duration: number = 0;
        private areaRangeChartDataView: AreaRangeChartDataView;

        private chart: D3.Selection;
        private axis: D3.Selection;
        private axisX: D3.Selection;
        private axisY: D3.Selection;

        public constructor(options?: AreaRangeChartConstructorOptions) {
            if (options) {
                if (options.svg) {
                    this.svg = options.svg;
                }
                if (options.animator) {
                    this.animator = options.animator;
                }
                this.margin = options.margin || AreaRangeChart.DefaultMargin;
            }
        }

        public init(options: VisualInitOptions): void {
            let element = options.element;
            this.selectionManager = new SelectionManager({ hostServices: options.host });

            if (!this.svg) {
                this.svg = d3.select(element.get(0)).append('svg');
            }

            if (!this.margin) {
                this.margin = AreaRangeChart.DefaultMargin;
            }

            this.svg.classed(AreaRangeChart.VisualClassName, true);
            this.colors = options.style.colorPalette.dataColors;
            this.legend = createLegend(element, false, null);

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
            let dataView: DataView;

            if (!options ||
                !options.dataViews ||
                !options.dataViews[0]) {
                return;
            }

            dataView = this.dataView = options.dataViews[0];

            this.suppressAnimations = Boolean(options.suppressAnimations);
            this.duration = AnimatorCommon.GetAnimationDuration(this.animator, options.suppressAnimations);

            this.setSize(options.viewport);
            this.areaRangeChartDataView = this.converter(dataView);
            this.render();
        }

        private render(): void {
            if (!this.areaRangeChartDataView || !this.areaRangeChartDataView.settings) {
                return;
            }
            let legendData = this.areaRangeChartDataView.legendData;

            this.renderAxis();
            this.renderChart();
            this.legend.drawLegend(legendData, this.viewport);
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height = viewport.height - this.margin.top - this.margin.bottom;
            width  = viewport.width - this.margin.left - this.margin.right;

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
            this.chart.attr('transform', SVGUtil.translate(this.margin.left, 0));
            this.axisY.attr('transform', SVGUtil.translate(this.margin.left, 0));
            this.axisX.attr('transform', SVGUtil.translate(this.margin.left, this.viewport.height));
        }

        public converter(dataView: DataView): AreaRangeChartDataView {
            let settings: AreaRangeChartSettings,
                categories: any[],
                values: DataViewValueColumns,
                xScale: D3.Scale.OrdinalScale,
                yScale: D3.Scale.LinearScale,
                valueFormatter: IValueFormatter,
                min,
                max;

            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].values ||
                !(dataView.categorical.categories[0].values.length > 0)) {
                return null;
            }

            settings = this.parseSettings(dataView);
            if (!settings) {
                return null;
            }

            categories = dataView.categorical.categories[0].values;
            values = dataView.categorical.values;

            xScale = d3.scale.ordinal()
                .domain(categories)
                .rangeBands([0, this.viewport.width], 0, 0);

            min = d3.min(values, (data1) => {
                return d3.min(data1.values, data2 => d3.min(data2));
            });
            max = d3.max(values, (data1) => {
                return d3.max(data1.values, data2 => d3.max(data2));
            });
            
            yScale = d3.scale.linear()
                .domain([min, max])
                .range([this.viewport.height, 0]);

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(dataView.categorical.categories[0].source, AreaRangeChart.Properties.general.formatString),
                value: values[0],
                precision: settings.precision
            });

            return {
                xScale: xScale,
                yScale: yScale,
                settings: settings,
                data: this.getData(values, categories, settings, valueFormatter),
                legendData: this.getLegend(values),
                categories: categories,
                formatter: valueFormatter
            };
        }

        private renderAxis(): void {
            let xScale: D3.Scale.OrdinalScale = this.areaRangeChartDataView.xScale,
                yScale: D3.Scale.LinearScale = this.areaRangeChartDataView.yScale,
                categories: any[] = this.areaRangeChartDataView.categories,
                axisX: D3.Svg.Axis,
                axisY: D3.Svg.Axis;

            axisX = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickValues(categories);

            axisY = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(this.QuantityLabelsOnAxisY);

            this.axisX
                .call(axisX);

            this.axisY
                .call(axisY);
        }

        private renderChart(): void {
            let data: AreaRangeChartData[][] = this.areaRangeChartDataView.data,
                xScale: D3.Scale.OrdinalScale = this.areaRangeChartDataView.xScale,
                yScale: D3.Scale.LinearScale = this.areaRangeChartDataView.yScale,
                selection: D3.UpdateSelection,
                sm = this.selectionManager;

            const duration = this.duration,
                opacityMin: number = AreaRangeChart.OpacityMin,
                opacityMax: number = AreaRangeChart.OpacityMax;

            let area: D3.Svg.Area = d3.svg.area()
                .x(d => (xScale(d.x) + xScale.rangeBand() / 2))
                .y0(d => yScale(d.y0))
                .y1(d => yScale(d.y1));

            selection = this.chart.selectAll(AreaRangeChart.Area.selector).data(data);

            selection
                .enter()
                .append('svg:path')
                .classed(AreaRangeChart.Area.class, true);

            selection
                .attr('fill', d => d[0].color)
                .attr('stroke', d => d[0].color)
                .attr('d', d => area(d))
                .style('fill-opacity', opacityMin)
                .on('click', function(d) {
                    sm.select(d[0].identity).then(ids => {
                        if (ids.length > 0) {
                            selection.style('fill-opacity', opacityMin);
                            d3.select(this).transition()
                                .duration(duration)
                                .style('fill-opacity', opacityMax);
                        } else {
                            selection.style('fill-opacity', opacityMin);
                        }
                    });
                    d3.event.stopPropagation();
                });

            selection.exit().remove();
            this.renderTooltip(selection);
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<AreaRangeChartData>tooltipEvent.data[0]).tooltipInfo;
            });
        }

        private getLegend(values: any[]): LegendData {
            let colors: IDataColorPalette = this.colors;
            let dataPoints = values.map((value: any, i: number) => {
                let color = colors.getColorByIndex(i).value;
                let displayName = value.source.displayName;
                return {
                    label: displayName,
                    color: color,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: null
                };
            });

            return {
                dataPoints: dataPoints,
            };
        }

        private getData(data: DataViewValueColumns, categories, settings: AreaRangeChartSettings, formatter: IValueFormatter): AreaRangeChartData[][] {
            let colors: IDataColorPalette = this.colors;
            return data.map((value: DataViewValueColumn, i: number) => {
                let color = colors.getColorByIndex(i).value;
                let id = SelectionIdBuilder
                    .builder()
                    .withSeries(data, value)
                    .createSelectionId();

                return value.values.map((item: any[], index: number) => {
                    let x = categories[index];
                    let y0 = d3.min(item);
                    let y1 = d3.min(item);
                    return {
                        color: color,
                        x: categories[index],
                        y0: d3.min(item),
                        y1: d3.max(item),
                        tooltipInfo: this.getTooltipData(x, y0, y1, settings, formatter),
                        identity: id
                    };
                });
            });
        }

        private getTooltipData(category: string, y0: number, y1: number, settings: AreaRangeChartSettings, valueFormatter: IValueFormatter): TooltipDataItem[] {
            return [{
                displayName: category,
                value: '',
            }, {
                displayName: 'Min:',
                value: valueFormatter.format(y0)
            }, {
                displayName: 'Max:',
                value: valueFormatter.format(y1)
            }];
        }

        private parseSettings(dataView: DataView): AreaRangeChartSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.columns[0]) {
                return null;
            }

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
                AreaRangeChart.Properties.labels.labelPrecision,
                AreaRangeChart.DefaultSettings.precision);

            if (precision <= this.MinPrecision) {
                return this.MinPrecision;
            }

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
