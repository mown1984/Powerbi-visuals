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
    import ArcDescriptor = D3.Layout.ArcDescriptor;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import PixelConverter = jsCommon.PixelConverter;
    import ValueFormatter = powerbi.visuals.valueFormatter;

    const AsterPlotVisualClassName: string = 'asterPlot';
    const AsterPlotLegendObjectName: string = 'legend';
    const AsterDefaultOuterLineThickness: number = 1;
    const AsterDefaultLabelFill: Fill = { solid: { color: '#333' } };
    const AsterDefaultLegendFontSize: number = 8;
    const AsterRadiusRatio: number = 0.9;
    const AsterConflictRatio = 0.9;
    const MaxPrecision: number = 17;

    export interface AsterData {
        dataPoints: AsterDataPoint[];
        highlightedDataPoints?: AsterDataPoint[];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        legendSettings: AsterPlotLegendSettings;
        labelSettings: VisualDataLabelsSettings;
        showOuterLine: boolean;
        outerLineThickness: number;
    }

    export interface AsterPlotLegendSettings {
        show: boolean;
        position: string;
        showTitle: boolean;
        labelColor: string;
        titleText: string;
        fontSize: number;
    }

    export interface AsterArcDescriptor extends ArcDescriptor {
        isLabelHasConflict?: boolean;
    }

    export interface AsterDataPoint extends SelectableDataPoint {
        color: string;
        sliceHeight: number;
        sliceWidth: number;
        label: string;
        highlight?: boolean;
        tooltipInfo: TooltipDataItem[];
        labelFontSize: string;
    }

    export interface AsterPlotBehaviorOptions {
        selection: D3.Selection;
        highlightedSelection: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }

    class AsterPlotWebBehavior implements IInteractiveBehavior {
        private selection: D3.Selection;
        private highlightedSelection: D3.Selection;
        private clearCatcher: D3.Selection;
        private interactivityService: IInteractivityService;

        public bindEvents(options: AsterPlotBehaviorOptions, selectionHandler: ISelectionHandler) {
            this.selection = options.selection;
            this.highlightedSelection = options.highlightedSelection;
            this.clearCatcher = options.clearCatcher;
            this.interactivityService = options.interactivityService;

            this.selection.on('click', (d, i: number) => {
                selectionHandler.handleSelection(d.data, d3.event.ctrlKey);
            });

            if (this.highlightedSelection)
                this.highlightedSelection.on('click', (d, i: number) => {
                    selectionHandler.handleSelection(d.data, d3.event.ctrlKey);
                });

            this.clearCatcher.on('click', () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean) {
            let hasHighlights = this.interactivityService.hasSelection();
            this.selection.style("fill-opacity", (d) => {
                return ColumnUtil.getFillOpacity(d.data.selected, d.data.highlight, !d.data.highlight && hasSelection, !d.data.selected && hasHighlights);
            });
        }
    }

    export class AsterPlotWarning implements IVisualWarning {
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
                    displayName: 'Category',
                    name: 'Category',
                    kind: powerbi.VisualDataRoleKind.Grouping,
                },
                {
                    displayName: 'Y Axis',
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
            supportsHighlight: true,
        };

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{ objectName: 'general', propertyName: 'formatString' },
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'fill' },
            },
            legend: {
                show: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'show' },
                position: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'position' },
                showTitle: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'showTitle' },
                titleText: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'titleText' },
                labelColor: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'labelColor' },
                fontSize: <DataViewObjectPropertyIdentifier>{ objectName: AsterPlotLegendObjectName, propertyName: 'fontSize' },
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
        private static AsterHighlightedSlice: ClassAndSelector = createClassAndSelector('asterHighlightedSlice');
        private static OuterLine: ClassAndSelector = createClassAndSelector('outerLine');
        private static labelGraphicsContextClass: ClassAndSelector = createClassAndSelector('labels');
        private static linesGraphicsContextClass: ClassAndSelector = createClassAndSelector('lines');
        private static CenterLabelClass: ClassAndSelector = createClassAndSelector('centerLabel');
        private static CenterTextFontHeightCoefficient = 0.4;
        private static CenterTextFontWidthCoefficient = 1.9;

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 15,
            left: 10
        };

        private svg: D3.Selection;
        private mainGroupElement: D3.Selection;
        private mainLabelsElement: D3.Selection;
        private centerText: D3.Selection;
        private clearCatcher: D3.Selection;
        private colors: IDataColorPalette;
        private dataView: DataView;
        private hostService: IVisualHostServices;
        private interactivityService: IInteractivityService;
        private legend: ILegend;
        private data: AsterData;
        private currentViewport: IViewport;
        private behavior: IInteractiveBehavior;
        private hasHighlights: boolean;

        private getDefaultAsterData(): AsterData {
            return <AsterData>{
                dataPoints: [],
                highlightedDataPoints: [],
                legendData: <LegendData>{
                    dataPoints: [],
                    title: null,
                    fontSize: AsterDefaultLegendFontSize,
                    labelColor: LegendData.DefaultLegendLabelFillColor
                },
                legendSettings: {
                    show: false,
                    position: 'Top',
                    showTitle: true,
                    labelColor: LegendData.DefaultLegendLabelFillColor,
                    titleText: '',
                    fontSize: AsterDefaultLegendFontSize,
                },
                valueFormatter: null,
                labelSettings: {
                    show: false,
                    displayUnits: 0,
                    precision: dataLabelUtils.defaultLabelPrecision,
                    labelColor: dataLabelUtils.defaultLabelColor,
                    fontSize: dataLabelUtils.DefaultFontSizeInPt,
                },
                showOuterLine: false,
                outerLineThickness: AsterDefaultOuterLineThickness,
            };
        }

        public converter(dataView: DataView, colors: IDataColorPalette): AsterData {
            let asterDataResult: AsterData = this.getDefaultAsterData();
            if (!this.dataViewContainsCategory(dataView) || dataView.categorical.categories.length !== 1)
                return asterDataResult;

            let catDv: DataViewCategorical = dataView.categorical;
            let cat = catDv.categories[0];
            let catSource = cat.source;
            let catValues = cat.values;
            let values = catDv.values;
            let catObjects: DataViewObjects[] = cat.objects;
            let colorHelper: ColorHelper = new ColorHelper(colors, AsterPlot.Properties.dataPoint.fill);

            let hasHighlights: boolean = this.hasHighlights = !!(values && values.length > 0 && values[0].highlights);

            if (dataView.metadata || dataView.metadata.objects) {
                let objects: DataViewObjects = dataView.metadata.objects;
                asterDataResult.labelSettings = this.getLabelSettings(objects, asterDataResult.labelSettings);
                this.updateLegendSettings(objects, catSource, asterDataResult.legendSettings);
                asterDataResult.showOuterLine = DataViewObjects.getValue<boolean>(objects, AsterPlot.Properties.outerLine.show, asterDataResult.showOuterLine);
                asterDataResult.outerLineThickness = DataViewObjects.getValue<number>(objects, AsterPlot.Properties.outerLine.thickness, AsterDefaultOuterLineThickness);
            }

            let labelSettings: VisualDataLabelsSettings = asterDataResult.labelSettings;
            if (!catValues || catValues.length < 1 || !values || values.length < 1)
                return asterDataResult;

            let formatStringProp = AsterPlot.Properties.general.formatString;
            let maxValue: number = Math.max(d3.min(values[0].values));
            let minValue: number = Math.min(0, d3.min(values[0].values));
            let labelFormatter: IValueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(values[0].source, formatStringProp),
                precision: labelSettings.precision,
                value: (labelSettings.displayUnits === 0) && (maxValue != null) ? maxValue : labelSettings.displayUnits,
            });
            let categorySourceFormatString = valueFormatter.getFormatString(catSource, formatStringProp);
            let fontSizeInPx: string = PixelConverter.fromPoint(labelSettings.fontSize);

            for (let i = 0; i < catValues.length; i++) {
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
                    let toolTip: TooltipDataItem = TooltipBuilder.createTooltipInfo(
                        formatStringProp,
                        catDv,
                        formattedCategoryValue,
                        values[1].values[i],
                        null,
                        null,
                        1)[1];
                    if (toolTip)
                        tooltipInfo.push(toolTip);

                    currentValue += values[1].values[i];
                }

                let identity: DataViewScopeIdentity = cat.identity[i];
                let color: string = colorHelper.getColorForMeasure(catObjects && catObjects[i], identity.key);
                let selector: SelectionId = SelectionId.createWithId(identity);
                let sliceWidth: number = Math.max(0, values.length > 1 ? values[1].values[i] : 1);

                asterDataResult.dataPoints.push({
                    sliceHeight: values[0].values[i] - minValue,
                    sliceWidth: sliceWidth,
                    label: labelFormatter.format(currentValue),
                    color: color,
                    identity: selector,
                    selected: false,
                    tooltipInfo: tooltipInfo,
                    labelFontSize: fontSizeInPx,
                    highlight: false,
                });
                
                // Handle legend data
                if (asterDataResult.legendSettings.show)
                    asterDataResult.legendData.dataPoints.push({
                        label: catValues[i],
                        color: color,
                        icon: LegendIcon.Box,
                        selected: false,
                        identity: selector
                    });
                
                // Handle highlights
                if (hasHighlights) {
                    let highlightIdentity: SelectionId = SelectionId.createWithHighlight(selector);
                    let notNull: boolean = values[0].highlights[i] != null;
                    currentValue = notNull ? values[0].highlights[i] : 0;

                    tooltipInfo = TooltipBuilder.createTooltipInfo(
                        formatStringProp,
                        catDv,
                        formattedCategoryValue,
                        currentValue,
                        null,
                        null,
                        0);

                    if (values.length > 1) {
                        let toolTip: TooltipDataItem = TooltipBuilder.createTooltipInfo(
                            formatStringProp,
                            catDv,
                            formattedCategoryValue,
                            values[1].highlights[i],
                            null,
                            null,
                            1)[1];
                        if (toolTip)
                            tooltipInfo.push(toolTip);

                        currentValue += values[1].highlights[i] !== null ? values[1].highlights[i] : 0;
                    }

                    asterDataResult.highlightedDataPoints.push({
                        sliceHeight: notNull ? values[0].highlights[i] - minValue : null,
                        sliceWidth: Math.max(0, (values.length > 1 && values[1].highlights[i] !== null) ? values[1].highlights[i] : sliceWidth),
                        label: labelFormatter.format(currentValue),
                        color: color,
                        identity: highlightIdentity,
                        selected: false,
                        tooltipInfo: tooltipInfo,
                        labelFontSize: fontSizeInPx,
                        highlight: true,
                    });
                }
            }

            return asterDataResult;
        }

        private dataViewContainsCategory(dataView: DataView) {
            return dataView &&
                dataView.categorical &&
                dataView.categorical.values &&
                dataView.categorical.categories &&
                dataView.categorical.categories[0];
        }

        private getLabelSettings(objects: DataViewObjects, labelSettings: VisualDataLabelsSettings): VisualDataLabelsSettings {
            let asterPlotLabelsProperties = AsterPlot.Properties;
            let precision = DataViewObjects.getValue<number>(objects, asterPlotLabelsProperties.labels.labelPrecision, labelSettings.precision);
            labelSettings.precision = precision === undefined ? precision : Math.min(precision, MaxPrecision);
            labelSettings.show = DataViewObjects.getValue<boolean>(objects, asterPlotLabelsProperties.labels.show, labelSettings.show);
            labelSettings.fontSize = DataViewObjects.getValue<number>(objects, asterPlotLabelsProperties.labels.fontSize, labelSettings.fontSize);
            labelSettings.displayUnits = DataViewObjects.getValue<number>(objects, asterPlotLabelsProperties.labels.labelDisplayUnits, labelSettings.displayUnits);
            let colorHelper: ColorHelper = new ColorHelper(this.colors, asterPlotLabelsProperties.labels.color, labelSettings.labelColor);
            labelSettings.labelColor = colorHelper.getColorForMeasure(objects, "");

            return labelSettings;
        }

        private updateLegendSettings(objects: DataViewObjects, catSource: DataViewMetadataColumn, legendSettings: AsterPlotLegendSettings): void {
            let legendProperties = AsterPlot.Properties.legend;

            legendSettings.show = DataViewObjects.getValue<boolean>(objects, legendProperties.show, legendSettings.show);
            legendSettings.position = DataViewObjects.getValue<string>(objects, legendProperties.position, legendSettings.position);
            legendSettings.showTitle = DataViewObjects.getValue<boolean>(objects, legendProperties.showTitle, legendSettings.showTitle);
            let titleText = DataViewObjects.getValue<string>(objects, legendProperties.titleText, '');
            legendSettings.titleText = _.isEmpty(titleText) && catSource ? catSource.displayName : titleText;
            legendSettings.labelColor = <string>DataViewObjects.getFillColor(objects, legendProperties.labelColor, legendSettings.labelColor);
            legendSettings.fontSize = DataViewObjects.getValue<number>(objects, legendProperties.fontSize, legendSettings.fontSize);
        }

        public init(options: VisualInitOptions): void {
            this.hostService = options.host;
            let element: JQuery = options.element;
            let svg: D3.Selection = this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(AsterPlotVisualClassName, true)
                .style('position', 'absolute');

            this.colors = options.style.colorPalette.dataColors;
            this.mainGroupElement = svg.append('g');
            this.mainLabelsElement = svg.append('g');
            this.behavior = new AsterPlotWebBehavior();
            this.clearCatcher = appendClearCatcher(this.mainGroupElement);
            let interactivity = options.interactivity;
            this.interactivityService = createInteractivityService(this.hostService);
            this.legend = createLegend(element, interactivity && interactivity.isInteractiveLegend, this.interactivityService, true);
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

            if (!convertedData || !convertedData.dataPoints || convertedData.dataPoints.length === 0) {
                this.clearData();
                return;
            }

            if (this.interactivityService) {
                this.interactivityService.applySelectionStateToData(convertedData.dataPoints);
                this.interactivityService.applySelectionStateToData(convertedData.highlightedDataPoints);
            }

            this.renderLegend(convertedData);
            this.updateViewPortAccordingToLegend();

            this.svg
                .attr({
                    height: Math.max(0, this.currentViewport.height),
                    width: Math.max(0, this.currentViewport.width)
                });

            let margin: IMargin = this.margin;
            let transformX: number = (this.currentViewport.width - margin.left) / 2;
            let transformY: number = (this.currentViewport.height - margin.top) / 2;
            this.mainGroupElement.attr('transform', SVGUtil.translate(transformX, transformY));
            this.mainLabelsElement.attr('transform', SVGUtil.translate(transformX, transformY));
            
            // Move back the clearCatcher
            this.clearCatcher.attr('transform', SVGUtil.translate(-transformX, -transformY));
            
            // Clear previous data
            this.mainGroupElement.selectAll(AsterPlot.AsterSlice.selector).remove();
            this.mainGroupElement.selectAll(AsterPlot.AsterHighlightedSlice.selector).remove();
            dataLabelUtils.cleanDataLabels(this.mainLabelsElement, true);

            let dataPoints = convertedData.dataPoints;
            if (!dataPoints || dataPoints.length === 0)
                return;

            let selection: D3.UpdateSelection = this.renderArcsAndLabels(dataPoints, duration, convertedData.labelSettings);
            let highlightedSelection: D3.UpdateSelection;

            if (this.hasHighlights)
                highlightedSelection = this.renderArcsAndLabels(convertedData.highlightedDataPoints, duration, convertedData.labelSettings, true);

            let interactivityService = this.interactivityService;

            if (interactivityService) {
                let behaviorOptions: AsterPlotBehaviorOptions = {
                    selection: selection,
                    highlightedSelection: highlightedSelection,
                    clearCatcher: this.clearCatcher,
                    interactivityService: this.interactivityService,
                };
                interactivityService.bind(convertedData.dataPoints.concat(convertedData.highlightedDataPoints), this.behavior, behaviorOptions);
            }
        }

        private renderArcsAndLabels(dataPoints: AsterDataPoint[], duration: number, labelSettings: VisualDataLabelsSettings, isHighlight: boolean = false): D3.UpdateSelection {
            let margin: IMargin = this.margin;
            let width: number = this.currentViewport.width - margin.left - margin.right;
            let height: number = this.currentViewport.height - margin.top - margin.bottom;
            let radius: number = Math.min(width, height) / 2;
            let innerRadius: number = 0.3 * (labelSettings.show ? radius * AsterRadiusRatio : radius);
            let maxScore: number = d3.max(dataPoints, d => d.sliceHeight);
            let totalWeight: number = d3.sum(dataPoints, d => d.sliceWidth);
            let hasSelection: boolean = this.interactivityService && this.interactivityService.hasSelection();
            let hasHighlights: boolean = this.hasHighlights;

            let pie: D3.Layout.PieLayout = d3.layout.pie()
                .sort(null)
                .value(d => (d && !isNaN(d.sliceWidth) ? d.sliceWidth : 0) / totalWeight);

            let arc: D3.Svg.Arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(d => {
                    let height: number = (radius - innerRadius) * (d && d.data && !isNaN(d.data.sliceHeight) ? d.data.sliceHeight : 1) / maxScore;
                    //The chart should shrink if data labels are on
                    let heightIsLabelsOn = innerRadius + (labelSettings.show ? height * AsterRadiusRatio : height);
                    // Prevent from data to be inside the inner radius
                    return Math.max(heightIsLabelsOn, innerRadius);
                });

            let arcDescriptorDataPoints: ArcDescriptor[] = pie(dataPoints);
            let classSelector: ClassAndSelector = isHighlight ? AsterPlot.AsterHighlightedSlice : AsterPlot.AsterSlice;

            let selection = this.mainGroupElement.selectAll(classSelector.selector)
                .data(arcDescriptorDataPoints, (d, idx) => d.data ? d.data.identity.getKey() : idx);

            selection.enter()
                .append('path')
                .attr('stroke', '#333')
                .classed(classSelector.class, true);

            selection
                .attr('fill', d => d.data.color)
                .style("fill-opacity", (d) => ColumnUtil.getFillOpacity(d.data.selected, d.data.highlight, hasSelection, hasHighlights))
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

            selection
                .exit()
                .remove();

            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => tooltipEvent.data.data.tooltipInfo);
            
            // Draw data labels only if they are on and there are no highlights or there are highlights and this is the highlighted data labels
            if (labelSettings.show && (!hasHighlights || (hasHighlights && isHighlight))) {
                let labelRadCalc = (d: AsterDataPoint) => {
                    let height: number = radius * (d && !isNaN(d.sliceHeight) ? d.sliceHeight : 1) / maxScore + innerRadius;
                    return Math.max(height, innerRadius);
                };
                let labelArc = d3.svg.arc()
                    .innerRadius(d => labelRadCalc(d.data))
                    .outerRadius(d => labelRadCalc(d.data));

                let lineRadCalc = (d: AsterDataPoint) => {
                    let height: number = (radius - innerRadius) * (d && !isNaN(d.sliceHeight) ? d.sliceHeight : 1) / maxScore;
                    height = innerRadius + height * AsterRadiusRatio;
                    return Math.max(height, innerRadius);
                };
                let outlineArc = d3.svg.arc()
                    .innerRadius(d => lineRadCalc(d.data))
                    .outerRadius(d => lineRadCalc(d.data));

                let layout = this.getLabelLayout(labelSettings, labelArc, this.currentViewport);
                this.drawLabels(arcDescriptorDataPoints, this.mainLabelsElement, layout, this.currentViewport, outlineArc, labelArc);
            }
            else
                dataLabelUtils.cleanDataLabels(this.mainLabelsElement, true);
            
            // Draw center text and outline once for original data points
            if (!isHighlight) {
                this.drawCenterText(innerRadius);
                this.drawOuterLine(innerRadius, radius, arcDescriptorDataPoints);
            }

            return selection;
        }

        private getLabelLayout(labelSettings: VisualDataLabelsSettings, arc: D3.Svg.Arc, viewport: IViewport): ILabelLayout {
            let midAngle = function (d: ArcDescriptor) { return d.startAngle + (d.endAngle - d.startAngle) / 2; };
            let textProperties: TextProperties = {
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: PixelConverter.fromPoint(labelSettings.fontSize),
                text: '',
            };
            let isLabelsHasConflict = function (d: AsterArcDescriptor) {
                let pos = arc.centroid(d);
                textProperties.text = d.data.label;
                let textWidth = TextMeasurementService.measureSvgTextWidth(textProperties);
                let horizontalSpaceAvaliableForLabels = viewport.width / 2 - Math.abs(pos[0]);
                let textHeight = TextMeasurementService.estimateSvgTextHeight(textProperties);
                let verticalSpaceAvaliableForLabels = viewport.height / 2 - Math.abs(pos[1]);
                d.isLabelHasConflict = textWidth > horizontalSpaceAvaliableForLabels || textHeight > verticalSpaceAvaliableForLabels;
                return d.isLabelHasConflict;
            };

            return {
                labelText: (d: AsterArcDescriptor) => {
                    textProperties.text = d.data.label;
                    let pos = arc.centroid(d);
                    let xPos = isLabelsHasConflict(d) ? pos[0] * AsterConflictRatio : pos[0];
                    let spaceAvaliableForLabels = viewport.width / 2 - Math.abs(xPos);
                    return TextMeasurementService.getTailoredTextOrDefault(textProperties, spaceAvaliableForLabels);
                },
                labelLayout: {
                    x: (d: AsterArcDescriptor) => {
                        let pos = arc.centroid(d);
                        textProperties.text = d.data.label;
                        let xPos = d.isLabelHasConflict ? pos[0] * AsterConflictRatio : pos[0];
                        return xPos;
                    },
                    y: (d: AsterArcDescriptor) => {
                        let pos = arc.centroid(d);
                        let yPos = d.isLabelHasConflict ? pos[1] * AsterConflictRatio : pos[1];
                        return yPos;
                    },
                },
                filter: (d: AsterArcDescriptor) => (d != null && !_.isEmpty(d.data.label)),
                style: {
                    'fill': labelSettings.labelColor,
                    'font-size': textProperties.fontSize,
                    'text-anchor': (d: AsterArcDescriptor) => midAngle(d) < Math.PI ? 'start' : 'end',
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
                .selectAll('.data-labels').data(filteredData, (d: ArcDescriptor) => d.data.identity.getKey());

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
				
            // Remove lines for null and zero values
            filteredData = _.filter(filteredData, (d: ArcDescriptor) => d.data.sliceHeight !== null && d.data.sliceHeight !== 0);

            let lines = context.select(AsterPlot.linesGraphicsContextClass.selector).selectAll('polyline')
                .data(filteredData, (d: ArcDescriptor) => d.data.identity.getKey());

            let labelLinePadding = 4;
            let chartLinePadding = 1.02;

            let midAngle = function (d: ArcDescriptor) { return d.startAngle + (d.endAngle - d.startAngle) / 2; };

            lines.enter()
                .append('polyline')
                .classed('line-label', true);

            lines
                .attr('points', function (d) {
                    let textPoint = [d.labelX, d.labelY];
                    textPoint[0] = textPoint[0] + ((midAngle(d) < Math.PI ? -1 : 1) * labelLinePadding);
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
            let objects: DataViewObjects = this.dataView && this.dataView.metadata ? this.dataView.metadata.objects : null;
            let legendObjectProperties: DataViewObject = DataViewObjects.getObject(objects, AsterPlotLegendObjectName, {});
            if (legendObjectProperties) {
                let legendSettings = asterPlotData.legendSettings;
                
                // Force update for title text
                legendObjectProperties['titleText'] = legendSettings.titleText;
                LegendData.update(legendData, legendObjectProperties);
                this.legend.changeOrientation(LegendPosition[legendSettings.position]);
            }

            this.legend.drawLegend(legendData, _.clone(this.currentViewport));
            Legend.positionChartArea(this.svg, this.legend);
        }

        private updateViewPortAccordingToLegend(): void {
            let legendSettings = this.data.legendSettings;
            if (!legendSettings || !legendSettings.show)
                return;

            let legendMargins: IViewport = this.legend.getMargins();
            let legendPosition: LegendPosition = LegendPosition[legendSettings.position];

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

        private drawOuterLine(innerRadius: number, radius: number, data: ArcDescriptor[]): void {
            let mainGroup = this.mainGroupElement;
            let outlineArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(radius);
            if (this.data.showOuterLine) {
                let OuterThickness: string = this.data.outerLineThickness + 'px';
                let outerLine = mainGroup.selectAll(AsterPlot.OuterLine.selector).data(data);
                outerLine.enter().append('path');
                outerLine.attr("fill", "none")
                    .attr({
                        'stroke': '#333',
                        'stroke-width': OuterThickness,
                        'd': outlineArc
                    })
                    .style('opacity', 1)
                    .classed(AsterPlot.OuterLine.class, true);
                outerLine.exit().remove();
            }
            else
                mainGroup.selectAll(AsterPlot.OuterLine.selector).remove();
        }

        private getCenterText(dataView: DataView): string {
            if (dataView && dataView.metadata && dataView.metadata.columns && dataView.categorical && dataView.categorical.values)
                for (let column of dataView.metadata.columns)
                    if (!column.isMeasure)
                        return column.displayName;
            return '';
        }

        private drawCenterText(innerRadius: number): void {
            let text: string = this.getCenterText(this.dataView);

            if (_.isEmpty(text)) {
                this.mainGroupElement.select(AsterPlot.CenterLabelClass.selector).remove();
                return;
            }

            let centerTextProperties: TextProperties = {
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontWeight: 'bold',
                fontSize: PixelConverter.toString(innerRadius * AsterPlot.CenterTextFontHeightCoefficient),
                text: text
            };

            if (this.mainGroupElement.select(AsterPlot.CenterLabelClass.selector).empty())
                this.centerText = this.mainGroupElement.append('text').classed(AsterPlot.CenterLabelClass.class, true);

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
                .text(TextMeasurementService.getTailoredTextOrDefault(centerTextProperties, innerRadius * AsterPlot.CenterTextFontWidthCoefficient));
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

        private enumerateLegend(instances: VisualObjectInstance[]) {
            let legendSettings: AsterPlotLegendSettings = this.data.legendSettings;
            let instance: VisualObjectInstance = {
                selector: null,
                objectName: AsterPlotLegendObjectName,
                displayName: 'Legend',
                properties: {
                    show: legendSettings.show,
                    position: legendSettings.position,
                    showTitle: legendSettings.showTitle,
                    titleText: legendSettings.titleText,
                    labelColor: legendSettings.labelColor,
                    fontSize: legendSettings.fontSize,
                }
            };

            instances.push(instance);
        }

        private clearData(): void {
            this.mainGroupElement.selectAll("path").remove();
            dataLabelUtils.cleanDataLabels(this.mainLabelsElement, true);
            this.legend.drawLegend({ dataPoints: [] }, this.currentViewport);
        }

        public onClearSelection(): void {
            if (this.interactivityService)
                this.interactivityService.clearSelection();
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
                    if (this.data)
                        this.enumerateLegend(instances);
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
                            show: this.data.showOuterLine,
                            thickness: this.data.outerLineThickness,
                        }
                    };
                    instances.push(outerLine);
                    break;
            }

            return instances;
        }
    }
}