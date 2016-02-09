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
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;

    const AsterPlotVisualClassName: string = 'asterPlot';
    const AsterDefaultOuterLineThickness: number = 1;
    const AsterDefaultLabelFill: Fill = { solid: { color: '#333' } };
    const AsterDefaultLegendFontSize: number = 8;
    const AsterDefaultLegendShow: boolean = true;

    const AsterLabelFillProp: DataViewObjectPropertyIdentifier = { objectName: 'label', propertyName: 'fill' };
    const AsterLegendShowProp: DataViewObjectPropertyIdentifier = { objectName: "legend", propertyName: "show" };
    const AsterOuterLineShowProp: DataViewObjectPropertyIdentifier = { objectName: 'outerLine', propertyName: 'show' };
    const AsterOuterLineThicknessProp: DataViewObjectPropertyIdentifier = { objectName: 'outerLine', propertyName: 'thickness' };
    const AsterGeneralFormatStringProp: DataViewObjectPropertyIdentifier = { objectName: 'general', propertyName: 'formatString' };

    export interface AsterData {
        dataPoints: AsterDataPoint[];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        settings: AsterPlotSettings;
    }

    export interface AsterPlotSettings {
        showLegend: boolean;
    }

    export interface AsterDataPoint {
        color: string;
        sliceHeight: number;
        sliceWidth: number;
        label: string;
        selector: SelectionId;
        tooltipInfo: TooltipDataItem[];
    }

    interface LegendDefaultProperties {
        show: boolean;
        position: string;
        showTitle: boolean;
        titleText: string;
        labelColor: DataColorPalette;
        fontSize: number;
    }

    //more than one implementation of interface which contains "IVisual" in its name currently is not supported in devtools
    export class AsterPlotWarning/* implements IVisualWarning*/ {
        private message: string;
        constructor(message: string) {
            this.message = message;
        }

        public get code(): string {
            return "AsterPlotWarning";
        }

        public getMessages(resourceProvider: jsCommon.IStringResourceProvider): IVisualErrorMessage {
            return {
                message: this.message,
                title: resourceProvider.get(""),
                detail: resourceProvider.get("")
            };
        }
    }

    export class AsterPlot implements IVisual {
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
                conditions: [
                    { 'Category': { max: 1 }, 'Y': { max: 2 } }
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
                legend: {
                    displayName: 'Legend',
                    description: 'Display legend options',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        position: {
                            displayName: 'Position',
                            description: 'Select the location for the legend',
                            type: { enumeration: legendPosition.type }
                        },
                        showTitle: {
                            displayName: 'Title',
                            description: 'Display a title for legend symbols',
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: 'Legend Name',
                            description: 'Title text',
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
                },
                label: {
                    displayName: 'Label',
                    properties: {
                        fill: {
                            displayName: 'Fill',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                outerLine: {
                    displayName: 'Outer line',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        thickness: {
                            displayName: 'Thickness',
                            type: { numeric: true }
                        }
                    }
                }
            }
        };

        private static AsterSlice: ClassAndSelector = createClassAndSelector('asterSlice');
        private static OuterLine: ClassAndSelector = createClassAndSelector('outerLine');

        private svg: D3.Selection;
        private mainGroupElement: D3.Selection;
        private centerText: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;
        private dataView: DataView;
        private hostService: IVisualHostServices;
        private legend: ILegend;
        private legendObjectProperties: DataViewObject;
        private data: AsterData;
        private currentViewport: IViewport;

        private static CenterTextFontHeightCoefficient = 0.4;
        private static CenterTextFontWidthCoefficient = 1.9;
        private static GetCenterTextProperties(fontSize: number, text?: string): TextProperties {
            return {
                fontFamily: 'Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif',
                fontWeight: 'bold',
                fontSize: jsCommon.PixelConverter.toString(fontSize),
                text: text
            };
        }

        private static getDefaultAsterData(): AsterData {
            return <AsterData>{
                dataPoints: null,
                legendData: null,
                settings: { showLegend: AsterDefaultLegendShow },
                valueFormatter: null
            };
        }

        public static converter(dataView: DataView, colors: IDataColorPalette): AsterData {
            let asterDataResult: AsterData = this.getDefaultAsterData();
            if (!dataView.categorical
                || !dataView.categorical.categories
                || dataView.categorical.categories.length !== 1)
                return asterDataResult;
            let catDv: DataViewCategorical = dataView.categorical;
            let cat = catDv.categories[0];
            let catValues = cat.values;
            let values = catDv.values;
            asterDataResult.dataPoints = [];

            if (!catValues || catValues.length < 1 || !values || values.length < 1)
                return asterDataResult;

            let categorySourceFormatString = valueFormatter.getFormatString(cat.source, AsterGeneralFormatStringProp);
            let minValue: number = Math.min(0, d3.min(values[0].values));

            for (let i = 0, length = Math.min(colors.getAllColors().length, catValues.length); i < length; i++) {
                let formattedCategoryValue = valueFormatter.format(catValues[i], categorySourceFormatString);

                let tooltipInfo: TooltipDataItem[] = TooltipBuilder.createTooltipInfo(
                    AsterGeneralFormatStringProp,
                    catDv,
                    formattedCategoryValue,
                    values[0].values[i],
                    null,
                    null,
                    0);

                if (values.length > 1) {
                    let toolTip = TooltipBuilder.createTooltipInfo(
                        AsterGeneralFormatStringProp,
                        catDv,
                        formattedCategoryValue,
                        values[1].values[i],
                        null,
                        null,
                        1)[1];
                    if (toolTip) {
                        tooltipInfo.push(toolTip);
                    }
                }

                asterDataResult.dataPoints.push({
                    sliceHeight: values[0].values[i] - minValue,
                    sliceWidth: Math.max(0, values.length > 1 ? values[1].values[i] : 1),
                    label: catValues[i],
                    color: colors.getColorByIndex(i).value,
                    selector: SelectionId.createWithId(cat.identity[i]),
                    tooltipInfo: tooltipInfo
                });
            }

            asterDataResult.legendData = AsterPlot.getLegendData(dataView, asterDataResult.dataPoints);
            asterDataResult.settings = AsterPlot.parseLegendSettings(dataView);

            return asterDataResult;
        }

        private static getLegendData(dataView: DataView, asterDataPoints: AsterDataPoint[]): LegendData {
            let legendData: LegendData = {
                fontSize: AsterDefaultLegendFontSize,
                dataPoints: [],
                title: dataView.categorical.categories[0].source.displayName
            };

            for (let i = 0; i < asterDataPoints.length; ++i) {
                legendData.dataPoints.push({
                    label: asterDataPoints[i].label,
                    color: asterDataPoints[i].color,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: SelectionId.createWithId(dataView.categorical.categories[0].identity[i], false)
                });
            }

            return legendData;
        }

        private static parseLegendSettings(dataView: DataView): AsterPlotSettings {
            let objects: DataViewObjects;

            if (!dataView)
                objects = null;
            else
                objects = dataView.metadata.objects;

            return { showLegend: DataViewObjects.getValue(objects, AsterLegendShowProp, AsterDefaultLegendShow) };
        }

        public init(options: VisualInitOptions): void {
            let element = options.element;
            this.selectionManager = new SelectionManager({ hostServices: options.host });
            let svg = this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(AsterPlotVisualClassName, true)
                .style('position', 'absolute');

            this.hostService = options.host;
            this.colors = options.style.colorPalette.dataColors;
            this.mainGroupElement = svg.append('g');
            this.centerText = this.mainGroupElement.append('text');

            this.legend = createLegend(element, false, null, true);
        }

        public update(options: VisualUpdateOptions) {
            if (!options.dataViews || !options.dataViews[0]) return; // or clear the view, display an error, etc.

            let duration = options.suppressAnimations ? 0 : AnimatorCommon.MinervaAnimationDuration;

            this.currentViewport = {
                height: Math.max(0, options.viewport.height),
                width: Math.max(0, options.viewport.width)
            };

            let dataView: DataView = this.dataView = options.dataViews[0];
            let convertedData: AsterData = this.data = AsterPlot.converter(dataView, this.colors);

            if (!convertedData || !convertedData.dataPoints) {
                this.clearData();
                return;
            }
            this.renderLegend(this.data);
            this.updateViewPortAccordingToLegend();

            this.svg
                .attr({
                    height: Math.max(0, this.currentViewport.height),
                    width: Math.max(0, this.currentViewport.width)
                })
                .on('click', () => this.selectionManager.clear().then(() => selection.style('opacity', 1)));

            let width = this.currentViewport.width - 20;
            let height = this.currentViewport.height - 20;
            let radius = Math.min(width, height) / 2;
            let innerRadius = 0.3 * radius;
            let mainGroup = this.mainGroupElement;

            mainGroup.attr('transform', SVGUtil.translate((width + 10) / 2, (height + 10) / 2));

            let dataPoints = this.validateData(dataView, convertedData.dataPoints);
            if (!dataPoints)
                return;

            let maxScore = d3.max(dataPoints, d => d.sliceHeight);
            let totalWeight = d3.sum(dataPoints, d => d.sliceWidth);

            let pie = d3.layout.pie()
                .sort(null)
                .value(d => (d && !isNaN(d.sliceWidth) ? d.sliceWidth : 0) / totalWeight);

            let arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(d => (radius - innerRadius) * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore + innerRadius + 1);

            let selectionManager = this.selectionManager;

            var selection = mainGroup.selectAll(AsterPlot.AsterSlice.selector)
                .data(pie(dataPoints), (d, idx) => dataPoints[idx] ? dataPoints[idx].selector.getKey() : idx);

            selection.enter()
                .append('path')
                .attr('stroke', '#333')
                .classed(AsterPlot.AsterSlice.class, true);

            selection
                .on('click', function (d) {
                    selectionManager.select(d.data.selector).then((ids) => {
                        if (ids.length > 0) {
                            selection.style('opacity', 0.5);
                            d3.select(this).style('opacity', 1);
                        } else {
                            selection.style('opacity', 1);
                        }
                    });
                    d3.event.stopPropagation();
                })
                .attr('fill', d => d.data.color)
                .transition().duration(duration)
                .attrTween('d', function (data) {
                    if (!this.oldData) {
                        this.oldData = data;
                        return () => arc(data);
                    }

                    let interpolation = d3.interpolate(this.oldData, data);
                    this.oldData = interpolation(0);
                    return (x) => arc(interpolation(x));
                });

            selection.exit().remove();

            this.drawCenterText(innerRadius);
            this.drawOuterLine(innerRadius, radius, pie(dataPoints));
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => tooltipEvent.data.data.tooltipInfo);
        }

        private renderLegend(asterPlotData: AsterData): void {
            if (!asterPlotData || !asterPlotData.legendData)
                return;

            this.legendObjectProperties = DataViewObjects.getObject(this.dataView.metadata.objects, "legend", {});

            let legendData: LegendData = asterPlotData.legendData;

            if (this.legendObjectProperties) {
                LegendData.update(legendData, this.legendObjectProperties);

                let position: string = <string>this.legendObjectProperties[legendProps.position];

                if (position)
                    this.legend.changeOrientation(LegendPosition[position]);
            }

            this.legend.drawLegend(legendData, _.clone(this.currentViewport));
            Legend.positionChartArea(this.svg, this.legend);
        }

        private updateViewPortAccordingToLegend(): void {
            let legendMargins: IViewport = this.legend.getMargins(),
                legendPosition: LegendPosition;

            if (!this.legendObjectProperties) return;

            legendPosition = LegendPosition[<string>this.legendObjectProperties[legendProps.position]];

            switch (legendPosition) {
                case LegendPosition.Top:
                case LegendPosition.TopCenter:
                case LegendPosition.Bottom:
                case LegendPosition.BottomCenter: {
                    this.currentViewport.height -= legendMargins.height;
                    break;
                }
                case LegendPosition.Left:
                case LegendPosition.LeftCenter:
                case LegendPosition.Right:
                case LegendPosition.RightCenter: {
                    this.currentViewport.width -= legendMargins.width;
                    break;
                }
                default:
                    break;
            }
        }

        public validateData(dataView: DataView, dataPoints: AsterDataPoint[]): AsterDataPoint[] {
            let maxCategories = this.colors.getAllColors().length;

            if (dataPoints && dataView.categorical.categories[0].values.length > maxCategories) {
                this.hostService.setWarnings(
                    [new AsterPlotWarning((<any>powerbi).localization.defaultLocalizedStrings.DsrLimitWarning_TooMuchDataMessage)]);
                let minSliceWidth: number = dataPoints.sort((a, b) => b.sliceWidth - a.sliceWidth)[maxCategories - 1].sliceWidth;
                return dataPoints.filter(x => x.sliceWidth >= minSliceWidth).slice(0, maxCategories);
            }

            return dataPoints;
        }

        private drawOuterLine(innerRadius: number, radius: number, data): void {
            let mainGroup = this.mainGroupElement;
            let outlineArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(radius);
            if (this.getShowOuterline(this.dataView)) {
                let outerLine = mainGroup.selectAll(AsterPlot.OuterLine.selector).data(data);
                outerLine.enter().append('path');
                outerLine.attr("fill", "none")
                    .attr({
                        'stroke': '#333',
                        'stroke-width': this.getOuterThickness(this.dataView) + 'px',
                        'd': outlineArc
                    })
                    .style('opacity', 1)
                    .classed(AsterPlot.OuterLine.class, true);
            } else {
                mainGroup.selectAll(AsterPlot.OuterLine.selector).style('opacity', 0);
            }
        }

        private getCenterText(dataView: DataView): string {
            let columns = dataView.metadata.columns;
            for (let column of columns) {
                if (!column.isMeasure) {
                    return column.displayName;
                }
            }

            return '';
        }
        private drawCenterText(innerRadius: number): void {
            let centerTextProperties: TextProperties
                = AsterPlot.GetCenterTextProperties(innerRadius * AsterPlot.CenterTextFontHeightCoefficient, this.getCenterText(this.dataView));
            this.centerText
                .style({
                    'line-height': 1,
                    'font-weight': centerTextProperties.fontWeight,
                    'font-size': centerTextProperties.fontSize,
                    'fill': this.getLabelFill(this.dataView).solid.color
                })
                .attr({
                    'dy': '0.35em',
                    'text-anchor': 'middle'
                })
                .text(TextMeasurementService.getTailoredTextOrDefault(
                    centerTextProperties,
                    innerRadius * AsterPlot.CenterTextFontWidthCoefficient));
        }

        private getShowOuterline(dataView: DataView): boolean {
            return dataView.metadata && DataViewObjects.getValue(dataView.metadata.objects, AsterOuterLineShowProp, false);
        }

        private getOuterThickness(dataView: DataView): number {
            if (dataView && dataView.metadata && dataView.metadata.objects)
                return DataViewObjects.getValue(dataView.metadata.objects, AsterOuterLineThicknessProp, AsterDefaultOuterLineThickness);

            return AsterDefaultOuterLineThickness;
        }

        // This extracts fill color of the label from the DataView
        private getLabelFill(dataView: DataView): Fill {
            if (dataView && dataView.metadata && dataView.metadata.objects)
                return DataViewObjects.getValue(dataView.metadata.objects, AsterLabelFillProp, AsterDefaultLabelFill);

            return AsterDefaultLabelFill;
        }

        private getLegendInstance(): VisualObjectInstance {

            return <VisualObjectInstance>{
                selector: null,
                objectName: 'legend',
                displayName: 'Legend',
                properties: {
                    show: this.data.settings.showLegend,
                    position: LegendPosition[this.legend.getOrientation()],
                    showTitle: DataViewObject.getValue(this.legendObjectProperties, legendProps.showTitle, true),
                    titleText: this.data.legendData ? this.data.legendData.title : '',
                    labelColor: DataViewObject.getValue(this.legendObjectProperties, legendProps.labelColor, null),
                    fontSize: DataViewObject.getValue(this.legendObjectProperties, legendProps.fontSize, AsterDefaultLegendFontSize)
                }
            };
        }

        private clearData(): void {
            this.mainGroupElement.selectAll("path").remove();
            this.legend.drawLegend({ dataPoints: [] }, this.currentViewport);
        }
        
        // This function retruns the values to be displayed in the property pane for each object.
        // Usually it is a bind pass of what the property pane gave you, but sometimes you may want to do
        // validation and return other values/defaults
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [];
            switch (options.objectName) {
                case 'legend':
                    let legend: VisualObjectInstance = this.getLegendInstance();
                    instances.push(legend);
                    break;
                case 'label':
                    let label: VisualObjectInstance = {
                        objectName: 'label',
                        displayName: 'Label',
                        selector: null,
                        properties: {
                            fill: this.getLabelFill(this.dataView)
                        }
                    };
                    instances.push(label);
                    break;
                case 'outerLine':
                    let outerLine: VisualObjectInstance = {
                        objectName: 'outerLine',
                        displayName: 'Outer Line',
                        selector: null,
                        properties: {
                            show: this.getShowOuterline(this.dataView),
                            thickness: this.getOuterThickness(this.dataView)
                        }
                    };
                    instances.push(outerLine);
                    break;
            }

            return instances;
        }
    }
}