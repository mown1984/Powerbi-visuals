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
 
    export interface AreaRangeChartConstructorOptions {
        animator?: IGenericAnimator;
        svg?: D3.Selection;
        margin?: IMargin;
        radius?: number;
        strokeWidth?: number;
    }
    
    export interface AreaRangeChartData {
        x: number;
        y0: number;
        y: number;
        color?: string;
        value?: number;
        label?: string;
        identity: SelectionId;
        tooltipInfo?: TooltipDataItem[];
    }
    
    export interface AreaRangeChartDataView {
        data: AreaRangeChartData[];
        xScale?: D3.Scale.LinearScale;
        yScale?: D3.Scale.LinearScale;
        //settings: HistogramSettings;
        formatter: IValueFormatter;
    }

    export interface AreaRangeChartSettings {
        displayName?: string;
        fillColor?: string;
    }

    export class AreaRangeChart implements IVisual {

        private static Properties: any = {
            general: {
                bins: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "bins"
                },
                frequency: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "frequency"
                },
                formatString: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'formatString' },
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            }
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: powerbi.VisualDataRoleKind.Grouping,
                },
                {
                    name: 'Y',
                    kind: powerbi.VisualDataRoleKind.Measure,
                },
            ],
            dataViewMappings: [{
                categories: {
                    for: { in: 'Category' },
                    dataReductionAlgorithm: { top: {} }
                },
                values: {
                    select: [{ bind: { to: 'Y' } }]
                },
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

        private static VisualClassName = 'dotPlot';
/*
        private static AreaRangeChart: ClassAndSelector = {
            class: 'areaRangeChart',
            selector: '.areaRangeChart'
        };
/*
        private static Axis: ClassAndSelector = {
            class: 'axis',
            selector: '.axis'
        };

        private static Dot: ClassAndSelector = {
            class: 'dot',
            selector: '.dot'
        };
*/
        private svg: D3.Selection;
    /*    private axis: D3.Selection;
        private dotPlot: D3.Selection;
*/
        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;
        private dataView: DataView;
        private viewport: IViewport;

        private animator: IGenericAnimator;
        private margin: IMargin;
        private legend: ILegend;

        private static DefaultMargin: IMargin = {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        };

        private radius: number;
        private strokeWidth: number;

        private static DefaultRadius: number = 5;
        private static DefaultStrokeWidth: number = 1;
/*        private static FrequencyText: string = "Frequency";

        private static getTooltipData(value: number): TooltipDataItem[] {
            return [{
                displayName: AreaRangeChart.FrequencyText,
                value: value.toString()
            }];
        }
*/
   

        public constructor(options?: AreaRangeChartConstructorOptions) {
            if (options) {
                if (options.svg) {
                    this.svg = options.svg;
                }
                if (options.animator) {
                    this.animator = options.animator;
                }
                this.margin = options.margin || AreaRangeChart.DefaultMargin;
                this.radius = options.radius || AreaRangeChart.DefaultRadius;
                this.strokeWidth = options.strokeWidth || AreaRangeChart.DefaultStrokeWidth;
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
/*
            this.dotPlot = this.svg
                .append('g')
                .classed(AreaRangeChart.AreaRangeChart.class, true);

            this.axis = this.svg
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);*/
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0]) return;
            let dataView = this.dataView = options.dataViews[0];
            let viewport = this.viewport = options.viewport;
            this.svg
                .attr({
                    'height': viewport.height,
                    'width': viewport.width
                });

            let height = viewport.height - this.margin.bottom - this.margin.top;

            let source = dataView.categorical.categories[0].source;
            let data = this.converter(dataView);

            console.log(height, source, data);
            /*
            let dataPoints = data.dataPoints;

            let values = dataView.categorical.values[0].values;
            let xValues = d3.set(values).values();

            let xScale: D3.Scale.OrdinalScale = d3.scale.ordinal()
                .domain(xValues)
                .rangeBands([this.margin.left, viewport.width - this.margin.right]);

            let yScale: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, maxDots])
                .range([height - radius, this.margin.top]);
*/
            //this.legend.drawLegend(data.legendData, viewport);
           
           // this.drawAxis(source, data.xScale, height);
           // this.drawAreaRangeChart(dataPoints, xScale, yScale);
        }

        public converter(dataView: DataView): AreaRangeChartDataView {
            let catDv: DataViewCategorical = dataView.categorical;
            let values = catDv.categories[0].values;

            let min = d3.min(values, d => {
                return d3.min(d);
            });
            let max = d3.max(values, d => {
                return d3.max(d);
            });

            let xScale: D3.Scale.LinearScale = d3.scale.linear().domain([min, max]);
            let yScale: D3.Scale.LinearScale = d3.scale.linear().domain([min, max]);

            let valFormatter = powerbi.visuals.valueFormatter.create({
                format: powerbi.visuals.valueFormatter.getFormatString(dataView.categorical.categories[0].source, AreaRangeChart.Properties.general.formatString),
                value: values[0],
            });

            let settings: AreaRangeChartSettings = this.parseSettings(dataView);

            /*
                        for (let i = 0, iLen = values.length; i < iLen; i++) {
                            let data = values[i];
                            let color = colors.getColorByIndex(i).value;
            
                        
                            let legendText = values[i].source.displayName;
                            let color = colors.getColorByIndex(i).value;
                            let counts = {};
            
                            for (let j = 0, jLen = values[i].values.length; j < jLen; j++) {
                                let num = values[i].values[j];
                                counts[num] = counts[num] ? counts[num]+1 : 1;
                            }                
                            let data = d3.entries(counts);
                            let min = d3.min(data, d => d.value);
                            let max = d3.max(data, d => d.value);
            
                            let dotsScale: D3.Scale.LinearScale = d3.scale.linear().domain([min, max]);
            
             
                            for (let j = 0, jLen = data.length; j < jLen; j++) {
                                let id = SelectionIdBuilder
                                    .builder()
                                    .withSeries(dataView.categorical.values, dataView.categorical.values[i])
                                    .createSelectionId();
                                dataPoints.push({
                                    x: category[j],
                                    y0: data[j][0],
                                    y: data[j][1],
                                    color: color,
                                    identity: id,
                                    //tooltipInfo: AreaRangeChart.getTooltipData(data[j][0], data[j][1]);
                                });
                            }
            
                            legendData.dataPoints.push({
                                label: legendText,
                                color: color,
                                icon: LegendIcon.Box,
                                selected: false,
                                identity: null
                            });
                        }
                        */

            return {
                data: this.getData(values, values, settings, valFormatter),
                xScale: xScale,
                yScale: yScale,
                settings: settings,
                formatter: valFormatter
            };
        }

        private getData(values: number[], data: any[], settings: AreaRangeChartSettings, formatter: IValueFormatter): AreaRangeChartData[] {
  /*          var minValue: number = d3.min(values),
                maxValue: number = d3.max(values);

            return data.map((bin: HistogramData, index: number) => {
                bin.range = this.getRange(minValue, maxValue, bin.dx, index);
                bin.tooltipInfo = this.getTooltipData(bin.y, bin.range, settings, index === 0, formatter);

                return bin;
            });*/
            return data;
        }

        private parseSettings(dataView: DataView): AreaRangeChartSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.columns[0]) {
                return null;
            }

            let settings: AreaRangeChartSettings = <AreaRangeChartSettings>{};
              //  objects: DataViewObjects;

            return settings;
        }

/*
        private drawAreaRangeChart(data: AreaRangeChartDatapoint[], xScale: D3.Scale.OrdinalScale, yScale: D3.Scale.LinearScale): void {
            let selection = this.dotPlot.selectAll(AreaRangeChart.Dot.selector).data(data);
            selection
                .enter()
                .append('circle')
                .classed(AreaRangeChart.Dot.class, true);
            selection   
                .attr("cx", function(point: AreaRangeChartDatapoint) {
                    return xScale(point.x) + xScale.rangeBand()/2;
                })
                .attr("cy", function(point: AreaRangeChartDatapoint) {
                    return yScale(point.y);
                })
                .attr("fill", d => d.color)
                .attr("stroke", "black")
                .attr("stroke-width", this.strokeWidth)
                .attr("r", this.radius);

            this.renderTooltip(selection);

            selection.exit().remove();
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<AreaRangeChartDatapoint>tooltipEvent.data).tooltipInfo;
            });
        }

        private drawAxis(values: any[], xScale: D3.Scale.OrdinalScale, translateY: number) {
            let xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickValues(values);

            this.axis.attr("class", "x axis")
                .attr('transform', SVGUtil.translate(0, translateY));
            this.axis.call(xAxis);
        }*/
    }
}
