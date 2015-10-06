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

/// <reference path="../_references.ts" />

module powerbi.visuals {
    import VisualDataRoleKind = powerbi.VisualDataRoleKind;
    import SelectionManager = utility.SelectionManager;

    type D3Element = 
        D3.UpdateSelection |
        D3.Selection |
        D3.Selectors |
        D3.Transition.Transition;

    export interface HistogramConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
    }

    export interface HistogramSettings {
        displayName?: string;
        fillColor?: string;
        frequency: boolean;
        bins?: number;
    }

    export interface HistogramDataView {
        source?: number[];
        ranges?: number[];
        data?: D3.Layout.Bin[];
        xScale?: D3.Scale.LinearScale;
        yScale?: D3.Scale.LinearScale;
        settings: HistogramSettings;
    }

    interface Legend {
        text: string;
        transform?: string;
        dx?: string;
        dy?: string;
    }

    interface Brackets {
        left: string;
        right: string;
    }

    export class Histogram implements IVisual {
        private static ClassName: string = "histogram";
        private static FrequencyText: string = "Frequency";
        private static DensityText: string = "Density";

        private static Properties: any = {
            general: {
                bins: <DataViewObjectPropertyIdentifier> {
                    objectName: "general",
                    propertyName: "bins"
                },
                frequency: <DataViewObjectPropertyIdentifier> {
                    objectName: "general",
                    propertyName: "frequency"
                }
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier> {
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            }
        };

        private static DefaultHistogramSettings: HistogramSettings = {
            frequency: true,
            displayName: "Histogram",
            fillColor: "teal",
            bins: null
        };

        private static Axes: ClassAndSelector = {
            "class": "axes",
            selector: ".axes"
        };

        private static Axis: ClassAndSelector = {
            "class": "axis",
            selector: ".axis"
        };

        private static Columns: ClassAndSelector = {
            "class": "columns",
            selector: ".columns"
        };

        private static Column: ClassAndSelector = {
            "class": "column",
            selector: ".column"
        };

        private static Legends: ClassAndSelector = {
            "class": "legends",
            selector: ".legends"
        };

        private static Legend: ClassAndSelector = {
            "class": "legend",
            selector: ".legend"
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Y",
                kind: VisualDataRoleKind.Measure,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Value")
            }],
            dataViewMappings: [{
                conditions: [{
                    "Y": {
                        min: 1,
                        max: 1
                    }
                }],
                categorical: {
                    values: {
                        select: [{
                            bind: {
                                to: "Y"
                            }
                        }]
                    }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: {
                            type: {
                                formatting: {
                                    formatString: true
                                }
                            },
                        },
                        bins: {
                            displayName: "Bins",
                            type: { numeric: true }
                        },
                        frequency: {
                            displayName: "Frequency",
                            type: { bool: true }
                        }
                    },
                },
                datapoint: {
                    displayName: data.createDisplayNameGetter("Visual_DataPoint"),
                    properties: {
                        color: {
                            displayName: "Fill Color",
                            type: {
                                fill: {
                                    solid: {
                                        color: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        private ColumnPadding: number = 1;
        private MinColumnHeight: number = 1;
        private MinOpacity: number = 0.3;
        private MaxOpacity: number = 1;
        private QuantityLabelsOnAxisY: number = 5;
        private MinQuantityBins: number = 1;
        private TooltipDisplayName: string = "Range";
        private SeparatorNumbers: string = ", ";
        private LegendSize: number = 50;
        private AxisSize: number = 30;

        private ExcludeBrackets: Brackets = {
            left: "(",
            right: ")"
        };

        private IncludeBrackets: Brackets = {
            left: "[",
            right: "]"
        };

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        private durationAnimations: number = 200;
        private suppressAnimations: boolean = false;

        private viewport: IViewport;
        private dataView: DataView;
        private selectionManager: SelectionManager;

        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private axes: D3.Selection;
        private axisX: D3.Selection;
        private axisY: D3.Selection;
        private legend: D3.Selection;
        private columns: D3.Selection;

        constructor(histogramConstructorOptions?: HistogramConstructorOptions) {
            if (histogramConstructorOptions) {
                if (histogramConstructorOptions.svg) {
                    this.svg = histogramConstructorOptions.svg;
                }

                if (histogramConstructorOptions.animator) {
                    this.durationAnimations = histogramConstructorOptions.animator.getDuration();
                }

                this.margin = histogramConstructorOptions.margin || this.margin;
            }
        }

        public init(visualsOptions: VisualInitOptions): void {
            if (this.svg) {
                this.root = this.svg;
            } else {
                this.root = d3.select(visualsOptions.element.get(0))
                    .append("svg");
            }

            this.root.classed(Histogram.ClassName, true);

            this.main = this.root.append("g");

            this.axes = this.main
                .append("g")
                .classed(Histogram.Axes["class"], true);

            this.axisX = this.axes
                .append("g")
                .classed(Histogram.Axis["class"], true);

            this.axisY = this.axes
                .append("g")
                .classed(Histogram.Axis["class"], true);

            this.legend = this.main
                .append("g")
                .classed(Histogram.Legends["class"], true);

            this.columns = this.main
                .append("g")
                .classed(Histogram.Columns["class"], true);

            this.selectionManager = new SelectionManager({
                hostServices: visualsOptions.host
            });
        }

        public converter(dataView: DataView): HistogramDataView {
            let histogramSettings: HistogramSettings,
                histogramLayout: D3.Layout.HistogramLayout,
                values: number[],
                ranges: number[] = [],
                data: D3.Layout.Bin[],
                xScale: D3.Scale.LinearScale,
                yScale: D3.Scale.LinearScale;

            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.values ||
                !dataView.categorical.values[0] ||
                !dataView.categorical.values[0].values ||
                !(dataView.categorical.values[0].values.length > 0)) {
                return null;
            }

            histogramSettings = this.parseOptions(dataView);

            if (!histogramSettings) {
                return null;
            }

            values = dataView.categorical.values[0].values;

            histogramLayout = d3.layout.histogram();

            if (histogramSettings.bins && histogramSettings.bins > this.MinQuantityBins) {
                histogramLayout = histogramLayout.bins(histogramSettings.bins);
            }

            data = histogramLayout
                .frequency(histogramSettings.frequency)
                (values);

            xScale = d3.scale.linear()
                .domain([
                    d3.min(data, (item: D3.Layout.Bin) => d3.min(item)),
                    d3.max(data, (item: D3.Layout.Bin) => d3.max(item))
                ])
                .range([0, this.viewport.width - this.LegendSize - this.AxisSize]);

            yScale = d3.scale.linear()
                .domain([
                    0,
                    d3.max(data, (item: D3.Layout.Bin) => item.y)
                ])
                .range([this.viewport.height - this.LegendSize, 0]);

            if (data[0] && data[0].dx) {
                ranges = this.getRanges(values, data.length, data[0].dx);
            }

            return {
                source: values,
                data: data,
                xScale: xScale,
                yScale: yScale,
                settings: histogramSettings,
                ranges: ranges
            };
        }

        private parseOptions(dataView: DataView): HistogramSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.columns[0]) {
                return null;
            }

            let histogramSettings: HistogramSettings = <HistogramSettings>{},
                objects: DataViewObjects;

            histogramSettings.displayName = Histogram.DefaultHistogramSettings.displayName;
            histogramSettings.fillColor = Histogram.DefaultHistogramSettings.fillColor;
            histogramSettings.bins = Histogram.DefaultHistogramSettings.bins;
            histogramSettings.frequency = Histogram.DefaultHistogramSettings.frequency;
            histogramSettings.displayName = dataView.metadata.columns[0].displayName || Histogram.DefaultHistogramSettings.displayName;

            objects = dataView.metadata.columns[0].objects;

            if (objects) {
                let binsNumber: number;

                histogramSettings.fillColor = DataViewObjects.getFillColor(
                    objects,
                    Histogram.Properties.dataPoint.fill,
                    Histogram.DefaultHistogramSettings.fillColor);

                binsNumber = Number(DataViewObjects.getValue<number>(
                    objects,
                    Histogram.Properties.general.bins,
                    Histogram.DefaultHistogramSettings.bins));

                if (!binsNumber || isNaN(binsNumber) || binsNumber <= 1) {
                    histogramSettings.bins = Histogram.DefaultHistogramSettings.bins;
                } else {
                    histogramSettings.bins = binsNumber;
                }

                histogramSettings.frequency = DataViewObjects.getValue<boolean>(
                    objects,
                    Histogram.Properties.general.frequency,
                    Histogram.DefaultHistogramSettings.frequency);
            }

            return histogramSettings;
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]) {
                return;
            }

            let dataView: DataView,
                histogramDataView: HistogramDataView;

            dataView = this.dataView = visualUpdateOptions.dataViews[0];

            this.suppressAnimations = Boolean(visualUpdateOptions.suppressAnimations);

            this.setSize(visualUpdateOptions.viewport);

            histogramDataView = this.converter(dataView);

            this.render(histogramDataView);
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height =
                viewport.height -
                this.margin.top -
                this.margin.bottom;

            width =
                viewport.width -
                this.margin.left -
                this.margin.right;

            this.viewport = {
                height: height,
                width: width
            };

            this.updateElements(viewport.height, viewport.width);
        }

        private updateElements(height: number, width: number): void {
            let shiftToRight: number = this.margin.left + this.LegendSize;

            this.root.attr({
                "height": height,
                "width": width
            });

            this.main.attr("transform", SVGUtil.translate(this.margin.left, this.margin.top));

            this.legend.attr("transform", SVGUtil.translate(this.margin.left, this.margin.top));

            this.columns.attr("transform", SVGUtil.translate(shiftToRight, 0));

            this.axes.attr("transform", SVGUtil.translate(shiftToRight, 0));

            this.axisX.attr(
                "transform",
                SVGUtil.translate(0, this.viewport.height - this.LegendSize));
        }

        private render(histogramDataView: HistogramDataView): void {
            if (!histogramDataView || !histogramDataView.settings) {
                return;
            }

            this.renderAxes(histogramDataView);
            this.renderColumns(histogramDataView);
            this.renderLegend(histogramDataView);
        }

        private renderColumns(histogramDataView: HistogramDataView): void {
            let self: Histogram = this,
                data: D3.Layout.Bin[] = histogramDataView.data,
                yScale: D3.Scale.LinearScale = histogramDataView.yScale,
                countOfValues: number = data.length,
                widthOfColumn: number,
                columnsSelection: D3.UpdateSelection,
                columnElements: D3.Selection = this.main
                    .select(Histogram.Columns.selector)
                    .selectAll(Histogram.Column.selector);

            widthOfColumn = (this.viewport.width - this.AxisSize - this.LegendSize) / countOfValues - this.ColumnPadding;

            columnsSelection = columnElements.data(data);

            columnsSelection
                .enter()
                .append("svg:rect");

            columnsSelection
                .attr("x", this.ColumnPadding / 2)
                .attr("width", widthOfColumn)
                .attr("height", (item: D3.Layout.Bin) => {
                    return this.getColumnHeight(item, yScale);
                })
                .attr("fill", histogramDataView.settings.fillColor)
                .attr("class", Histogram.Column["class"])
                .attr("transform", (item: D3.Layout.Bin, index: number) => {
                    return SVGUtil.translate(
                        widthOfColumn * index + this.ColumnPadding * index,
                        yScale(item.y) - this.ColumnPadding / 2.5);
                })
                .attr("value", (item: D3.Layout.Bin) => item.y)
                .on("click", function () {
                    self.setOpacity(columnsSelection, true);
                    self.setOpacity(d3.select(this), false);

                    d3.event.stopPropagation();
                })
                .classed(Histogram.Column["class"]);

            this.renderTooltip(histogramDataView, columnsSelection);

            columnsSelection
                .exit()
                .remove();

            d3.selection().on("click", () => {
                this.setOpacity(columnsSelection);
            });
        }

        private renderTooltip(histogramDataView: HistogramDataView, selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                let range: string =
                    this.getRangeByIndex(histogramDataView.ranges, tooltipEvent.index);

                if (tooltipEvent && tooltipEvent.data && tooltipEvent.data.y) {
                    return [{
                        displayName: this.getLegendText(histogramDataView),
                        value: tooltipEvent.data.y
                    }, {
                        displayName: this.TooltipDisplayName,
                        value: range
                    }];
                }
            });
        }

        private setOpacity(element: D3Element, isHide: boolean = false): void {
            let elementAnimation: D3.Selection = <D3.Selection> this.animation(element);

            elementAnimation.style(
                "fill-opacity",
                isHide
                    ? this.MinOpacity
                    : this.MaxOpacity);
        }

        private animation(element: D3Element): D3Element {
            if (this.suppressAnimations) {
                return element;
            }

            return (<D3.Selection> element)
                .transition()
                .duration(this.durationAnimations);
        }

        private getColumnHeight(column: D3.Layout.Bin, y: D3.Scale.LinearScale): number {
            let height: number =
                this.viewport.height - this.LegendSize - y(column.y);

            return height > 0
                ? height
                : this.MinColumnHeight;
        }

        private renderAxes(histogramDataView: HistogramDataView): void {
            let xScale: D3.Scale.LinearScale = histogramDataView.xScale,
                yScale: D3.Scale.LinearScale = histogramDataView.yScale,
                xAxis: D3.Svg.Axis,
                yAxis: D3.Svg.Axis;

            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickValues(histogramDataView.ranges);

            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(this.QuantityLabelsOnAxisY);

            this.axisX
                .call(xAxis);

            this.axisY
                .call(yAxis);
        }

        private getRanges(values: number[], countOfRanges: number, step: number): number[] {
            let minValue: number = d3.min(values),
                labels: number[] = [];

            for (let i = 0; i <= countOfRanges; i++) {
                labels.push(minValue + i * step);
            }

            return labels;
        }

        private getRangeByIndex(ranges: number[], index: number): string {
            let leftBracket: string,
                rightBracket: string,
                range: number[] = ranges.slice(index, index + 2);

            leftBracket = index === 0
                ? this.IncludeBrackets.left
                : this.ExcludeBrackets.left;

            rightBracket = this.IncludeBrackets.right;

            return `${leftBracket}${range[0]}${this.SeparatorNumbers}${range[1]}${rightBracket}`;
        }

        private renderLegend(histogramDataView: HistogramDataView): void {
            let legendElements: D3.Selection,
                legendSelection: D3.UpdateSelection,
                datalegends: Legend[] = this.getDataLegends(histogramDataView);

            legendElements = this.main
                .select(Histogram.Legends.selector)
                .selectAll(Histogram.Legend.selector);

            legendSelection = legendElements.data(datalegends);

            legendSelection
                .enter()
                .append("svg:text");

            legendSelection
                .attr("x", 0)
                .attr("y", 0)
                .attr("dx", (item: Legend) => item.dx)
                .attr("dy", (item: Legend) => item.dy)
                .attr("transform", (item: Legend) => item.transform)
                .attr("class", Histogram.Legend["class"])
                .text((item: Legend) => item.text)
                .classed(Histogram.Legend["class"], true);

            legendSelection
                .exit()
                .remove();
        }

        private getDataLegends(histogramDataView: HistogramDataView): Legend[] {
            let bottomLegendText: string = this.getLegendText(histogramDataView);

            return [{
                transform: SVGUtil.translate(
                    this.viewport.width / 2,
                    this.viewport.height),
                text: histogramDataView.settings.displayName,
                dx: "1em",
                dy: "-1em"
            }, {
                transform: SVGUtil.translateAndRotate(
                    0,
                    this.viewport.height / 2,
                    0,
                    0,
                    270),
                text: bottomLegendText,
                dx: "3em"
            }];
        }

        private getLegendText(histogramDataView: HistogramDataView): string {
            return histogramDataView.settings.frequency
                ? Histogram.FrequencyText
                : Histogram.DensityText;
        }

        public destroy(): void {
            this.root = null;
        }
    }
}