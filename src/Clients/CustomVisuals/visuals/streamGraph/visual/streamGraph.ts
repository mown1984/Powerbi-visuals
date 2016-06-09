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

/// <reference path="../../../_references.ts"/>

module powerbi.visuals.samples {

    import ValueFormatter = powerbi.visuals.valueFormatter;
    import SelectionManager = utility.SelectionManager;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;

    export interface StreamData {
        dataPoints: StreamDataPoint[][];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        categoryFormatter: IValueFormatter;
        streamGraphSettings: StreamGraphSettings;
    }

    export interface StreamDataPoint {
        x: number;
        y: number;
        y0?: number;
        identity: SelectionId;
    }

    export interface StreamGraphSettings {
        legendSettings: StreamGraphLegendSettings;
        categoryAxisSettings: StreamGraphAxisSettings;
        valueAxisSettings: StreamGraphAxisSettings;
    }

    export interface StreamGraphLegendSettings {
        show: boolean;
        showTitle: boolean;
        titleText: string;
        labelColor: string;
        fontSize: number;
    }

    export interface StreamGraphAxisSettings {
        show: boolean;
        axisColor: string;
        showAxisTitle: boolean;
    }

    export interface StreamProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    const StreamGraphAxisGraphicsContextClassName = 'axisGraphicsContext';
    const StreamGraphXAxisClassName = 'x axis';
    const StreamGraphYAxisClassName = 'y axis';
    const StreamGraphDefaultAxisColor = "#777";
    const StreamGraphDefaultFontSizeInPoints: number = 8;
    const DefaultLegendFontSizeInPt = 8;
    const DefaultLegendLabelFillColor: string = '#666666';
    const StreamGraphDefaultFontFamily: string = 'wf_segoe-ui_normal';
    const StreamGraphDefaultFontWeight: string = 'normal';
    const StreamGraphDefaultSettings: StreamGraphSettings = {
        legendSettings: {
            show: true,
            showTitle: true,
            labelColor: DefaultLegendLabelFillColor,
            titleText: "",
            fontSize: DefaultLegendFontSizeInPt
        },
        categoryAxisSettings: {
            show: true,
            axisColor: StreamGraphDefaultAxisColor,
            showAxisTitle: false,
        },
        valueAxisSettings: {
            show: true,
            axisColor: StreamGraphDefaultAxisColor,
            showAxisTitle: false,
        },
    };

