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

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import CreateClassAndSelector = jsCommon.CssConstants.createClassAndSelector;

    export interface RadarChartConstructorOptions {
        animator?: IGenericAnimator;
        svg?: D3.Selection;
        margin?: IMargin;
    }

    export interface RadarChartDatapoint extends SelectableDataPoint {
        x: number;
        y: number;
        y0?: number;
        color?: string;
        value?: number;
        label?: string;
        identity: SelectionId;
        tooltipInfo?: TooltipDataItem[];
    }

    export interface RadarChartData {
        legendData: LegendData;
        series: RadarChartSeries[];
        settings: RadarChartSettings;
    }

    export interface RadarChartSeries {
        fill: string;
        name: string;
        data: RadarChartDatapoint[];
        identity: SelectionId;
    }

    export interface RadarChartSettings {
        showLegend?: boolean;
    }

    export interface RadarChartBehaviorOptions {
        selection: D3.Selection;
        clearCatcher: D3.Selection;
    }
    
    /**
     * RadarChartBehavior
     */
    export class RadarChartWebBehavior implements IInteractiveBehavior {        
        private selection: D3.Selection;

        public bindEvents(options: RadarChartBehaviorOptions, selectionHandler: ISelectionHandler): void {
            let selection = this.selection = options.selection;
            let clearCatcher = options.clearCatcher;

            selection.on('click', function (d: SelectableDataPoint) {
                selectionHandler.handleSelection(d, d3.event.ctrlKey);
                d3.event.stopPropagation();
            });

            clearCatcher.on('click', function () {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean): void {           
            this.selection.style("opacity", (d: SelectableDataPoint) => (hasSelection && !d.selected) ? RadarChart.DimmedAreaFillOpacity : RadarChart.AreaFillOpacity);
        }
    }

    export class RadarChart implements IVisual {
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
                conditions: [{ 'Category': { min: 1, max: 1 } }],
                categorical: {
                    categories: {
                        for: { in: 'Category' },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: {
                        select: [{ bind: { to: 'Y' } }]
                    }
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
                legend: {
                    displayName: data.createDisplayNameGetter('Visual_Legend'),
                    description: data.createDisplayNameGetter('Visual_LegendDescription'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter('Visual_Show'),
                            type: { bool: true }
                        },
                        position: {
                            displayName: data.createDisplayNameGetter('Visual_LegendPosition'),
                            description: data.createDisplayNameGetter('Visual_LegendPositionDescription'),
                            type: { enumeration: legendPosition.type }
                        },
                        showTitle: {
                            displayName: data.createDisplayNameGetter('Visual_LegendShowTitle'),
                            description: data.createDisplayNameGetter('Visual_LegendShowTitleDescription'),
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: data.createDisplayNameGetter('Visual_LegendName'),
                            description: data.createDisplayNameGetter('Visual_LegendNameDescription'),
                            type: { text: true },
                            suppressFormatPainterCopy: true
                        },
                        labelColor: {
                            displayName: data.createDisplayNameGetter('Visual_LegendTitleColor'),
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: data.createDisplayNameGetter('Visual_TextSize'),
                            type: { formatting: { fontSize: true } }
                        }
                    }
                },
                dataPoint: {
                    displayName: data.createDisplayNameGetter('Visual_DataPoint'),
                    description: data.createDisplayNameGetter('Visual_DataPointDescription'),
                    properties: {
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
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

        /** Note: Public for testability */
        public static formatStringProp: DataViewObjectPropertyIdentifier = {
            objectName: 'general',
            propertyName: 'formatString',
        };

        private static Properties: any = {
            legend: {
                show: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'show' }
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'fill' }
            }
        };

        private static VisualClassName = 'radarChart';
        private static Segments: ClassAndSelector = CreateClassAndSelector('segments');
        private static SegmentNode: ClassAndSelector = CreateClassAndSelector('segmentNode');
        private static Axis: ClassAndSelector = CreateClassAndSelector('axis');
        private static AxisNode: ClassAndSelector = CreateClassAndSelector('axisNode');
        private static AxisLabel: ClassAndSelector = CreateClassAndSelector('axisLabel');
        private static Chart: ClassAndSelector = CreateClassAndSelector('chart');
        private static ChartNode: ClassAndSelector = CreateClassAndSelector('chartNode');
        private static ChartPolygon: ClassAndSelector = CreateClassAndSelector('chartPolygon');
        private static ChartDot: ClassAndSelector = CreateClassAndSelector('chartDot');

        private svg: D3.Selection;
        private segments: D3.Selection;
        private axis: D3.Selection;
        private chart: D3.Selection;

        private mainGroupElement: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;
        private viewport: IViewport;
        private interactivityService: IInteractivityService;

        private animator: IGenericAnimator;
        private margin: IMargin;
        private legend: ILegend;
        private legendObjectProperties: DataViewObject;
        private radarChartData: RadarChartData;
        private isInteractiveChart: boolean;

        private static DefaultMargin: IMargin = {
            top: 50,
            bottom: 50,
            right: 100,
            left: 100
        };

        private static SegmentLevels: number = 6;
        private static SegmentFactor: number = 1;
        private static Radians: number = 2 * Math.PI;
        private static Scale: number = 1;
        public static AreaFillOpacity = 1;
        public static DimmedAreaFillOpacity = 0.4;
        private angle: number;
        private radius: number;

        public static converter(dataView: DataView, colors: IDataColorPalette): RadarChartData {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !(dataView.categorical.categories.length > 0) ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.values ||
                !(dataView.categorical.values.length > 0)) {
                return {
                    legendData: {
                        dataPoints: []
                    },
                    settings: {
                        showLegend: true
                    },
                    series: []
                };
            }

            let catDv: DataViewCategorical = dataView.categorical;
            let values = catDv.values;
            let series: RadarChartSeries[] = [];
            let colorHelper = new ColorHelper(colors, RadarChart.Properties.dataPoint.fill);
            let legendData: LegendData = {
                fontSize: 8.25,
                dataPoints: [],
                title: ""
            };

            for (let i = 0, iLen = values.length; i < iLen; i++) {
                let color = colors.getColorByIndex(i).value,
                    serieIdentity: SelectionId,
                    queryName: string,
                    displayName: string,
                    dataPoints: RadarChartDatapoint[] = [];

                if (values[i].source) {
                    if (values[i].source.queryName) {
                        queryName = values[i].source.queryName;
                        serieIdentity = SelectionId.createWithMeasure(queryName);
                    }

                    if (values[i].source.displayName)
                        displayName = values[i].source.displayName;

                    if (values[i].source.objects) {
                        let objects: any = values[i].source.objects;
                        color = colorHelper.getColorForMeasure(objects, queryName);
                    }
                }

                legendData.dataPoints.push({
                    label: values[i].source.displayName,
                    color: color,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: serieIdentity
                });

                for (let k = 0, kLen = values[i].values.length; k < kLen; k++) {

                    // Check if the point has empty data
                    if (values[i].values[k] == null)
                        continue;

                    let dataPointIdentity = SelectionIdBuilder
                        .builder()
                        .withMeasure(queryName)
                        .withCategory(catDv.categories[0], k)
                        .withSeries(dataView.categorical.values, dataView.categorical.values[i])
                        .createSelectionId();

                    let tooltipInfo: TooltipDataItem[] = TooltipBuilder.createTooltipInfo(RadarChart.formatStringProp,
                                                                                          catDv,
                                                                                          catDv.categories[0].values[k],
                                                                                          values[i].values[k],
                                                                                          null,
                                                                                          null,
                                                                                          i);

                    dataPoints.push({
                        x: k,
                        y: values[i].values[k],
                        color: color,
                        identity: dataPointIdentity,
                        selected: false,                        
                        tooltipInfo: tooltipInfo
                    });
                }

                if (dataPoints.length > 0)
                    series.push({
                        fill: color,
                        name: displayName,
                        data: dataPoints,
                        identity: serieIdentity,
                    });
            }            

            //Parse legend settings          
            let legendSettings: RadarChartSettings = RadarChart.parseSettings(dataView);

            return {
                legendData: legendData,
                settings: legendSettings,
                series: series
            };
        }

        public constructor(options?: RadarChartConstructorOptions) {

            if (options) {
                if (options.svg)
                    this.svg = options.svg;

                if (options.animator)
                    this.animator = options.animator;

                if (options.margin)
                    this.margin = options.margin;
            }
        }

        public init(options: VisualInitOptions): void {
            let element = options.element;
            this.selectionManager = new SelectionManager({ hostServices: options.host });

            if (!this.svg) {
                this.svg = d3.select(element.get(0)).append('svg');
                this.svg.style('position', 'absolute');
            }

            if (!this.margin)
                this.margin = RadarChart.DefaultMargin;

            this.svg.classed(RadarChart.VisualClassName, true);
            this.interactivityService = visuals.createInteractivityService(options.host);                     
            this.isInteractiveChart = options.interactivity && options.interactivity.isInteractiveLegend;
            this.legend = createLegend(element,
                                       this.isInteractiveChart,
                                       this.interactivityService,
                                       true,
                                       LegendPosition.Top);
            this.colors = options.style.colorPalette.dataColors;
            this.mainGroupElement = this.svg.append('g');

            this.segments = this.mainGroupElement
                .append('g')
                .classed(RadarChart.Segments.class, true);

            this.axis = this.mainGroupElement
                .append('g')
                .classed(RadarChart.Axis.class, true);

            this.chart = this.mainGroupElement
                .append('g')
                .classed(RadarChart.Chart.class, true);
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0])
                return;

            let dataView = options.dataViews[0];
            this.radarChartData = RadarChart.converter(dataView, this.colors);
            let categories: any[] = [],
                series = this.radarChartData.series,
                dataViewMetadataColumn: DataViewMetadataColumn,
                duration = AnimatorCommon.GetAnimationDuration(this.animator, options.suppressAnimations);

            if (dataView.categorical &&
                dataView.categorical.categories &&
                dataView.categorical.categories[0] &&
                dataView.categorical.categories[0].values)
                categories = dataView.categorical.categories[0].values;

            if (dataView.metadata && dataView.metadata.columns && dataView.metadata.columns.length > 0)
                dataViewMetadataColumn = dataView.metadata.columns[0];

            this.viewport = {
                height: options.viewport.height > 0 ? options.viewport.height : 0,
                width: options.viewport.width > 0 ? options.viewport.width : 0
            };

            this.parseLegendProperties(dataView);
            this.renderLegend(this.radarChartData);
            this.updateViewport();

            this.svg
                .attr({
                    'height': this.viewport.height,
                    'width': this.viewport.width
                });

            let mainGroup = this.mainGroupElement;
            mainGroup.attr('transform', SVGUtil.translate(this.viewport.width / 2, this.viewport.height / 2));

            let width: number = this.viewport.width - this.margin.left - this.margin.right;
            let height: number = this.viewport.height - this.margin.top - this.margin.bottom;

            this.angle = RadarChart.Radians / categories.length;
            this.radius = RadarChart.SegmentFactor * RadarChart.Scale * Math.min(width, height) / 2;

            this.drawCircularSegments(categories);
            this.drawAxes(categories);
            this.drawAxesLabels(categories, dataViewMetadataColumn);
            this.drawChart(series, duration);
        }

        private drawCircularSegments(values: string[]): void {
            let data = [];
            let angle: number = this.angle,
                factor: number = RadarChart.SegmentFactor,
                levels: number = RadarChart.SegmentLevels,
                radius: number = this.radius;

            for (let level = 0; level < levels - 1; level++) {
                let levelFactor: number = radius * ((level + 1) / levels);
                let transform: number = -1 * levelFactor;

                for (let i = 0; i < values.length; i++)
                    data.push({
                        x1: levelFactor * (1 - factor * Math.sin(i * angle)),
                        y1: levelFactor * (1 - factor * Math.cos(i * angle)),
                        x2: levelFactor * (1 - factor * Math.sin((i + 1) * angle)),
                        y2: levelFactor * (1 - factor * Math.cos((i + 1) * angle)),
                        translate: SVGUtil.translate(transform, transform)
                    });
            }

            let selection = this.mainGroupElement
                .select(RadarChart.Segments.selector)
                .selectAll(RadarChart.SegmentNode.selector)
                .data(data);

            selection
                .enter()
                .append('svg:line')
                .classed(RadarChart.SegmentNode.class, true);
            selection
                .attr({'x1': item => item.x1,
                       'y1': item => item.y1,
                       'x2': item => item.x2,
                       'y2': item => item.y2,
                       'transform': item => item.translate});

            selection.exit().remove();
        }

        private drawAxes(values: string[]): void {

            let angle: number = this.angle,
                radius: number = -1 * this.radius;

            let selection: D3.Selection = this.mainGroupElement
                .select(RadarChart.Axis.selector)
                .selectAll(RadarChart.AxisNode.selector);

            let axis = selection.data(values);

            axis
                .enter()
                .append('svg:line');
            axis
                .attr({'x1': 0,
                       'y1': 0,
                       'x2': (name, i) => radius * Math.sin(i * angle),
                       'y2': (name, i) => radius * Math.cos(i * angle)})
                .classed(RadarChart.AxisNode.class, true);

            axis.exit().remove();
        }

        private drawAxesLabels(values: string[], dataViewMetadataColumn?: DataViewMetadataColumn): void {
            let angle: number = this.angle,
                radius: number = -1 * this.radius,
                length: number = values.length;

            let formatter = valueFormatter.create({
                format: valueFormatter.getFormatString(dataViewMetadataColumn, RadarChart.formatStringProp, true),
                value: values[0],
                value2: values[length - 1],
            });

            let selection: D3.Selection = this.mainGroupElement
                .select(RadarChart.Axis.selector)
                .selectAll(RadarChart.AxisLabel.selector);

            let labels = selection.data(values);

            labels
                .enter()
                .append('svg:text');

            labels
                .attr({'text-anchor': 'middle',
                       'dy': '1.5em',
                       'transform': SVGUtil.translate(0, -10),
                       'x': (name, i) => { return (radius - 20) * Math.sin(i * angle); },
                       'y': (name, i) => { return (radius - 10) * Math.cos(i * angle); }})
                .text(item => formatter.format(item))
                .classed(RadarChart.AxisLabel.class, true);

            labels.exit().remove();
        }

        private drawChart(series: RadarChartSeries[], duration: number): void {
            let angle: number = this.angle,
                radius: number = this.radius,
                dotRadius: number = 5,
                dataPoints: RadarChartDatapoint[][] = this.getDataPoints(series);                

            let stack = d3.layout.stack();
            let layers = stack(dataPoints);

            let y = d3.scale.linear()
                .domain([0, d3.max(layers, (layer) => {
                    return d3.max(layer, (d) => {
                        return d.y0 + d.y;
                    });
                })]).range([0, radius]);

            let calculatePoints = (points) => {
                return points.map((value) => {
                    let x1 = -1 * y(value.y) * Math.sin(value.x * angle);
                    let y1 = -1 * y(value.y) * Math.cos(value.x * angle);
                    return `${x1},${y1}`;
                }).join(' ');
            };

            let selection = this.chart.selectAll(RadarChart.ChartNode.selector).data(layers);

            selection
                .enter()
                .append('g')
                .classed(RadarChart.ChartNode.class, true);

            let polygon = selection.selectAll(RadarChart.ChartPolygon.selector).data(d => {
                if (d && d.length > 0) {
                    return [d];
                }

                return [];
            });
            polygon
                .enter()
                .append('polygon')
                .classed(RadarChart.ChartPolygon.class, true);
            polygon
                .style('fill', d => d[0].color)
                .style('opacity', RadarChart.DimmedAreaFillOpacity)
                .on('mouseover', function (d) {
                    d3.select(this).transition()
                        .duration(duration)
                        .style('opacity', RadarChart.AreaFillOpacity);
                })
                .on('mouseout', function (d) {
                    d3.select(this).transition()
                        .duration(duration)
                        .style('opacity', RadarChart.DimmedAreaFillOpacity);
                })
                .attr('points', calculatePoints);
            polygon.exit().remove();

            let dots = selection.selectAll(RadarChart.ChartDot.selector).data(d => d);
            dots.enter()
                .append('svg:circle')
                .classed(RadarChart.ChartDot.class, true);
            dots.attr('r', dotRadius)
                .attr({
                    'cx': (value) => -1 * y(value.y) * Math.sin(value.x * angle),
                    'cy': (value) => -1 * y(value.y) * Math.cos(value.x * angle)
                })
                .style('fill', d => d.color);            

            dots.exit().remove();

            TooltipManager.addTooltip(dots, (tooltipEvent: TooltipEvent) => tooltipEvent.data.tooltipInfo, true);

            selection.exit().remove();

            let behaviorOptions: RadarChartBehaviorOptions = undefined;

            if (this.interactivityService) {
                					                      
                // Register interactivity
                let dataPointsToBind = this.getAllDataPointsList(series);
                                
                behaviorOptions = { selection: dots, clearCatcher: this.svg };
                this.interactivityService.bind(dataPointsToBind, new RadarChartWebBehavior(), behaviorOptions);
            } 
        }

        private renderLegend(radarChartData: RadarChartData): void {
            if (!radarChartData.legendData)
                return;

            let legendData: LegendData = {
                title: radarChartData.legendData.title,
                dataPoints: radarChartData.legendData.dataPoints,
                fontSize: radarChartData.legendData.fontSize
            };

            if (this.legendObjectProperties) {
                LegendData.update(legendData, this.legendObjectProperties);
                let position = <string>this.legendObjectProperties[legendProps.position];

                if (position)
                    this.legend.changeOrientation(LegendPosition[position]);
            }
            else
                this.legend.changeOrientation(LegendPosition.Top);

            let viewport = this.viewport;
            this.legend.drawLegend(legendData, { height: viewport.height, width: viewport.width });
            Legend.positionChartArea(this.svg, this.legend);
        }

        private getDataPoints(series: RadarChartSeries[]): RadarChartDatapoint[][] {
            let dataPoints: RadarChartDatapoint[][] = [];
  
            for (let serie of series) {
                dataPoints.push(serie.data);
            }
            
            return dataPoints;
        }

        private getAllDataPointsList(series: RadarChartSeries[]): RadarChartDatapoint[] {
            let dataPoints: RadarChartDatapoint[] = [];

            for (let serie of series) {
                dataPoints = dataPoints.concat(serie.data);
            }

            return dataPoints;
        }

        private parseLegendProperties(dataView: DataView): void {
            if (!dataView || !dataView.metadata) {
                this.legendObjectProperties = {};
                return;
            }

            this.legendObjectProperties = DataViewObjects.getObject(dataView.metadata.objects, "legend", {});
        }

        private static parseSettings(dataView: DataView): RadarChartSettings {
            let objects: DataViewObjects;

            if (!dataView || !dataView.metadata || !dataView.metadata.columns || !dataView.metadata.objects)
                objects = null;
            else
                objects = dataView.metadata.objects;

            return {
                showLegend: DataViewObjects.getValue(objects, RadarChart.Properties.legend.show, true)
            };
        }

        // This function returns the values to be displayed in the property pane for each object.
        // Usually it is a bind pass of what the property pane gave you, but sometimes you may want to do
        // validation and return other values/defaults
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder();
            let settings: RadarChartSettings;

            if (!this.radarChartData || !this.radarChartData.settings)
                return [];

            settings = this.radarChartData.settings;

            switch (options.objectName) {
                case "legend":
                    enumeration.pushInstance(this.enumerateLegend(settings));
                    break;
                case "dataPoint":
                    this.enumerateDataPoint(enumeration);
                    break;
            }

            return enumeration.complete();
        }

        private enumerateLegend(settings: RadarChartSettings): VisualObjectInstance {
            let showTitle: boolean = true,
                titleText: string = "",
                legend: VisualObjectInstance,
                labelColor: DataColorPalette,
                fontSize: number = 8;

            showTitle = DataViewObject.getValue(this.legendObjectProperties, legendProps.showTitle, showTitle);
            titleText = DataViewObject.getValue(this.legendObjectProperties, legendProps.titleText, titleText);
            labelColor = DataViewObject.getValue(this.legendObjectProperties, legendProps.labelColor, labelColor);
            fontSize = DataViewObject.getValue(this.legendObjectProperties, legendProps.fontSize, fontSize);
            legend = {
                objectName: "legend",
                displayName: "legend",
                selector: null,
                properties: {
                    show: settings.showLegend,
                    position: LegendPosition[this.legend.getOrientation()],
                    showTitle: showTitle,
                    titleText: titleText,
                    labelColor: labelColor,
                    fontSize: fontSize,
                }
            };

            return legend;
        }

        private enumerateDataPoint(enumeration: ObjectEnumerationBuilder): void {
            if (!this.radarChartData || !this.radarChartData.series)
                return;

            let series: RadarChartSeries[] = this.radarChartData.series;

            for (let serie of series) {
                enumeration.pushInstance({
                    objectName: "dataPoint",
                    displayName: serie.name,
                    selector: ColorHelper.normalizeSelector(serie.identity.getSelector(), false),
                    properties: {
                        fill: { solid: { color: serie.fill } }
                    }
                });
            }
        }

        private updateViewport(): void {
            let legendMargins: IViewport = this.legend.getMargins(),
                legendPosition: LegendPosition;

            legendPosition = LegendPosition[<string>this.legendObjectProperties[legendProps.position]];

            switch (legendPosition) {
                case LegendPosition.Top:
                case LegendPosition.TopCenter:
                case LegendPosition.Bottom:
                case LegendPosition.BottomCenter:
                    this.viewport.height -= legendMargins.height;
                    break;
                
                case LegendPosition.Left:
                case LegendPosition.LeftCenter:
                case LegendPosition.Right:
                case LegendPosition.RightCenter: 
                    this.viewport.width -= legendMargins.width;
                    break;                
            }
        }
    }
}