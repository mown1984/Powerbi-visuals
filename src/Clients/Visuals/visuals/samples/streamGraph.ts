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
    import ValueFormatter = powerbi.visuals.valueFormatter;
    import SelectionManager = utility.SelectionManager;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;

    export interface StreamData {
        dataPoints: StreamDataPoint[][];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        axisXData: StreamAxisXData;
    }

    export interface StreamDataPoint {
        x: number;
        y: number;
        y0?: number;
        identity: SelectionId;
    }

    export interface StreamAxisXData {
        valueFormatter: IValueFormatter;
        values: any[];
        maxNumverOfValues: number;
        scale?: D3.Scale.GenericScale<D3.Scale.LinearScale | D3.Scale.TimeScale | D3.Scale.OrdinalScale>;
    }

    export interface StreamProperties {
        [objectName: string]: StreamProperty;
    }

    export interface StreamProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    export class StreamGraph implements IVisual {
        public static Properties: StreamProperties = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: 'general',
                    propertyName: 'formatString'
                }
            }
        };

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
                }
            }
        };

        private static VisualClassName = 'streamGraph';

        private static Layer: ClassAndSelector = {
            'class': 'layer',
            selector: '.layer'
        };

        private static MaxNumberOfAxisXValues: number = 5;

        private margin: IMargin = { left: 45, right: 25, bottom: 25, top: 25 };

        private viewport: IViewport;

        private svg: D3.Selection;
        private xAxis: D3.Selection;
        private yAxis: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: utility.SelectionManager;
        private dataView: DataView;
        private legend: ILegend;

        public converter(dataView: DataView, colors: IDataColorPalette): StreamData {
            let catDv: DataViewCategorical = dataView.categorical,
                values: DataViewValueColumns = catDv.values,
                dataPoints: StreamDataPoint[][] = [],
                legendData: LegendData = {
                    dataPoints: [],
                    title: values[0].source.displayName
                },
                categoriesValues: any[] = [],
                value: number = 0,
                valueFormatter: IValueFormatter;

            for (let i = 0, iLen = values.length; i < iLen; i++) {
                dataPoints.push([]);

                if (values[i].source.groupName) {
                    legendData.dataPoints.push({
                        label: values[i].source.groupName,
                        color: colors.getColorByIndex(i).value,
                        icon: LegendIcon.Box,
                        selected: false,
                        identity: null
                    });
                }

                for (let k = 0, kLen = values[i].values.length; k < kLen; k++) {
                    let id: SelectionId = SelectionIdBuilder
                            .builder()
                            .withSeries(dataView.categorical.values, dataView.categorical.values[i])
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

            valueFormatter = ValueFormatter.create({
                format: "g",
                value: value
            });

            if (catDv.categories &&
                catDv.categories[0] &&
                catDv.categories[0].values) {
                categoriesValues = catDv.categories[0].values;
            }

            return {
                dataPoints: dataPoints,
                legendData: legendData,
                valueFormatter: valueFormatter,
                axisXData: this.parseAxisXData(
                    catDv.categories[0].source,
                    categoriesValues)
            };
        }

        private parseAxisXData(source: DataViewMetadataColumn, values: any[]): StreamAxisXData {
            let maxNumverOfValues: number = StreamGraph.MaxNumberOfAxisXValues;

            if (!values || !(values.length > 0)) {
                return {
                    valueFormatter: null,
                    values: [],
                    maxNumverOfValues: maxNumverOfValues
                };
            }

            let scale: D3.Scale.LinearScale | D3.Scale.TimeScale | D3.Scale.OrdinalScale,
                valueFormatter: IValueFormatter = ValueFormatter.create({
                    format: ValueFormatter.getFormatString(
                        source,
                        StreamGraph.Properties["general"]["formatString"]),
                    value: values[0]
                }),
                range: any[] = [this.margin.left, this.viewport.width - this.margin.right],
                filteredValues: any[] = values;

            if (source.type.dateTime) {
                scale = d3.time.scale();

                scale.domain([values[0], values[values.length - 1]]);
                scale.range(range);
            } else if (source.type.numeric) {
                scale = d3.scale.linear();

                scale.domain([values[0], values[values.length - 1]]);
                scale.range(range);
            } else {
                let shiftIndex: number = 0;

                filteredValues = [];

                scale = d3.scale.ordinal();

                if (values.length % 2 > 0) {
                    shiftIndex = Math.floor(values.length / 2);
                } else {
                    shiftIndex = values.length - 1;
                }

                shiftIndex = Math.max(1, shiftIndex);

                for (let index: number = 0; index < values.length; index += shiftIndex) {
                    filteredValues.push(values[index]);
                }

                scale.domain(filteredValues);
                (<D3.Scale.OrdinalScale> scale).rangePoints(range);
            }

            return {
                valueFormatter: valueFormatter,
                values: filteredValues,
                maxNumverOfValues: maxNumverOfValues,
                scale: scale
            };
        }

        public init(options: VisualInitOptions): void {
            let element: JQuery = options.element;

            this.selectionManager = new SelectionManager({ hostServices: options.host });

            this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(StreamGraph.VisualClassName, true);

            this.xAxis = this.svg.append("g");
            this.yAxis = this.svg.append("g");

            this.colors = options.style.colorPalette.dataColors;

            this.legend = createLegend(element, false, null);
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0]) {
                return;
            };

            this.viewport = options.viewport;

            let duration: number = options.suppressAnimations ? 0 : 250,
                dataView: DataView = this.dataView = options.dataViews[0],
                data: StreamData = this.converter(dataView, this.colors),
                dataPoints: StreamDataPoint[][] = data.dataPoints;

            if (dataPoints.length === 0 ) {
                this.svg.selectAll(StreamGraph.Layer.selector).remove();

                return;
            }

            this.legend.drawLegend(data.legendData, this.viewport);

            let height: number = options.viewport.height - this.margin.top;

            this.svg.attr({
                'width': this.viewport.width,
                'height': height
            });

            let stack: D3.Layout.StackLayout = d3.layout.stack();

            if (this.getWiggle(dataView)) {
                stack.offset('wiggle'); 
            }

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
                .classed(StreamGraph.Layer["class"], true);

            selection
                .style("fill",(d, i) => this.colors.getColorByIndex(i).value)
                .on('click', function (d) {
                    selectionManager.select(d[0].identity).then(ids=> {
                        if (ids.length > 0) {
                            selection.style('opacity', 0.5);
                            d3.select(this).style('opacity', 1);
                        } else {
                            selection.style('opacity', 1);
                        }
                    });
                })
                .transition()
                .duration(duration)
                .attr("d", area);

            selection.exit().remove();

            this.drawAxis(data, yScale);
        }

        private drawAxis(data: StreamData, yScale: D3.Scale.LinearScale) {
            let shiftY: number = this.viewport.height - this.margin.bottom - this.margin.top;

            let xAxis: D3.Svg.Axis = d3.svg.axis()
                .scale(data.axisXData.scale)
                .orient("bottom")
                .ticks(StreamGraph.MaxNumberOfAxisXValues)
                .tickFormat((item: any) => {
                    if (data.axisXData.valueFormatter) {
                        return data.axisXData.valueFormatter.format(item);
                    }

                    return item;
                });

            let yAxis: D3.Svg.Axis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat((item: any) => {
                    if (data.valueFormatter) {
                        return data.valueFormatter.format(item);
                    }

                    return item;
                });

            this.xAxis.attr("class", "x axis")
                .attr("transform", SVGUtil.translate(0, shiftY))
                .call(xAxis);

            this.yAxis.attr("class", "y axis")
                .attr("transform", SVGUtil.translate(this.margin.left, 0))
                .call(yAxis);
        }

        private getWiggle(dataView: DataView) {
            if (dataView) {
                let objects = dataView.metadata.objects;

                if (objects) {
                    let general = objects['general'];

                    if (general) {
                        return <boolean>general['wiggle'];
                    }
                }
            }

            return true;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [],
                dataView = this.dataView;

            switch (options.objectName) {
                case 'general':
                    let general: VisualObjectInstance = {
                        objectName: 'general',
                        displayName: 'General',
                        selector: null,
                        properties: {
                            wiggle: this.getWiggle(dataView)
                        }
                    };

                    instances.push(general);
                    break;
            }

            return instances;
        }

    }
}