    export class StreamGraph implements IVisual {
        private static VisualClassName = 'streamGraph';

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: 'general',
                    propertyName: 'formatString'
                }
            },
            legend: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "show"
                }
            },
            categoryAxis: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "categoryAxis",
                    propertyName: "show"
                },
                axisColor: <DataViewObjectPropertyIdentifier>{
                    objectName: "categoryAxis",
                    propertyName: "axisColor"
                },
                showAxisTitle: <DataViewObjectPropertyIdentifier>{
                    objectName: "categoryAxis",
                    propertyName: "showAxisTitle"
                }
            },
            valueAxis: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "valueAxis",
                    propertyName: "show"
                },
                axisColor: <DataViewObjectPropertyIdentifier>{
                    objectName: "valueAxis",
                    propertyName: "axisColor"
                },
                showAxisTitle: <DataViewObjectPropertyIdentifier>{
                    objectName: "valueAxis",
                    propertyName: "showAxisTitle"
                }
            }
        };

        private static Layer: ClassAndSelector = {
            'class': 'layer',
            selector: '.layer'
        };

        private static XAxisLabel: ClassAndSelector = {
            'class': 'xAxisLabel',
            selector: '.xAxisLabel'
        };

        private static YAxisLabel: ClassAndSelector = {
            'class': 'yAxisLabel',
            selector: '.yAxisLabel'
        };

        private static MaxNumberOfAxisXValues: number = 5;

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: 'Category',
                }, {
                    name: 'Series',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: 'Series',
                }, {
                    name: 'Y',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Values'),
                },
            ],
            dataViewMappings: [{
                conditions: [
                    { 'Category': { max: 1 }, 'Series': { max: 0 } },
                    { 'Category': { max: 1 }, 'Series': { min: 1, max: 1 }, 'Y': { max: 1 } }
                ],
                categorical: {
                    categories: {
                        for: { in: 'Category' },
                        dataReductionAlgorithm: { bottom: {} }
                    },
                    values: {
                        group: {
                            by: 'Series',
                            select: [{ for: { in: 'Y' } }],
                            dataReductionAlgorithm: { bottom: {} }
                        }
                    },
                }
            }],
            objects: {
                general: {
                    displayName: 'General',
                    properties: {
                        formatString: { type: { formatting: { formatString: true } } },
                        wiggle: {
                            type: { bool: true },
                            displayName: 'Wiggle'
                        }
                    }
                },
                categoryAxis: {
                    displayName: 'X-Axis',
                    properties: {
                        show: {
                            displayName: 'show',
                            type: { bool: true }
                        },
                        showAxisTitle: {
                            displayName: 'Title',
                            type: { bool: true }
                        },
                        axisColor: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                valueAxis: {
                    displayName: 'Y-Axis',
                    properties: {
                        show: {
                            displayName: 'show',
                            type: { bool: true }
                        },
                        showAxisTitle: {
                            displayName: 'Title',
                            type: { bool: true }
                        },
                        axisColor: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                legend: {
                    displayName: 'Legend',
                    properties: {
                        show: {
                            displayName: 'show',
                            type: { bool: true }
                        },
                        position: {
                            displayName: 'Position',
                            type: { enumeration: legendPosition.type }
                        },
                        showTitle: {
                            displayName: 'Title',
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: 'Legend Name',
                            type: { text: true },
                            suppressFormatPainterCopy: true
                        },
                        labelColor: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: 'Text Size',
                            type: { formatting: { fontSize: true } }
                        }
                    }
                }
            }
        };

        private margin: IMargin = { left: 45, right: 20, bottom: 20, top: 20 };

        private viewport: IViewport;

        private svg: D3.Selection;
        private axisGraphicsContext: D3.Selection;
        private xAxis: D3.Selection;
        private yAxis: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: utility.SelectionManager;
        private dataView: DataView;
        private legend: ILegend;
        private legendObjectProperties: DataViewObject;
        private data: StreamData;

        public converter(dataView: DataView, colors: IDataColorPalette): StreamData {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.values ||
                !dataView.categorical.categories ||
                !colors) {
                return null;
            }

            let catDv: DataViewCategorical = dataView.categorical,
                grouped = catDv && catDv.values ? catDv.values.grouped() : undefined,
                values: DataViewValueColumns = catDv.values,
                dataPoints: StreamDataPoint[][] = [],
                legendData: LegendData = {
                    dataPoints: [],
                    title: values[0].source.displayName,
                    fontSize: StreamGraphDefaultFontSizeInPoints,
                },
                value: number = 0,
                valueFormatter: IValueFormatter,
                categoryFormatter: IValueFormatter;

            for (let i = 0; i < values.length; i++) {
                let columnGroup: DataViewValueColumnGroup = grouped
                    && grouped.length > i && grouped[i].values ? grouped[i] : null;

                dataPoints.push([]);

                if (values[i].source.groupName) {
                    legendData.dataPoints.push({
                        label: values[i].source.groupName,
                        color: colors.getColorByIndex(i).value,
                        icon: LegendIcon.Box,
                        selected: false,
                        identity: SelectionId.createWithId(values[i].identity)
                    });
                }

                for (let k = 0; k < values[i].values.length; k++) {
                    let id: SelectionId = SelectionIdBuilder
                        .builder()
                        .withSeries(dataView.categorical.values, columnGroup)
                        .createSelectionId(),
                        y: number = values[i].values[k];

                    if (y > value) {
                        value = y;
                    }

                    dataPoints[i].push({
                        x: k,
                        y: y,
                        identity: id
                    });
                }
            }

            let streamGraphSettings: StreamGraphSettings = this.parseSettings(dataView);

            valueFormatter = ValueFormatter.create({
                format: "g",
                value: value
            });

            categoryFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(
                    catDv.categories[0].source,
                    StreamGraph.Properties.general.formatString),
                value: catDv.categories[0].values
            });

            return {
                dataPoints: dataPoints,
                legendData: legendData,
                valueFormatter: valueFormatter,
                categoryFormatter: categoryFormatter,
                streamGraphSettings: streamGraphSettings
            };
        }

        private parseSettings(dataView: DataView): StreamGraphSettings {
            if (!dataView || !dataView.metadata)
                return StreamGraphDefaultSettings;

            let objects: DataViewObjects = dataView.metadata.objects;
            let streamGraphSettings = _.clone(StreamGraphDefaultSettings);

            let categoryAxisSettings = streamGraphSettings.categoryAxisSettings;
            categoryAxisSettings.show = DataViewObjects.getValue<boolean>(objects, StreamGraph.Properties.categoryAxis.show, categoryAxisSettings.show);
            categoryAxisSettings.axisColor = <string>DataViewObjects.getFillColor(objects, StreamGraph.Properties.categoryAxis.axisColor, categoryAxisSettings.axisColor);
            categoryAxisSettings.showAxisTitle = DataViewObjects.getValue<boolean>(objects, StreamGraph.Properties.categoryAxis.showAxisTitle, categoryAxisSettings.showAxisTitle);

            let valueAxisSettings = streamGraphSettings.valueAxisSettings;
            valueAxisSettings.show = DataViewObjects.getValue<boolean>(objects, StreamGraph.Properties.valueAxis.show, valueAxisSettings.show);
            valueAxisSettings.axisColor = <string>DataViewObjects.getFillColor(objects, StreamGraph.Properties.valueAxis.axisColor, valueAxisSettings.axisColor);
            valueAxisSettings.showAxisTitle = DataViewObjects.getValue<boolean>(objects, StreamGraph.Properties.valueAxis.showAxisTitle, valueAxisSettings.showAxisTitle);

            return streamGraphSettings;
        }

        public init(options: VisualInitOptions): void {
            let element: JQuery = options.element;

            this.selectionManager = new SelectionManager({ hostServices: options.host });

            this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(StreamGraph.VisualClassName, true)
                .style('position', 'absolute');

            this.axisGraphicsContext = this.svg.append('g')
                .classed(StreamGraphAxisGraphicsContextClassName, true);

            this.xAxis = this.axisGraphicsContext.append("g").classed(StreamGraphXAxisClassName, true);
            this.yAxis = this.axisGraphicsContext.append("g").classed(StreamGraphYAxisClassName, true);

            this.colors = options.style.colorPalette.dataColors;

            this.legend = createLegend(element, false, null, true);
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0] || !options.dataViews[0].categorical) {
                this.clearData();
                return;
            };

            this.viewport = {
                width: Math.max(0, options.viewport.width),
                height: Math.max(0, options.viewport.height)
            };

            let duration: number = options.suppressAnimations ? 0 : 250,
                dataView: DataView = this.dataView = options.dataViews[0],
                data: StreamData = this.data = this.converter(dataView, this.colors);

            if (!data || !data.dataPoints || !data.dataPoints.length) {
                this.clearData();
                return;
            }

            let dataPoints: StreamDataPoint[][] = data.dataPoints;

            this.renderLegend(data);
            this.updateViewPort();
            this.renderXAxisLabels();
            this.renderYAxisLabels();

            let height: number = Math.max(0, this.viewport.height - this.margin.top);

            this.svg.attr({
                'width': this.viewport.width,
                'height': height
            });

            let stack: D3.Layout.StackLayout = d3.layout.stack();

            if (this.getWiggle(dataView))
                stack.offset('wiggle');

            let layers: StreamDataPoint[][] = stack(dataPoints);

            let xScale: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, dataPoints[0].length - 1])
                .range([this.margin.left, this.viewport.width - this.margin.right]);

            let yScale: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, d3.max(layers, (layer) => {
                    return d3.max(layer, (d) => {
                        return d.y0 + d.y;
                    });
                })])
                .range([height - this.margin.bottom, this.margin.top]);

            let area: D3.Svg.Area = d3.svg.area()
                .interpolate('basis')
                .x(d => xScale(d.x))
                .y0(d => yScale(d.y0))
                .y1(d => yScale(d.y0 + d.y));

            let selectionManager: SelectionManager = this.selectionManager;

            let selection: D3.UpdateSelection = this.svg.selectAll(StreamGraph.Layer.selector)
                .data(layers);

            selection.enter()
                .append('path')
                .classed(StreamGraph.Layer.class, true);

            selection
                .style("fill", (d, i) => this.colors.getColorByIndex(i).value)
                .on('click', function (d) {
                    selectionManager.select(d[0].identity).then(ids=> {
                        if (ids.length > 0) {
                            selection.style('opacity', 0.5);
                            d3.select(this).style('opacity', 1);
                        } else
                            selection.style('opacity', 1);
                    });
                })
                .transition()
                .duration(duration)
                .attr("d", area);

            selection.exit().remove();

            this.drawAxis(data, xScale, yScale);
        }

        private drawAxis(data: StreamData, xScale: D3.Scale.LinearScale, yScale: D3.Scale.LinearScale) {
            let shiftY: number = this.viewport.height - this.margin.bottom - this.margin.top,
                shiftX: number = this.viewport.width - this.margin.left - this.margin.right,
                xAxis: D3.Svg.Axis = d3.svg.axis();

            xAxis.scale(xScale)
                .orient("bottom")
                .tickFormat(((item: any, index: number): any => {
                    if (data.categoryFormatter)
                        item = data.categoryFormatter.format(item);

                    if (index != null && xAxis.tickValues() &&
                        (index === 0 || index === xAxis.tickValues().length - 1)) {
                        item = TextMeasurementService.getTailoredTextOrDefault(
                            StreamGraph.getTextPropertiesFunction(item),
                            (index ? this.margin.right : this.margin.left) * 2);
                    }
                    return item;
                }).bind(xAxis));

            let yAxis: D3.Svg.Axis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat((item: any): any => {
                    if (data.valueFormatter) {
                        return data.valueFormatter.format(item);
                    }
                    return item;
                });

            this.setMaxTicks(xAxis, shiftX, StreamGraph.MaxNumberOfAxisXValues);
            this.setMaxTicks(yAxis, shiftY);

            let valueAxisSettings = this.data.streamGraphSettings.valueAxisSettings;
            if (valueAxisSettings.show) {
                let axisColor: Fill = valueAxisSettings.axisColor;
                this.yAxis
                    .attr("transform", SVGUtil.translate(this.margin.left, 0))
                    .call(yAxis);
                this.yAxis.selectAll("text").style("fill", axisColor);
            } else
                this.yAxis.selectAll("*").remove();

            let categoryAxisSettings = this.data.streamGraphSettings.categoryAxisSettings;
            if (categoryAxisSettings.show) {
                let axisColor: Fill = categoryAxisSettings.axisColor;
                this.xAxis
                    .attr("transform", SVGUtil.translate(0, shiftY))
                    .call(xAxis);
                this.xAxis.selectAll("text").style("fill", axisColor);
            } else
                this.xAxis.selectAll("*").remove();
        }

        private renderYAxisLabels(): void {
            this.yAxis.selectAll(StreamGraph.YAxisLabel.selector).remove();

            let valueAxisSettings: StreamGraphAxisSettings = this.data.streamGraphSettings.valueAxisSettings;
            if (valueAxisSettings.show) {
                this.margin.left = 45;
                if (valueAxisSettings.showAxisTitle)
                    if (this.dataView.categorical.values.source) {
                        let marginLeft = this.margin.left = 65;
                        let categoryAxisSettings: StreamGraphAxisSettings = this.data.streamGraphSettings.categoryAxisSettings;
                        let isXAxisOn: boolean = categoryAxisSettings.show === true;
                        let isXTitleOn: boolean = categoryAxisSettings.showAxisTitle === true;
                        let height: number = isXAxisOn ? isXTitleOn ? this.viewport.height - this.margin.bottom : this.viewport.height - this.margin.top : this.viewport.height;
                        let yAxisText: string = this.dataView.categorical.values.source.displayName;
                        let yAxisClass: string = StreamGraph.YAxisLabel.class;
                        let yAxisLabel: D3.Selection = this.yAxis.append("text")
                            .style("text-anchor", "middle")
                            .text(yAxisText)
                            .call((text: D3.Selection) => {
                                text.each(function () {
                                    let text = d3.select(this);
                                    text.attr({
                                        class: yAxisClass,
                                        transform: "rotate(-90)",
                                        y: -marginLeft + 5,
                                        x: -(height / 2),
                                        dy: "1em"
                                    });
                                });
                            });

                        yAxisLabel.call(AxisHelper.LabelLayoutStrategy.clip,
                            height,
                            TextMeasurementService.svgEllipsis);
                    } else
                        valueAxisSettings.showAxisTitle = false;
            } else
                this.margin.left = 20;
        }

        private renderXAxisLabels(): void {
            this.xAxis.selectAll(StreamGraph.XAxisLabel.selector).remove();

            let categoryAxisSettings = this.data.streamGraphSettings.categoryAxisSettings;
            if (categoryAxisSettings.show) {
                this.margin.bottom = 20;
                if (categoryAxisSettings.showAxisTitle)
                    if (this.dataView.categorical.categories[0].source) {
                        let marginBottom = this.margin.bottom = 40;
                        let valueAxisSettings: StreamGraphAxisSettings = this.data.streamGraphSettings.valueAxisSettings;
                        let isYAxisOn: boolean = valueAxisSettings.show === true;
                        let isYTitleOn: boolean = valueAxisSettings.showAxisTitle === true;
                        let width: number = isYAxisOn ? isYTitleOn ? this.viewport.width + this.margin.left : this.viewport.width + this.margin.right : this.viewport.width;
                        let xAxisText: string = this.dataView.categorical.categories[0].source.displayName;
                        let xAxisClass: string = StreamGraph.XAxisLabel.class;
                        let xAxisLabel: D3.Selection = this.xAxis.append("text")
                            .style("text-anchor", "middle")
                            .text(xAxisText)
                            .call((text: D3.Selection) => {
                                text.each(function () {
                                    let text = d3.select(this);
                                    text.attr({
                                        class: xAxisClass,
                                        transform: SVGUtil.translate(width / 2, marginBottom - 5)
                                    });
                                });
                            });

                        xAxisLabel.call(AxisHelper.LabelLayoutStrategy.clip,
                            width,
                            TextMeasurementService.svgEllipsis);
                    } else
                        categoryAxisSettings.showAxisTitle = false;
            } else
                this.margin.bottom = 10;
        }

        private renderLegend(streamGraphData: StreamData): void {
            let legendData: LegendData = streamGraphData.legendData;
            if (!legendData || !this.dataView || !this.dataView.metadata)
                return;

            this.legendObjectProperties = DataViewObjects.getObject(this.dataView.metadata.objects, "legend", {});

            if (this.legendObjectProperties) {
                LegendData.update(legendData, this.legendObjectProperties);

                let position: string = <string>this.legendObjectProperties[legendProps.position];

                if (position)
                    this.legend.changeOrientation(LegendPosition[position]);
            }
            this.legend.drawLegend(legendData, _.clone(this.viewport));
            Legend.positionChartArea(this.svg, this.legend);
        }

        private updateViewPort(): void {
            let legendMargins: IViewport = this.legend.getMargins();
            let legendPosition = LegendPosition[<string>this.legendObjectProperties[legendProps.position]];

            switch (legendPosition) {
                case LegendPosition.Top:
                case LegendPosition.TopCenter:
                case LegendPosition.Bottom:
                case LegendPosition.BottomCenter: {
                    this.viewport.height -= legendMargins.height;
                    break;
                }
                case LegendPosition.Left:
                case LegendPosition.LeftCenter:
                case LegendPosition.Right:
                case LegendPosition.RightCenter: {
                    this.viewport.width -= legendMargins.width;
                    break;
                }
            }
        }

        private setMaxTicks(axis: D3.Svg.Axis, maxSize: number, maxValue?: number): void {
            let maxTicks = maxValue === undefined
                ? this.getTicksByAxis(axis).length
                : Math.min(maxValue, this.getTicksByAxis(axis).length);

            if (axis.scale().domain.toString() === d3.scale.linear().domain.toString())
                axis.ticks(this.getFittedTickLength(axis, maxSize, maxTicks));
            else
                axis.tickValues(this.getFittedTickValues(axis, maxSize, maxTicks));
        }

        private getFittedTickLength(axis: D3.Svg.Axis, maxSize: number, maxTicks: number): number {
            for (let ticks: any[] = this.getTicksByAxis(axis), measureTickFunction = this.getMeasureTickFunction(axis, ticks);
                maxTicks > 0 && maxSize > 0 && (this.measureTicks(ticks, measureTickFunction) > maxSize || axis.scale().ticks([maxTicks]).length > maxTicks);
                maxTicks-- , ticks = this.getTicksByAxis(axis)) {
                axis.ticks(maxTicks);
            }
            return maxTicks;
        }

        private getFittedTickValues(axis: D3.Svg.Axis, maxSize: number, maxTicks: number): any[] {
            let ticks: any[] = this.getTicksByAxis(axis),
                maxWidthOf2Ticks: number,
                tickPairsWidths: any[] = [],
                measureTickFunction: (any) => number = this.getMeasureTickFunction(axis, ticks);

            for (let currentMaxTicks: number = maxTicks, indexes: number[] = [];
                maxTicks > 0 && maxSize > 0;
                currentMaxTicks-- , indexes = []) {
                switch (currentMaxTicks) {
                    case 0:
                        return [];
                    case 1:
                        indexes = [0];
                        break;
                    case 2:
                        indexes = [0, ticks.length - 1];
                        break;
                    default:
                        let takeEvery: number = ticks.length / (currentMaxTicks - 1);

                        for (let i = 0; i < currentMaxTicks - 1; i++) {
                            indexes.push(Math.round(takeEvery * i));
                        }

                        indexes.push(ticks.length - 1);
                        break;
                }

                let ticksIndexes: any[][] = indexes.map(x => [ticks[x], x]);
                maxWidthOf2Ticks = (maxSize / ticks.length) * 2;

                ticksIndexes.reduce((a, b) => {
                    tickPairsWidths.push([measureTickFunction(a[0]) + measureTickFunction(b[0]), (b[1] - a[1]) * maxWidthOf2Ticks]);
                    return b;
                });

                if (!tickPairsWidths.some(x => x[0] > x[1])) {
                    return ticksIndexes.map(x => x[0]);
                }
            }
            return [];
        }

        private measureTicks(ticks: any[], measureTickFunction: (number) => any): number {
            return ticks.map((x: any) => measureTickFunction(x)).reduce((a: number, b: number) => a + b);
        }

        private getTicksByAxis(axis: D3.Svg.Axis): any[] {
            let scale = axis.scale();
            let result: any = axis.tickValues() === null
                ? scale.ticks
                    ? scale.ticks.apply(scale, axis.ticks())
                    : scale.domain()
                : axis.tickValues();

            return result.length === undefined ? [result] : result;
        }

        private getMeasureTickFunction(axis: D3.Svg.Axis, ticks: string[]): (number) => any {
            let measureFunction = axis.orient() === "top" || axis.orient() === "bottom"
                ? TextMeasurementService.measureSvgTextWidth
                : TextMeasurementService.measureSvgTextHeight;

            let cache = {};

            return function (x: any): number {
                return cache[x]
                    ? cache[x]
                    : cache[x] = measureFunction(StreamGraph.getTextPropertiesFunction(axis.tickFormat()(x))) + axis.tickPadding();
            };
        }

        private static getTextPropertiesFunction(text: string): TextProperties {
            let fontFamily: string = StreamGraphDefaultFontFamily,
                fontSize: string = jsCommon.PixelConverter.fromPoint(StreamGraphDefaultFontSizeInPoints),
                fontWeight: string = StreamGraphDefaultFontWeight;

            return { text: text, fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight };
        }

        private getWiggle(dataView: DataView) {
            if (dataView && dataView.metadata) {
                let objects = dataView.metadata.objects;

                if (objects) {
                    let general = DataViewObjects.getObject(objects, 'general', undefined);

                    if (general)
                        return <boolean>general['wiggle'];
                }
            }
            return true;
        }

        private enumerateValueAxisValues(enumeration: ObjectEnumerationBuilder): void {

            let valueAxisSettings: StreamGraphAxisSettings = this.data && this.data.streamGraphSettings ? this.data.streamGraphSettings.valueAxisSettings : StreamGraphDefaultSettings.valueAxisSettings;

            enumeration.pushInstance({
                selector: null,
                objectName: 'valueAxis',
                displayName: "Y-Axis",
                properties: {
                    show: valueAxisSettings.show,
                    showAxisTitle: valueAxisSettings.showAxisTitle,
                    axisColor: valueAxisSettings.axisColor,
                }
            });
        }

        private enumerateCategoryAxisValues(enumeration: ObjectEnumerationBuilder): void {
            let categoryAxisSettings: StreamGraphAxisSettings = this.data && this.data.streamGraphSettings ? this.data.streamGraphSettings.categoryAxisSettings : StreamGraphDefaultSettings.categoryAxisSettings;

            enumeration.pushInstance({
                selector: null,
                objectName: 'categoryAxis',
                displayName: "X-Axis",
                properties: {
                    show: categoryAxisSettings.show,
                    showAxisTitle: categoryAxisSettings.showAxisTitle,
                    axisColor: categoryAxisSettings.axisColor,
                }
            });
        }

        private enumerateLegend(enumeration: ObjectEnumerationBuilder): void {
            let legendSettings: DataViewObject = this.legendObjectProperties ? this.legendObjectProperties : {};

            enumeration.pushInstance({
                selector: null,
                objectName: 'legend',
                displayName: "Legend",
                properties: {
                    show: this.data && this.data.streamGraphSettings ? this.data.streamGraphSettings.legendSettings.show : true,
                    position: LegendPosition[this.legend.getOrientation()],
                    showTitle: DataViewObject.getValue<boolean>(legendSettings, legendProps.showTitle, true),
                    titleText: DataViewObject.getValue<string>(legendSettings, legendProps.titleText, ""),
                    labelColor: DataViewObject.getValue<string>(legendSettings, legendProps.labelColor, DefaultLegendLabelFillColor),
                    fontSize: DataViewObject.getValue<number>(legendSettings, legendProps.fontSize, DefaultLegendFontSizeInPt)
                }
            });
        }

        private clearData() {
            this.svg.selectAll(StreamGraph.Layer.selector).remove();
            this.legend.drawLegend({ dataPoints: [] }, this.viewport);
            this.yAxis.selectAll("*").remove();
            this.xAxis.selectAll("*").remove();
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration: ObjectEnumerationBuilder = new ObjectEnumerationBuilder(),
                dataView = this.dataView;

            switch (options.objectName) {
                case 'legend':
                    if (dataView
                        && dataView.categorical
                        && dataView.categorical.values
                        && dataView.categorical.values.source)
                            this.enumerateLegend(enumeration);
                    break;
                case 'categoryAxis':
                    this.enumerateCategoryAxisValues(enumeration);
                    break;
                case 'valueAxis':
                    this.enumerateValueAxisValues(enumeration);
                    break;
                case 'general':
                    let general: VisualObjectInstance = {
                        objectName: 'general',
                        displayName: 'General',
                        selector: null,
                        properties: {
                            wiggle: this.getWiggle(dataView)
                        }
                    };

                    enumeration.pushInstance(general);
                    break;
            }
            return enumeration.complete();
        }
    }
}