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
    import ArcDescriptor = D3.Layout.ArcDescriptor;
    import SelectionManager = utility.SelectionManager;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import ValueFormatter = powerbi.visuals.valueFormatter;

    const AsterPlotVisualClassName: string = 'asterPlot';
    const AsterPlotLegendObjectName: string = 'legend';
    const AsterDefaultOuterLineThickness: number = 1;
    const AsterDefaultLabelFill: Fill = { solid: { color: '#333' } };
    const AsterDefaultLegendFontSize: number = 8;
    const AsterDefaultLegendTitle: string = "";

    export interface AsterData {
        dataPoints: AsterDataPoint[];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        legendObjectProps: DataViewObject;
        labelSettings: VisualDataLabelsSettings;
    }

    export interface AsterDataPoint {
        color: string;
        sliceHeight: number;
        sliceWidth: number;
        categoryLabel: string;
        selector: SelectionId;
        tooltipInfo: TooltipDataItem[];
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
                    displayName: 'Center Label',
                    properties: {
                        fill: {
                            displayName: 'Fill',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                labels: {
                    displayName: 'Detail Labels',
                    properties: {
                        show: {
                            type: { bool: true }
                        },
                        color: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        },
                        labelDisplayUnits: {
                            displayName: 'Display Units',
                            type: { formatting: { labelDisplayUnits: true } },
                        },
                        labelPrecision: {
                            displayName: 'Decimal Places',
                            placeHolderText: 'Auto',
                            type: { numeric: true },
                        },
                        fontSize: {
                            displayName: 'Text Size',
                            type: { formatting: { fontSize: true } },
                        },
                    },
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
            },
        };

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'formatString' },
            },
            label: {
                fill: <DataViewObjectPropertyIdentifier>{ objectName: 'label', propertyName: 'fill' },
            },
            labels: {
                show: <DataViewObjectPropertyIdentifier>{ objectName: 'labels', propertyName: 'show' },
                color: <DataViewObjectPropertyIdentifier>{ objectName: 'labels', propertyName: 'color' },
                labelDisplayUnits: <DataViewObjectPropertyIdentifier>{ objectName: 'labels', propertyName: 'labelDisplayUnits' },
                labelPrecision: <DataViewObjectPropertyIdentifier>{ objectName: 'labels', propertyName: 'labelPrecision' },
                fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'labels', propertyName: 'fontSize' },
            },
            outerLine: {
                show: <DataViewObjectPropertyIdentifier>{ objectName: 'outerLine', propertyName: 'show' },
                thickness: <DataViewObjectPropertyIdentifier>{ objectName: 'outerLine', propertyName: 'thickness' },
            }
        };

        private static AsterSlice: ClassAndSelector = createClassAndSelector('asterSlice');
        private static OuterLine: ClassAndSelector = createClassAndSelector('outerLine');
        private static labelGraphicsContextClass: ClassAndSelector = createClassAndSelector('labels');
        private static linesGraphicsContextClass: ClassAndSelector = createClassAndSelector('lines');
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

        private svg: D3.Selection;
        private mainGroupElement: D3.Selection;
        private centerText: D3.Selection;
        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;
        private dataView: DataView;
        private hostService: IVisualHostServices;
        private legend: ILegend;
        private data: AsterData;
        private currentViewport: IViewport;

        private getDefaultAsterData(): AsterData {
            return <AsterData>{
                dataPoints: [],
                legendData: <LegendData>{
                    dataPoints: [],
                    title: null,
                    fontSize: AsterDefaultLegendFontSize,
                    labelColor: LegendData.DefaultLegendLabelFillColor
                },
                legendObjectProps: {},
                valueFormatter: null,
                labelSettings: dataLabelUtils.getDefaultDonutLabelSettings(),
            };
        }

        public converter(dataView: DataView, colors: IDataColorPalette): AsterData {
            let asterDataResult: AsterData = this.getDefaultAsterData();
            if (!this.dataViewContainsCategory(dataView) || dataView.categorical.categories.length !== 1)
                return asterDataResult;

            let catDv: DataViewCategorical = dataView.categorical;
            let cat = catDv.categories[0];
            let catValues = cat.values;
            let values = catDv.values;

            let labelSettings = asterDataResult.labelSettings = this.getLabelSettings(dataView, asterDataResult.labelSettings);
            asterDataResult.legendObjectProps = this.getLegendSettings(dataView);
            asterDataResult.legendData.title = cat.source ? cat.source.displayName : AsterDefaultLegendTitle;
            if (!catValues || catValues.length < 1 || !values || values.length < 1)
                return asterDataResult;

            let formatStringProp = AsterPlot.Properties.general.formatString;
            let maxValue: number = Math.max(d3.min(values[0].values));
            let minValue: number = Math.min(0, d3.min(values[0].values));

            let labelFormatter: IValueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(cat.source, AsterPlot.Properties.general.formatString),
                precision: labelSettings.precision,
                value: (labelSettings.displayUnits === 0) && (maxValue != null) ? maxValue : labelSettings.displayUnits,
            });
            let categorySourceFormatString = valueFormatter.getFormatString(cat.source, formatStringProp);

            for (let i = 0, length = Math.min(colors.getAllColors().length, catValues.length); i < length; i++) {
                let formattedCategoryValue = valueFormatter.format(catValues[i], categorySourceFormatString);
                let currentValue = values[0].values[i];

                let tooltipInfo: TooltipDataItem[] = TooltipBuilder.createTooltipInfo(
                    formatStringProp,
                    catDv,
                    formattedCategoryValue,
                    currentValue,
                    null,
                    null,
                    0);

                if (values.length > 1) {
                    let toolTip = TooltipBuilder.createTooltipInfo(
                        formatStringProp,
                        catDv,
                        formattedCategoryValue,
                        values[1].values[i],
                        null,
                        null,
                        1)[1];
                    if (toolTip) {
                        tooltipInfo.push(toolTip);
                    }
                    currentValue += values[1].values[i];
                }

                asterDataResult.dataPoints.push({
                    sliceHeight: values[0].values[i] - minValue,
                    sliceWidth: Math.max(0, values.length > 1 ? values[1].values[i] : 1),
                    categoryLabel: catValues[i],
                    color: colors.getColorByIndex(i).value,
                    selector: SelectionId.createWithId(cat.identity[i]),
                    tooltipInfo: tooltipInfo,
                    labelFontSize: labelSettings.fontSize,
                    value: labelFormatter.format(currentValue),
                });
            }

            asterDataResult.legendData = this.getLegendData(dataView, asterDataResult.dataPoints);
            return asterDataResult;
        }

        private getLegendData(dataView: DataView, asterDataPoints: AsterDataPoint[]): LegendData {
            let legendData: LegendData = {
                fontSize: AsterDefaultLegendFontSize,
                dataPoints: []
            };

            if (!this.dataViewContainsCategory(dataView))
                return legendData;

            let categoryDV: DataViewCategoryColumn = dataView.categorical.categories[0];
            legendData.title = categoryDV.source ? categoryDV.source.displayName : "";

            for (let i = 0; i < asterDataPoints.length; i++) {
                let dataPoint = asterDataPoints[i];
                legendData.dataPoints.push({
                    label: dataPoint.categoryLabel,
                    color: dataPoint.color,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: dataPoint.selector
                });
            }

            return legendData;
        }

        private dataViewContainsCategory(dataView: DataView) {
            return dataView &&
                dataView.categorical &&
                dataView.categorical.categories &&
                dataView.categorical.categories[0];
        }

        private getLabelSettings(dataView: DataView, labelSettings: VisualDataLabelsSettings): VisualDataLabelsSettings {
            let objects: DataViewObjects = null;

            if (!dataView.metadata || !dataView.metadata.objects)
                return labelSettings;

            objects = dataView.metadata.objects;
            let asterPlotLabelsProperties = AsterPlot.Properties;

            labelSettings.show = DataViewObjects.getValue(objects, asterPlotLabelsProperties.labels.show, labelSettings.show);
            labelSettings.precision = DataViewObjects.getValue(objects, asterPlotLabelsProperties.labels.labelPrecision, labelSettings.precision);
            labelSettings.fontSize = DataViewObjects.getValue(objects, asterPlotLabelsProperties.labels.fontSize, labelSettings.fontSize);
            labelSettings.displayUnits = DataViewObjects.getValue(objects, asterPlotLabelsProperties.labels.labelDisplayUnits, labelSettings.displayUnits);
            let colorHelper: ColorHelper = new ColorHelper(this.colors, asterPlotLabelsProperties.labels.color, labelSettings.labelColor);
            labelSettings.labelColor = colorHelper.getColorForMeasure(objects, "");

            return labelSettings;
        }

        private getLegendSettings(dataView: DataView): DataViewObject {
            let objects: DataViewObjects = null;

            if (!dataView.metadata || !dataView.metadata.objects)
                return {};

            objects = dataView.metadata.objects;
            return <DataViewObject>objects[AsterPlotLegendObjectName];
        }

        public init(options: VisualInitOptions): void {
            this.hostService = options.host;
            this.selectionManager = new SelectionManager({ hostServices: options.host });
            let element: JQuery = options.element;
            let svg: D3.Selection = this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(AsterPlotVisualClassName, true)
                .style('position', 'absolute');

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
            let convertedData: AsterData = this.data = this.converter(dataView, this.colors);

            if (!convertedData || !convertedData.dataPoints) {
                this.clearData();
                return;
            }
            this.renderLegend(convertedData);
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

            mainGroup.attr('transform', SVGUtil.translate((width + 20) / 2, (height + 20) / 2));

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
            let arcDescriptorDataPoints: ArcDescriptor[] = pie(dataPoints);

            let selection = mainGroup.selectAll(AsterPlot.AsterSlice.selector)
                .data(arcDescriptorDataPoints, (d, idx) => dataPoints[idx] ? dataPoints[idx].selector.getKey() : idx);

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

            if (convertedData.labelSettings.show) {
                let labelArc = d3.svg.arc()
                    .innerRadius(d => radius * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore + innerRadius)
                    .outerRadius(d => radius * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore + innerRadius);

                let outlineArc = d3.svg.arc()
                    .innerRadius(d => (radius - innerRadius) * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore + innerRadius)
                    .outerRadius(d => (radius - innerRadius) * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore + innerRadius);

                let layout = this.getLabelLayout(convertedData.labelSettings, labelArc, this.currentViewport);
                this.drawLabels(arcDescriptorDataPoints, this.mainGroupElement, layout, this.currentViewport, outlineArc, labelArc);
            }
            else
                dataLabelUtils.cleanDataLabels(this.mainGroupElement, true);

            this.drawCenterText(innerRadius);
            this.drawOuterLine(innerRadius, radius, arcDescriptorDataPoints);

            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => tooltipEvent.data.data.tooltipInfo);
        }

        private getLabelLayout(labelSettings: VisualDataLabelsSettings, arc: D3.Svg.Arc, viewport: IViewport): ILabelLayout {

            let midAngle = function (d: ArcDescriptor) { return d.startAngle + (d.endAngle - d.startAngle) / 2; };
            let textProperties: TextProperties = {
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: jsCommon.PixelConverter.fromPoint(labelSettings.fontSize),
                text: '',
            };

            return {
                labelText: (d: ArcDescriptor) => {
                    textProperties.text = d.data.value;
                    let pos = arc.centroid(d);
                    let spaceAvaliableForLabels = viewport.width / 2 - Math.abs(pos[0]);
                    return TextMeasurementService.getTailoredTextOrDefault(textProperties, spaceAvaliableForLabels);
                },
                labelLayout: {
                    x: (d: ArcDescriptor) => {
                        let pos = arc.centroid(d);
                        return pos[0];
                    },
                    y: (d: ArcDescriptor) => {
                        let pos = arc.centroid(d);
                        return pos[1];
                    },
                },
                filter: (d: ArcDescriptor) => (d != null || _.isEmpty(d.data.value)),
                style: {
                    'fill': labelSettings.labelColor,
                    'font-size': textProperties.fontSize,
                    'text-anchor': (d: ArcDescriptor) => midAngle(d) < Math.PI ? 'start' : 'end',
                },
            };
        }

        private drawLabels(data: ArcDescriptor[],
            context: D3.Selection,
            layout: ILabelLayout,
            viewport: IViewport,
            outlineArc: D3.Svg.Arc,
            labelArc: D3.Svg.Arc): void {
            
            // Hide and reposition labels that overlap
            let dataLabelManager = new DataLabelManager();
            let filteredData = dataLabelManager.hideCollidedLabels(viewport, data, layout, true /* addTransform */);

            if (filteredData.length === 0) {
                dataLabelUtils.cleanDataLabels(context, true);
                return;
            }
            
            // Draw labels
            if (context.select(AsterPlot.labelGraphicsContextClass.selector).empty())
                context.append('g').classed(AsterPlot.labelGraphicsContextClass.class, true);

            let labels = context
                .select(AsterPlot.labelGraphicsContextClass.selector)
                .selectAll('.data-labels').data(filteredData, (d: ArcDescriptor) => d.data.selector.getKey());

            labels.enter().append('text').classed('data-labels', true);

            if (!labels)
                return;

            labels
                .attr({ x: (d: LabelEnabledDataPoint) => d.labelX, y: (d: LabelEnabledDataPoint) => d.labelY, dy: '.35em' })
                .text((d: LabelEnabledDataPoint) => d.labeltext)
                .style(layout.style);

            labels
                .exit()
                .remove();
                
            // Draw lines
            if (context.select(AsterPlot.linesGraphicsContextClass.selector).empty())
                context.append('g').classed(AsterPlot.linesGraphicsContextClass.class, true);

            let lines = context.select(AsterPlot.linesGraphicsContextClass.selector).selectAll('polyline')
                .data(filteredData, (d: ArcDescriptor) => d.data.selector.getKey());

            let labelLinePadding = 4;
            let chartLinePadding = 1.02;

            let midAngle = function (d: ArcDescriptor) { return d.startAngle + (d.endAngle - d.startAngle) / 2; };

            lines.enter()
                .append('polyline')
                .classed('line-label', true);

            lines
                .attr('points', function (d: ArcDescriptor) {
                    let textPoint = labelArc.centroid(d);
                    textPoint[0] += (midAngle(d) < Math.PI ? -1 : 1 * labelLinePadding);
                    let chartPoint = outlineArc.centroid(d);
                    chartPoint[0] *= chartLinePadding;
                    chartPoint[1] *= chartLinePadding;
                    return [chartPoint, textPoint];
                }).
                style({
                    'opacity': 0.5,
                    'fill-opacity': 0,
                    'stroke': (d: ArcDescriptor) => this.data.labelSettings.labelColor,
                });

            lines
                .exit()
                .remove();

        }

        private renderLegend(asterPlotData: AsterData): void {
            if (!asterPlotData || !asterPlotData.legendData)
                return;

            let legendData: LegendData = asterPlotData.legendData;
            if (asterPlotData.legendObjectProps) {
                LegendData.update(legendData, asterPlotData.legendObjectProps);

                let position: string = <string>asterPlotData.legendObjectProps[legendProps.position];

                if (position)
                    this.legend.changeOrientation(LegendPosition[position]);
            }

            this.legend.drawLegend(legendData, _.clone(this.currentViewport));
            Legend.positionChartArea(this.svg, this.legend);
        }

        private updateViewPortAccordingToLegend(): void {
            let legendMargins: IViewport = this.legend.getMargins(),
                legendPosition: LegendPosition;

            if (!this.data.legendObjectProps) return;

            legendPosition = LegendPosition[<string>this.data.legendObjectProps[legendProps.position]];

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

            if (this.dataViewContainsCategory(dataView) &&
                dataView.categorical.categories[0].values.length > maxCategories) {
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
            if (dataView && dataView.metadata && dataView.metadata.columns && dataView.categorical && dataView.categorical.values)
                for (let column of dataView.metadata.columns)
                    if (!column.isMeasure)
                        return column.displayName;
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
            return dataView && dataView.metadata && DataViewObjects.getValue(dataView.metadata.objects, AsterPlot.Properties.outerLine.show, false);
        }

        private getOuterThickness(dataView: DataView): number {
            if (this.dataViewContainsObjects(dataView))
                return DataViewObjects.getValue(dataView.metadata.objects, AsterPlot.Properties.outerLine.thickness, AsterDefaultOuterLineThickness);

            return AsterDefaultOuterLineThickness;
        }

        // This extracts fill color of the label from the DataView
        private getLabelFill(dataView: DataView): Fill {
            if (this.dataViewContainsObjects(dataView))
                return DataViewObjects.getValue(dataView.metadata.objects, AsterPlot.Properties.label.fill, AsterDefaultLabelFill);

            return AsterDefaultLabelFill;
        }

        private dataViewContainsObjects(dataView: DataView) {
            return dataView && dataView.metadata && dataView.metadata.objects;
        }

        private getLegendInstance(): VisualObjectInstance {
            let legendObjProps: DataViewObject = this.data.legendObjectProps;
            let instance: VisualObjectInstance = {
                selector: null,
                objectName: AsterPlotLegendObjectName,
                displayName: 'Legend',
                properties: {
                    show: DataViewObject.getValue(legendObjProps, legendProps.show, true),
                    position: DataViewObject.getValue(legendObjProps, legendProps.position, LegendPosition[0]),
                    showTitle: DataViewObject.getValue(legendObjProps, legendProps.showTitle, true),
                    titleText: this.data.legendData.title ?
                        DataViewObject.getValue(legendObjProps, legendProps.titleText, this.data.legendData.title) :
                        AsterDefaultLegendTitle,
                    labelColor: DataViewObject.getValue(legendObjProps, legendProps.labelColor, LegendData.DefaultLegendLabelFillColor),
                    fontSize: DataViewObject.getValue(legendObjProps, legendProps.fontSize, AsterDefaultLegendFontSize)
                }
            };

            return instance;
        }

        private clearData(): void {
            this.mainGroupElement.selectAll("path").remove();
            this.legend.drawLegend({ dataPoints: [] }, this.currentViewport);
        }

        private enumerateLabels(instances: VisualObjectInstance[]): void {
            let labelSettings = this.data.labelSettings;
            let labels: VisualObjectInstance = {
                objectName: 'labels',
                displayName: 'Labels',
                selector: null,
                properties: {
                    show: labelSettings.show,
                    fontSize: labelSettings.fontSize,
                    labelPrecision: labelSettings.precision,
                    labelDisplayUnits: labelSettings.displayUnits,
                    color: labelSettings.labelColor,
                }
            };
            instances.push(labels);
        }
        
        // This function retruns the values to be displayed in the property pane for each object.
        // Usually it is a bind pass of what the property pane gave you, but sometimes you may want to do
        // validation and return other values/defaults
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [];
            if (!this.dataViewContainsCategory(this.dataView))
                return instances;
            switch (options.objectName) {
                case AsterPlotLegendObjectName:
                    if (this.data) {
                        let legend: VisualObjectInstance = this.getLegendInstance();
                        instances.push(legend);
                    }
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
                case 'labels':
                    this.enumerateLabels(instances);
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