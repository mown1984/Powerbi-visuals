
declare function requireAll(requireContext: any): any;

declare module powerbi.visuals.samples {
    import ArcDescriptor = D3.Layout.ArcDescriptor;
    interface AsterData {
        dataPoints: AsterDataPoint[];
        highlightedDataPoints?: AsterDataPoint[];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        legendSettings: AsterPlotLegendSettings;
        labelSettings: VisualDataLabelsSettings;
        showOuterLine: boolean;
        outerLineThickness: number;
    }
    interface AsterPlotLegendSettings {
        show: boolean;
        position: string;
        showTitle: boolean;
        labelColor: string;
        titleText: string;
        fontSize: number;
    }
    interface AsterArcDescriptor extends ArcDescriptor {
        isLabelHasConflict?: boolean;
    }
    interface AsterDataPoint extends SelectableDataPoint {
        color: string;
        sliceHeight: number;
        sliceWidth: number;
        label: string;
        highlight?: boolean;
        tooltipInfo: TooltipDataItem[];
        labelFontSize: string;
    }
    interface AsterPlotBehaviorOptions {
        selection: D3.Selection;
        highlightedSelection: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }
    class AsterPlotWarning implements IVisualWarning {
        private message;
        constructor(message: string);
        code: string;
        getMessages(resourceProvider: jsCommon.IStringResourceProvider): IVisualErrorMessage;
    }
    class AsterPlot implements IVisual {
        static capabilities: VisualCapabilities;
        private static Properties;
        private static AsterSlice;
        private static AsterHighlightedSlice;
        private static OuterLine;
        private static labelGraphicsContextClass;
        private static linesGraphicsContextClass;
        private static CenterLabelClass;
        private static CenterTextFontHeightCoefficient;
        private static CenterTextFontWidthCoefficient;
        private margin;
        private svg;
        private mainGroupElement;
        private mainLabelsElement;
        private centerText;
        private clearCatcher;
        private colors;
        private dataView;
        private hostService;
        private interactivityService;
        private legend;
        private data;
        private currentViewport;
        private behavior;
        private hasHighlights;
        private getDefaultAsterData();
        converter(dataView: DataView, colors: IDataColorPalette): AsterData;
        private dataViewContainsCategory(dataView);
        private getLabelSettings(objects, labelSettings);
        private updateLegendSettings(objects, catSource, legendSettings);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private renderArcsAndLabels(dataPoints, duration, labelSettings, isHighlight?);
        private getLabelLayout(labelSettings, arc, viewport);
        private drawLabels(data, context, layout, viewport, outlineArc, labelArc);
        private renderLegend(asterPlotData);
        private updateViewPortAccordingToLegend();
        private drawOuterLine(innerRadius, radius, data);
        private getCenterText(dataView);
        private drawCenterText(innerRadius);
        private getLabelFill(dataView);
        private dataViewContainsObjects(dataView);
        private enumerateLegend(instances);
        private clearData();
        onClearSelection(): void;
        private enumerateLabels(instances);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
    }
}

