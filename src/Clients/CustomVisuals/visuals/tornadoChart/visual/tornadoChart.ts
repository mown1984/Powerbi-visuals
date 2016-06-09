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
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import PixelConverter = jsCommon.PixelConverter;

    export interface TornadoChartTextOptions {
        fontFamily?: string;
        fontSize?: number;
        sizeUnit?: string;
    }

    export interface TornadoChartConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
        columnPadding?: number;
    }

    export interface TornadoChartSeries {
        fill: string;
        name: string;
        selectionId: SelectionId;
        categoryAxisEnd: number;
    }

    export interface TornadoChartSettings {
        labelOutsideFillColor: string;
        categoriesFillColor: string;
        labelSettings: VisualDataLabelsSettings;
        showLegend?: boolean;
        showCategories?: boolean;
        legendFontSize?: number;
        legendColor?: string;
        labelValueFormatter?: IValueFormatter;
    }

    export interface TornadoChartDataView {
        categories: TextData[];
        series: TornadoChartSeries[];
        settings: TornadoChartSettings;
        legend: LegendData;
        dataPoints: TornadoChartPoint[];
        highlightedDataPoints?: TornadoChartPoint[];
    }

    export interface TornadoChartPoint extends SelectableDataPoint {
        dx?: number;
        dy?: number;
        px?: number;
        py?: number;
        angle?: number;
        width?: number;
        height?: number;
        label?: LabelData;
        color: string;
        tooltipData: TooltipDataItem[];
        categoryIndex: number;
        highlight?: boolean;
        value: number;
        minValue: number;
        maxValue: number;
        formatString: string;
    }

    export interface LabelData {
        dx: number;
        value: number | string;
        source: number | string;
        color: string;
    }

    export interface LineData {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }

    export interface TextData {
        text: string;
        height: number;
        width: number;
        textProperties: TextProperties;
    }

    export interface TornadoBehaviorOptions {
        columns: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }

    class TornadoWebBehavior implements IInteractiveBehavior {
        private columns: D3.Selection;
        private clearCatcher: D3.Selection;
        private interactivityService: IInteractivityService;

        public bindEvents(options: TornadoBehaviorOptions, selectionHandler: ISelectionHandler) {
            this.columns = options.columns;
            this.clearCatcher = options.clearCatcher;
            this.interactivityService = options.interactivityService;

            this.columns.on('click', (d: SelectableDataPoint, i: number) => {
                selectionHandler.handleSelection(d, d3.event.ctrlKey);
            });

            this.clearCatcher.on('click', () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean) {
            let hasHighlights = this.interactivityService.hasSelection();
            this.columns.style("fill-opacity", (d: TornadoChartPoint) => ColumnUtil.getFillOpacity(d.selected, d.highlight, !d.highlight && hasSelection, !d.selected && hasHighlights));
        }
    }

    class TornadoChartScrolling {
        public isScrollable: boolean;
        public scrollViewport: IViewport;

        private static ScrollBarMinLength = 15;
        private isYScrollBarVisible: boolean;
        private brushGraphicsContextY: D3.Selection;
        private scrollYBrush: D3.Svg.Brush = d3.svg.brush();

        private getRoot: () => D3.Selection;
        private getViewport: () => IViewport;

        private get root(): D3.Selection {
            return this.getRoot();
        }

        private get viewport(): IViewport {
            return this.getViewport();
        }

        constructor(getRoot: () => D3.Selection, getViewport: () => IViewport, getMargin: () => IMargin, isScrollable: boolean) {
            this.getRoot = getRoot;
            this.getViewport = getViewport;
            this.isScrollable = isScrollable;
        }

        public renderY(data: TornadoChartDataView, prefferedHeight: number, onScroll: () => {}): void {
            this.isYScrollBarVisible = prefferedHeight > this.viewport.height
                && this.viewport.height > 0
                && this.viewport.width > 0;

            this.brushGraphicsContextY = this.createOrRemoveScrollbar(this.isYScrollBarVisible, this.brushGraphicsContextY, 'y brush');
            this.updateScrollViewport();

            if (!this.isYScrollBarVisible) {
                onScroll.call(this, jQuery.extend(true, {}, data), 0, 1);
                return;
            }

            let scrollSpaceLength: number = this.viewport.height;
            let extentData: any = this.getExtentData(prefferedHeight, scrollSpaceLength);

            let onRender = (wheelDelta: number = 0) => {
                let position: number[] = this.scrollYBrush.extent();
                if (wheelDelta !== 0) {

                    // Handle mouse wheel manually by moving the scrollbar half of its size
                    let halfScrollsize: number = (position[1] - position[0]) / 2;
                    position[0] += (wheelDelta > 0) ? halfScrollsize : -halfScrollsize;
                    position[1] += (wheelDelta > 0) ? halfScrollsize : -halfScrollsize;

                    if (position[0] < 0) {
                        let offset: number = 0 - position[0];
                        position[0] += offset;
                        position[1] += offset;
                    }
                    if (position[1] > scrollSpaceLength) {
                        let offset: number = position[1] - scrollSpaceLength;
                        position[0] -= offset;
                        position[1] -= offset;
                    }

                    // Update the scroll bar accordingly and redraw
                    this.scrollYBrush.extent(position);
                    this.brushGraphicsContextY.select('.extent').attr('y', position[0]);
                }
                let scrollPosition = extentData.toScrollPosition(position, scrollSpaceLength);
                onScroll.call(this, jQuery.extend(true, {}, data), scrollPosition[0], scrollPosition[1]);
                this.setScrollBarSize(this.brushGraphicsContextY, extentData.value[1], true);
            };

            let scrollYScale: D3.Scale.OrdinalScale = d3.scale.ordinal().rangeBands([0, scrollSpaceLength]);
            this.scrollYBrush.y(scrollYScale).extent(extentData.value);

            this.renderScrollbar(
                this.scrollYBrush,
                this.brushGraphicsContextY,
                this.viewport.width,
                onRender);

            onRender();
        }

        private updateScrollViewport() {
            this.scrollViewport = { height: this.viewport.height, width: this.viewport.width };

            if (this.isYScrollBarVisible && this.isScrollable) {
                this.scrollViewport.width -= TornadoChart.ScrollBarWidth;
            }
        }

        private createOrRemoveScrollbar(isVisible, brushGraphicsContext, brushClass) {
            if (isVisible && this.isScrollable) {
                return brushGraphicsContext || this.root.append("g").classed(brushClass, true);
            }

            return brushGraphicsContext ? void brushGraphicsContext.remove() : undefined;
        }

        private renderScrollbar(brush: D3.Svg.Brush,
            brushGraphicsContext: D3.Selection,
            brushX: number,
            onRender: (number) => void): void {

            brush.on("brush", () => window.requestAnimationFrame(() => onRender(0)));
            this.root.on('wheel', () => {
                if (!this.isYScrollBarVisible) return;
                let wheelEvent: any = d3.event; // Casting to any to avoid compilation errors
                onRender(wheelEvent.deltaY);
            });

            brushGraphicsContext.attr({
                "transform": visuals.SVGUtil.translate(brushX, 0),
                "drag-resize-disabled": "true" /*disables resizing of the visual when dragging the scrollbar in edit mode*/
            });

            brushGraphicsContext.call(brush); /*call the brush function, causing it to create the rectangles   */
            /* Disabling the zooming feature */
            brushGraphicsContext.selectAll(".resize").remove();
            brushGraphicsContext.select(".background").remove();
            brushGraphicsContext.selectAll(".extent").style({
                "fill-opacity": 0.125,
                "cursor": "default",
            });
        }

        private setScrollBarSize(brushGraphicsContext: D3.Selection, minExtent: number, isVertical: boolean): void {
            brushGraphicsContext.selectAll("rect").attr(isVertical ? "width" : "height", TornadoChart.ScrollBarWidth);
            brushGraphicsContext.selectAll("rect").attr(isVertical ? "height" : "width", minExtent);
        }

        private getExtentData(svgLength: number, scrollSpaceLength: number): any {
            let value: number = scrollSpaceLength * scrollSpaceLength / svgLength;

            let scaleMultipler: number = TornadoChartScrolling.ScrollBarMinLength <= value
                ? 1
                : value / TornadoChartScrolling.ScrollBarMinLength;

            value = Math.max(value, TornadoChartScrolling.ScrollBarMinLength);

            let toScrollPosition = (extent: number[], scrollSpaceLength: number) => {
                let scrollSize: number = extent[1] - extent[0];
                let scrollPosition: number = extent[0] / (scrollSpaceLength - scrollSize);

                scrollSize *= scaleMultipler;

                let start: number = (scrollPosition * (scrollSpaceLength - scrollSize));
                let end: number = (start + scrollSize);

                return [start / scrollSpaceLength, end / scrollSpaceLength];
            };

            return { value: [0, value], toScrollPosition: toScrollPosition };
        }

        public clearData(): void {
            if (this.brushGraphicsContextY)
                this.brushGraphicsContextY.selectAll("*").remove();
        }
    }

    export class TornadoChartWarning implements IVisualWarning {
        public get code(): string {
            return "TornadoChartWarning";
        }

        public getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage {
            let message: string = "This visual requires two distinct values to be returned for the Legend field.",
                titleKey: string = "",
                detailKey: string = "",
                visualMessage: IVisualErrorMessage;

            visualMessage = {
                message: message,
                title: resourceProvider.get(titleKey),
                detail: resourceProvider.get(detailKey)
            };

            return visualMessage;
        }
    }

    export function getTornadoChartWarning(): IVisualWarning {
        return new TornadoChartWarning();
    }

    export class TornadoChart implements IVisual {
        private static ClassName: string = "tornado-chart";

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            labels: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "show"
                },
                fontSize: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "fontSize"
                },
                labelPrecision: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "labelPrecision"
                },
                labelDisplayUnits: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "labelDisplayUnits"
                },
                insideFill: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "insideFill"
                },
                outsideFill: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "outsideFill"
                }
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            },
            legend: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "show"
                },
                labelColor: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "labelColor"
                },
                fontSize: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "fontSize"
                },
            },
            categories: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "categories",
                    propertyName: "show"
                },
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: "categories",
                    propertyName: "fill"
                }
            }
        };

        private static Columns: ClassAndSelector = {
            "class": "columns",
            selector: ".columns"
        };

        private static Column: ClassAndSelector = {
            "class": "column",
            selector: ".column"
        };

        private static Axes: ClassAndSelector = {
            "class": "axes",
            selector: ".axes"
        };

        private static Axis: ClassAndSelector = {
            "class": "axis",
            selector: ".axis"
        };

        private static Labels: ClassAndSelector = {
            "class": "labels",
            selector: ".labels"
        };

        private static Label: ClassAndSelector = {
            "class": "label",
            selector: ".label"
        };

        private static LabelTitle: ClassAndSelector = {
            "class": "label-title",
            selector: ".label-title"
        };

        private static LabelText: ClassAndSelector = {
            "class": "label-text",
            selector: ".label-text"
        };

        private static Categories: ClassAndSelector = {
            "class": "categories",
            selector: ".categories"
        };

        private static Category: ClassAndSelector = {
            "class": "category",
            selector: ".category"
        };

        private static CategoryTitle: ClassAndSelector = {
            "class": "category-title",
            selector: ".category-title"
        };

        private static CategoryText: ClassAndSelector = {
            "class": "category-text",
            selector: ".category-text"
        };

        private static MaxSeries: number = 2;
        private static MaxPrecision: number = 17; // max number of decimals in float
        private static LabelPadding: number = 2.5;
        private static CategoryMinHeight: number = 25;
        private static DefaultFontSize: number = 9;
        private static DefaultLegendFontSize: number = 8;
        private static HighlightedShapeFactor: number = 0.5;

        public static ScrollBarWidth = 10;

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Category",
                kind: VisualDataRoleKind.Grouping,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Group")
            }, {
                    name: "Series",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Legend')
                }, {
                    name: "Values",
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Values")
                }],
            dataViewMappings: [{
                conditions: [
                    { "Category": { max: 1 }, "Values": { min: 0, max: 1 }, "Series": { min: 0, max: 1 } },
                    { "Category": { max: 1 }, "Values": { min: 2, max: 2 }, "Series": { max: 0 } }
                ],
                categorical: {
                    categories: {
                        for: {
                            in: "Category"
                        }
                    },
                    values: {
                        group: {
                            by: "Series",
                            select: [{ for: { in: "Values" } }],
                            dataReductionAlgorithm: { top: {} }
                        }
                    }
                }
            }],
            objects: {
                general: {
                    displayName: 'General',
                    properties: {
                        formatString: {
                            type: {
                                formatting: {
                                    formatString: true
                                }
                            },
                        }
                    }
                },
                dataPoint: {
                    displayName: 'Data Colors',
                    properties: {
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                categoryAxis: {
                    displayName: 'X-Axis',
                    properties: {
                        end: {
                            displayName: 'End',
                            type: { numeric: true },
                            suppressFormatPainterCopy: true,
                        },
                    }
                },
                labels: {
                    displayName: 'Data Labels',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        labelPrecision: {
                            displayName: 'Decimal Places',
                            placeHolderText: 'Auto',
                            type: { numeric: true }
                        },
                        fontSize: {
                            displayName: data.createDisplayNameGetter('Visual_TextSize'),
                            type: { formatting: { fontSize: true } }
                        },
                        labelDisplayUnits: {
                            displayName: 'Display Units',
                            type: { formatting: { labelDisplayUnits: true } },
                        },
                        insideFill: {
                            displayName: 'Inside fill',
                            type: { fill: { solid: { color: true } } }
                        },
                        outsideFill: {
                            displayName: 'Outside fill',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                legend: {
                    displayName: 'Legend',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        position: {
                            displayName: 'Position',
                            description: data.createDisplayNameGetter('Visual_LegendPositionDescription'),
                            type: { enumeration: legendPosition.type }
                        },
                        showTitle: {
                            displayName: 'Title',
                            description: data.createDisplayNameGetter('Visual_LegendShowTitleDescription'),
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: 'Legend Name',
                            description: data.createDisplayNameGetter('Visual_LegendNameDescription'),
                            type: { text: true }
                        },
                        labelColor: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: 'TextSize',
                            type: { formatting: { fontSize: true } }
                        },
                    }
                },
                categories: {
                    displayName: 'Group',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        fill: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                }
            },
            supportsHighlight: true,
        };

        private DefaultTornadoChartSettings: TornadoChartSettings = {
            labelOutsideFillColor: dataLabelUtils.defaultLabelColor,
            labelSettings: {
                show: true,
                precision: null,
                fontSize: TornadoChart.DefaultFontSize,
                displayUnits: 0,
                labelColor: dataLabelUtils.defaultInsideLabelColor,
            },
            showCategories: true,
            showLegend: true,
            legendFontSize: TornadoChart.DefaultLegendFontSize,
            legendColor: LegendData.DefaultLegendLabelFillColor,
            categoriesFillColor: "#777"
        };

        private DefaultFillColors: string[] = [
            "purple", "teal"
        ];

        private columnPadding: number = 5;
        private leftLabelMargin: number = 4;
        private durationAnimations: number;
        private InnerTextHeightDelta: number = 2;
        private textOptions: TornadoChartTextOptions = {};

        private margin: IMargin = {
            top: 10,
            right: 5,
            bottom: 10,
            left: 10
        };

        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private columns: D3.Selection;
        private axes: D3.Selection;
        private labels: D3.Selection;
        private categories: D3.Selection;
        private clearCatcher: D3.Selection;

        private legendObjectProperties: DataViewObject;
        private legend: ILegend;
        private hasDynamicSeries: boolean;
        private hasHighlights: boolean;
        private behavior: IInteractiveBehavior;
        private colors: IDataColorPalette;
        private interactivityService: IInteractivityService;
        private animator: IGenericAnimator;
        private hostService: IVisualHostServices;
        private scrolling: TornadoChartScrolling;

        private viewport: IViewport;
        private tornadoChartDataView: TornadoChartDataView;
        private defaultTornadoChartDataView: TornadoChartDataView;
        private labelHeight: number;
        private heightColumn: number = 0;
        private widthLeftSection: number = 0;
        private widthRightSection: number = 0;

        constructor(tornadoChartConstructorOptions?: TornadoChartConstructorOptions) {
            if (tornadoChartConstructorOptions) {
                this.svg = tornadoChartConstructorOptions.svg || this.svg;
                this.margin = tornadoChartConstructorOptions.margin || this.margin;
                this.columnPadding = tornadoChartConstructorOptions.columnPadding || this.columnPadding;
                this.animator = tornadoChartConstructorOptions.animator;
            }
        }

        public init(visualInitOptions: VisualInitOptions): void {
            let style: IVisualStyle = visualInitOptions.style,
                fontSize: string;

            this.hostService = visualInitOptions.host;
            let element: JQuery = visualInitOptions.element;
            this.colors = style.colorPalette.dataColors;
            let interactivity = visualInitOptions.interactivity;
            this.interactivityService = createInteractivityService(this.hostService);

            let root: D3.Selection;
            if (this.svg)
                this.root = root = this.svg;
            else
                this.root = root = d3.select(element.get(0))
                    .append("svg");

            root
                .classed(TornadoChart.ClassName, true)
                .style('position', 'absolute');

            fontSize = root.style("font-size");

            this.textOptions.sizeUnit = fontSize.slice(fontSize.length - 2);
            this.textOptions.fontSize = Number(fontSize.slice(0, fontSize.length - 2));
            this.textOptions.fontFamily = root.style("font-family");
            this.scrolling = new TornadoChartScrolling(() => root, () => this.viewport, () => this.margin, true);
            let main: D3.Selection = this.main = root.append("g");
            this.clearCatcher = appendClearCatcher(main);
            this.columns = main
                .append("g")
                .classed(TornadoChart.Columns.class, true);

            this.axes = main
                .append("g")
                .classed(TornadoChart.Axes.class, true);

            this.labels = main
                .append("g")
                .classed(TornadoChart.Labels.class, true);

            this.categories = main
                .append("g")
                .classed(TornadoChart.Categories.class, true);

            this.behavior = new TornadoWebBehavior();
            this.defaultTornadoChartDataView = {
                categories: [],
                series: [],
                settings: null,
                legend: null,
                dataPoints: [],
                highlightedDataPoints: [],
            };

            this.legend = createLegend(element, interactivity && interactivity.isInteractiveLegend, this.interactivityService, true);
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]) {
                return;
            }

            this.viewport = {
                height: Math.max(0, visualUpdateOptions.viewport.height - this.margin.top - this.margin.bottom),
                width: Math.max(0, visualUpdateOptions.viewport.width - this.margin.left - this.margin.right)
            };

            if (this.animator)
                this.durationAnimations = AnimatorCommon.GetAnimationDuration(this.animator, visualUpdateOptions.suppressAnimations);
            else
                this.durationAnimations = visualUpdateOptions.suppressAnimations ? 0 : 250;

            this.tornadoChartDataView = this.converter(visualUpdateOptions.dataViews[0]);

            if (this.interactivityService) {
                this.interactivityService.applySelectionStateToData(this.tornadoChartDataView.dataPoints);
                this.interactivityService.applySelectionStateToData(this.tornadoChartDataView.highlightedDataPoints);
            }

            this.render();
        }

        private updateElements(): void {
            let elementsTranslate: string = SVGUtil.translate(this.widthLeftSection, 0);

            this.root.attr({
                "height": this.viewport.height + this.margin.top + this.margin.bottom,
                "width": this.viewport.width + this.margin.left + this.margin.right
            });

            this.columns
                .attr("transform", elementsTranslate);

            this.labels
                .attr("transform", elementsTranslate);

            this.axes
                .attr("transform", elementsTranslate);
        }

        public converter(dataView: DataView): TornadoChartDataView {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].source ||
                !dataView.categorical.values ||
                !dataView.categorical.values[0]) {
                return this.defaultTornadoChartDataView;
            }

            let categorical: DataViewCategorical = dataView.categorical;
            let categories: DataViewCategoryColumn[] = categorical.categories || [];
            let values: DataViewValueColumns = categorical.values;
            if (values.length > TornadoChart.MaxSeries) {
                this.hostService.setWarnings([getTornadoChartWarning()]);
                return this.defaultTornadoChartDataView;
            }
            let category: DataViewCategoricalColumn = categories[0];
            let categoryValues: number[] = category.values;
            let categoryValuesLength: number = categoryValues.length;
            let objects: DataViewObjects = this.getObjectsFromDataView(dataView);

            let formatStringProp: DataViewObjectPropertyIdentifier = TornadoChart.Properties.general.formatString;
            let valuesSourceFormatString: string = valueFormatter.getFormatString(values[0].source, formatStringProp);
            let maxValue: number = d3.max(values[0].values);
            let settings: TornadoChartSettings = this.parseSettings(objects, valuesSourceFormatString, maxValue);
            this.hasDynamicSeries = !!values.source;
            let hasHighlights: boolean = this.hasHighlights = !!(values.length > 0 && values[0].highlights);
            this.labelHeight = TextMeasurementService.estimateSvgTextHeight({
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: PixelConverter.fromPoint(settings.labelSettings.fontSize),
            });

            let series: TornadoChartSeries[] = [];
            let dataPoints: TornadoChartPoint[] = [];
            let highlightedDataPoints: TornadoChartPoint[] = [];
            let categoriesLabels: TextData[] = [];

            let groupedValues: DataViewValueColumnGroup[] = values.grouped ? values.grouped() : null;

            // Parse category labels and compute maximum category length
            let maxCategoryLength: number = 0;
            let showCategories = settings.showCategories;
            let categorySourceFormatString: string = valueFormatter.getFormatString(category.source, formatStringProp);
            for (let i = 0; i < categoryValuesLength; i++) {
                let formattedCategoryValue = valueFormatter.format(categoryValues[i], categorySourceFormatString);
                let textData = this.getTextData(formattedCategoryValue, true);
                categoriesLabels.push(textData);
                if (showCategories && textData.width > maxCategoryLength)
                    maxCategoryLength = textData.width;
            }

            let scrollBarWidth: number = (categoryValuesLength * TornadoChart.CategoryMinHeight > this.viewport.height) ? TornadoChart.ScrollBarWidth : 0;
            this.widthLeftSection = maxCategoryLength + TornadoChart.LabelPadding;
            let maxColumnWidth = this.widthRightSection = this.viewport.width - this.widthLeftSection - scrollBarWidth;
            this.updateElements();

            let minValue: number = Math.min(d3.min(values[0].values), 0);
            if (values.length === TornadoChart.MaxSeries) {
                minValue = d3.min([minValue, d3.min(values[1].values)]);
                maxValue = d3.max([maxValue, d3.max(values[1].values)]);
                maxColumnWidth = maxColumnWidth / TornadoChart.MaxSeries;
            }

            for (let seriesIndex = 0; seriesIndex < values.length; seriesIndex++) {
                let columnGroup: DataViewValueColumnGroup = groupedValues && groupedValues.length > seriesIndex 
                    && groupedValues[seriesIndex].values ? groupedValues[seriesIndex] : null;

                let parsedSeries: TornadoChartSeries = this.parseSeries(values, seriesIndex, this.hasDynamicSeries, columnGroup);

                series.push(parsedSeries);

                let currentSeries = values[seriesIndex];
                let measureName = currentSeries.source.queryName;

                for (let i = 0; i < categoryValuesLength; i++) {
                    let value = currentSeries.values[i] == null || isNaN(currentSeries.values[i]) ? 0 : currentSeries.values[i];

                    let identity = SelectionIdBuilder.builder()
                        .withCategory(category, i)
                        .withSeries(values, columnGroup)
                        .withMeasure(measureName)
                        .createSelectionId();

                    let formattedCategoryValue = categoriesLabels[i].text;
                    let tooltipInfo: TooltipDataItem[];
                    tooltipInfo = TooltipBuilder.createTooltipInfo(formatStringProp, categorical, formattedCategoryValue, value, null, null, seriesIndex, i, null);

                    // Limit maximum value with what the user choose
                    let currentMaxValue = parsedSeries.categoryAxisEnd ? Math.min(parsedSeries.categoryAxisEnd, maxValue) : maxValue;
                    let formatString = dataView.categorical.values[seriesIndex].source.format;

                    dataPoints.push({
                        value: value,
                        minValue: minValue,
                        maxValue: currentMaxValue,
                        formatString: formatString,
                        color: parsedSeries.fill,
                        selected: false,
                        identity: identity,
                        tooltipData: tooltipInfo,
                        categoryIndex: i,
                    });

                    if (hasHighlights) {
                        let highlightIdentity = SelectionId.createWithHighlight(identity);
                        let highlight = currentSeries.highlights[i];
                        let highlightedValue = highlight != null ? highlight : 0;
                        tooltipInfo = TooltipBuilder.createTooltipInfo(formatStringProp, categorical, formattedCategoryValue, value, null, null, seriesIndex, i, highlightedValue);

                        highlightedDataPoints.push({
                            value: highlightedValue,
                            minValue: minValue,
                            maxValue: currentMaxValue,
                            formatString: formatString,
                            color: parsedSeries.fill,
                            selected: false,
                            identity: highlightIdentity,
                            tooltipData: tooltipInfo,
                            categoryIndex: i,
                            highlight: true,
                        });
                    }
                }
            }

            return {
                categories: categoriesLabels,
                series: series,
                settings: settings,
                legend: this.getLegendData(series),
                dataPoints: dataPoints,
                highlightedDataPoints: highlightedDataPoints,
            };
        }

        private parseSettings(objects: DataViewObjects, formatString: string, value: number): TornadoChartSettings {
            let precision: number = this.getPrecision(objects);

            let displayUnits: number = DataViewObjects.getValue<number>(
                objects,
                TornadoChart.Properties.labels.labelDisplayUnits,
                this.DefaultTornadoChartSettings.labelSettings.displayUnits);

            let labelSettings = this.DefaultTornadoChartSettings.labelSettings;

            let labelValueFormatter = valueFormatter.create({
                format: formatString,
                precision: precision,
                value: (displayUnits === 0) && (value != null) ? value : displayUnits,
            });

            return {
                labelOutsideFillColor: this.getColor(TornadoChart.Properties.labels.outsideFill, this.DefaultTornadoChartSettings.labelOutsideFillColor, objects),
                labelSettings: {
                    show: DataViewObjects.getValue<boolean>(objects, TornadoChart.Properties.labels.show, labelSettings.show),
                    precision: precision,
                    fontSize: DataViewObjects.getValue<number>(objects, TornadoChart.Properties.labels.fontSize, labelSettings.fontSize),
                    displayUnits: displayUnits,
                    labelColor: this.getColor(TornadoChart.Properties.labels.insideFill, labelSettings.labelColor, objects),
                },
                showCategories: DataViewObjects.getValue<boolean>(objects, TornadoChart.Properties.categories.show, this.DefaultTornadoChartSettings.showCategories),
                showLegend: DataViewObjects.getValue<boolean>(objects, TornadoChart.Properties.legend.show, this.DefaultTornadoChartSettings.showLegend),
                legendFontSize: DataViewObjects.getValue<number>(objects, TornadoChart.Properties.legend.fontSize, this.DefaultTornadoChartSettings.legendFontSize),
                legendColor: this.getColor(TornadoChart.Properties.legend.labelColor, this.DefaultTornadoChartSettings.legendColor, objects),
                categoriesFillColor: this.getColor(TornadoChart.Properties.categories.fill, this.DefaultTornadoChartSettings.categoriesFillColor, objects),
                labelValueFormatter: labelValueFormatter
            };
        }

        private getColor(properties: any, defaultColor: string, objects: DataViewObjects): string {
            let colorHelper: ColorHelper = new ColorHelper(this.colors, properties, defaultColor);
            return colorHelper.getColorForMeasure(objects, "");
        }

        private getPrecision(objects: DataViewObjects): number {
            let precision: number = DataViewObjects.getValue<number>(
                objects,
                TornadoChart.Properties.labels.labelPrecision,
                this.DefaultTornadoChartSettings.labelSettings.precision);

            if (precision >= TornadoChart.MaxPrecision) {
                return TornadoChart.MaxPrecision;
            }

            return precision;
        }

        private getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                this.legendObjectProperties = {};
                return null;
            }

            this.legendObjectProperties = DataViewObjects.getObject(dataView.metadata.objects, "legend", {});

            return dataView.metadata.objects;
        }

        /**
         * Public for testability.
         */
        public parseSeries(dataViewValueColumns: DataViewValueColumns, index: number, isGrouped: boolean, columnGroup: DataViewValueColumnGroup): TornadoChartSeries {
            let dataViewValueColumn: DataViewValueColumn = dataViewValueColumns ? dataViewValueColumns[index] : null,
                source: DataViewMetadataColumn = dataViewValueColumn ? dataViewValueColumn.source : null,
                identity: DataViewScopeIdentity = columnGroup ? columnGroup.identity : null,
                queryName: string = source ? source.queryName : null;

            let selectionId: SelectionId = identity
                ? SelectionId.createWithId(identity)
                : SelectionIdBuilder.builder()
                    .withSeries(dataViewValueColumns, columnGroup)
                    .withMeasure(queryName)
                    .createSelectionId();

            let objects: DataViewObjects,
                categoryAxisObject: DataViewObject | DataViewObjectWithId[],
                displayName: string = source ? source.groupName
                    ? source.groupName : source.displayName
                    : null;

            if (isGrouped && columnGroup) {
                categoryAxisObject = columnGroup.objects ? columnGroup.objects['categoryAxis'] : null;
                objects = columnGroup.objects;
            }
            else if (source) {
                objects = source.objects;
                categoryAxisObject = objects ? objects['categoryAxis'] : null;
            }

            let color: string = this.getColor(
                TornadoChart.Properties.dataPoint.fill,
                this.DefaultFillColors[index],
                objects);

            let categoryAxisEnd: number = categoryAxisObject ? categoryAxisObject['end'] : null;

            return <TornadoChartSeries>{
                fill: color,
                name: displayName,
                selectionId: selectionId,
                categoryAxisEnd: categoryAxisEnd,
            };
        }

        private getLegendData(series: TornadoChartSeries[]): LegendData {
            let legendDataPoints: LegendDataPoint[] = [];

            if (this.hasDynamicSeries)
                legendDataPoints = series.map((series: TornadoChartSeries) => {
                    return <LegendDataPoint>{
                        label: series.name,
                        color: series.fill,
                        icon: LegendIcon.Box,
                        selected: false,
                        identity: series.selectionId
                    };
                });

            return {
                dataPoints: legendDataPoints
            };
        }

        private clearData(): void {
            this.columns.selectAll("*").remove();
            this.axes.selectAll("*").remove();
            this.labels.selectAll("*").remove();
            this.categories.selectAll("*").remove();
            this.legend.drawLegend({ dataPoints: [] }, this.viewport);
            this.scrolling.clearData();
        }

        public onClearSelection(): void {
            if (this.interactivityService)
                this.interactivityService.clearSelection();
        }

        private render(): void {
            let tornadoChartDataView: TornadoChartDataView = this.tornadoChartDataView;
            if (!tornadoChartDataView ||
                !tornadoChartDataView.settings) {
                this.clearData();
                return;
            }

            this.renderLegend();

            this.scrolling.renderY(
                tornadoChartDataView,
                tornadoChartDataView.categories.length * TornadoChart.CategoryMinHeight,
                this.renderWithScrolling.bind(this));
        }

        private renderWithScrolling(tornadoChartDataView: TornadoChartDataView, scrollStart: number, scrollEnd: number): void {
            if (!this.tornadoChartDataView || !this.tornadoChartDataView.settings)
                return;
            let categoriesLength = tornadoChartDataView.categories.length;
            let startIndex: number = scrollStart * categoriesLength;
            let endIndex: number = scrollEnd * categoriesLength;

            let startIndexRound: number = Math.floor(startIndex);
            let endIndexRound: number = Math.floor(endIndex);

            let maxValues: number = Math.floor(this.scrolling.scrollViewport.height / TornadoChart.CategoryMinHeight);

            if (scrollEnd - scrollStart < 1 && maxValues < endIndexRound - startIndexRound) {
                if (startIndex - startIndexRound > endIndex - endIndexRound) {
                    startIndexRound++;
                }
                else {
                    endIndex--;
                }
            }

            if (this.interactivityService) {
                this.interactivityService.applySelectionStateToData(tornadoChartDataView.dataPoints);
                this.interactivityService.applySelectionStateToData(tornadoChartDataView.highlightedDataPoints);
            }

            let scrollBarWidth: number = (tornadoChartDataView.categories.length * TornadoChart.CategoryMinHeight > this.viewport.height) ? TornadoChart.ScrollBarWidth : 0;

            // Filter data according to the visible visual area
            tornadoChartDataView.categories = tornadoChartDataView.categories.slice(startIndexRound, endIndexRound);
            tornadoChartDataView.dataPoints = _.filter(tornadoChartDataView.dataPoints, (d: TornadoChartPoint) => d.categoryIndex >= startIndexRound && d.categoryIndex < endIndexRound);
            tornadoChartDataView.highlightedDataPoints = _.filter(tornadoChartDataView.highlightedDataPoints, (d: TornadoChartPoint) => d.categoryIndex >= startIndexRound && d.categoryIndex < endIndexRound);

            this.tornadoChartDataView = tornadoChartDataView;
            this.computeHeightColumn();
            this.renderMiddleSection(scrollBarWidth);
            this.renderAxes();
            this.renderCategories();
        }

        private updateViewport(): void {
            let legendMargins: IViewport = this.legend.getMargins(),
                legendPosition: LegendPosition;

            legendPosition = LegendPosition[<string>this.legendObjectProperties[legendProps.position]];

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

        private computeHeightColumn(): void {
            let length: number = this.tornadoChartDataView.categories.length;
            this.heightColumn = (this.scrolling.scrollViewport.height - ((length - 1) * this.columnPadding)) / length;
        }

        private renderMiddleSection(scrollBarWidth: number): void {
            let tornadoChartDataView: TornadoChartDataView = this.tornadoChartDataView;
            this.calculateDataPoints(tornadoChartDataView.dataPoints, scrollBarWidth);
            this.calculateDataPoints(tornadoChartDataView.highlightedDataPoints, scrollBarWidth);
            let dataPointsWithHighlights: TornadoChartPoint[] = tornadoChartDataView.dataPoints.concat(tornadoChartDataView.highlightedDataPoints);
            this.renderColumns(dataPointsWithHighlights, tornadoChartDataView.series.length === 2);
            this.renderLabels(this.hasHighlights ? tornadoChartDataView.highlightedDataPoints : tornadoChartDataView.dataPoints, tornadoChartDataView.settings.labelSettings);
        }

        /**
         * Calculate the width, dx value and label info for every data point
         */
        private calculateDataPoints(dataPoints: TornadoChartPoint[], scrollBarWidth: number): void {
            let maxColumnWidth: number = this.widthRightSection = (this.viewport.width - this.widthLeftSection - scrollBarWidth);
            let categoriesLength: number = this.tornadoChartDataView.categories.length;
            let settings: TornadoChartSettings = this.tornadoChartDataView.settings;
            let hasHighlights: boolean = this.hasHighlights;
            let heightColumn = Math.max(this.heightColumn, 0);
            let py = heightColumn / 2;
            let pyHighlighted = heightColumn * TornadoChart.HighlightedShapeFactor / 2;
            let maxSeries: boolean = this.tornadoChartDataView.series.length === TornadoChart.MaxSeries;

            if (maxSeries)
                maxColumnWidth /= 2;

            for (let i = 0; i < dataPoints.length; i++) {
                let dataPoint = dataPoints[i];

                let shiftToMiddle = i < categoriesLength && maxSeries;
                let shiftToRight: boolean = i > categoriesLength - 1;
                let widthOfColumn: number = this.getColumnWidth(dataPoint.value, dataPoint.minValue, dataPoint.maxValue, maxColumnWidth);
                let dx: number = (maxColumnWidth - widthOfColumn) * Number(shiftToMiddle) + maxColumnWidth * Number(shiftToRight) - scrollBarWidth;
                dx = Math.max(dx, 0);

                let highlighted: boolean = hasHighlights && dataPoint.highlight;
                let highlightOffset: number = highlighted ? heightColumn * (1 - TornadoChart.HighlightedShapeFactor) / 2 : 0;
                let dy: number = (heightColumn + this.columnPadding) * (i % categoriesLength) + highlightOffset;

                let label: LabelData = this.getLabelData(
                    dataPoint.value,
                    dx,
                    widthOfColumn,
                    shiftToMiddle,
                    dataPoint.formatString,
                    settings);

                dataPoint.dx = dx;
                dataPoint.dy = dy;
                dataPoint.px = widthOfColumn / 2;
                dataPoint.py = highlighted ? pyHighlighted : py;
                dataPoint.angle = shiftToMiddle ? 180 : 0;
                dataPoint.width = widthOfColumn;
                dataPoint.height = highlighted ? heightColumn * TornadoChart.HighlightedShapeFactor : heightColumn;
                dataPoint.label = label;
            }
        }

        private renderColumns(columnsData: TornadoChartPoint[], selectSecondSeries: boolean = false): void {
            let hasSelection: boolean = this.interactivityService && this.interactivityService.hasSelection();
            let hasHighlights: boolean = this.hasHighlights;

            let columnsSelection: D3.UpdateSelection = this.columns
                .selectAll(TornadoChart.Column.selector)
                .data(columnsData);

            columnsSelection
                .enter()
                .append("svg:rect")
                .classed(TornadoChart.Column.class, true);

            columnsSelection
                .style("fill", (p: TornadoChartPoint) => p.color)
                .style("fill-opacity", (p: TornadoChartPoint) => ColumnUtil.getFillOpacity(p.selected, p.highlight, hasSelection, hasHighlights))
                .attr("transform", (p: TornadoChartPoint) => SVGUtil.translateAndRotate(p.dx, p.dy, p.px, p.py, p.angle))
                .attr("height", (p: TornadoChartPoint) => p.height)
                .attr("width", (p: TornadoChartPoint) => p.width);

            columnsSelection
                .exit()
                .remove();

            let interactivityService = this.interactivityService;

            if (interactivityService) {
                interactivityService.applySelectionStateToData(columnsData);
                let behaviorOptions: TornadoBehaviorOptions = {
                    columns: columnsSelection,
                    clearCatcher: this.clearCatcher,
                    interactivityService: this.interactivityService,
                };
                interactivityService.bind(columnsData, this.behavior, behaviorOptions);
            }

            this.renderTooltip(columnsSelection);
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<TornadoChartPoint>tooltipEvent.data).tooltipData;
            });
        }

        private getColumnWidth(value: number, minValue: number, maxValue: number, width: number): number {
            if (minValue === maxValue) {
                return width;
            }
            let columnWidth = width * (value - minValue) / (maxValue - minValue);

            // In case the user specifies a custom category axis end we limit the
            // column width to the maximum available width
            return Math.max(0, Math.min(width, columnWidth));
        }

        private getLabelData(
            value: number,
            dxColumn: number,
            columnWidth: number,
            isColumnPositionLeft: boolean,
            formatStringProp: string,
            settings?: TornadoChartSettings): LabelData {

            let dx: number,
                tornadoChartSettings: TornadoChartSettings = settings ? settings : this.tornadoChartDataView.settings,
                labelSettings: VisualDataLabelsSettings = tornadoChartSettings.labelSettings,
                fontSize: number = labelSettings.fontSize,
                color: string = labelSettings.labelColor;

            let maxOutsideLabelWidth = isColumnPositionLeft
                ? dxColumn - this.leftLabelMargin
                : this.widthRightSection - (dxColumn + columnWidth + this.leftLabelMargin);
            let maxLabelWidth = Math.max(maxOutsideLabelWidth, columnWidth - this.leftLabelMargin);

            let textProperties: TextProperties = {
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: PixelConverter.fromPoint(fontSize),
                text: tornadoChartSettings.labelValueFormatter.format(value)
            };
            let valueAfterValueFormatter: string = TextMeasurementService.getTailoredTextOrDefault(textProperties, maxLabelWidth);
            let textDataAfterValueFormatter: TextData = this.getTextData(valueAfterValueFormatter, true, false, fontSize);

            if (columnWidth > textDataAfterValueFormatter.width + TornadoChart.LabelPadding) {
                dx = dxColumn + columnWidth / 2 - textDataAfterValueFormatter.width / 2;
            } else {
                if (isColumnPositionLeft) {
                    dx = dxColumn - this.leftLabelMargin - textDataAfterValueFormatter.width;
                } else {
                    dx = dxColumn + columnWidth + this.leftLabelMargin;
                }
                color = tornadoChartSettings.labelOutsideFillColor;
            }

            return {
                dx: dx,
                source: value,
                value: valueAfterValueFormatter,
                color: color
            };
        }

        private renderAxes(): void {
            let linesData: LineData[],
                axesSelection: D3.UpdateSelection,
                axesElements: D3.Selection = this.main
                    .select(TornadoChart.Axes.selector)
                    .selectAll(TornadoChart.Axis.selector);

            if (this.tornadoChartDataView.series.length !== TornadoChart.MaxSeries) {
                axesElements.remove();
                return;
            }

            linesData = this.generateAxesData();

            axesSelection = axesElements.data(linesData);

            axesSelection
                .enter()
                .append("svg:line")
                .classed(TornadoChart.Axis.class, true);

            axesSelection
                .transition()
                .duration(this.durationAnimations)
                .attr("x1", (data: LineData) => data.x1)
                .attr("y1", (data: LineData) => data.y1)
                .attr("x2", (data: LineData) => data.x2)
                .attr("y2", (data: LineData) => data.y2);

            axesSelection
                .exit()
                .remove();
        }

        private generateAxesData(): LineData[] {
            let x: number,
                y1: number,
                y2: number;

            x = this.widthRightSection / 2;
            y1 = 0;
            y2 = this.scrolling.scrollViewport.height;

            return [{
                x1: x,
                y1: y1,
                x2: x,
                y2: y2
            }];
        }

        private renderLabels(dataPoints: TornadoChartPoint[], labelsSettings: VisualDataLabelsSettings): void {
            let labelEnterSelection: D3.Selection,
                labelSelection: D3.UpdateSelection = this.main
                    .select(TornadoChart.Labels.selector)
                    .selectAll(TornadoChart.Label.selector)
                    .data(_.filter(dataPoints, (p: TornadoChartPoint) => p.label.dx >= 0));

            // Check if labels can be displayed
            if (!labelsSettings.show || this.labelHeight >= this.heightColumn) {
                this.labels.selectAll("*").remove();
                return;
            }

            let fontSizeInPx: string = PixelConverter.fromPoint(labelsSettings.fontSize);
            let labelYOffset: number = this.heightColumn / 2 + this.labelHeight / 2 - this.InnerTextHeightDelta;
            let categoriesLength: number = this.tornadoChartDataView.categories.length;

            labelEnterSelection = labelSelection
                .enter()
                .append("g");

            labelEnterSelection
                .append("svg:title")
                .classed(TornadoChart.LabelTitle.class, true);

            labelEnterSelection
                .append("svg:text")
                .attr("dy", dataLabelUtils.DefaultDy)
                .classed(TornadoChart.LabelText.class, true);

            labelSelection
                .attr("pointer-events", "none")
                .classed(TornadoChart.Label.class, true);

            labelSelection
                .select(TornadoChart.LabelTitle.selector)
                .text((p: TornadoChartPoint) => p.label.source);

            labelSelection
                .attr("transform", (p: TornadoChartPoint, index: number) => {
                    let dy = (this.heightColumn + this.columnPadding) * (index % categoriesLength);
                    return SVGUtil.translate(p.label.dx, dy + labelYOffset);
                });

            labelSelection
                .select(TornadoChart.LabelText.selector)
                .attr("fill", (p: TornadoChartPoint) => p.label.color)
                .attr("font-size", (p: TornadoChartPoint) => fontSizeInPx)
                .text((p: TornadoChartPoint) => p.label.value);

            labelSelection
                .exit()
                .remove();
        }

        private renderCategories(): void {
            let settings: TornadoChartSettings = this.tornadoChartDataView.settings,
                color: string = settings.categoriesFillColor,
                categoriesEnterSelection: D3.Selection,
                categoriesSelection: D3.UpdateSelection,
                categoryElements: D3.Selection = this.main
                    .select(TornadoChart.Categories.selector)
                    .selectAll(TornadoChart.Category.selector),
                self: TornadoChart = this;

            if (!settings.showCategories) {
                categoryElements.remove();
                return;
            }

            categoriesSelection = categoryElements.data(this.tornadoChartDataView.categories);

            categoriesEnterSelection = categoriesSelection
                .enter()
                .append("g");

            categoriesEnterSelection
                .append("svg:title")
                .classed(TornadoChart.CategoryTitle.class, true);

            categoriesEnterSelection
                .append("svg:text")
                .classed(TornadoChart.CategoryText.class, true);

            categoriesSelection
                .attr("transform", (text: string, index: number) => {
                    let shift: number = (this.heightColumn + this.columnPadding) * index + this.heightColumn / 2,
                        textData: TextData = this.getTextData(text, false, true);

                    shift = shift + textData.height / 2 - this.InnerTextHeightDelta;

                    return SVGUtil.translate(0, shift);
                })
                .classed(TornadoChart.Category.class, true);

            categoriesSelection
                .select(TornadoChart.CategoryTitle.selector)
                .text((text: TextData) => text.text);

            categoriesSelection
                .select(TornadoChart.CategoryText.selector)
                .attr("fill", color)
                .text((data: TextData) => {
                    let textData: TextData = self.getTextData(data.text);

                    return TextMeasurementService.getTailoredTextOrDefault(textData.textProperties, self.widthLeftSection);
                });

            categoriesSelection
                .exit()
                .remove();
        }

        private renderLegend(): void {
            let legend = this.tornadoChartDataView.legend;
            if (!legend) {
                return;
            }
            let settings: TornadoChartSettings = this.tornadoChartDataView.settings;

            let legendData: LegendData = {
                title: legend.title,
                dataPoints: legend.dataPoints,
                fontSize: settings.legendFontSize,
                labelColor: settings.legendColor,
            };

            if (this.legendObjectProperties) {
                let position: string;

                LegendData.update(legendData, this.legendObjectProperties);

                position = <string>this.legendObjectProperties[legendProps.position];

                if (position) {
                    this.legend.changeOrientation(LegendPosition[position]);
                }
            }

            // Draw the legend on a viewport with the original height and width
            let viewport: IViewport = {
                height: this.viewport.height + this.margin.top + this.margin.bottom,
                width: this.viewport.width + this.margin.left + this.margin.right,
            };
            this.legend.drawLegend(legendData, viewport);
            Legend.positionChartArea(this.root, this.legend);

            if (legendData.dataPoints.length > 0 && settings.showLegend)
                this.updateViewport();
        }

        private getTextData(text: string, measureWidth: boolean = false, measureHeight: boolean = false, overrideFontSize?: number): TextData {
            let width: number = 0,
                height: number = 0,
                fontSize: string,
                textProperties: TextProperties;

            text = text || "";

            fontSize = overrideFontSize
                ? PixelConverter.fromPoint(overrideFontSize)
                : `${this.textOptions.fontSize}${this.textOptions.sizeUnit}`;

            textProperties = {
                text: text,
                fontFamily: this.textOptions.fontFamily,
                fontSize: fontSize
            };

            if (measureWidth) {
                width = TextMeasurementService.measureSvgTextWidth(textProperties);
            }

            if (measureHeight) {
                height = TextMeasurementService.estimateSvgTextHeight(textProperties);
            }

            return {
                text: text,
                width: width,
                height: height,
                textProperties: textProperties
            };
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder(),
                settings: TornadoChartSettings;

            if (!this.tornadoChartDataView ||
                !this.tornadoChartDataView.settings) {
                return [];
            }

            settings = this.tornadoChartDataView.settings;

            switch (options.objectName) {
                case "dataPoint": {
                    this.enumerateDataPoint(enumeration);
                    break;
                }
                case "categoryAxis": {
                    this.enumerateCategoryAxis(enumeration);
                    break;
                }
                case "labels": {
                    let labelSettings = settings.labelSettings;
                    let labels: VisualObjectInstance = {
                        objectName: "labels",
                        displayName: "Labels",
                        selector: null,
                        properties: {
                            show: labelSettings.show,
                            fontSize: labelSettings.fontSize,
                            labelPrecision: labelSettings.precision,
                            labelDisplayUnits: labelSettings.displayUnits,
                            insideFill: labelSettings.labelColor,
                            outsideFill: settings.labelOutsideFillColor
                        }
                    };

                    enumeration.pushInstance(labels);
                    break;
                }
                case "legend": {
                    if (!this.hasDynamicSeries)
                        return;

                    let showTitle: boolean = true,
                        titleText: string = "",
                        legend: VisualObjectInstance;

                    showTitle = DataViewObject.getValue<boolean>(
                        this.legendObjectProperties,
                        legendProps.showTitle,
                        showTitle);

                    titleText = DataViewObject.getValue<string>(
                        this.legendObjectProperties,
                        legendProps.titleText,
                        titleText);

                    legend = {
                        objectName: "legend",
                        displayName: "Legend",
                        selector: null,
                        properties: {
                            show: settings.showLegend,
                            position: LegendPosition[this.legend.getOrientation()],
                            showTitle: showTitle,
                            titleText: titleText,
                            fontSize: settings.legendFontSize,
                            labelColor: settings.legendColor,
                        }
                    };

                    enumeration.pushInstance(legend);
                    break;
                }
                case "categories": {
                    let categories: VisualObjectInstance = {
                        objectName: "categories",
                        displayName: "Categories",
                        selector: null,
                        properties: {
                            show: settings.showCategories,
                            fill: settings.categoriesFillColor
                        }
                    };

                    enumeration.pushInstance(categories);
                    break;
                }
            }

            return enumeration.complete();
        }

        private enumerateDataPoint(enumeration: ObjectEnumerationBuilder): void {
            if (!this.tornadoChartDataView ||
                !this.tornadoChartDataView.series) {
                return;
            }

            let series: TornadoChartSeries[] = this.tornadoChartDataView.series;

            for (let currentSeries of series) {
                enumeration.pushInstance({
                    objectName: "dataPoint",
                    displayName: currentSeries.name,
                    selector: ColorHelper.normalizeSelector(currentSeries.selectionId.getSelector(), false),
                    properties: {
                        fill: { solid: { color: currentSeries.fill } }
                    }
                });
            }
        }

        private enumerateCategoryAxis(enumeration: ObjectEnumerationBuilder): void {
            if (!this.tornadoChartDataView || !this.tornadoChartDataView.series)
                return;

            let series: TornadoChartSeries[] = this.tornadoChartDataView.series;

            for (let currentSeries of series) {
                enumeration.pushInstance({
                    objectName: "categoryAxis",
                    displayName: currentSeries.name,
                    selector: currentSeries.selectionId ? currentSeries.selectionId.getSelector() : null,
                    properties: {
                        end: currentSeries.categoryAxisEnd,
                    }
                });
            }
        }

        public destroy(): void {
            this.root = null;
        }
    }
}