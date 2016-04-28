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
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import AxisScale = powerbi.visuals.axisScale;
    import DataRoleHelper = powerbi.data.DataRoleHelper;

    export interface AreaRangeChartConstructorOptions {
        animator?: IGenericAnimator;
    }

    export interface AreaRangeChartSeries extends SelectableDataPoint {
        name?: string;
        data: AreaRangeChartDataPoint[];
        color: string;
        displayName: string;
        key: string;
        lineIndex: number;
        xCol: DataViewMetadataColumn;
        yCol: DataViewMetadataColumn;
    }

    export interface AreaRangeChartDataPoint extends TooltipEnabledDataPoint, SelectableDataPoint {
        y0?: number;
        y1?: number;
        value: number;
        categoryValue: any;
        categoryIndex: number;
        seriesIndex: number;
        key: string;
        pointColor?: string;
    }

    export interface AreaRangeChartLegend extends DataViewObject {
        show?: boolean;
        showTitle?: boolean;
        titleText?: string;
        position?: LegendPosition;
    }

    export interface AreaRangeChartSettings {
        displayName?: string;
        fillColor?: string;
        legend?: AreaRangeChartLegend;
        colors?: IColorPalette;
    }

    export interface AreaRangeChartData {

        categoryMetadata: DataViewMetadataColumn;
        hasHighlights?: boolean;

        series: AreaRangeChartSeries[];
        isScalar?: boolean;
        axesLabels: ChartAxesLabels;
        hasDynamicSeries?: boolean;
        defaultSeriesColor?: string;
        categoryData?: LineChartCategoriesData[];

        categories: any[];
        legendData?: LegendData;
        xScale?: IAxisProperties;
        xAxisProperties?: IAxisProperties;
        yAxisProperties?: IAxisProperties;
        settings?: AreaRangeChartSettings;
        formatter?: IValueFormatter;

        lowerMeasureIndex: number;
        upperMeasureIndex: number;
    }

    export interface AreaRangeBehaviorOptions {
        selection: D3.Selection;
        clearCatcher: D3.Selection;
        interactivityService: IInteractivityService;
    }

    class AreaRangeWebBehavior implements IInteractiveBehavior {
        private selection: D3.Selection;
        private clearCatcher: D3.Selection;
        private interactivityService: IInteractivityService;

        public bindEvents(options: AreaRangeBehaviorOptions, selectionHandler: ISelectionHandler) {
            this.selection = options.selection;
            this.clearCatcher = options.clearCatcher;
            this.interactivityService = options.interactivityService;

            this.selection.on('click', (d: AreaRangeChartSeries) => {
                selectionHandler.handleSelection(d, d3.event.ctrlKey);
            });

            this.clearCatcher.on('click', () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean) {
            this.selection.style("fill-opacity", (d: AreaRangeChartSeries) => {
                return (hasSelection && !d.selected) ? LineChart.DimmedAreaFillOpacity : LineChart.AreaFillOpacity;
            });
        }
    }

    export class AreaRangeChart implements IVisual {

        private static properties = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            legend: {
                show: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'show' },
                position: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'position' },
                showTitle: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'showTitle' },
                titleText: <DataViewObjectPropertyIdentifier>{ objectName: 'legend', propertyName: 'titleText' },
            },
            dataPoint: {
                defaultColor: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'defaultColor' },
                fill: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'fill' },
                showAllDataPoints: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'showAllDataPoints' },
            },
        };

        private static RoleNames = {
            Category: "Category",
            Series: "Series",
            Lower: "Lower",
            Upper: "Upper",
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: AreaRangeChart.RoleNames.Category,
                    kind: powerbi.VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Axis"),
                    description: data.createDisplayNameGetter("Role_DisplayName_AxisDescription")
                },
                {
                    name: AreaRangeChart.RoleNames.Series,
                    kind: powerbi.VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Legend"),
                    description: data.createDisplayNameGetter("Role_DisplayName_LegendDescription")
                },
                {
                    name: AreaRangeChart.RoleNames.Lower,
                    kind: powerbi.VisualDataRoleKind.Measure,
                    displayName: 'Y1'
                },
                {
                    name: AreaRangeChart.RoleNames.Upper,
                    kind: powerbi.VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Y2")
                },
            ],
            dataViewMappings: [
                {
                    conditions: [
                        {
                            "Category": { max: 1 },
                            "Series": { max: 1 },
                            "Lower": { max: 1 },
                            "Upper": { max: 1 }
                        },
                    ],
                    categorical: {
                        categories: {
                            for: { in: AreaRangeChart.RoleNames.Category },
                            dataReductionAlgorithm: { top: {} }
                        },
                        values: {
                            group: {
                                by: AreaRangeChart.RoleNames.Series,
                                select: [
                                    { bind: { to: AreaRangeChart.RoleNames.Lower } },
                                    { bind: { to: AreaRangeChart.RoleNames.Upper } }
                                ]
                            },
                        },
                    }
                }
            ],
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
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter('Visual_Show'),
                            type: { bool: true }
                        },
                        position: {
                            displayName: data.createDisplayNameGetter('Visual_LegendPosition'),
                            type: { formatting: { legendPosition: true } }
                        },
                        showTitle: {
                            displayName: data.createDisplayNameGetter('Visual_LegendShowTitle'),
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: data.createDisplayNameGetter('Visual_LegendNameDescription'),
                            type: { text: true }
                        }
                    }
                },
                dataPoint: {
                    displayName: data.createDisplayNameGetter('Visual_DataPoint'),
                    properties: {
                        defaultColor: {
                            displayName: data.createDisplayNameGetter('Visual_DefaultColor'),
                            type: { fill: { solid: { color: true } } }
                        },
                        showAllDataPoints: {
                            displayName: data.createDisplayNameGetter('Visual_DataPoint_Show_All'),
                            type: { bool: true }
                        },
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
            },
        };

        private static VisualClassName = 'areaRangeChart';

        private static Chart: ClassAndSelector = createClassAndSelector('chart');
        private static Area: ClassAndSelector = createClassAndSelector('area');
        private static Axis: ClassAndSelector = createClassAndSelector('axis');

        private interactivityService: IInteractivityService;
        private behavior: IInteractiveBehavior;
        private colors: IDataColorPalette;
        private viewport: IViewport;
        private animator: IGenericAnimator;
        private margin: IMargin;
        private legend: ILegend;
        private dataViewCat: DataViewCategorical;
        private data: AreaRangeChartData;

        private static DefaultSettings: AreaRangeChartSettings = {
            displayName: "Area Range Chart",
            legend: {
                show: true,
                position: LegendPosition.Top,
                showTitle: true,
            }
        };

        private static defaultTextProperties: TextProperties = {
            fontFamily: 'wf_segoe-ui_normal',
            fontSize: jsCommon.PixelConverter.toString(9),
        };

        private static DefaultMargin: IMargin = {
            top: 20,
            bottom: 50,
            right: 20,
            left: 40,
        };

        private static DefaultViewport: IViewport = {
            width: 50,
            height: 50
        };

        private svg: D3.Selection;
        private clearCatcher: D3.Selection;
        private chart: D3.Selection;
        private axis: D3.Selection;
        private axisX: D3.Selection;
        private axisY: D3.Selection;
        private cartesianMinOrdinalRectThickness: number;

        private scaleType: string = AxisScale.linear;

        public constructor(options?: AreaRangeChartConstructorOptions) {
            if (options) {
                this.animator = options.animator;
            }

            this.margin = AreaRangeChart.DefaultMargin;
        }

        public init(options: VisualInitOptions): void {
            let element = options.element;
            this.colors = options.style.colorPalette.dataColors;
            this.behavior = new AreaRangeWebBehavior();
            let interactivity = options.interactivity;
            this.interactivityService = createInteractivityService(options.host);

            this.svg = d3.select(element.get(0))
                .append('svg')
                .classed(AreaRangeChart.VisualClassName, true);

            this.clearCatcher = appendClearCatcher(this.svg);

            this.chart = this.svg
                .append('g')
                .classed(AreaRangeChart.Chart.class, true);

            this.axis = this.svg
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);

            this.axisX = this.axis
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);

            this.axisY = this.axis
                .append('g')
                .classed(AreaRangeChart.Axis.class, true);

            this.legend = createLegend(element, interactivity && interactivity.isInteractiveLegend, this.interactivityService, true);
        }

        private isSizeAvailable(viewport: IViewport): boolean {
            if ((viewport.height < AreaRangeChart.DefaultViewport.height) ||
                (viewport.width < AreaRangeChart.DefaultViewport.width)) {
                return false;
            }
            return true;
        }

        public update(options: VisualUpdateOptions): void {
            if (!options.dataViews || !options.dataViews[0]) {
                return;
            }

            let dataView = options.dataViews[0];
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.values ||
                !dataView.categorical.values[0] ||
                !dataView.categorical.values[0].values ||
                !this.isSizeAvailable(options.viewport)) {
                this.clearChart();
                return;
            }

            this.cartesianMinOrdinalRectThickness = CartesianChart.MinOrdinalRectThickness;

            this.setSize(options.viewport);
            this.setData(options.dataViews);

            if (!this.data) {
                this.clearChart();
                return;
            }

            this.calculateAxesProperties();
            this.render(options.suppressAnimations);
            CartesianChart.MinOrdinalRectThickness = this.cartesianMinOrdinalRectThickness;
        }

        private static getColor(
            colorHelper: ColorHelper,
            hasDynamicSeries: boolean,
            values: DataViewValueColumns,
            grouped: DataViewValueColumnGroup[],
            seriesIndex: number,
            groupedIdentity: DataViewValueColumnGroup): string {

            let objects: DataViewObjects;
            if (hasDynamicSeries) {
                if (grouped && grouped[seriesIndex])
                    objects = grouped[seriesIndex].objects;
            }
            else if (values[seriesIndex]) {
                objects = values[seriesIndex].source.objects;
            }

            return hasDynamicSeries && groupedIdentity
                ? colorHelper.getColorForSeriesValue(objects, values.identityFields, groupedIdentity.name)
                : colorHelper.getColorForMeasure(objects, values[seriesIndex].source.queryName);
        }

        public setData(dataViews: DataView[]): void {
            this.data = {
                series: [],
                axesLabels: { x: null, y: null },
                hasDynamicSeries: false,
                categories: [],
                categoryMetadata: undefined,
                lowerMeasureIndex: undefined,
                upperMeasureIndex: undefined,
            };

            if (dataViews.length > 0) {
                let dataView = dataViews[0];

                if (dataView) {
                    if (dataView.categorical) {
                        let dataViewCat = this.dataViewCat = dataView.categorical;
                        let dvCategories = dataViewCat.categories;
                        let categoryType: ValueType | ValueTypeDescriptor = ValueType.fromDescriptor({ text: true });
                        if (dvCategories && dvCategories.length > 0 && dvCategories[0].source && dvCategories[0].source.type)
                            categoryType = dvCategories[0].source.type;

                        let axisType = AreaRangeChart.properties.general.formatString;

                        this.data = AreaRangeChart.converter(
                            dataView,
                            valueFormatter.format(null),
                            this.colors,
                            CartesianChart.getIsScalar(dataView.metadata ? dataView.metadata.objects : null, axisType, categoryType),
                            this.interactivityService);
                    }
                }
            }
        }

        public static converter(dataView: DataView, blankCategoryValue: string, colors: IDataColorPalette, isScalar: boolean, interactivityService?: IInteractivityService): AreaRangeChartData {
            let categorical: DataViewCategorical = dataView.categorical;
            let category = categorical.categories && categorical.categories.length > 0
                ? categorical.categories[0]
                : {
                    source: undefined,
                    values: [blankCategoryValue],
                    identity: undefined,
                };

            let maxLabel: string = '';

            if (category.values.length !== 0)
                maxLabel = category.values.reduce((a, b) => {
                    if (a && b) return a.length > b.length ? a : b;
                    return a ? a : (b ? b : blankCategoryValue);
                });

            let textProperties: powerbi.TextProperties = {
                text: maxLabel,
                fontFamily: AreaRangeChart.defaultTextProperties.fontFamily,
                fontSize: AreaRangeChart.defaultTextProperties.fontSize
            };

            /* tslint:disable */
            let widthOfLabel = powerbi.TextMeasurementService.measureSvgTextWidth(textProperties);
            /* tslint:enable */
            // CartesianChart.MinOrdinalRectThickness = widthOfLabel + 4;

            let xAxisCardProperties = CartesianHelper.getCategoryAxisProperties(dataView.metadata);
            isScalar = CartesianHelper.isScalar(isScalar, xAxisCardProperties);
            categorical = ColumnUtil.applyUserMinMax(isScalar, categorical, xAxisCardProperties);

            let formatStringProp = AreaRangeChart.properties.general.formatString;
            let categoryType: ValueType = AxisHelper.getCategoryValueType(category.source, isScalar);
            let isDateTime = AxisHelper.isDateTime(categoryType);
            let categoryValues = category.values;
            let series: AreaRangeChartSeries[] = [];
            let seriesLen = categorical.values ? categorical.values.length : 0;
            let hasDynamicSeries = !!(categorical.values && categorical.values.source);
            let values = categorical.values;

            let defaultSeriesColor: string;
            if (dataView.metadata && dataView.metadata.objects) {
                let objects = dataView.metadata.objects;
                defaultSeriesColor = DataViewObjects.getFillColor(objects, lineChartProps.dataPoint.defaultColor);
            }

            let settings: AreaRangeChartSettings = AreaRangeChart.parseSettings(dataView);
            if (!settings) {
                return;
            }

            let colorHelper = new ColorHelper(colors, lineChartProps.dataPoint.fill, defaultSeriesColor);

            let grouped: DataViewValueColumnGroup[];
            if (values) {
                grouped = values.grouped();
            }

            let lowerMeasureIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, AreaRangeChart.RoleNames.Lower);
            let upperMeasureIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, AreaRangeChart.RoleNames.Upper);

            if (lowerMeasureIndex < 0 || upperMeasureIndex < 0) {
                return;
            }

            seriesLen = grouped.length;
            let formatterLarge = valueFormatter.create({ format: "0", value: 1e6 });

            for (let seriesIndex = 0; seriesIndex < seriesLen; seriesIndex++) {
                let column = categorical.values[seriesIndex];
                let dataPoints: AreaRangeChartDataPoint[] = [];
                let groupedIdentity = grouped[seriesIndex];
                let identity = hasDynamicSeries && groupedIdentity ?
                    SelectionId.createWithIdAndMeasure(groupedIdentity.identity, column.source.queryName) :
                    SelectionId.createWithMeasure(column.source.queryName);
                let key = identity.getKey();
                let color = AreaRangeChart.getColor(colorHelper, hasDynamicSeries, values, grouped, seriesIndex, groupedIdentity);
                let y0_group = groupedIdentity.values[lowerMeasureIndex];
                let y1_group = groupedIdentity.values[upperMeasureIndex];

                for (let categoryIndex = 0, len = column.values.length; categoryIndex < len; categoryIndex++) {
                    let categoryValue = categoryValues[categoryIndex];
                    let value = AxisHelper.normalizeNonFiniteNumber(column.values[categoryIndex]);
                    
                    // When Scalar, skip null categories and null values so we draw connected lines and never draw isolated dots.
                    if (isScalar && (categoryValue === null || value === null)) {
                        continue;
                    }

                    let y0 = y0_group.values[categoryIndex];
                    let y1 = y1_group.values[categoryIndex];

                    let formatted_y0 = (y0 != null ? (String(y0).length >= 6 ? formatterLarge.format(y0) : y0) : y0);
                    let formatted_y1 = (y1 != null ? (String(y1).length >= 6 ? formatterLarge.format(y1) : y1) : y1);

                    let seriesData: TooltipSeriesDataItem[] = [
                        {
                            value: formatted_y0,
                            metadata: y0_group
                        },
                        {
                            value: formatted_y1,
                            metadata: y1_group
                        }];

                    let tooltipInfo: TooltipDataItem[] = TooltipBuilder.createTooltipInfo(
                        formatStringProp,
                        categorical,
                        categoryValue,
                        value,
                        null,
                        seriesData,
                        seriesIndex,
                        categoryIndex);

                    dataPoints.push({
                        categoryValue: isDateTime && categoryValue ? categoryValue.getTime() : categoryValue,
                        value: value,
                        categoryIndex: categoryIndex,
                        seriesIndex: seriesIndex,
                        tooltipInfo: tooltipInfo,
                        selected: false,
                        identity: identity,
                        key: JSON.stringify({ ser: key, catIdx: categoryIndex }),
                        y0: y0,
                        y1: y1,
                        pointColor: color,
                    });
                }

                if (interactivityService) {
                    interactivityService.applySelectionStateToData(dataPoints);
                }

                if (dataPoints.length > 0)
                    series.push({
                        displayName: grouped[seriesIndex].name,
                        key: key,
                        lineIndex: seriesIndex,
                        color: color,
                        xCol: category.source,
                        yCol: column.source,
                        data: dataPoints,
                        identity: identity,
                        selected: false,
                    });
            }

            xAxisCardProperties = CartesianHelper.getCategoryAxisProperties(dataView.metadata);
            let valueAxisProperties = CartesianHelper.getValueAxisProperties(dataView.metadata);
             
            // Convert to DataViewMetadataColumn
            let valuesMetadataArray: powerbi.DataViewMetadataColumn[] = [];
            if (values)
                for (let value of values) {
                    if (value && value.source && value.source.displayName)
                        valuesMetadataArray.push({ displayName: value.source.displayName });
                }

            let axesLabels = converterHelper.createAxesLabels(xAxisCardProperties, valueAxisProperties, category.source, valuesMetadataArray);
            if (interactivityService) {
                interactivityService.applySelectionStateToData(series);
            }
            return {
                series: series,
                isScalar: isScalar,
                axesLabels: { x: axesLabels.xAxisLabel, y: axesLabels.yAxisLabel },
                hasDynamicSeries: hasDynamicSeries,
                categoryMetadata: category.source,
                categories: categoryValues,
                lowerMeasureIndex: lowerMeasureIndex,
                upperMeasureIndex: upperMeasureIndex,
                settings: settings
            };
        }

        private clearChart(): void {
            this.chart.selectAll('*').remove();
            this.axisY.selectAll('*').remove();
            this.axisX.selectAll('*').remove();
        }

        public render(suppressAnimations: boolean): CartesianVisualRenderResult {
            let duration = AnimatorCommon.GetAnimationDuration(this.animator, suppressAnimations);
            let result: CartesianVisualRenderResult;
            let data = this.data;
            this.renderAxis(data, duration);
            this.renderChart(data, duration);
            
            // Calculate Legend
            let legendData = this.createLegendDataPoints(0);

            if (data.settings && data.settings.legend) {
                LegendData.update(legendData, data.settings.legend);
                this.legend.changeOrientation(data.settings.legend.position);
            }

            let isDrawLegend = false;

            if (isDrawLegend) {
                this.legend.drawLegend(legendData, this.viewport);
            }
            return result;
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height = viewport.height - this.margin.top - this.margin.bottom;
            width = viewport.width - this.margin.left - this.margin.right;

            height = Math.max(height, AreaRangeChart.DefaultViewport.height);
            width = Math.max(width, AreaRangeChart.DefaultViewport.width);

            this.viewport = {
                height: height,
                width: width
            };

            this.updateElements(viewport.height, viewport.width);
        }

        private updateElements(height: number, width: number): void {
            this.svg.attr({
                'height': height + 'px',
                'width': width + 'px'
            });
            this.axisY.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top));
            this.axisX.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top + this.viewport.height));
        }

        private static getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return dataView.metadata.objects;
        }

        private static getLegendSettings(objects: DataViewObjects): DataViewObject {
            let legend: any = objects["legend"];

            legend.show = DataViewObjects.getValue(objects,
                AreaRangeChart.properties.legend.show,
                AreaRangeChart.DefaultSettings.legend.show);
            legend.position = DataViewObjects.getValue(objects,
                AreaRangeChart.properties.legend.position,
                AreaRangeChart.DefaultSettings.legend.position);
            legend.showTitle = DataViewObjects.getValue(objects,
                AreaRangeChart.properties.legend.showTitle,
                AreaRangeChart.DefaultSettings.legend.showTitle);
            legend.titleText = DataViewObjects.getValue(objects,
                AreaRangeChart.properties.legend.titleText,
                AreaRangeChart.DefaultSettings.legend.titleText);

            return legend;
        }

        private static getDataColorsSettings(objects: DataViewObjects): IColorPalette {
            let legend: any = objects["dataPoints"];
            return legend;
        }

        private static parseSettings(dataView: DataView): AreaRangeChartSettings {
            let settings: AreaRangeChartSettings = <AreaRangeChartSettings>{},
                objects: DataViewObjects;

            settings.displayName = AreaRangeChart.DefaultSettings.displayName;
            settings.fillColor = AreaRangeChart.DefaultSettings.fillColor;
            objects = AreaRangeChart.getObjectsFromDataView(dataView);

            if (objects) {
                settings.legend = AreaRangeChart.getLegendSettings(objects);
                settings.colors = AreaRangeChart.getDataColorsSettings(objects);
            }
            return settings;
        }

        public calculateAxesProperties(): IAxisProperties[] {

            this.data.xAxisProperties = this.getXAxisProperties();
            this.data.yAxisProperties = this.getYAxisProperties();

            return [this.data.xAxisProperties, this.data.yAxisProperties];
        }

        private lookupXValue(index: number, type: ValueType): any {

            let isDateTime = AxisHelper.isDateTime(type);
            if (this.data.isScalar) {
                if (isDateTime)
                    return new Date(index);
                return index;
            }

            if (this.data && this.data.series && this.data.series.length > 0) {
                let firstSeries = this.data.series[0];
                if (firstSeries) {
                    let data = firstSeries.data;
                    if (data) {
                        let dataAtIndex = data[index];
                        if (dataAtIndex) {
                            if (isDateTime && dataAtIndex.categoryValue != null)
                                return new Date(dataAtIndex.categoryValue);
                            return dataAtIndex.categoryValue;
                        }
                    }
                }
            }

            return index;
        }

        private getXAxisProperties(): IAxisProperties {
            let data = this.data;
            let categoryDataType: ValueType = AxisHelper.getCategoryValueType(data.series[0].xCol); //data.categoryMetadata
            let xDomain = AxisHelper.createDomain(data.series, categoryDataType, data.isScalar, null);
            let origCatgSize = data.series && data.series.length > 0 ? data.series[0].data.length : 0;
            let categoryThickness = CartesianChart.getCategoryThickness(data.series, origCatgSize, this.viewport.width, xDomain, data.isScalar, false);
            let xMetaDataColumn: DataViewMetadataColumn = data.series[0].xCol; //data.categoryMetadata

            let xAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.width,
                dataDomain: xDomain,
                metaDataColumn: xMetaDataColumn,
                formatString: valueFormatter.getFormatString(xMetaDataColumn, AreaRangeChart.properties.general.formatString),
                outerPadding: 0,
                isScalar: data.isScalar,
                isVertical: false,
                forcedTickCount: undefined,
                useTickIntervalForDisplayUnits: true,
                getValueFn: (index, type) => this.lookupXValue(index, type),
                categoryThickness: categoryThickness,
                isCategoryAxis: true,
                scaleType: this.scaleType,
                axisDisplayUnits: undefined,
                axisPrecision: undefined
            });

            xAxisProperties.willLabelsFit = AxisHelper.LabelLayoutStrategy.willLabelsFit(
                xAxisProperties,
                this.viewport.width,
                TextMeasurementService.measureSvgTextWidth,
                AreaRangeChart.defaultTextProperties);

            // If labels do not fit and we are not scrolling, try word breaking
            xAxisProperties.willLabelsWordBreak = !xAxisProperties.willLabelsFit && AxisHelper.LabelLayoutStrategy.willLabelsWordBreak(
                xAxisProperties, this.margin, this.viewport.width, TextMeasurementService.measureSvgTextWidth,
                TextMeasurementService.estimateSvgTextHeight, TextMeasurementService.getTailoredTextOrDefault,
                AreaRangeChart.defaultTextProperties);

            return xAxisProperties;
        }
        
        /**
         * Creates a [min,max] from your Cartiesian data values.
         * 
         * @param data The series array of CartesianDataPoints.
         * @param includeZero Columns and bars includeZero, line and scatter do not.
         */
        private static createValueDomain(data: AreaRangeChartSeries[], includeZero: boolean): number[] {
            if (data.length === 0) {
                return null;
            }

            let minY0 = <number>d3.min(data, (kv) => { return d3.min(kv.data, d => { return d.y0; }); });
            let minY1 = <number>d3.min(data, (kv) => { return d3.min(kv.data, d => { return d.y1; }); });

            let maxY0 = <number>d3.max(data, (kv) => { return d3.max(kv.data, d => { return d.y0; }); });
            let maxY1 = <number>d3.max(data, (kv) => { return d3.max(kv.data, d => { return d.y1; }); });

            let minY = Math.min(minY0, minY1);
            let maxY = Math.max(maxY0, maxY1);

            if (includeZero) {
                return [Math.min(minY, 0), Math.max(maxY, 0)];
            }
            return [minY, maxY];
        }

        private getYAxisProperties(): IAxisProperties {
            let yDomain = AreaRangeChart.createValueDomain(this.data.series, false);
            let lowerMeasureIndex = this.data.series.length === 1 ? 0 : this.data.lowerMeasureIndex;
            let yMetaDataColumn: DataViewMetadataColumn = this.data.series.length ? this.data.series[lowerMeasureIndex].yCol : undefined;
            let yAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.height,
                dataDomain: yDomain,
                metaDataColumn: yMetaDataColumn,
                formatString: valueFormatter.getFormatString(yMetaDataColumn, AreaRangeChart.properties.general.formatString),
                outerPadding: 0,
                isScalar: true, //this.data.isScalar,
                isVertical: true,
                useTickIntervalForDisplayUnits: true,
                isCategoryAxis: false,
                scaleType: this.scaleType,
            });

            return yAxisProperties;
        }

        private renderAxis(data: AreaRangeChartData, duration: number): void {
            let xAxis = data.xAxisProperties.axis;
            let yAxis = data.yAxisProperties.axis;

            xAxis.orient('bottom');
            yAxis.orient('left');

            this.axisX
                .transition()
                .duration(1)
                .duration(duration)
                .call(xAxis);

            this.axisY
                .transition()
                .duration(duration)
                .call(yAxis);
        }

        private renderChart(data: AreaRangeChartData, duration: number): void {
            let series: AreaRangeChartSeries[] = data.series,
                isScalar: boolean = data.isScalar,
                xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.xAxisProperties.scale,
                yScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.yAxisProperties.scale,
                hasSelection: boolean = this.interactivityService && this.interactivityService.hasSelection();

            let area: D3.Svg.Area = d3.svg.area()
                .x((d: AreaRangeChartDataPoint) => {
                    return xScale(isScalar ? d.categoryValue : d.categoryIndex);
                })
                .y0((d: AreaRangeChartDataPoint) => yScale(d.y0))
                .y1((d: AreaRangeChartDataPoint) => yScale(d.y1));

            let selection = this.chart.selectAll(AreaRangeChart.Area.selector).data(series);

            selection
                .enter()
                .append('svg:path')
                .classed(AreaRangeChart.Area.class, true);

            selection
                .attr('fill', (d: AreaRangeChartSeries) => d.color)
                .attr('stroke', (d: AreaRangeChartSeries) => d.color)
                .style('fill-opacity', (d: AreaRangeChartSeries) => (hasSelection && !d.selected) ? LineChart.DimmedAreaFillOpacity : LineChart.AreaFillOpacity)
                .transition()
                .duration(duration)
                .attr('d', (d: AreaRangeChartSeries) => area(d.data));

            selection.exit().remove();

            let interactivityService = this.interactivityService;

            if (interactivityService) {
                let behaviorOptions: AreaRangeBehaviorOptions = {
                    selection: selection,
                    clearCatcher: this.clearCatcher,
                    interactivityService: this.interactivityService,
                };

                interactivityService.bind(series, this.behavior, behaviorOptions);
            }

            this.renderTooltip(selection, xScale, data.isScalar);
            let xOfFirstCategory: number = this.getXOfFirstCategory();
            this.chart.attr('transform', SVGUtil.translate(this.margin.left + xOfFirstCategory, this.margin.top));
        }

        private getXOfFirstCategory(): number {
            if (!this.data.isScalar) {
                let xScale = <D3.Scale.OrdinalScale>this.data.xAxisProperties.scale;
                if (xScale.rangeBand && !isNaN(xScale.rangeBand()))
                    return xScale.rangeBand() / 2;
            }
            return 0;
        }

        private static findClosestXAxisIndex(currentX: number, xAxisValues: AreaRangeChartDataPoint[], isScalar: boolean): number {
            let closestValueIndex: number = -1;
            let minDistance = Number.MAX_VALUE;
            for (let i in xAxisValues) {

                let element = <AreaRangeChartDataPoint>xAxisValues[i];
                let value = isScalar ? element.categoryValue : element.categoryIndex;

                let distance = Math.abs(currentX - value);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestValueIndex = <any>i;
                }
            }
            return closestValueIndex;
        }

        public static getTooltipInfoByPointX(pointData: any, xScale: D3.Scale.LinearScale, isScalar: boolean, pointX: number): TooltipDataItem[] {

            let index: number = 0;
            let currentX = powerbi.visuals.AxisHelper.invertScale(xScale, pointX);
            index = AreaRangeChart.findClosestXAxisIndex(currentX, pointData.data, isScalar);
            return pointData.data[index].tooltipInfo;
        }

        private renderTooltip(selection: D3.UpdateSelection, xScale: D3.Scale.LinearScale, isScalar: boolean): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                let pointX: number = tooltipEvent.elementCoordinates[0];
                return AreaRangeChart.getTooltipInfoByPointX(tooltipEvent.data, xScale, isScalar, pointX);
            }, true);
        }

        private createLegendDataPoints(columnIndex: number): LegendData {
            let data = this.data;
            if (!data) {
                return null;
            }

            let legendDataPoints: LegendDataPoint[] = [];
            let category: any;

            // Category will be the same for all series. This is an optimization.
            if (data.series.length > 0) {
                let lineDatePointFirstSeries: AreaRangeChartDataPoint = data.series[0].data[columnIndex];
                let isDateTime = AxisHelper.isDateTime(this.data.xAxisProperties.axisType);
                let value = (isDateTime && this.data.isScalar && lineDatePointFirstSeries) ? lineDatePointFirstSeries.categoryValue : columnIndex;
                category = lineDatePointFirstSeries && this.lookupXValue(value, this.data.xAxisProperties.axisType);
            }

            let formatStringProp = lineChartProps.general.formatString;
            let seriesYCol: DataViewMetadataColumn = null;
            // Iterating over the line data (i is for a line)
            for (let i = 0, len = data.series.length; i < len; i++) {
                let series = data.series[i];
                let lineData = series.data;
                let lineDataPoint = lineData[columnIndex];
                let measure = lineDataPoint && lineDataPoint.value;

                let label = converterHelper.getFormattedLegendLabel(series.yCol, this.dataViewCat.values, formatStringProp);
                seriesYCol = series.yCol;
                legendDataPoints.push({
                    color: series.color,
                    icon: LegendIcon.Line,
                    label: label,
                    category: valueFormatter.format(category, valueFormatter.getFormatString(series.xCol, formatStringProp)),
                    measure: valueFormatter.format(measure, valueFormatter.getFormatString(series.yCol, formatStringProp)),
                    identity: series.identity,
                    selected: false
                });
            }

            let dvValues = this.dataViewCat ? this.dataViewCat.values : null;
            let title = dvValues && dvValues.source ? dvValues.source.displayName : "";

            return {
                title: title,
                dataPoints: legendDataPoints
            };
        }

        private enumerateLegend(enumeration: ObjectEnumerationBuilder): ObjectEnumerationBuilder {
            let data = this.data;

            if (typeof (data) === 'undefined') {
                return;
            }
            let legendObjectProperties: DataViewObjects = { legend: data.settings.legend };
            let show = DataViewObjects.getValue(legendObjectProperties, AreaRangeChart.properties.legend.show, this.legend.isVisible());
            let showTitle = DataViewObjects.getValue(legendObjectProperties, AreaRangeChart.properties.legend.showTitle, true);
            let titleText = DataViewObjects.getValue(legendObjectProperties, AreaRangeChart.properties.legend.titleText, null);

            enumeration.pushInstance({
                selector: null,
                objectName: 'legend',
                properties: {
                    show: show,
                    position: LegendPosition[this.legend.getOrientation()],
                    showTitle: showTitle,
                    titleText: titleText
                }
            });
        }

        private enumerateDataPoints(enumeration: ObjectEnumerationBuilder): ObjectEnumerationBuilder {
            let data = this.data;
            if (!data) {
                return;
            }

            let series = data.series;

            for (let item of series) {
                let color = item.color;
                let selector = item.identity.getSelector();
                let isSingleSeries = !!selector.data;

                enumeration.pushInstance({
                    objectName: 'dataPoint',
                    displayName: item.displayName,
                    selector: ColorHelper.normalizeSelector(selector, isSingleSeries),
                    properties: {
                        fill: { solid: { color: color } }
                    },
                });
            }
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder();

            switch (options.objectName) {
                case 'legend':
                    this.enumerateLegend(enumeration);
                    break;
                case 'dataPoint':
                    this.enumerateDataPoints(enumeration);
                    break;
            }
            return enumeration.complete();
        }
    }
}