declare module powerbi.visuals.samples {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    interface TornadoChartTextOptions {
        fontFamily?: string;
        fontSize?: number;
        sizeUnit?: string;
    }
    interface TornadoChartConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
        columnPadding?: number;
    }
    interface TornadoChartSeries {
        fill: string;
        name: string;
        selectionId: SelectionId;
        categoryAxisEnd: number;
    }
    interface TornadoChartSettings {
        labelOutsideFillColor: string;
        categoriesFillColor: string;
        labelSettings: VisualDataLabelsSettings;
        showLegend?: boolean;
        showCategories?: boolean;
        legendFontSize?: number;
        legendColor?: string;
        labelValueFormatter?: IValueFormatter;
    }
    interface TornadoChartDataView {
        categories: TextData[];
        series: TornadoChartSeries[];
        settings: TornadoChartSettings;
        legend: LegendData;
        dataPoints: TornadoChartPoint[];
        highlightedDataPoints?: TornadoChartPoint[];
    }
    interface TornadoChartPoint extends SelectableDataPoint {
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
    interface LabelData {
        dx: number;
        value: number | string;
        source: number | string;
        color: string;
    }
    interface LineData {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
    interface TextData {
        text: string;
        height: number;
        width: number;
        textProperties: TextProperties;
    }
    interface TornadoBehaviorOptions {
        columns: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }
    class TornadoChartWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
    function getTornadoChartWarning(): IVisualWarning;
    class TornadoChart implements IVisual {
        private static ClassName;
        private static Properties;
        private static Columns;
        private static Column;
        private static Axes;
        private static Axis;
        private static Labels;
        private static Label;
        private static LabelTitle;
        private static LabelText;
        private static Categories;
        private static Category;
        private static CategoryTitle;
        private static CategoryText;
        private static MaxSeries;
        private static MaxPrecision;
        private static LabelPadding;
        private static CategoryMinHeight;
        private static DefaultFontSize;
        private static DefaultLegendFontSize;
        private static HighlightedShapeFactor;
        static ScrollBarWidth: number;
        static capabilities: VisualCapabilities;
        private DefaultTornadoChartSettings;
        private DefaultFillColors;
        private columnPadding;
        private leftLabelMargin;
        private durationAnimations;
        private InnerTextHeightDelta;
        private textOptions;
        private margin;
        private root;
        private svg;
        private main;
        private columns;
        private axes;
        private labels;
        private categories;
        private clearCatcher;
        private legendObjectProperties;
        private legend;
        private hasDynamicSeries;
        private hasHighlights;
        private behavior;
        private colors;
        private interactivityService;
        private animator;
        private hostService;
        private scrolling;
        private viewport;
        private tornadoChartDataView;
        private defaultTornadoChartDataView;
        private labelHeight;
        private heightColumn;
        private widthLeftSection;
        private widthRightSection;
        constructor(tornadoChartConstructorOptions?: TornadoChartConstructorOptions);
        init(visualInitOptions: VisualInitOptions): void;
        update(visualUpdateOptions: VisualUpdateOptions): void;
        private updateElements();
        converter(dataView: DataView): TornadoChartDataView;
        private parseSettings(objects, formatString, value);
        private getColor(properties, defaultColor, objects);
        private getPrecision(objects);
        private getObjectsFromDataView(dataView);
        /**
         * Public for testability.
         */
        parseSeries(dataViewValueColumns: DataViewValueColumns, index: number, isGrouped: boolean, columnGroup: DataViewValueColumnGroup): TornadoChartSeries;
        private getLegendData(series);
        private clearData();
        onClearSelection(): void;
        private render();
        private renderWithScrolling(tornadoChartDataView, scrollStart, scrollEnd);
        private updateViewport();
        private computeHeightColumn();
        private renderMiddleSection(scrollBarWidth);
        /**
         * Calculate the width, dx value and label info for every data point
         */
        private calculateDataPoints(dataPoints, scrollBarWidth);
        private renderColumns(columnsData, selectSecondSeries?);
        private renderTooltip(selection);
        private getColumnWidth(value, minValue, maxValue, width);
        private getLabelData(value, dxColumn, columnWidth, isColumnPositionLeft, formatStringProp, settings?);
        private renderAxes();
        private generateAxesData();
        private renderLabels(dataPoints, labelsSettings);
        private renderCategories();
        private renderLegend();
        private getTextData(text, measureWidth?, measureHeight?, overrideFontSize?);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private enumerateDataPoint(enumeration);
        private enumerateCategoryAxis(enumeration);
        destroy(): void;
    }
}

declare module powerbi.visuals.samples {
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import ISize = shapes.ISize;
    const enum MekkoChartType {
        HundredPercentStackedColumn = 0,
    }
    interface MekkoColumnChartDrawInfo {
        shapesSelection: D3.Selection;
        viewport: IViewport;
        axisOptions: MekkoColumnAxisOptions;
        labelDataPoints: MekkoLabelDataPoint[];
    }
    interface MekkoLabelDataPointsGroup {
        labelDataPoints: MekkoLabelDataPoint[];
        maxNumberOfLabels: number;
    }
    interface MekkoLabelParentRect {
        /** The rectangle this data label belongs to */
        rect: IRect;
        /** The orientation of the parent rectangle */
        orientation: NewRectOrientation;
        /** Valid positions to place the label ordered by preference */
        validPositions: RectLabelPosition[];
    }
    interface MekkoLabelDataPoint {
        isParentRect?: boolean;
        /** Text to be displayed in the label */
        text: string;
        /** The measured size of the text */
        textSize: ISize;
        /** Is data label preferred? Preferred labels will be rendered first */
        isPreferred: boolean;
        /** Color to use for the data label if drawn inside */
        insideFill: string;
        /** Color to use for the data label if drawn outside */
        outsideFill: string;
        /** Whether or not the data label has been rendered */
        hasBeenRendered?: boolean;
        /** Whether the parent type is a rectangle, point or polygon */
        parentType: LabelDataPointParentType;
        /** The parent geometry for the data label */
        parentShape: MekkoLabelParentRect;
        /** The identity of the data point associated with the data label */
        identity: powerbi.visuals.SelectionId;
        /** The font size of the data point associated with the data label */
        fontSize?: number;
        /** Second row of text to be displayed in the label, for additional information */
        secondRowText?: string;
        /** The calculated weight of the data point associated with the data label */
        weight?: number;
    }
    interface MekkoVisualRenderResult {
        dataPoints: SelectableDataPoint[];
        behaviorOptions: any;
        labelDataPoints: MekkoLabelDataPoint[];
        labelsAreNumeric: boolean;
        labelDataPointGroups?: MekkoLabelDataPointsGroup[];
    }
    interface MekkoCalculateScaleAndDomainOptions extends CalculateScaleAndDomainOptions {
    }
    interface MekkoConstructorOptions {
        chartType: MekkoChartType;
        isScrollable?: boolean;
        animator?: IGenericAnimator;
        cartesianSmallViewPortProperties?: CartesianSmallViewPortProperties;
        behavior?: IInteractiveBehavior;
    }
    interface MekkoColumnChartData extends ColumnChartData {
        borderSettings: MekkoBorderSettings;
        categoriesWidth: number[];
    }
    interface MekkoBorderSettings {
        show: boolean;
        color: any;
        width: number;
        maxWidth?: number;
    }
    interface MekkoLabelSettings {
        maxPrecision: number;
        minPrecision: number;
    }
    interface MekkoColumnAxisOptions extends ColumnAxisOptions {
    }
    interface IMekkoColumnLayout extends IColumnLayout {
        shapeBorder?: {
            width: (d: ColumnChartDataPoint) => number;
            x: (d: ColumnChartDataPoint) => number;
            y: (d: ColumnChartDataPoint) => number;
            height: (d: ColumnChartDataPoint) => number;
        };
        shapeXAxis?: {
            width: (d: ColumnChartDataPoint) => number;
            x: (d: ColumnChartDataPoint) => number;
            y: (d: ColumnChartDataPoint) => number;
            height: (d: ColumnChartDataPoint) => number;
        };
    }
    interface MekkoAxisRenderingOptions {
        axisLabels: ChartAxesLabels;
        legendMargin: number;
        viewport: IViewport;
        margin: IMargin;
        hideXAxisTitle: boolean;
        hideYAxisTitle: boolean;
        hideY2AxisTitle?: boolean;
        xLabelColor?: Fill;
        yLabelColor?: Fill;
        y2LabelColor?: Fill;
    }
    interface MekkoDataPoints {
        categoriesWidth: number[];
        series: ColumnChartSeries[];
        hasHighlights: boolean;
        hasDynamicSeries: boolean;
    }
    interface MekkoLegendDataPoint extends LegendDataPoint {
        fontSize?: number;
    }
    interface MekkoCreateAxisOptions extends CreateAxisOptions {
        formatString: string;
        is100Pct?: boolean;
        shouldClamp?: boolean;
        formatStringProp?: DataViewObjectPropertyIdentifier;
    }
    interface MekkoColumnChartContext extends ColumnChartContext {
        height: number;
        width: number;
        duration: number;
        margin: IMargin;
        mainGraphicsContext: D3.Selection;
        labelGraphicsContext: D3.Selection;
        layout: CategoryLayout;
        animator: IColumnChartAnimator;
        onDragStart?: (datum: ColumnChartDataPoint) => void;
        interactivityService: IInteractivityService;
        viewportHeight: number;
        viewportWidth: number;
        is100Pct: boolean;
        hostService: IVisualHostServices;
        isComboChart: boolean;
    }
    class MekkoDataWrapper {
        private data;
        private isScalar;
        constructor(columnChartData: CartesianData, isScalar: boolean);
        lookupXValue(index: number, type: ValueType): any;
    }
    class MekkoColumnChartStrategy implements IMekkoColumnChartStrategy {
        private static classes;
        private layout;
        private data;
        private graphicsContext;
        private width;
        private height;
        private margin;
        private xProps;
        private yProps;
        private categoryLayout;
        private columnsCenters;
        private columnSelectionLineHandle;
        private animator;
        private interactivityService;
        private viewportHeight;
        private viewportWidth;
        private static validLabelPositions;
        setupVisualProps(columnChartProps: MekkoColumnChartContext): void;
        setData(data: MekkoColumnChartData): void;
        private static createFormatter(scaleDomain, dataDomain, dataType, isScalar, formatString, bestTickCount, tickValues, getValueFn, useTickIntervalForDisplayUnits?);
        /**
         * Format the linear tick labels or the category labels.
         */
        private static formatAxisTickValues(axis, tickValues, formatter, dataType, isScalar, getValueFn?);
        /**
         * Create a D3 axis including scale. Can be vertical or horizontal, and either datetime, numeric, or text.
         * @param options The properties used to create the axis.
         */
        private createAxis(options);
        private getCategoryAxis(data, size, layout, isVertical, forcedXMin?, forcedXMax?, axisScaleType?);
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string): IAxisProperties;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string): IAxisProperties;
        drawColumns(useAnimation: boolean): MekkoColumnChartDrawInfo;
        private static drawDefaultShapes(data, series, layout, itemCS, filterZeros, hasSelection);
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
        /**
         * Get the chart's columns centers (x value).
         */
        private getColumnsCenters();
        private moveHandle(selectedColumnIndex);
        static getLayout(data: MekkoColumnChartData, axisOptions: MekkoColumnAxisOptions): IMekkoColumnLayout;
        private createMekkoLabelDataPoints();
    }
    interface MekkoChartSettings {
        columnBorder: MekkoBorderSettings;
        labelSettings: MekkoLabelSettings;
    }
    /**
     * Renders a data series as a cartestian visual.
     */
    class MekkoChart implements IVisual {
        static capabilities: VisualCapabilities;
        private static properties;
        static DefaultSettings: MekkoChartSettings;
        private static getTextProperties(fontSize?);
        static MinOrdinalRectThickness: number;
        static MinScalarRectThickness: number;
        static OuterPaddingRatio: number;
        static InnerPaddingRatio: number;
        static TickLabelPadding: number;
        private static ClassName;
        private static AxisGraphicsContextClassName;
        private static MaxMarginFactor;
        private static MinBottomMargin;
        private static LeftPadding;
        private static RightPadding;
        private static BottomPadding;
        private static YAxisLabelPadding;
        private static XAxisLabelPadding;
        private static TickPaddingY;
        private static TickPaddingRotatedX;
        private static FontSize;
        static MaxNumberOfLabels: number;
        private static MinWidth;
        private static MinHeight;
        private axisGraphicsContext;
        private xAxisGraphicsContext;
        private y1AxisGraphicsContext;
        private y2AxisGraphicsContext;
        private element;
        private svg;
        private clearCatcher;
        private margin;
        private type;
        private hostServices;
        private layers;
        private legend;
        private legendMargins;
        private layerLegendData;
        private hasSetData;
        private visualInitOptions;
        private borderObjectProperties;
        private legendObjectProperties;
        private categoryAxisProperties;
        private valueAxisProperties;
        private cartesianSmallViewPortProperties;
        private interactivityService;
        private behavior;
        private y2AxisExists;
        private categoryAxisHasUnitType;
        private valueAxisHasUnitType;
        private hasCategoryAxis;
        private yAxisIsCategorical;
        private secValueAxisHasUnitType;
        private axes;
        private yAxisOrientation;
        private bottomMarginLimit;
        private leftRightMarginLimit;
        private sharedColorPalette;
        animator: IGenericAnimator;
        private isScrollable;
        private scrollY;
        private scrollX;
        private isXScrollBarVisible;
        private isYScrollBarVisible;
        private svgScrollable;
        private axisGraphicsContextScrollable;
        private labelGraphicsContextScrollable;
        private brushGraphicsContext;
        private brush;
        private static ScrollBarWidth;
        private dataViews;
        private currentViewport;
        constructor(options: MekkoConstructorOptions);
        init(options: VisualInitOptions): void;
        private renderAxesLabels(options);
        private adjustMargins(viewport);
        private translateAxes(viewport);
        static getIsScalar(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, type: ValueType): boolean;
        private populateObjectProperties(dataViews);
        update(options: VisualUpdateOptions): void;
        static parseLabelSettings(objects: DataViewObjects): VisualDataLabelsSettings;
        static parseBorderSettings(objects: DataViewObjects): MekkoBorderSettings;
        private enumerateBorder(enumeration);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private shouldShowLegendCard();
        private getCategoryAxisValues(enumeration);
        private getValueAxisValues(enumeration);
        onClearSelection(): void;
        private createAndInitLayers(dataViews);
        private renderLegend();
        private hideLegends();
        private addUnitTypeToAxisLabel(axes);
        private shouldRenderSecondaryAxis(axisProperties);
        private shouldRenderAxis(axisProperties, propertyName?);
        private render(suppressAnimations);
        private hideAxisLabels(legendMargins);
        private static getUnitType(axis, axisPropertiesLookup);
        private getMaxMarginFactor();
        private static getChartViewport(viewport, margin);
        private static wordBreak(text, axisProperties, columnsWidth, maxHeight, borderWidth);
        private renderChart(mainAxisScale, axes, width, tickLabelMargins, chartHasAxisLabels, axisLabels, viewport, suppressAnimations, scrollScale?, extent?);
        /**
         * Within the context of the given selection (g), find the offset of
         * the zero tick using the d3 attached datum of g.tick elements.
         * 'Classed' is undefined for transition selections
         */
        private static darkenZeroLine(g);
        private static setAxisLabelColor(g, fill);
        private static setAxisLabelFontSize(g, fontSize);
        private static moveBorder(g, scale, borderWidth, yOffset?);
    }
    function createLayers(type: MekkoChartType, objects: DataViewObjects, interactivityService: IInteractivityService, animator?: any, isScrollable?: boolean): IMekkoColumnChartVisual[];
    /**
     * Renders a stacked and clustered column chart.
     */
    interface IMekkoColumnChartVisual {
        getColumnsWidth(): number[];
        getBorderWidth(): number;
        init(options: CartesianVisualInitOptions): void;
        setData(dataViews: DataView[], resized?: boolean): void;
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): MekkoVisualRenderResult;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        onClearSelection(): void;
        enumerateObjectInstances?(enumeration: ObjectEnumerationBuilder, options: EnumerateVisualObjectInstancesOptions): void;
        getVisualCategoryAxisIsScalar?(): boolean;
        getSupportedCategoryAxisType?(): string;
        getPreferredPlotArea?(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        setFilteredData?(startIndex: number, endIndex: number): CartesianData;
    }
    interface IMekkoColumnChartStrategy {
        drawColumns(useAnimation: boolean): MekkoColumnChartDrawInfo;
        setData(data: ColumnChartData): void;
        setupVisualProps(columnChartProps: ColumnChartContext): void;
        setXScale(is100Pct: boolean, forcedTickCount?: number, forcedXDomain?: any[], axisScaleType?: string, axisDisplayUnits?: number, axisPrecision?: number): IAxisProperties;
        setYScale(is100Pct: boolean, forcedTickCount?: number, forcedYDomain?: any[], axisScaleType?: string, axisDisplayUnits?: number, axisPrecision?: number): IAxisProperties;
        selectColumn(selectedColumnIndex: number, lastSelectedColumnIndex: number): void;
        getClosestColumnIndex(x: number, y: number): number;
    }
    class MekkoColumnChart implements IMekkoColumnChartVisual {
        private static ColumnChartClassName;
        static SeriesClasses: ClassAndSelector;
        static BorderClass: ClassAndSelector;
        private svg;
        private unclippedGraphicsContext;
        private mainGraphicsContext;
        private labelGraphicsContext;
        private xAxisProperties;
        private yAxisProperties;
        private currentViewport;
        private data;
        private style;
        private colors;
        private chartType;
        private columnChart;
        private hostService;
        private cartesianVisualHost;
        private interactivity;
        private margin;
        private options;
        private lastInteractiveSelectedColumnIndex;
        private supportsOverflow;
        private interactivityService;
        private dataViewCat;
        private categoryAxisType;
        private animator;
        private isScrollable;
        private element;
        constructor(options: ColumnChartConstructorOptions);
        init(options: CartesianVisualInitOptions): void;
        private getCategoryLayout(numCategoryValues, options);
        static getBorderWidth(border: MekkoBorderSettings): number;
        static getBorderColor(border: MekkoBorderSettings): any;
        static converter(dataView: DataViewCategorical, colors: IDataColorPalette, is100PercentStacked?: boolean, isScalar?: boolean, supportsOverflow?: boolean, dataViewMetadata?: DataViewMetadata, chartType?: ColumnChartType): MekkoColumnChartData;
        private static getStackedMultiplier(rawValues, rowIdx, seriesCount, categoryCount);
        private static createDataPoints(dataViewCat, categories, categoryIdentities, legend, seriesObjectsList, converterStrategy, defaultLabelSettings, is100PercentStacked?, isScalar?, supportsOverflow?, isCategoryAlsoSeries?, categoryObjectsList?, defaultDataPointColor?, chartType?, categoryMetadata?);
        private static getDataPointColor(legendItem, categoryIndex, dataPointObjects?);
        private static getStackedLabelColor(isNegative, seriesIndex, seriesCount, categoryIndex, rawValues);
        static sliceSeries(series: ColumnChartSeries[], endIndex: number, startIndex?: number): ColumnChartSeries[];
        static getInteractiveColumnChartDomElement(element: JQuery): HTMLElement;
        getColumnsWidth(): number[];
        getBorderWidth(): number;
        setData(dataViews: DataView[]): void;
        calculateLegend(): LegendData;
        hasLegend(): boolean;
        enumerateObjectInstances(enumeration: ObjectEnumerationBuilder, options: EnumerateVisualObjectInstancesOptions): void;
        private enumerateDataLabels(enumeration);
        private getLabelSettingsOptions(enumeration, labelSettings, isSeries, series?);
        private enumerateDataPoints(enumeration);
        calculateAxesProperties(options: MekkoCalculateScaleAndDomainOptions): IAxisProperties[];
        getPreferredPlotArea(isScalar: boolean, categoryCount: number, categoryThickness: number): IViewport;
        private ApplyInteractivity(chartContext);
        private selectColumn(indexOfColumnSelected, force?);
        private createInteractiveMekkoLegendDataPoints(columnIndex);
        overrideXScale(xProperties: IAxisProperties): void;
        render(suppressAnimations: boolean): MekkoVisualRenderResult;
        onClearSelection(): void;
        getVisualCategoryAxisIsScalar(): boolean;
        getSupportedCategoryAxisType(): string;
        setFilteredData(startIndex: number, endIndex: number): CartesianData;
    }
    interface MekkoBehaviorOptions {
        layerOptions: any[];
        clearCatcher: D3.Selection;
    }
    class MekkoChartBehavior implements IInteractiveBehavior {
        private behaviors;
        constructor(behaviors: IInteractiveBehavior[]);
        bindEvents(options: MekkoBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
}

declare module powerbi.visuals.samples {
    interface SankeyDiagramConstructorOptions {
        svg?: D3.Selection;
        margin?: IMargin;
        curvatureOfLinks?: number;
    }
    interface SankeyDiagramLabel {
        name: string;
        formattedName: string;
        width: number;
        height: number;
        colour: string;
    }
    interface SankeyDiagramTooltipData {
        tooltipData: TooltipDataItem[];
    }
    interface SankeyDiagramScale {
        x: number;
        y: number;
    }
    interface SankeyDiagramSettings {
        scale?: SankeyDiagramScale;
        fontSize: number;
        isVisibleLabels?: boolean;
        colourOfLabels: string;
    }
    interface SankeyDiagramNode extends SankeyDiagramTooltipData {
        label: SankeyDiagramLabel;
        inputWeight: number;
        outputWeight: number;
        links: SankeyDiagramLink[];
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        colour: string;
        selectionIds: SelectionId[];
    }
    interface SankeyDiagramLink extends SankeyDiagramTooltipData {
        source: SankeyDiagramNode;
        destination: SankeyDiagramNode;
        weigth: number;
        height?: number;
        dySource?: number;
        dyDestination?: number;
        colour: string;
        selectionId: SelectionId;
    }
    interface SankeyDiagramDataView {
        nodes: SankeyDiagramNode[];
        links: SankeyDiagramLink[];
        settings: SankeyDiagramSettings;
    }
    interface SankeyDiagramRoleNames {
        rows: string;
        columns: string;
        values: string;
    }
    class SankeyDiagram implements IVisual {
        private static ClassName;
        private static Nodes;
        private static Node;
        private static NodeRect;
        private static NodeLabel;
        private static Links;
        private static Link;
        private static DefaultColourOfNode;
        private static DefaultColourOfLink;
        private static DefaultSettings;
        private static MinWidthOfLabel;
        private static NodePadding;
        private static LabelPadding;
        static RoleNames: SankeyDiagramRoleNames;
        static capabilities: VisualCapabilities;
        private static Properties;
        static getProperties(capabilities: VisualCapabilities): any;
        private margin;
        private nodeWidth;
        private curvatureOfLinks;
        private root;
        private svg;
        private main;
        private nodes;
        private links;
        private colours;
        private viewport;
        private textProperties;
        private dataView;
        private selectionManager;
        constructor(constructorOptions?: SankeyDiagramConstructorOptions);
        init(visualsInitOptions: VisualInitOptions): void;
        update(visualUpdateOptions: VisualUpdateOptions): void;
        private updateViewport(viewport);
        private getPositiveNumber(value);
        private updateElements(height, width);
        converter(dataView: DataView): SankeyDiagramDataView;
        private getObjectsFromDataView(dataView);
        private getColour(properties, defaultColor, objects);
        private getTooltipDataForLink(valueFormatter, sourceNodeName, destinationNodeName, linkWeight);
        private updateValueOfNode(node);
        private getTooltipForNode(valueFormatter, nodeName, nodeWeight);
        private parseSettings(objects);
        private findNodePosition(sankeyDiagramDataView);
        private findNodePositionByX(sankeyDiagramDataView);
        private scaleByAxisX(nodes, scale);
        private getScaleByAxisX(numberOfColumns?);
        private findNodePositionByY(sankeyDiagramDataView);
        private getScaleByAxisY(numberOfRows, sumValueOfNodes);
        private scaleByAxisY(nodes, links, scale);
        private render(sankeyDiagramDataView);
        private renderNodes(sankeyDiagramDataView);
        private getLabelPositionByAxisX(node);
        private isLabelLargerWidth(node);
        private getCurrentPositionOfLabelByAxisX(node);
        private renderLinks(sankeyDiagramDataView);
        private getSvgPath(link);
        private renderTooltip(selection);
        private bindSelectionHandler(sankeyDiagramDataView, nodesSelection, linksSelection);
        private selectMany(selectionIds, clear?);
        private setSelection(nodes, links);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private enumerateLabels(enumeration);
        private enumerateLinks(enumeration);
    }
}

declare module powerbi.visuals.samples {
    let bulletChartProps: {
        values: {
            targetValue: DataViewObjectPropertyIdentifier;
            minimumPercent: DataViewObjectPropertyIdentifier;
            needsImprovementPercent: DataViewObjectPropertyIdentifier;
            satisfactoryPercent: DataViewObjectPropertyIdentifier;
            goodPercent: DataViewObjectPropertyIdentifier;
            veryGoodPercent: DataViewObjectPropertyIdentifier;
            maximumPercent: DataViewObjectPropertyIdentifier;
            targetValue2: DataViewObjectPropertyIdentifier;
        };
        orientation: {
            orientation: DataViewObjectPropertyIdentifier;
        };
        colors: {
            badColor: DataViewObjectPropertyIdentifier;
            needsImprovementColor: DataViewObjectPropertyIdentifier;
            satisfactoryColor: DataViewObjectPropertyIdentifier;
            goodColor: DataViewObjectPropertyIdentifier;
            veryGoodColor: DataViewObjectPropertyIdentifier;
            bulletColor: DataViewObjectPropertyIdentifier;
        };
        axis: {
            axis: DataViewObjectPropertyIdentifier;
            axisColor: DataViewObjectPropertyIdentifier;
            measureUnits: DataViewObjectPropertyIdentifier;
            unitsColor: DataViewObjectPropertyIdentifier;
        };
        formatString: DataViewObjectPropertyIdentifier;
        labels: {
            fontSize: DataViewObjectPropertyIdentifier;
            show: DataViewObjectPropertyIdentifier;
            labelColor: DataViewObjectPropertyIdentifier;
        };
    };
    interface BarData {
        scale: any;
        barIndex: number;
        categoryLabel: string;
        axis: any;
        x: number;
        y: number;
        key: string;
    }
    interface BarRect extends SelectableDataPoint {
        barIndex: number;
        start: number;
        end: number;
        fill: string;
        tooltipInfo?: TooltipDataItem[];
        key: string;
    }
    interface TargetValue {
        barIndex: number;
        value: number;
        value2: number;
        fill: string;
        key: string;
    }
    interface ScaledValues {
        firstScale: number;
        secondScale: number;
        thirdScale: number;
        fourthScale: number;
        fifthScale: number;
    }
    interface BarValueRect extends BarRect {
    }
    interface BulletChartSettings {
        values: {
            targetValue: number;
            minimumPercent: number;
            needsImprovementPercent: number;
            satisfactoryPercent: number;
            goodPercent: number;
            veryGoodPercent: number;
            maximumPercent: number;
            targetValue2: number;
        };
        orientation: {
            orientation: string;
            reverse: boolean;
            vertical: boolean;
        };
        colors: {
            badColor: string;
            needsImprovementColor: string;
            satisfactoryColor: string;
            goodColor: string;
            veryGoodColor: string;
            bulletColor: string;
        };
        axis: {
            axis: boolean;
            axisColor: string;
            measureUnits: string;
            unitsColor: string;
        };
        labelSettings: VisualDataLabelsSettings;
    }
    interface BulletChartModel {
        bars: BarData[];
        bulletChartSettings: BulletChartSettings;
        bulletValueFormatString: string;
        barRects: BarRect[];
        valueRects: BarValueRect[];
        targetValues: TargetValue[];
    }
    let bulletChartRoleNames: {
        value: string;
        targetValue: string;
        minValue: string;
        needsImprovementValue: string;
        satisfactoryValue: string;
        goodValue: string;
        veryGoodValue: string;
        maxValue: string;
        targetValue2: string;
    };
    class BulletChart implements IVisual {
        private static ScrollBarSize;
        private static SpaceRequiredForBar;
        private static SpaceRequiredForBarVertically;
        private static StartMarginHorizontal;
        private static StartMarginVertical;
        private static BulletSize;
        private static DefaultSubtitleFontSizeInPt;
        private static BarMargin;
        private static MaxLabelWidth;
        private static MaxLabelHeight;
        private static SubtitleMargin;
        private static AxisFontSizeInPt;
        private static BiggestLabelWidth;
        private static BiggestLabelHeight;
        private static MarkerMarginHorizontal;
        private static MarkerMarginVertical;
        private static FontFamily;
        private baselineDelta;
        static capabilities: VisualCapabilities;
        private clearCatcher;
        private bulletBody;
        private scrollContainer;
        private labelGraphicsContext;
        private bulletGraphicsContext;
        private model;
        private behavior;
        private interactivityService;
        private hostService;
        private reverse;
        private vertical;
        static DefaultStyleProperties(): BulletChartSettings;
        private viewport;
        private viewportIn;
        private viewportScroll;
        private static getTextProperties(text, fontSize);
        static converter(dataView: DataView, options: VisualUpdateOptions): BulletChartModel;
        private static addItemToBarArray(collection, barIndex, start, end, fill, tooltipInfo?, categoryIdentity?);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private ClearViewport();
        private calculateLabelWidth(barData, bar?, reversed?);
        private calculateLabelHeight(barData, bar?, reversed?);
        private setUpBulletsHorizontally(bulletBody, model, reveresed);
        private setUpBulletsVertically(bulletBody, model, reveresed);
        destroy(): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateLabels(data);
        private enumerateValues(data);
        private enumerateOrientation(data);
        private enumerateAxis(data);
        private enumerateColors(data);
    }
    module TextMeasurementHelper {
        function estimateSvgTextBaselineDelta(textProperties: TextProperties): number;
    }
    interface BulletBehaviorOptions {
        rects: D3.Selection;
        valueRects: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
        bulletChartSettings: BulletChartSettings;
        hasHighlights: boolean;
    }
    class BulletWebBehavior implements IInteractiveBehavior {
        private options;
        bindEvents(options: BulletBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
}

declare module powerbi.visuals.samples {
    enum WordCloudScaleType {
        logn = 0,
        sqrt = 1,
        value = 2,
    }
    interface WordCloudText {
        text: string;
        count: number;
        index: number;
        selectionId: SelectionId;
        color: string;
    }
    interface WordCloudDataPoint extends IPoint {
        text: string;
        xOff: number;
        yOff: number;
        rotate?: number;
        size: number;
        padding: number;
        width: number;
        height: number;
        sprite?: number[];
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        color: string;
        selectionId: SelectionId;
        wordIndex: number;
    }
    interface WordCloudData {
        settings: WordCloudSettings;
        texts: WordCloudText[];
    }
    interface WordCloudDataView {
        data: WordCloudDataPoint[];
        leftBorder: IPoint;
        rightBorder: IPoint;
    }
    interface WordCloudConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
    }
    interface WordCloudSettings {
        minFontSize: number;
        maxFontSize: number;
        minAngle?: number;
        maxAngle?: number;
        maxNumberOfOrientations?: number;
        valueFormatter?: IValueFormatter;
        isRotateText: boolean;
        isBrokenText: boolean;
        isRemoveStopWords: boolean;
        stopWords: string;
        isDefaultStopWords: boolean;
        stopWordsArray: string[];
        maxNumberOfWords: number;
    }
    class WordCloud implements IVisual {
        private static ClassName;
        private static Properties;
        private static Words;
        private static Word;
        private static Size;
        private static StopWordsDelemiter;
        private static Radians;
        private static MinAngle;
        private static MaxAngle;
        private static MaxNumberOfWords;
        private static MinOpacity;
        private static MaxOpacity;
        static capabilities: VisualCapabilities;
        private static Punctuation;
        private static StopWords;
        private static DefaultSettings;
        private static RenderDelay;
        private static DefaultMargin;
        private settings;
        private wordCloudTexts;
        private wordCloudDataView;
        private data;
        private dataBeforeRender;
        private durationAnimations;
        private specialViewport;
        private fakeViewport;
        private canvasViewport;
        static colors: IDataColorPalette;
        private root;
        private svg;
        private main;
        private wordsContainerSelection;
        private wordsSelection;
        private canvas;
        private fontFamily;
        private animator;
        private layout;
        private hostService;
        private selectionManager;
        private visualUpdateOptions;
        constructor(options?: WordCloudConstructorOptions);
        init(options: VisualInitOptions): void;
        converter(dataView: DataView): WordCloudData;
        private getColor(properties, defaultColor, objects);
        private static parseSettings(dataView, value);
        private static getNumberFromObjects(objects, properties, defaultValue);
        private parseNumber(value, defaultValue?, minValue?, maxValue?);
        private computePositions(words, onPositionsComputed);
        private computeCycle(words, context, surface, borders, onPositionsComputed, wordsForDraw?, index?);
        private updateBorders(word, borders);
        private generateSprites(context, currentWord, words, index);
        private findPosition(surface, word, borders);
        private archimedeanSpiral(value);
        private checkIntersect(word, surface);
        private checkIntersectOfRectangles(word, leftBorder, rightBorder);
        private getCanvasContext();
        private getReducedText(texts);
        private getBrokenWords(words);
        private getWords(values);
        private getFontSize(value, minValue, maxValue, scaleType?);
        private getAngle();
        update(visualUpdateOptions: VisualUpdateOptions): void;
        private UpdateSize();
        private render(wordCloudDataView);
        private setSelection(selection);
        private setOpacity(element, opacityValue, disableAnimation?);
        private scaleMainView(wordCloudDataView, durationAnimation?);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private animation(element, duration?, callback?);
        destroy(): void;
    }
}

declare module powerbi.visuals.samples {
    interface ITableView {
        data(data: any[], dataIdFunction: (d) => {}, dataAppended: boolean): ITableView;
        rowHeight(rowHeight: number): ITableView;
        columnWidth(columnWidth: number): ITableView;
        orientation(orientation: string): ITableView;
        rows(rows: number): ITableView;
        columns(columns: number): ITableView;
        viewport(viewport: IViewport): ITableView;
        render(): void;
        empty(): void;
    }
    module TableViewFactory {
        function createTableView(options: any): ITableView;
    }
    interface TableViewViewOptions {
        enter: (selection: D3.Selection) => void;
        exit: (selection: D3.Selection) => void;
        update: (selection: D3.Selection) => void;
        loadMoreData: () => void;
        baseContainer: D3.Selection;
        rowHeight: number;
        columnWidth: number;
        orientation: string;
        rows: number;
        columns: number;
        viewport: IViewport;
        scrollEnabled: boolean;
    }
    var chicletSlicerProps: {
        general: {
            orientation: DataViewObjectPropertyIdentifier;
            columns: DataViewObjectPropertyIdentifier;
            rows: DataViewObjectPropertyIdentifier;
            showDisabled: DataViewObjectPropertyIdentifier;
            multiselect: DataViewObjectPropertyIdentifier;
            selection: DataViewObjectPropertyIdentifier;
        };
        header: {
            show: DataViewObjectPropertyIdentifier;
            title: DataViewObjectPropertyIdentifier;
            fontColor: DataViewObjectPropertyIdentifier;
            background: DataViewObjectPropertyIdentifier;
            outline: DataViewObjectPropertyIdentifier;
            textSize: DataViewObjectPropertyIdentifier;
            outlineColor: DataViewObjectPropertyIdentifier;
            outlineWeight: DataViewObjectPropertyIdentifier;
        };
        rows: {
            fontColor: DataViewObjectPropertyIdentifier;
            textSize: DataViewObjectPropertyIdentifier;
            height: DataViewObjectPropertyIdentifier;
            width: DataViewObjectPropertyIdentifier;
            background: DataViewObjectPropertyIdentifier;
            transparency: DataViewObjectPropertyIdentifier;
            selectedColor: DataViewObjectPropertyIdentifier;
            hoverColor: DataViewObjectPropertyIdentifier;
            unselectedColor: DataViewObjectPropertyIdentifier;
            disabledColor: DataViewObjectPropertyIdentifier;
            outline: DataViewObjectPropertyIdentifier;
            outlineColor: DataViewObjectPropertyIdentifier;
            outlineWeight: DataViewObjectPropertyIdentifier;
            borderStyle: DataViewObjectPropertyIdentifier;
        };
        images: {
            imageSplit: DataViewObjectPropertyIdentifier;
            stretchImage: DataViewObjectPropertyIdentifier;
            bottomImage: DataViewObjectPropertyIdentifier;
        };
        selectedPropertyIdentifier: DataViewObjectPropertyIdentifier;
        filterPropertyIdentifier: DataViewObjectPropertyIdentifier;
        formatString: DataViewObjectPropertyIdentifier;
        hasSavedSelection: boolean;
    };
    interface ChicletSlicerConstructorOptions {
        behavior?: ChicletSlicerWebBehavior;
    }
    interface ChicletSlicerData {
        categorySourceName: string;
        formatString: string;
        slicerDataPoints: ChicletSlicerDataPoint[];
        slicerSettings: ChicletSlicerSettings;
        hasSelectionOverride?: boolean;
    }
    interface ChicletSlicerDataPoint extends SelectableDataPoint {
        category?: string;
        value?: number;
        mouseOver?: boolean;
        mouseOut?: boolean;
        isSelectAllDataPoint?: boolean;
        imageURL?: string;
        selectable?: boolean;
    }
    interface ChicletSlicerSettings {
        general: {
            orientation: string;
            columns: number;
            rows: number;
            multiselect: boolean;
            showDisabled: string;
            selection: string;
            getSavedSelection?: () => string[];
            setSavedSelection?: (selectionIds: string[]) => void;
        };
        margin: IMargin;
        header: {
            borderBottomWidth: number;
            show: boolean;
            outline: string;
            fontColor: string;
            background?: string;
            textSize: number;
            outlineColor: string;
            outlineWeight: number;
            title: string;
        };
        headerText: {
            marginLeft: number;
            marginTop: number;
        };
        slicerText: {
            textSize: number;
            height: number;
            width: number;
            fontColor: string;
            selectedColor: string;
            hoverColor: string;
            unselectedColor: string;
            disabledColor: string;
            marginLeft: number;
            outline: string;
            background?: string;
            transparency: number;
            outlineColor: string;
            outlineWeight: number;
            borderStyle: string;
        };
        slicerItemContainer: {
            marginTop: number;
            marginLeft: number;
        };
        images: {
            imageSplit: number;
            stretchImage: boolean;
            bottomImage: boolean;
        };
    }
    class ChicletSlicer implements IVisual {
        static capabilities: VisualCapabilities;
        private element;
        private currentViewport;
        private dataView;
        private slicerHeader;
        private slicerBody;
        private tableView;
        private slicerData;
        private settings;
        private interactivityService;
        private behavior;
        private hostServices;
        private waitingForData;
        private isSelectionLoaded;
        private isSelectionSaved;
        static DefaultFontFamily: string;
        static DefaultFontSizeInPt: number;
        private static cellTotalInnerPaddings;
        private static cellTotalInnerBorders;
        private static chicletTotalInnerRightLeftPaddings;
        private static ItemContainer;
        private static HeaderText;
        private static Container;
        private static LabelText;
        private static Header;
        private static Input;
        private static Clear;
        private static Body;
        static DefaultStyleProperties(): ChicletSlicerSettings;
        constructor(options?: ChicletSlicerConstructorOptions);
        static converter(dataView: DataView, localizedSelectAllText: string, interactivityService: IInteractivityService): ChicletSlicerData;
        init(options: VisualInitOptions): void;
        private static canSelect(args);
        update(options: VisualUpdateOptions): void;
        onResizing(finalViewport: IViewport): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private enumerateHeader(data);
        private enumerateRows(data);
        private enumerateGeneral(data);
        private enumerateImages(data);
        private updateInternal(resetScrollbarPosition);
        private initContainer();
        private onLoadMoreData();
        private getSlicerBodyViewport(currentViewport);
        private updateSlicerBodyDimensions();
        static getChicletTextProperties(textSize?: number): TextProperties;
        private getHeaderHeight();
        private getRowHeight();
        private getBorderStyle(outlineElement);
        private getBorderWidth(outlineElement, outlineWeight);
        private getBorderRadius(borderType);
    }
    module ChicletSlicerTextMeasurementHelper {
        function estimateSvgTextBaselineDelta(textProperties: TextProperties): number;
    }
    interface ChicletSlicerBehaviorOptions {
        slicerItemContainers: D3.Selection;
        slicerItemLabels: D3.Selection;
        slicerItemInputs: D3.Selection;
        slicerClear: D3.Selection;
        dataPoints: ChicletSlicerDataPoint[];
        interactivityService: IInteractivityService;
        slicerSettings: ChicletSlicerSettings;
        isSelectionLoaded: boolean;
    }
    class ChicletSlicerWebBehavior implements IInteractiveBehavior {
        private slicers;
        private slicerItemLabels;
        private slicerItemInputs;
        private dataPoints;
        private interactivityService;
        private slicerSettings;
        private options;
        bindEvents(options: ChicletSlicerBehaviorOptions, selectionHandler: ISelectionHandler): void;
        loadSelection(selectionHandler: ISelectionHandler): void;
        saveSelection(selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
        private renderMouseover();
        styleSlicerInputs(slicers: D3.Selection, hasSelection: boolean): void;
    }
}

declare module powerbi.visuals.samples {
    interface ChordChartData {
        dataMatrix: number[][];
        labelDataPoints: ChordArcDescriptor[];
        legendData?: LegendData;
        labelFontSize: number;
        tooltipData: ChordTooltipData[][];
        sliceTooltipData: ChordTooltipData[];
        tickUnit: number;
        differentFromTo: boolean;
        defaultDataPointColor?: string;
        prevAxisVisible: boolean;
        showAllDataPoints?: boolean;
        showLabels: boolean;
        showAxis: boolean;
    }
    interface ChordArcDescriptor extends D3.Layout.ArcDescriptor {
        data: ChordArcLabelData;
    }
    interface ChordArcLabelData extends LabelEnabledDataPoint, SelectableDataPoint {
        label: string;
        labelColor: string;
        barColor: string;
        isCategory: boolean;
    }
    interface ChordTooltipData {
        tooltipInfo: TooltipDataItem[];
    }
    class ChordChart implements IVisual {
        static capabilities: VisualCapabilities;
        static chordChartProps: {
            general: {
                formatString: DataViewObjectPropertyIdentifier;
            };
            dataPoint: {
                defaultColor: DataViewObjectPropertyIdentifier;
                fill: DataViewObjectPropertyIdentifier;
                showAllDataPoints: DataViewObjectPropertyIdentifier;
            };
            axis: {
                show: DataViewObjectPropertyIdentifier;
            };
            labels: {
                show: DataViewObjectPropertyIdentifier;
                color: DataViewObjectPropertyIdentifier;
                fontSize: DataViewObjectPropertyIdentifier;
            };
        };
        static PolylineOpacity: number;
        private static OuterArcRadiusRatio;
        private static InnerArcRadiusRatio;
        private static DefaultLabelColor;
        private static DefaultLabelsFontSize;
        private static VisualClassName;
        private static sliceClass;
        private static chordClass;
        private static sliceTicksClass;
        private static tickPairClass;
        private static tickLineClass;
        private static tickTextClass;
        private static labelGraphicsContextClass;
        private static labelsClass;
        private static linesGraphicsContextClass;
        private static lineClass;
        private chordLayout;
        private element;
        private svg;
        private mainGraphicsContext;
        private data;
        private colors;
        private selectionManager;
        private dataView;
        static converter(dataView: DataView, colors: IDataColorPalette, prevAxisVisible: boolean): ChordChartData;
        static getValidArrayLength(array: any[]): number;
        static convertToChordArcDescriptor(groups: D3.Layout.ArcDescriptor[], datum: ChordArcLabelData[]): ChordArcDescriptor[];
        private calculateRadius(viewport);
        static drawDefaultCategoryLabels(graphicsContext: D3.Selection, chordData: ChordChartData, radius: number, viewport: IViewport): void;
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        destroy(): void;
        static cleanTicks(context: D3.Selection): void;
        static drawTicks(graphicsContext: D3.Selection, chordData: ChordChartData, chordLayout: D3.Layout.ChordLayout, outerRadius: number, duration: number, viewport: IViewport): void;
        private static getAxisShow(dataView);
        private static getLabelsShow(dataView);
        private static getLabelsColor(dataView);
        private static getLabelsFontSize(dataView);
        static selectLabels(filteredData: LabelEnabledDataPoint[], context: D3.Selection, isDonut?: boolean, forAnimation?: boolean): D3.UpdateSelection;
        static drawDefaultLabelsForChordChart(data: any[], context: D3.Selection, layout: ILabelLayout, viewport: IViewport, radius: number, arc: D3.Svg.Arc, outerArc: D3.Svg.Arc): void;
        static getChordChartLabelLayout(radius: number, outerArc: D3.Svg.Arc, viewport: IViewport, labelFontSize: number): ILabelLayout;
        private static getDefaultDataPointColor(dataView, defaultValue?);
        private static getShowAllDataPoints(dataView);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        static isInt(n: number): boolean;
        static union_arrays(x: any[], y: any[]): any[];
    }
}

declare module powerbi.visuals.samples {
    interface EnhancedScatterChartDataPoint extends SelectableDataPoint, TooltipEnabledDataPoint {
        x: any;
        y: any;
        size: any;
        radius: RadiusData;
        fill: string;
        labelFill?: string;
        labelFontSize: any;
        contentPosition: ContentPositions;
        formattedCategory: jsCommon.Lazy<string>;
        colorFill?: string;
        svgurl?: string;
        shapeSymbolType?: (number) => string;
        rotation: number;
        backdrop?: string;
        xStart?: number;
        xEnd?: number;
        yStart?: number;
        yEnd?: number;
    }
    interface EnhancedScatterChartData extends ScatterBehaviorChartData {
        useShape: boolean;
        useCustomColor: boolean;
        backdrop?: {
            show: boolean;
            url: string;
        };
        outline?: boolean;
        crosshair?: boolean;
        xCol: DataViewMetadataColumn;
        yCol: DataViewMetadataColumn;
        dataPoints: EnhancedScatterChartDataPoint[];
        legendData: LegendData;
        axesLabels: ChartAxesLabels;
        size?: DataViewMetadataColumn;
        sizeRange: NumberRange;
        dataLabelsSettings: PointDataLabelsSettings;
        defaultDataPointColor?: string;
        showAllDataPoints?: boolean;
        hasDynamicSeries?: boolean;
        fillPoint?: boolean;
        colorBorder?: boolean;
        colorByCategory?: boolean;
        selectedIds: SelectionId[];
    }
    class EnhancedScatterChart implements IVisual {
        private AxisGraphicsContextClassName;
        static DefaultBubbleOpacity: number;
        static DimmedBubbleOpacity: number;
        private static ClassName;
        private static MainGraphicsContextClassName;
        private static LegendLabelFontSizeDefault;
        private static LabelDisplayUnitsDefault;
        private static AxisFontSize;
        private static DotClasses;
        private static ImageClasses;
        private legend;
        private svgScrollable;
        private axisGraphicsContext;
        private axisGraphicsContextScrollable;
        private xAxisGraphicsContext;
        private backgroundGraphicsContext;
        private y1AxisGraphicsContext;
        private svg;
        private element;
        private mainGraphicsContext;
        private clearCatcher;
        private mainGraphicsG;
        private style;
        private data;
        private dataView;
        private xAxisProperties;
        private yAxisProperties;
        private colors;
        private options;
        private interactivity;
        private interactivityService;
        private categoryAxisProperties;
        private valueAxisProperties;
        private yAxisOrientation;
        private scrollY;
        private scrollX;
        private dataViews;
        private legendObjectProperties;
        private hostServices;
        private layerLegendData;
        private legendLabelFontSize;
        private cartesianSmallViewPortProperties;
        private hasCategoryAxis;
        private yAxisIsCategorical;
        private bottomMarginLimit;
        private leftRightMarginLimit;
        private isXScrollBarVisible;
        private isYScrollBarVisible;
        private ScrollBarWidth;
        private categoryAxisHasUnitType;
        private valueAxisHasUnitType;
        private svgDefaultImage;
        private oldBackdrop;
        private textProperties;
        private behavior;
        private animator;
        private keyArray;
        private _margin;
        private margin;
        private _viewport;
        private viewport;
        private _viewportIn;
        private viewportIn;
        private legendViewport;
        static capabilities: VisualCapabilities;
        private static substractMargin(viewport, margin);
        private static getCustomSymbolType(shape);
        init(options: VisualInitOptions): void;
        private adjustMargins();
        private getValueAxisProperties(dataViewMetadata, axisTitleOnByDefault?);
        private getCategoryAxisProperties(dataViewMetadata, axisTitleOnByDefault?);
        static converter(dataView: DataView, currentViewport: IViewport, colorPalette: IDataColorPalette, interactivityService?: IInteractivityService, categoryAxisProperties?: DataViewObject, valueAxisProperties?: DataViewObject): EnhancedScatterChartData;
        private static createSeriesLegend(dataValues, colorPalette, categorical, formatString, defaultDataPointColor);
        private static getSizeRangeForGroups(dataViewValueGroups, sizeColumnIndex);
        private static getMetadata(grouped, source);
        private static getDefaultMeasureIndex(count, usedIndexes);
        static createLazyFormattedCategory(formatter: IValueFormatter, value: string): jsCommon.Lazy<string>;
        private static createDataPoints(dataValues, metadata, categories, categoryValues, categoryFormatter, categoryIdentities, categoryObjects, colorPalette, hasDynamicSeries, labelSettings, defaultDataPointColor?, categoryQueryName?);
        setData(dataViews: DataView[]): void;
        update(options: VisualUpdateOptions): void;
        private populateObjectProperties(dataViews);
        private renderLegend();
        private hideLegends();
        private shouldRenderAxis(axisProperties, propertyName?);
        private getMaxMarginFactor();
        private adjustViewportbyBackdrop();
        render(suppressAnimations: boolean): void;
        private cloneDataPoints(dataPoints);
        private darkenZeroLine(g);
        private getCategoryAxisFill();
        private getEnhanchedScatterChartLabelLayout(labelSettings, viewport, sizeRange);
        private getValueAxisFill();
        private renderCrossHair();
        private renderBackground();
        private renderChart(mainAxisScale, xAxis, yAxis, tickLabelMargins, chartHasAxisLabels, axisLabels, suppressAnimations, scrollScale?, extent?);
        private renderAxesLabels(axisLabels, legendMargin, hideXAxisTitle, hideYAxisTitle, hideY2AxisTitle);
        private updateAxis();
        private getUnitType(xAxis);
        private addUnitTypeToAxisLabel(xAxis, yAxis);
        private hideAxisLabels();
        private drawScatterMarkers(scatterData, hasSelection, sizeRange, duration);
        calculateAxes(categoryAxisProperties: DataViewObject, valueAxisProperties: DataViewObject, textProperties: TextProperties, scrollbarVisible: boolean): IAxisProperties[];
        calculateAxesProperties(options: CalculateScaleAndDomainOptions): IAxisProperties[];
        private enumerateDataPoints(enumeration);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        hasLegend(): boolean;
        private getLegendValue(enumeration);
        private getCategoryAxisValues(enumeration);
        private getValueAxisValues(enumeration);
        onClearSelection(): void;
    }
}

declare var THREE: any;
declare var WebGLHeatmap: any;
declare var GlobeMapCanvasLayers: JQuery[];
declare module powerbi.visuals.samples {
    class GlobeMap implements IVisual {
        static MercartorSphere: any;
        private viewport;
        private container;
        private domElement;
        private camera;
        private renderer;
        private scene;
        private orbitControls;
        private earth;
        private settings;
        private renderData;
        private heatmap;
        private heatTexture;
        private mapTextures;
        private barsGroup;
        private readyToRender;
        private categoricalView;
        private deferredRenderTimerId;
        private globeMapLocationCache;
        private locationsToLoad;
        private locationsLoaded;
        private renderLoopEnabled;
        private needsRender;
        private mousePosNormalized;
        private mousePos;
        private rayCaster;
        private selectedBar;
        private hoveredBar;
        private averageBarVector;
        private zoomControl;
        static capabilities: VisualCapabilities;
        static converter(dataView: DataView): any;
        init(options: VisualInitOptions): void;
        private setup();
        private initSettings();
        private initScene();
        private shouldRender();
        private createEarth();
        zoomClicked(zoomDirection: any): void;
        rotateCam(deltaX: number, deltaY: number): void;
        private initZoomControl();
        private initTextures();
        private initHeatmap();
        private setEarthTexture();
        update(options: VisualUpdateOptions): void;
        cleanHeatAndBar(): void;
        private renderMagic();
        private getToolTipDataForSeries(toolTipData, dataPointToolTip);
        private composeRenderData(categoricalView?);
        private geocodeRenderDatum(renderDatum, place, locationType);
        private defferedRender();
        private initRayCaster();
        private intersectBars();
        private animateCamera(to, done?);
        destroy(): void;
        private initMercartorSphere();
        private getBingMapCanvas(resolution);
    }
}
declare function loadGlobeMapLibs(): void;

declare module powerbi.visuals.samples {
    interface RadarChartConstructorOptions {
        animator?: IGenericAnimator;
        svg?: D3.Selection;
        margin?: IMargin;
    }
    interface RadarChartDatapoint extends SelectableDataPoint {
        x: number;
        y: number;
        y0?: number;
        color?: string;
        value?: number;
        tooltipInfo?: TooltipDataItem[];
        labelFormatString?: string;
        labelFontSize?: string;
    }
    interface RadarChartData {
        legendData: LegendData;
        series: RadarChartSeries[];
        settings: RadarChartSettings;
        dataLabelsSettings: PointDataLabelsSettings;
    }
    interface RadarChartSeries {
        fill: string;
        name: string;
        data: RadarChartDatapoint[];
        identity: SelectionId;
    }
    interface RadarChartSettings {
        showLegend?: boolean;
    }
    interface RadarChartBehaviorOptions {
        selection: D3.Selection;
        clearCatcher: D3.Selection;
    }
    /**
     * RadarChartBehavior
     */
    class RadarChartWebBehavior implements IInteractiveBehavior {
        private selection;
        bindEvents(options: RadarChartBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
    class RadarChart implements IVisual {
        static capabilities: VisualCapabilities;
        /** Note: Public for testability */
        static formatStringProp: DataViewObjectPropertyIdentifier;
        private static Properties;
        private static VisualClassName;
        private static Segments;
        private static SegmentNode;
        private static ZeroSegment;
        private static ZeroSegmentNode;
        private static ZeroLabel;
        private static Axis;
        private static AxisNode;
        private static AxisLabel;
        private static Chart;
        private static ChartNode;
        private static ChartArea;
        private static ChartPolygon;
        private static ChartDot;
        private svg;
        private segments;
        private zeroSegment;
        private axis;
        private chart;
        private mainGroupElement;
        private colors;
        private viewport;
        private interactivityService;
        private animator;
        private margin;
        private legend;
        private legendObjectProperties;
        private radarChartData;
        private isInteractiveChart;
        private zeroPointRadius;
        private static DefaultMargin;
        private static SegmentLevels;
        private static SegmentFactor;
        private static Radians;
        private static Scale;
        static NodeFillOpacity: number;
        static AreaFillOpacity: number;
        static DimmedAreaFillOpacity: number;
        private angle;
        private radius;
        static AxesLabelsFontFamily: string;
        static AxesLabelsfontSize: string;
        static AxesLabelsMaxWidth: number;
        static converter(dataView: DataView, colors: IDataColorPalette): RadarChartData;
        constructor(options?: RadarChartConstructorOptions);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private getRadarChartLabelLayout(labelSettings, allDataPoints);
        private drawCircularSegments(values);
        private drawDataLabels(series);
        private drawAxes(values);
        private drawAxesLabels(values, dataViewMetadataColumn?);
        private drawChart(series, duration);
        private calculateChartDomain(series);
        private renderLegend(radarChartData);
        private drawZeroCircularSegment(values);
        private drawZeroLabel();
        private getDataPoints(series);
        private getAllDataPointsList(series);
        private isPercentChart(dataPointsList);
        private parseLegendProperties(dataView);
        private static parseSettings(dataView);
        private static parseLabelSettings(dataView);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private getLabelSettingsOptions(enumeration, labelSettings);
        private enumerateDataLabels(enumeration);
        private enumerateLegend(settings);
        private enumerateDataPoint(enumeration);
        private updateViewport();
    }
}

declare module powerbi.visuals.samples {
    interface HistogramConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
    }
    interface HistogramSettings {
        displayName?: string;
        fillColor?: string;
        frequency: boolean;
        bins?: number;
        precision: number;
        xAxisColor?: string;
        xDisplayUnits?: number;
        xPrecision?: number;
        xTitle?: boolean;
        xShow?: boolean;
        xStyle?: string;
        yAxisColor?: string;
        yTitle?: boolean;
        yDisplayUnits?: number;
        yPrecision?: number;
        yShow?: boolean;
        yStyle?: string;
        yStart?: number;
        yEnd?: number;
        yPosition?: string;
        labelShow?: boolean;
        labelColor?: string;
        labelDisplayUnit?: number;
        labelPrecision?: number;
        labelFontSize?: number;
        maxX?: number;
    }
    interface HistogramData extends D3.Layout.Bin, TooltipEnabledDataPoint {
        range: number[];
        selectionIds: SelectionId[];
    }
    interface HistogramDataView {
        data: HistogramData[];
        xScale?: D3.Scale.LinearScale;
        yScale?: D3.Scale.LinearScale;
        settings: HistogramSettings;
        formatter: IValueFormatter;
        xLabelFormatter?: IValueFormatter;
        yLabelFormatter?: IValueFormatter;
    }
    class HistogramChartWarning {
        static ErrorInvalidDataValues: string;
        private message;
        constructor(message: string);
        code: string;
        getMessages(resourceProvider: jsCommon.IStringResourceProvider): IVisualErrorMessage;
    }
    class Histogram implements IVisual {
        private static ClassName;
        private static FrequencyText;
        private static DensityText;
        private static Properties;
        private static DefaultHistogramSettings;
        private static Axes;
        private static Axis;
        private static Labels;
        private static Columns;
        private static Column;
        private static Legends;
        private static Legend;
        static capabilities: VisualCapabilities;
        private ColumnPadding;
        private MinColumnHeight;
        private MinOpacity;
        private MaxOpacity;
        private MinNumberOfBins;
        private MaxNumberOfBins;
        private MinPrecision;
        private MaxPrecision;
        private TooltipDisplayName;
        private SeparatorNumbers;
        private LegendSize;
        private YLegendSize;
        private XLegendSize;
        private AxisSize;
        private DataLabelMargin;
        private widthOfColumn;
        private yTitleMargin;
        private outerPadding;
        private xAxisProperties;
        private yAxisProperties;
        private ExcludeBrackets;
        private IncludeBrackets;
        private margin;
        private durationAnimations;
        private oldInnerPaddingRatio;
        private oldMinOrdinalRectThickness;
        private viewport;
        private hostService;
        private selectionManager;
        private colors;
        private root;
        private svg;
        private main;
        private axes;
        private axisX;
        private axisY;
        private legend;
        private columns;
        private labels;
        private histogramDataView;
        private animator;
        private columnsSelection;
        private textProperties;
        constructor(histogramConstructorOptions?: HistogramConstructorOptions);
        init(visualsOptions: VisualInitOptions): void;
        converter(dataView: DataView): HistogramDataView;
        private getValuesByFrequencies(sourceValues, frequencies, identities);
        private getData(values, numericalValues, data, settings, yValueFormatter, xValueFormatter);
        private getRange(minValue, maxValue, step, index);
        private getTooltipData(value, range, settings, includeLeftBorder, yValueFormatter, xValueFormatter);
        private getSelectionIds(values, bin, index);
        private isValueContainedInRange(value, bin, index);
        private parseSettings(dataView);
        private setLegend(title, style, displayUnit);
        private getLabelFontSize(objects);
        private getLabelShow(objects);
        private getLabelColor(objects);
        private getLabelDisplayUnit(objects);
        private getLabelPrecision(objects);
        private getXStyle(objects);
        private getXDisplayUnit(objects);
        private getXPrecision(objects);
        private getXAxisShow(objects);
        private getXAxisColor(objects);
        private getXTitle(objects);
        private getYStyle(objects);
        private getYPosition(objects);
        private getYAxisShow(objects);
        private getYAxisColor(objects);
        private getYStart(objects);
        private getYEnd(objects);
        private getYDisplayUnit(objects);
        private getYPrecision(objects);
        private getYTitle(objects);
        private getBins(objects);
        private getFrequency(objects);
        private getPrecision(objects);
        validateData(data: HistogramDataView): boolean;
        update(visualUpdateOptions: VisualUpdateOptions): void;
        private fixXTicSize();
        private setSize(viewport);
        private updateElements(height, width);
        shouldShowYOnRight(): boolean;
        private columsAndAxesTransform(labelWidth);
        private render();
        private adjustTransformToAxisLabels();
        private renderColumns();
        private renderTooltip(selection);
        private getColumnHeight(column, y);
        private renderAxes();
        private getLabaelLayout();
        private renderLabels();
        private rangesToArray(data);
        private rangeToString(range, includeLeftBorder, valueFormatter);
        private renderLegend();
        private getDataLegends(settings);
        private getLegendText(settings);
        private bindSelectionHandler(columnsSelection);
        private setSelection(columnsSelection, data?);
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private getObjectsFromDataView(dataView);
        destroy(): void;
        private calculateXAxes(source, textProperties, scrollbarVisible);
        private calculateXAxesProperties(options, metaDataColumn);
        private calculateYAxes(source, textProperties, scrollbarVisible);
        private calculateYAxesProperties(options, metaDataColumn);
    }
}

declare module powerbi.visuals.samples {
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    const DotPlotProperties: any;
    interface DotPlotSelectors {
        svgPlotSelector: ClassAndSelector;
        plotSelector: ClassAndSelector;
        plotGroupSelector: ClassAndSelector;
        axisSelector: ClassAndSelector;
        xAxisSelector: ClassAndSelector;
        circleSeletor: ClassAndSelector;
    }
    interface DotPlotChartCategory {
        value: string;
        selectionId: SelectionId;
    }
    interface DotPlotConstructorOptions {
        animator?: IGenericAnimator;
        svg?: D3.Selection;
        margin?: IMargin;
        radius?: number;
        strokeWidth?: number;
    }
    interface DotPlotDataPoint {
        x: number;
        y: number;
        tooltipInfo: TooltipDataItem[];
    }
    interface DotPlotSettings {
        labelSettings?: VisualDataLabelsSettings;
        formatter?: IValueFormatter;
        tooltipFormatter?: IValueFormatter;
        categorySettings?: DotPlotCategorySettings;
        defaultDataPointColor?: string;
    }
    interface DotPlotCategorySettings {
        show?: boolean;
        fontColor?: string;
        fontSize?: number;
    }
    interface DotPlotDataGroup extends SelectableDataPoint {
        label?: string;
        value?: number;
        color?: string;
        tooltipInfo?: TooltipDataItem[];
        dataPoints: DotPlotDataPoint[];
        labelFontSize: string;
        highlight?: boolean;
    }
    interface DotPlotDataView {
        displayName: string;
        dataPoints: DotPlotDataGroup[];
        values: any[];
        settings: DotPlotSettings;
        categories: DotPlotChartCategory[];
    }
    class DotPlot implements IVisual {
        static capabilities: VisualCapabilities;
        private DefaultMargin;
        private svg;
        private xAxis;
        private dotPlot;
        private clearCatcher;
        private behavior;
        private colors;
        private dataView;
        private animator;
        private durationAnimations;
        private dotPlotDataView;
        private radius;
        private strokeWidth;
        private interactivityService;
        private scaleType;
        private textProperties;
        private dotPlotSelectors;
        private DefaultDotPlotSettings;
        private static getTooltipData(value);
        static converter(dataView: DataView, scale: D3.Scale.OrdinalScale, defaultMargin: IMargin, defaultSetting: DotPlotSettings, colors: IDataColorPalette, viewport: IViewport, radius: number): DotPlotDataView;
        constructor(options?: DotPlotConstructorOptions);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private static getObjectsFromDataView(dataView);
        private static parseSettings(objects, defaultDotPlotSettings);
        private static getCategorySettings(objects, defaultDotPlotSettings);
        private static getPrecision(objects, defaultDotPlotSettings);
        private drawDotPlot(data, setting);
        private getEnhanchedDotplotLayout(labelSettings, viewport);
        private enumerateDataLabels(enumeration, dataView);
        private enumerateDataPoints(enumeration, dataView);
        private enumerateCategories(enumeration, dataView);
        private clearData();
        private renderTooltip(selection);
        private calculateAxes(viewportIn, textProperties, scrollbarVisible);
        private calculateAxesProperties(viewportIn, options, metaDataColumn);
        private renderAxis(height, xAxisProperties, data, duration);
    }
    interface DotplotBehaviorOptions {
        columns: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }
    class DotplotBehavior implements IInteractiveBehavior {
        private columns;
        private clearCatcher;
        private interactivityService;
        bindEvents(options: DotplotBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
}

declare module powerbi.visuals.samples {
    interface ForceGraphOptions {
        showDataLabels: boolean;
        labelColor: string;
        fontSize: number;
        showArrow: boolean;
        showLabel: boolean;
        colorLink: string;
        thickenLink: boolean;
        displayImage: boolean;
        defaultImage: string;
        imageUrl: string;
        imageExt: string;
        nameMaxLength: number;
        highlightReachableLinks: boolean;
        charge: number;
        defaultLinkColor: string;
        defaultLinkHighlightColor: string;
        defaultLinkThickness: string;
    }
    var forceProps: {
        general: {
            formatString: DataViewObjectPropertyIdentifier;
        };
        labels: {
            show: DataViewObjectPropertyIdentifier;
            color: DataViewObjectPropertyIdentifier;
            fontSize: DataViewObjectPropertyIdentifier;
        };
        links: {
            showArrow: DataViewObjectPropertyIdentifier;
            showLabel: DataViewObjectPropertyIdentifier;
            colorLink: DataViewObjectPropertyIdentifier;
            thickenLink: DataViewObjectPropertyIdentifier;
        };
        nodes: {
            displayImage: DataViewObjectPropertyIdentifier;
            defaultImage: DataViewObjectPropertyIdentifier;
            imageUrl: DataViewObjectPropertyIdentifier;
            imageExt: DataViewObjectPropertyIdentifier;
            nameMaxLength: DataViewObjectPropertyIdentifier;
            highlightReachableLinks: DataViewObjectPropertyIdentifier;
        };
        size: {
            charge: DataViewObjectPropertyIdentifier;
        };
    };
    interface ForceGraphData {
        nodes: {};
        links: any[];
        minFiles: number;
        maxFiles: number;
        linkedByName: {};
        linkTypes: {};
    }
    class ForceGraph implements IVisual {
        static VisualClassName: string;
        private root;
        private paths;
        private nodes;
        private forceLayout;
        private dataView;
        private colors;
        private options;
        private data;
        private marginValue;
        private margin;
        private viewportValue;
        private viewport;
        private viewportInValue;
        private viewportIn;
        private static substractMargin(viewport, margin);
        private scale1to10(d);
        private getLinkColor(d);
        private getDefaultOptions();
        private updateOptions(objects);
        static capabilities: VisualCapabilities;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        private enumerateLabels(enumeration);
        private enumerateLinks(enumeration);
        private enumerateNodes(enumeration);
        private enumerateSize(enumeration);
        static converter(dataView: DataView, colors: IDataColorPalette): ForceGraphData;
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private updateNodes();
        private tick();
        private fadePath(opacity, highlight);
        private isReachable(a, b);
        private fadeNode(opacity, highlight);
        destroy(): void;
    }
}

declare module powerbi.visuals.samples {
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    const DefaultDateType: string;
    module dateTypeSelector {
        const day: string;
        const week: string;
        const month: string;
        const year: string;
        const type: IEnumType;
    }
    interface Task extends SelectableDataPoint {
        id: number;
        name: string;
        start: Date;
        duration: number;
        completion: number;
        resource: string;
        end: Date;
        taskType: string;
        description: string;
        color: string;
        tooltipInfo: TooltipDataItem[];
    }
    interface GanttChartFormatters {
        startDateFormatter: IValueFormatter;
        completionFormatter: IValueFormatter;
        durationFormatter: IValueFormatter;
    }
    interface GanttChartData {
        legendData: LegendData;
        series: GanttSeries[];
        showLegend: boolean;
    }
    interface GanttViewModel {
        taskLabelsShow: boolean;
        taskLabelsColor: string;
        taskLabelsFontSize: number;
        taskLabelsWidth: number;
        taskProgressColor: string;
        taskResourceShow: boolean;
        taskResourceColor: string;
        taskResourceFontSize: number;
        legendData: LegendData;
        taskTypes: TaskTypes;
        dateType: string;
    }
    interface GanttDataPoint extends SelectableDataPoint {
        color: string;
        value: any;
    }
    interface GanttSeries extends SelectableDataPoint {
        tasks: Task[];
        fill: string;
        name: string;
    }
    interface TaskTypes {
        types: string[];
        typeName: string;
    }
    const GanttChartProps: {
        legend: {
            show: DataViewObjectPropertyIdentifier;
            position: DataViewObjectPropertyIdentifier;
            showTitle: DataViewObjectPropertyIdentifier;
            titleText: DataViewObjectPropertyIdentifier;
            labelColor: DataViewObjectPropertyIdentifier;
            fontSize: DataViewObjectPropertyIdentifier;
        };
        taskCompletion: {
            fill: DataViewObjectPropertyIdentifier;
        };
        dataPoint: {
            fill: DataViewObjectPropertyIdentifier;
        };
        taskLabels: {
            show: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
            fontSize: DataViewObjectPropertyIdentifier;
            width: DataViewObjectPropertyIdentifier;
        };
        taskResource: {
            show: DataViewObjectPropertyIdentifier;
            fill: DataViewObjectPropertyIdentifier;
            fontSize: DataViewObjectPropertyIdentifier;
        };
        ganttDateType: {
            type: DataViewObjectPropertyIdentifier;
        };
    };
    class Gantt implements IVisual {
        private data;
        private dataView;
        private viewport;
        private colors;
        private legend;
        private legendObjectProperties;
        private textProperties;
        private static DefaultValues;
        static capabilities: VisualCapabilities;
        private margin;
        private style;
        private body;
        private ganttSvg;
        private viewModel;
        private timeScale;
        private axisGroup;
        private chartGroup;
        private taskGroup;
        private lineGroup;
        private clearCatcher;
        private ganttDiv;
        private selectionManager;
        private behavior;
        private interactivityService;
        private hostServices;
        private isInteractiveChart;
        static getMaxTaskOpacity(): number;
        static getMinTaskOpacity(): number;
        init(options: VisualInitOptions): void;
        /**
         * Create the vieport area of the gantt chart
         */
        private createViewport(element);
        /**
         * Clear the viewport area
         */
        private clearViewport();
        /**
         * Update div container size to the whole viewport area
         * @param viewport The vieport to change it size
         */
        private updateChartSize(viewport);
        /**
       * Create the gantt tasks series based on all task types
       * @param taskTypes All unique types from the tasks array.
       */
        private createSeries(objects, tasks);
        /**
        * Convert the dataView to view model
        * @param dataView The data Model
        */
        static converter(dataView: DataView, colorPalette: IDataColorPalette): GanttViewModel;
        /**
         * Returns the chart formatters
         * @param dataView The data Model
         */
        private parseSettings(dataView);
        private isValidDate(date);
        private convertToDecimal(number);
        /**
        * Create task objects dataView
        * @param dataView The data Model.
        * @param formatters task attributes represented format.
        * @param series An array that holds the color data of different task groups.
        */
        private createTasks(dataView, formatters);
        /**
        * Gets all unique types from the tasks array
        * @param dataView The data model.
        */
        private static getAllTasksTypes(dataView);
        /**
        * Get the tooltip info (data display names & formated values)
        * @param task All task attributes.
        * @param formatters Formatting options for gantt attributes.
        */
        private getTooltipInfo(task, formatters, timeInterval?);
        /**
         * Get task property from the data view
         * @param columnSource
         * @param child
         * @param propertyName The property to get
         */
        private getTaskProperty<T>(columnSource, child, propertyName);
        /**
         * Check if dataView has a given role
         * @param column The dataView headers
         * @param name The role to find
         */
        private hasRole(column, name);
        /**
         * Check if task has data for task
         * @param dataView
         */
        private isChartHasTask(dataView);
        /**
         * Get legend data, calculate position and draw it
         * @param ganttChartData Data for series and legend
         */
        private renderLegend(legendData);
        private parseLegendProperties(dataView);
        /**
        * Called on data change or resizing
        * @param options The visual option that contains the dataview and the viewport
        */
        update(options: VisualUpdateOptions): void;
        private getDateType();
        private calculateAxes(viewportIn, textProperties, startDate, endDate, axisLength, ticksCount, scrollbarVisible);
        private calculateAxesProperties(viewportIn, options, axisLength, metaDataColumn);
        private renderAxis(xAxisProperties, duration);
        /**
        * Update task labels and add its tooltips
        * @param tasks All tasks array
        * @param width The task label width
        */
        private updateTaskLabels(tasks, width);
        private renderTasks(tasks);
        onClearSelection(): void;
        /**
         * Returns the matching Y coordinate for a given task index
         * @param taskIndex Task Number
         */
        private getTaskLabelCoordinateY(taskIndex);
        /**
         * Set the task progress bar in the gantt
         * @param task All task attributes
         */
        private setTaskProgress(task);
        /**
         * Set the task progress bar in the gantt
         * @param lineNumber Line number that represents the task number
         */
        private getBarYCoordinate(lineNumber);
        private getBarHeight();
        /**
        * convert task duration to width in the time scale
        * @param task The task to convert
        */
        private taskDurationToWidth(task);
        private getTooltipForMilstoneLine(timestamp, milestoneTitle);
        /**
        * Create vertical dotted line that represent milestone in the time axis (by default it shows not time)
        * @param tasks All tasks array
        * @param timestamp the milestone to be shown in the time axis (default Date.now())
        */
        private createMilestoneLine(tasks, milestoneTitle?, timestamp?);
        private updateElementsPositions(viewport, margin);
        /**
         * Returns the width of the now line based on num of tasks
         * @param numOfTasks Number of tasks
         */
        private getMilestoneLineLength(numOfTasks);
        private getTaskLabelFontSize();
        /**
         * handle "Legend" card
         * @param enumeration The instance to be pushed into "Legend" card
         * @param objects Dataview objects
         */
        private enumerateLegendOptions(enumeration, objects);
        /**
        * handle "Data Colors" card
        * @param enumeration The instance to be pushed into "Data Colors" card
        * @param objects Dataview objects
        */
        private enumerateDataPoints(enumeration, objects);
        /**
        * handle "Task Completion" card
        * @param enumeration The instance to be pushed into "Task Completion" card
        * @param objects Dataview objects
        */
        private enumerateTaskCompletion(enumeration, objects);
        /**
        * handle "Labels" card
        * @param enumeration The instance to be pushed into "Data Labels" card
        * @param objects Dataview objects
        */
        private enumerateTaskLabels(enumeration, objects);
        /**
        * handle "Data Labels" card
        * @param enumeration The instance to be pushed into "Task Resource" card
        * @param objects Dataview objects
        */
        private enumerateDataLabels(enumeration, objects);
        private enumerateDateType(enumeration, objects);
        /**
        * handle the property pane options
        * @param objects Dataview enumerate objects
        */
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
    }
    interface GanttBehaviorOptions {
        clearCatcher: D3.Selection;
        taskSelection: D3.Selection;
        legendSelection: D3.Selection;
        interactivityService: IInteractivityService;
    }
    class GanttChartBehavior implements IInteractiveBehavior {
        private options;
        bindEvents(options: GanttBehaviorOptions, selectionHandler: ISelectionHandler): void;
        renderSelection(hasSelection: boolean): void;
    }
    class GanttChartWarning implements IVisualWarning {
        code: string;
        getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage;
    }
}

declare module powerbi.visuals.samples {
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    const Months: IEnumType;
    const WeekDays: IEnumType;
    enum GranularityType {
        year = 0,
        quarter = 1,
        month = 2,
        week = 3,
        day = 4,
    }
    interface GranularityName {
        granularityType: GranularityType;
        name: string;
    }
    interface TimelineMargins {
        LeftMargin: number;
        RightMargin: number;
        TopMargin: number;
        BottomMargin: number;
        CellWidth: number;
        CellHeight: number;
        StartXpoint: number;
        StartYpoint: number;
        ElementWidth: number;
        MinCellWidth: number;
        MaxCellHeight: number;
        PeriodSlicerRectWidth: number;
        PeriodSlicerRectHeight: number;
    }
    interface DefaultTimelineProperties {
        DefaultLabelsShow: boolean;
        TimelineDefaultTextSize: number;
        TimelineDefaultCellColor: string;
        TimelineDefaultCellColorOut: string;
        TimelineDefaultTimeRangeShow: boolean;
        DefaultTimeRangeColor: string;
        DefaultLabelColor: string;
        DefaultGranularity: GranularityType;
        DefaultFirstMonth: number;
        DefaultFirstDay: number;
        DefaultFirstWeekDay: number;
    }
    interface TimelineSelectors {
        TimelineVisual: ClassAndSelector;
        SelectionRangeContainer: ClassAndSelector;
        textLabel: ClassAndSelector;
        LowerTextCell: ClassAndSelector;
        UpperTextCell: ClassAndSelector;
        UpperTextArea: ClassAndSelector;
        LowerTextArea: ClassAndSelector;
        RangeTextArea: ClassAndSelector;
        CellsArea: ClassAndSelector;
        CursorsArea: ClassAndSelector;
        MainArea: ClassAndSelector;
        SelectionCursor: ClassAndSelector;
        Cell: ClassAndSelector;
        CellRect: ClassAndSelector;
        VertLine: ClassAndSelector;
        TimelineSlicer: ClassAndSelector;
        PeriodSlicerGranularities: ClassAndSelector;
        PeriodSlicerSelection: ClassAndSelector;
        PeriodSlicerSelectionRect: ClassAndSelector;
        PeriodSlicerRect: ClassAndSelector;
    }
    interface TimelineLabel {
        title: string;
        text: string;
        id: number;
    }
    interface ExtendedLabel {
        yearLabels?: TimelineLabel[];
        quarterLabels?: TimelineLabel[];
        monthLabels?: TimelineLabel[];
        weekLabels?: TimelineLabel[];
        dayLabels?: TimelineLabel[];
    }
    interface DatePeriod {
        identifierArray: (string | number)[];
        startDate: Date;
        endDate: Date;
        year: number;
        week: number[];
        fraction: number;
        index: number;
    }
    interface Granularity {
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        getDatePeriods(): DatePeriod[];
        resetDatePeriods(): void;
        getExtendedLabel(): ExtendedLabel;
        setExtendedLabel(extendedLabel: ExtendedLabel): void;
        createLabels(granularity: Granularity): TimelineLabel[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
        addDate(date: Date, identifierArray: (string | number)[]): any;
        setNewEndDate(date: Date): void;
        splitPeriod(index: number, newFraction: number, newDate: Date): void;
    }
    interface TimelineCursorOverElement {
        index: number;
        datapoint: TimelineDatapoint;
    }
    class TimelineGranularity {
        private datePeriods;
        private extendedLabel;
        /**
        * Returns the short month name of the given date (e.g. Jan, Feb, Mar)
        */
        shortMonthName(date: Date): string;
        resetDatePeriods(): void;
        getDatePeriods(): DatePeriod[];
        getExtendedLabel(): ExtendedLabel;
        setExtendedLabel(extendedLabel: ExtendedLabel): void;
        createLabels(granularity: Granularity): TimelineLabel[];
        /**
        * Adds the new date into the given datePeriods array
        * If the date corresponds to the last date period, given the current granularity,
        * it will be added to that date period. Otherwise, a new date period will be added to the array.
        * i.e. using Month granularity, Feb 2 2015 corresponds to Feb 3 2015.
        * It is assumed that the given date does not correspond to previous date periods, other than the last date period
        */
        addDate(date: Date, identifierArray: (string | number)[]): void;
        setNewEndDate(date: Date): void;
        /**
         * Splits a given period into two periods.
         * The new period is added after the index of the old one, while the old one is simply updated.
         * @param index The index of the date priod to be split
         * @param newFraction The fraction value of the new date period
         * @param newDate The date in which the date period is split
         */
        splitPeriod(index: number, newFraction: number, newDate: Date): void;
        private previousMonth(month);
        private nextMonth(month);
        private countWeeks(startDate, endDate);
        determineWeek(date: Date): number[];
        private inPreviousYear(date);
        determineYear(date: Date): number;
    }
    class DayGranularity extends TimelineGranularity implements Granularity {
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
    }
    class MonthGranularity extends TimelineGranularity implements Granularity {
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
    }
    class WeekGranularity extends TimelineGranularity implements Granularity {
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
    }
    class QuarterGranularity extends TimelineGranularity implements Granularity {
        /**
         * Returns the date's quarter name (e.g. Q1, Q2, Q3, Q4)
         * @param date A date
         */
        private quarterText(date);
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
    }
    class YearGranularity extends TimelineGranularity implements Granularity {
        getType(): GranularityType;
        splitDate(date: Date): (string | number)[];
        sameLabel(firstDatePeriod: DatePeriod, secondDatePeriod: DatePeriod): boolean;
        generateLabel(datePeriod: DatePeriod): TimelineLabel;
    }
    class TimelineGranularityData {
        private dates;
        private granularities;
        private endingDate;
        /**
         * Returns the date of the previos day
         * @param date The following date
         */
        static previousDay(date: Date): Date;
        /**
         * Returns the date of the next day
         * @param date The previous date
         */
        static nextDay(date: Date): Date;
        /**
        * Returns an array of dates with all the days between the start date and the end date
        */
        private setDatesRange(startDate, endDate);
        constructor(startDate: Date, endDate: Date);
        /**
         * Adds a new granularity to the array of granularities.
         * Resets the new granularity, adds all dates to it, and then edits the last date period with the ending date.
         * @param granularity The new granularity to be added
         */
        addGranularity(granularity: Granularity): void;
        /**
         * Returns a specific granularity from the array of granularities
         * @param index The index of the requested granularity
         */
        getGranularity(index: number): Granularity;
        createGranularities(): void;
        createLabels(): void;
    }
    class Utils {
        /**
         * Returns the date of the start of the selection
         * @param timelineData The TimelineData which contains all the date periods
         */
        static getStartSelectionDate(timelineData: TimelineData): Date;
        /**
         * Returns the date of the end of the selection
         * @param timelineData The TimelineData which contains all the date periods
         */
        static getEndSelectionDate(timelineData: TimelineData): Date;
        /**
         * Returns the date period of the end of the selection
         * @param timelineData The TimelineData which contains all the date periods
         */
        static getEndSelectionPeriod(timelineData: TimelineData): DatePeriod;
        /**
         * Returns the color of a cell, depending on whether its date period is between the selected date periods
         * @param d The TimelineDataPoint of the cell
         * @param timelineData The TimelineData with the selected date periods
         * @param timelineFormat The TimelineFormat with the chosen colors
         */
        static getCellColor(d: TimelineDatapoint, timelineData: TimelineData, cellFormat: CellFormat): string;
        /**
         * Returns the granularity type of the given granularity name
         * @param granularityName The name of the granularity
         */
        static getGranularityType(granularityName: string): GranularityType;
        /**
         * Returns the name of the granularity type
         * @param granularity The type of granularity
         */
        static getGranularityName(granularity: GranularityType): string;
        /**
         * Splits the date periods of the current granularity, in case the stard and end of the selection is in between a date period.
         * i.e. for a quarter granularity and a selection between Feb 6 and Dec 23, the date periods for Q1 and Q4 will be split accordingly
         * @param timelineData The TimelineData that contains the date periods
         * @param startDate The starting date of the selection
         * @param endDate The ending date of the selection
         */
        static separateSelection(timelineData: TimelineData, startDate: Date, endDate: Date): void;
        /**
         * Returns the ratio of the given date compared to the whole date period.
         * The ratio is calculated either from the start or the end of the date period.
         * i.e. the ratio of Feb 7 2016 compared to the month of Feb 2016,
         * is 0.2142 from the start of the month, or 0.7857 from the end of the month.
         * @param datePeriod The date period that contain the specified date
         * @param date The date
         * @param fromStart Whether to calculater the ratio from the start of the date period.
         */
        static getDateRatio(datePeriod: DatePeriod, date: Date, fromStart: boolean): number;
        /**
        * Returns the time range text, depending on the given granularity (e.g. "Feb 3 2014 - Apr 5 2015", "Q1 2014 - Q2 2015")
        */
        static timeRangeText(timelineData: TimelineData): string;
        static dateRangeText(datePeriod: DatePeriod): string;
        /**
         * Combines the first two partial date periods, into a single date period.
         * Returns whether a partial date period was found.
         * i.e. combines "Feb 1 2016 - Feb 5 2016" with "Feb 5 2016 - Feb 29 2016" into "Feb 1 2016 - Feb 29 2016"
         * @param datePeriods The list of date periods
         */
        static unseparateSelection(datePeriods: DatePeriod[]): boolean;
    }
    interface TimelineProperties {
        leftMargin: number;
        rightMargin: number;
        topMargin: number;
        bottomMargin: number;
        textYPosition: number;
        startXpoint: number;
        startYpoint: number;
        elementWidth: number;
        element: any;
        cellWidth: number;
        cellHeight: number;
        cellsYPosition: number;
    }
    interface TimelineFormat {
        cellFormat?: CellFormat;
        rangeTextFormat?: LabelFormat;
        labelFormat?: LabelFormat;
        calendarFormat?: CalendarFormat;
    }
    interface LabelFormat {
        showProperty: boolean;
        sizeProperty: number;
        colorProperty: string;
    }
    interface CalendarFormat {
        firstMonthProperty: number;
        firstDayProperty: number;
        weekDayProperty: number;
    }
    interface CellFormat {
        colorInProperty: string;
        colorOutProperty: string;
    }
    interface TimelineData {
        dragging?: boolean;
        categorySourceName?: string;
        columnIdentity?: powerbi.data.SQColumnRefExpr;
        timelineDatapoints?: TimelineDatapoint[];
        elementsCount?: number;
        selectionStartIndex?: number;
        selectionEndIndex?: number;
        cursorDataPoints?: CursorDatapoint[];
        currentGranularity?: Granularity;
    }
    interface CursorDatapoint {
        x: number;
        cursorIndex: number;
        selectionIndex: number;
    }
    interface TimelineDatapoint {
        index: number;
        datePeriod: DatePeriod;
    }
    interface DateDictionary {
        [year: number]: Date;
    }
    class Calendar {
        private firstDayOfWeek;
        private firstMonthOfYear;
        private firstDayOfYear;
        private dateOfFirstWeek;
        private quarterFirstMonths;
        getFirstDayOfWeek(): number;
        getFirstMonthOfYear(): number;
        getFirstDayOfYear(): number;
        getQuarterStartDate(year: number, quarterIndex: number): Date;
        isChanged(calendarFormat: CalendarFormat): boolean;
        constructor(calendarFormat: CalendarFormat);
        private calculateDateOfFirstWeek(year);
        getDateOfFirstWeek(year: number): Date;
    }
    class Timeline implements IVisual {
        private requiresNoUpdate;
        private foreignSelection;
        private timelineProperties;
        private timelineFormat;
        private timelineData;
        private timelineGranularityData;
        private hostServices;
        private svg;
        private timelineDiv;
        private body;
        private rangeText;
        private mainGroupElement;
        private yearLabelsElement;
        private quarterLabelsElement;
        private monthLabelsElement;
        private weekLabelsElement;
        private dayLabelsElement;
        private cellsElement;
        private cursorGroupElement;
        private selectorContainer;
        private options;
        private periodSlicerRect;
        private selectedText;
        private selector;
        private initialized;
        private selectionManager;
        private clearCatcher;
        private dataView;
        private valueType;
        private values;
        private svgWidth;
        private newGranularity;
        static calendar: Calendar;
        static capabilities: VisualCapabilities;
        private timelineMargins;
        private defaultTimelineProperties;
        private timelineSelectors;
        /**
         * Changes the current granularity depending on the given granularity type
         * Separates the new granularity's date periods which contain the start/end selection
         * Unseparates the date periods of the previous granularity.
         * @param granularity The new granularity type
         */
        changeGranularity(granularity: GranularityType, startDate: Date, endDate: Date): void;
        init(options: VisualInitOptions): void;
        private clear();
        private drawGranular(timelineProperties);
        redrawPeriod(granularity: GranularityType): void;
        private static setMeasures(labelFormat, granularityType, datePeriodsCount, viewport, timelineProperties, timelineMargins);
        private visualChangeOnly(options);
        private unavailableType(dataViewCategorical);
        private unavailableChildIdentityField(dataViewTree);
        private createTimelineOptions(dataView);
        prepareValues(values: any): any;
        private createTimelineData();
        update(options: VisualUpdateOptions): void;
        selectPeriod(periodNameIndex: any): void;
        private static isDataNotMatch(dataView);
        static converter(timelineData: TimelineData, timelineProperties: TimelineProperties, defaultTimelineProperties: DefaultTimelineProperties, timelineGranularityData: TimelineGranularityData, dataView: DataView, initialized: boolean, granularityType: GranularityType, viewport: IViewport, timelineMargins: TimelineMargins): TimelineFormat;
        private render(timelineData, timelineFormat, timelineProperties, options);
        private renderLabels(labels, labelsElement, index, isLast);
        private clearData();
        private static updateCursors(timelineData, cellWidth);
        private static fillTimelineFormat(objects, timelineProperties);
        fillCells(cellFormat: CellFormat): void;
        renderCells(timelineData: TimelineData, timelineFormat: TimelineFormat, timelineProperties: TimelineProperties, suppressAnimations: any): void;
        dragstarted(): void;
        dragged(currentCursor: CursorDatapoint): void;
        /**
         * Note: Public for testability.
         */
        findCursorOverElement(x: number): TimelineCursorOverElement;
        dragended(): void;
        private drag;
        renderCursors(timelineData: TimelineData, timelineFormat: TimelineFormat, cellHeight: number, cellsYPosition: number): D3.UpdateSelection;
        renderTimeRangeText(timelineData: TimelineData, timeRangeFormat: LabelFormat): void;
        setSelection(timelineData: TimelineData): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        enumerateRangeHeader(enumeration: ObjectEnumerationBuilder, dataview: DataView): void;
        enumerateCells(enumeration: ObjectEnumerationBuilder, dataview: DataView): void;
        enumerateLabels(enumeration: ObjectEnumerationBuilder, dataview: DataView): void;
        enumerateCalendar(enumeration: ObjectEnumerationBuilder, dataview: DataView): void;
        enumerateWeekDay(enumeration: ObjectEnumerationBuilder, dataview: DataView): void;
    }
}

declare module powerbi.visuals.samples {
    interface StreamData {
        dataPoints: StreamDataPoint[][];
        legendData: LegendData;
        valueFormatter: IValueFormatter;
        categoryFormatter: IValueFormatter;
        streamGraphSettings: StreamGraphSettings;
    }
    interface StreamDataPoint {
        x: number;
        y: number;
        y0?: number;
        identity: SelectionId;
    }
    interface StreamGraphSettings {
        legendSettings: StreamGraphLegendSettings;
        categoryAxisSettings: StreamGraphAxisSettings;
        valueAxisSettings: StreamGraphAxisSettings;
    }
    interface StreamGraphLegendSettings {
        show: boolean;
        showTitle: boolean;
        titleText: string;
        labelColor: string;
        fontSize: number;
    }
    interface StreamGraphAxisSettings {
        show: boolean;
        axisColor: string;
        showAxisTitle: boolean;
    }
    interface StreamProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }
    class StreamGraph implements IVisual {
        private static VisualClassName;
        private static Properties;
        private static Layer;
        private static XAxisLabel;
        private static YAxisLabel;
        private static MaxNumberOfAxisXValues;
        static capabilities: VisualCapabilities;
        private margin;
        private viewport;
        private svg;
        private axisGraphicsContext;
        private xAxis;
        private yAxis;
        private colors;
        private selectionManager;
        private dataView;
        private legend;
        private legendObjectProperties;
        private data;
        converter(dataView: DataView, colors: IDataColorPalette): StreamData;
        private parseSettings(dataView);
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        private drawAxis(data, xScale, yScale);
        private renderYAxisLabels();
        private renderXAxisLabels();
        private renderLegend(streamGraphData);
        private updateViewPort();
        private setMaxTicks(axis, maxSize, maxValue?);
        private getFittedTickLength(axis, maxSize, maxTicks);
        private getFittedTickValues(axis, maxSize, maxTicks);
        private measureTicks(ticks, measureTickFunction);
        private getTicksByAxis(axis);
        private getMeasureTickFunction(axis, ticks);
        private static getTextPropertiesFunction(text);
        private getWiggle(dataView);
        private enumerateValueAxisValues(enumeration);
        private enumerateCategoryAxisValues(enumeration);
        private enumerateLegend(enumeration);
        private clearData();
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
    }
}

declare module powerbi.visuals.samples {
    interface LineDotPoint {
        time: number | Date;
        value: number;
        dot: number;
        sum: number;
        selector: SelectionId;
    }
    interface Legend {
        text: string;
        transform?: string;
        dx?: string;
        dy?: string;
    }
    interface LineDotChartViewModel {
        points: LineDotPoint[];
        settings: LineDotChartSettings;
        xAxis: IAxisProperties;
        yAxis: IAxisProperties;
        yAxis2: IAxisProperties;
        legends: Legend[];
    }
    interface LineDotChartSettings {
        lineFill: string;
        lineThickness: number;
        dotFill: string;
        dotSizeMin: number;
        dotSizeMax: number;
        counterTitle: string;
        xAxisTitle: string;
        yAxisTitle: string;
        duration: number;
        isanimated: boolean;
        isstopped: boolean;
    }
    class LineDotChart implements IVisual {
        private selectionManager;
        private hostServices;
        private isDateTime;
        private static DefaultSettings;
        /**
        * Informs the System what it can do
        * Fields, Formatting options, data reduction & QnA hints
        */
        static capabilities: VisualCapabilities;
        private static Identity;
        private static Axes;
        private static Axis;
        private static Legends;
        private static Legend;
        private static Values;
        private static Properties;
        private model;
        private root;
        private main;
        private axes;
        private axisX;
        private axisY;
        private axisY2;
        private legends;
        private line;
        private colors;
        private margin;
        private LegendSize;
        private AxisSize;
        init(options: VisualInitOptions): void;
        update(options: VisualUpdateOptions): void;
        destroy(): void;
        setIsStopped(isstopped: Boolean): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[];
        private selectDot(dotelement, selector);
        private clearSelection();
        private converter(dataView, viewport);
        private parseSettings(dataView);
        private generateAxisLabels(viewport, settings);
        private resize(viewport);
        private draw(model);
        private pointDelay(points, num, animation_duration);
        private showDataPoint(data, index);
        private hideDataPoint(data, index);
        private addTooltip(model, element);
        private renderLegends(model);
    }
}

declare module powerbi.visuals.samples {
    interface SunburstSlice {
        children?: SunburstSlice[];
        value?: any;
        color?: string;
        name?: string;
        parent?: SunburstSlice;
        selector: SelectionId;
        total: number;
        tooltipInfo?: TooltipDataItem[];
    }
    interface SunburstViewModel {
        root: SunburstSlice;
    }
    var sunburstRoleNames: {
        nodes: string;
        values: string;
    };
    class Sunburst implements IVisual {
        private static minOpacity;
        private svg;
        private g;
        private arc;
        private total;
        private viewport;
        private colors;
        private selectionManager;
        private static roleNames;
        static capabilities: VisualCapabilities;
        init(options: VisualInitOptions): void;
        private static setAllUnhide(selection);
        update(options: VisualUpdateOptions): void;
        private updateInternal(dataRootNode);
        private static getTreePath(node);
        private onResize();
        private highlightPath(d, sunBurst, setUnhide);
        private renderTooltip(selection);
        private static getTooltipData(displayName, value);
        private covertTreeNodeToSunBurstNode(originParentNode, sunburstParentNode, colors, pathIdentity, color);
        converter(dataView: DataView, colors: IDataColorPalette): SunburstSlice;
    }
}

declare module powerbi.visuals.plugins {
    let sunburstCustom: IVisualPlugin;
    let asterPlot: IVisualPlugin;
    var tornadoChart: IVisualPlugin;
    var sankeyDiagram: IVisualPlugin;
    let mekkoChart: IVisualPlugin;
    var bulletChart: IVisualPlugin;
    var wordCloud: IVisualPlugin;
    var chicletSlicer: IVisualPlugin;
    var chordChart: IVisualPlugin;
    var enhancedScatterChart: IVisualPlugin;
    var radarChart: IVisualPlugin;
    var dotPlot: IVisualPlugin;
    var histogram: IVisualPlugin;
    var timeline: IVisualPlugin;
    var forceGraph: IVisualPlugin;
    let gantt: IVisualPlugin;
    let streamGraph: IVisualPlugin;
    var lineDotChart: IVisualPlugin;
}

declare module powerbi.visuals.visualPluginFactory {
    class CustomVisualPluginService extends VisualPluginService {
        private customVisualPlugins;
        constructor();
        getVisuals(): IVisualPlugin[];
        getPlugin(type: string): IVisualPlugin;
        capabilities(type: string): VisualCapabilities;
        private initCustomVisualPlugins();
    }
    function createCustomVisualPluginService(): IVisualPluginService;
}
