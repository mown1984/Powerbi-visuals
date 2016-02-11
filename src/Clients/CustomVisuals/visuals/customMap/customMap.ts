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

module powerbi.visuals.samples.customMap {
    /*declare module Microsoft {
        module Maps {
            module Events {
                function addHandler(target: any, eventName: string, handler: any);
                function addThrottledHandler(target: any, eventName: string, handler: any, throttleInterval: any);
            }
            export function loadModule(moduleKey: string, options?: { callback: () => void; }): void;
            class Map {
                constructor (mapElement: HTMLElement, options?: MapOptions);
                constructor (mapElement: HTMLElement, options?: ViewOptions);
                getTargetZoom(): number;
                getRootElement(): Node;
                getTargetCenter(): Location;
                setView(options: ViewOptions): void;
                restrictZoom(min: number, max: number);
                tryLocationToPixel(location: Location, reference?: PixelReference): Point;
            }
            class Location {
                constructor(latitude: number, longitude: number);
                latitude: number
                longitude: number
            }
            export class MapTypeId {
                static aerial: string;
                static auto: string;
                static birdseye: string;
                static collinsBart: string;
                static mercator: string;
                static ordnanceSurvey: string;
                static road: string;
            }
            export class PixelReference {}
            interface MapOptions {}
            export interface ViewOptions {
                animate?: boolean;
                center?: Location;
                zoom?: number;
            }
        }
    }*/
    
    import Color = jsCommon.Color;
    import PixelConverter = jsCommon.PixelConverter;
    import Polygon = shapes.Polygon;
    import DataRoleHelper = powerbi.data.DataRoleHelper;

    export interface MapConstructionOptions {
        filledMap?: boolean;
        geocoder?: IGeocoder;
        mapControlFactory?: IMapControlFactory;
        behavior?: MapBehavior;
        tooltipsEnabled?: boolean;
        filledMapDataLabelsEnabled?: boolean;
        disableZooming?: boolean;
        disablePanning?: boolean;
        isLegendScrollable?: boolean;
        viewChangeThrottleInterval?: number; // Minimum interval between viewChange events (in milliseconds)
    }

    export interface IMapControlFactory {
        createMapControl(element: HTMLElement, options?: Microsoft.Maps.MapOptions): Microsoft.Maps.Map;
        ensureMap(locale: string, action: () => void): void;
    }

    export interface MapData {
        dataPoints: MapDataPoint[];
        geocodingCategory: string;
    }

    /**
     * The main map data point, which exists for each category
     */
    export interface MapDataPoint {
        geocodingQuery: string;
        value: number;
        categoryValue: string;
        subDataPoints: MapSubDataPoint[];
        location?: IGeocodeCoordinate;
        paths?: IGeocodeBoundaryPolygon[];
        radius?: number;
    }

    /**
     * SubDataPoint that carries series-based data.  For category only maps
     * there will only be one of these on each MapDataPoint; for dynamic series,
     * there will be one per series for each MapDataPoint.
     */
    export interface MapSubDataPoint {
        value: number;
        fill: string;
        stroke: string;
        identity: SelectionId;
    }

    export interface MapRendererData {
        bubbleData?: MapBubble[];
        sliceData?: MapSlice[][];
        shapeData?: MapShape[];
    }

    export interface MapVisualDataPoint extends TooltipEnabledDataPoint, SelectableDataPoint {
        x: number;
        y: number;
        radius: number;
        fill: string;
        stroke: string;
        strokeWidth: number;
        labeltext: string;
        labelFill: string;
    }

    export interface MapBubble extends MapVisualDataPoint {
    }

    export interface MapSlice extends MapVisualDataPoint {
        value: number;
        startAngle?: number;
        endAngle?: number;
    }

    export interface MapShape extends TooltipEnabledDataPoint, SelectableDataPoint {
        absolutePointArray: Float64Array;
        path: string;
        fill: string;
        stroke: string;
        strokeWidth: number;
        key: string;
        labeltext: string;
        displayLabel: boolean;
        catagoryLabeltext?: string;
        labelFormatString: string;
    }

    export class MapViewSettings {
        public autoZoom: boolean = true;
        public minZoom = MapUtil.MinLevelOfDetail;
        public maxZoom = MapUtil.MaxLevelOfDetail;
        public zoom: number = 1;
        public latitude: number;
        public longitude: number;

        public get center(): Microsoft.Maps.Location {
            return new Microsoft.Maps.Location(this.latitude, this.longitude);
        }

        public set center(value: Microsoft.Maps.Location) {
            this.latitude = value && value.latitude;
            this.longitude = value && value.longitude;
        }
    }

    /** 
     * Used because data points used in D3 pie layouts are placed within a container with pie information.
     */
    interface MapSliceContainer {
        data: MapSlice;
    }

    /** Note: public for UnitTest */
    export interface IMapDataPointRenderer {
        init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery, addClearCatcher: boolean): void;
        setData(data: MapData): void;
        getDataPointCount(): number;
        converter(viewPort: IViewport, dataView: DataView, labelSettings: PointDataLabelsSettings, interactivityService: IInteractivityService, tooltipsEnabled: boolean): MapRendererData;
        updateInternal(data: MapRendererData, viewport: IViewport, dataChanged: boolean, interactivityService: IInteractivityService, redrawDataLabels: boolean): MapBehaviorOptions;
        updateInternalDataLabels(viewport: IViewport, redrawDataLabels: boolean): void;
        getDataPointPadding(): number;
        clearDataPoints(): void;
    }

    export interface DataViewMetadataAutoGeneratedColumn extends DataViewMetadataColumn {
        /**
         * Indicates that the column was added manually.
         */
        isAutoGeneratedColumn?: boolean;
    }

    export var DefaultFillOpacity = 0.5;
    export var DefaultBackgroundColor = "#000000";
    export var LeaderLineColor = "#000000";

    export class MapBubbleDataPointRenderer implements IMapDataPointRenderer {
        private mapControl: Microsoft.Maps.Map;
        private mapData: MapData;
        private maxDataPointRadius: number;
        private svg: D3.Selection;
        private clearSvg: D3.Selection;
        private clearCatcher: D3.Selection;
        private bubbleGraphicsContext: D3.Selection;
        private sliceGraphicsContext: D3.Selection;
        private labelGraphicsContext: D3.Selection;
        private labelBackgroundGraphicsContext: D3.Selection;
        private sliceLayout: D3.Layout.PieLayout;
        private arc: D3.Svg.Arc;
        private dataLabelsSettings: PointDataLabelsSettings;
        private tooltipsEnabled: boolean;
        private static validLabelPositions: NewPointLabelPosition[] = [NewPointLabelPosition.Above, NewPointLabelPosition.Below, NewPointLabelPosition.Left, NewPointLabelPosition.Right];
        private mapRendererData: MapRendererData;
        private root: JQuery;

        public maxBubbleSize: number = 0;

        public constructor(tooltipsEnabled: boolean) {
            this.tooltipsEnabled = tooltipsEnabled;
        }

        public init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery, addClearCatcher: boolean): void {
            /*
                The layout of the visual would look like :
                <div class="visual mapControl">
                    <div class="MicrosoftMap">
                        <!-- Bing maps stuff -->
                        <svg>
                            <rect class="clearCatcher"></rect>
                        </svg>
                    </div>
                    <svg>
                        <g class="mapBubbles>
                            <!-- our geometry -->
                        </g>
                        <g class="mapSlices>
                            <!-- our geometry -->
                        </g>
                    </svg>
                </div>                    

            */

            this.mapControl = mapControl;
            this.root = mapDiv;
            var root = d3.select(mapDiv[0]);
            root.attr("drag-resize-disabled", "true"); // Enable panning within the maps in IE
            var svg = this.svg = root
                .append('svg')
                .style("position", "absolute") // Absolute position so that the svg will overlap with the canvas.
                .style("pointer-events", "none");
            if (addClearCatcher) {
                var clearSvg = this.clearSvg = d3.select(<HTMLElement>this.mapControl.getRootElement())
                    .append('svg')
                    .style('position', 'absolute'); // Absolute position so that the svg will overlap with the canvas.
                this.clearCatcher = appendClearCatcher(clearSvg);
            }
            this.bubbleGraphicsContext = svg
                .append("g")
                .classed("mapBubbles", true);
            this.sliceGraphicsContext = svg
                .append("g")
                .classed("mapSlices", true);
            this.labelBackgroundGraphicsContext = svg
                .append("g")
                .classed(NewDataLabelUtils.labelBackgroundGraphicsContextClass.class, true);
            this.labelGraphicsContext = svg
                .append("g")
                .classed(NewDataLabelUtils.labelGraphicsContextClass.class, true);
            this.sliceLayout = d3.layout.pie()
                .sort(null)
                .value((d: MapSlice) => {
                    return d.value;
                });
            this.arc = d3.svg.arc();
            this.clearMaxDataPointRadius();
            this.dataLabelsSettings = dataLabelUtils.getDefaultMapLabelSettings();
        }

        public setData(data: MapData): void {
            this.mapData = data;
        }

        public clearDataPoints(): void {
            this.mapData = {
                dataPoints: [],
                geocodingCategory: null,
            };
        }

        public getDataPointCount(): number {
            if (!this.mapData)
                return 0;
            // Filter out any data points without a location since those aren't actually being drawn
            return _.filter(this.mapData.dataPoints, (value: MapDataPoint) => !!value.location).length;
        }

        public getDataPointPadding(): number {
            return this.maxDataPointRadius * 2;
        }

        private clearMaxDataPointRadius(): void {
            this.maxDataPointRadius = 0;
        }

        private setMaxDataPointRadius(dataPointRadius: number): void {
            if(this.maxBubbleSize > 0) {
                dataPointRadius = Math.min(this.maxBubbleSize, dataPointRadius);
            }
            this.maxDataPointRadius = Math.max(dataPointRadius, this.maxDataPointRadius);
        }

        public getDefaultMap(geocodingCategory: string, dataPointCount: number): void {
            this.clearDataPoints();
        }

        public converter(viewport: IViewport,
            dataView: DataView,
            labelSettings: PointDataLabelsSettings,
            interactivityService: IInteractivityService,
            tooltipsEnabled: boolean = true): MapRendererData {
            var mapControl = this.mapControl;
            var widthOverTwo = viewport.width / 2;
            var heightOverTwo = viewport.height / 2;

            var strokeWidth = 1;

            //update data label settings
            this.dataLabelsSettings = labelSettings;

            // See MapSeriesPresenter::GetDataPointRadius for the PV behavior
            var radiusScale = Math.min(viewport.width, viewport.height) / 384;
            this.clearMaxDataPointRadius();

            var bubbleData: MapBubble[] = [];
            var sliceData: MapSlice[][] = [];
            var formatStringProp = CustomMap.mapProps.general.formatString;
            var categorical: DataViewCategorical = dataView ? dataView.categorical : null;
            var gradientValueColumn: DataViewValueColumn = GradientUtils.getGradientValueColumn(categorical);

            var grouped: DataViewValueColumnGroup[];
            var sizeIndex = -1;
            var dataValuesSource: DataViewMetadataColumn;
            if (categorical && categorical.values) {
                grouped = categorical.values.grouped();
                sizeIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, "Size");
                dataValuesSource = categorical.values.source;
            }

            var dataPoints = this.mapData ? this.mapData.dataPoints : [];
            for (var categoryIndex = 0, categoryCount = dataPoints.length; categoryIndex < categoryCount; categoryIndex++) {
                var dataPoint = dataPoints[categoryIndex];
                var categoryValue = dataPoint.categoryValue;
                var location = dataPoint.location;

                if (location) {
                    var xy = mapControl.tryLocationToPixel(new Microsoft.Maps.Location(location.latitude, location.longitude));
                    var x = xy.x + widthOverTwo;
                    var y = xy.y + heightOverTwo;

                    var radius = dataPoint.radius * radiusScale;
                    this.setMaxDataPointRadius(radius);
                    var subDataPoints = dataPoint.subDataPoints;

                    var seriesCount = subDataPoints.length;
                    if (seriesCount === 1) {
                        var subDataPoint: MapSubDataPoint = subDataPoints[0];
                        var value = subDataPoint.value;

                        var seriesData: TooltipSeriesDataItem[] = [];
                        if (dataValuesSource) {
                            // Dynamic series
                            seriesData.push({ value: grouped[0].name, metadata: { source: dataValuesSource, values: [] } });
                        }
                        if (sizeIndex > -1) {
                            seriesData.push({ value: value, metadata: grouped[0].values[sizeIndex] });
                        }

                        // check for gradient tooltip data 
                        var gradientToolTipData = TooltipBuilder.createGradientToolTipData(gradientValueColumn, categoryIndex);
                        if (gradientToolTipData != null)
                            seriesData.push(gradientToolTipData);
                        
                        var tooltipInfo: TooltipDataItem[];
                        if (tooltipsEnabled) {
                            tooltipInfo = TooltipBuilder.createTooltipInfo(formatStringProp, null, categoryValue, null, categorical.categories, seriesData);
                        }
                        
                        bubbleData.push({
                            x: x,
                            y: y,
                            labeltext: categoryValue,
                            radius: radius,
                            fill: subDataPoint.fill,
                            stroke: subDataPoint.stroke,
                            strokeWidth: strokeWidth,
                            tooltipInfo: tooltipInfo,
                            identity: subDataPoint.identity,
                            selected: false,
                            labelFill: labelSettings.labelColor,
                        });
                    }
                    else {
                        var slices = [];

                        for (var seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
                            var subDataPoint: MapSubDataPoint = subDataPoints[seriesIndex];
                            var value = subDataPoint.value;

                            var seriesData: TooltipSeriesDataItem[] = [];
                            if (dataValuesSource) {
                                // Dynamic series
                                seriesData.push({ value: grouped[seriesIndex].name, metadata: { source: dataValuesSource, values: [] } });
                            }
                            if (sizeIndex > -1) {
                                seriesData.push({ value: value, metadata: grouped[0].values[sizeIndex] });
                            }
                            var tooltipInfo: TooltipDataItem[];
                            if (tooltipsEnabled) {
                                tooltipInfo = TooltipBuilder.createTooltipInfo(formatStringProp, null, categoryValue, null, categorical.categories, seriesData);
                            }

                            slices.push({
                                x: x,
                                y: y,
                                labeltext: categoryValue,
                                radius: radius,
                                fill: subDataPoint.fill,
                                stroke: subDataPoint.stroke,
                                strokeWidth: strokeWidth,
                                value: value,
                                tooltipInfo: tooltipInfo,
                                identity: subDataPoint.identity,
                                selected: false,
                                labelFill: labelSettings.labelColor,
                            });
                        }
                        if (interactivityService) {
                            interactivityService.applySelectionStateToData(slices);
                        }
                        sliceData.push(slices);
                    }
                }
            }

            if (interactivityService) {
                interactivityService.applySelectionStateToData(bubbleData);
            }

            return { bubbleData: bubbleData, sliceData: sliceData };
        }

        public updateInternal(data: MapRendererData, viewport: IViewport, dataChanged: boolean, interactivityService: IInteractivityService, redrawDataLabels: boolean): MapBehaviorOptions {
            debug.assertValue(viewport, "viewport");
            CustomMap.removeTransform3d(this.root);

            this.mapRendererData = data;
            if (this.svg) {
                this.svg
                    .style("width", viewport.width.toString() + "px")
                    .style("height", viewport.height.toString() + "px");
            }
            if (this.clearSvg) {
                this.clearSvg
                    .style("width", viewport.width.toString() + "px")
                    .style("height", viewport.height.toString() + "px");
            }

            var arc = this.arc;

            var hasSelection = interactivityService && interactivityService.hasSelection();

            var bubbles = this.bubbleGraphicsContext.selectAll(".bubble").data(data.bubbleData, (d: MapBubble) => d.identity.getKey());

            bubbles.enter()
                .append("circle")
                .classed("bubble", true);
            bubbles
                .attr("cx", (d: MapBubble) => d.x)
                .attr("cy", (d: MapBubble) => d.y)
                .attr("r", (d: MapBubble) => this.maxBubbleSize > 0 ? Math.min(this.maxBubbleSize/2, d.radius) : d.radius)
                .style("fill", (d: MapBubble) => d.fill)
                .style("stroke", (d: MapBubble) => d.stroke)
                .style("fill-opacity", (d: MapBubble) => ColumnUtil.getFillOpacity(d.selected, false, hasSelection, false))
                .style("strokeWidth", (d: MapBubble) => d.strokeWidth)
                .style("stroke-opacity", (d: MapBubble) => ColumnUtil.getFillOpacity(d.selected, false, hasSelection, false))
                .style("cursor", "default");
            bubbles.exit().remove();

            if (this.tooltipsEnabled) {
                TooltipManager.addTooltip(bubbles, (tooltipEvent: TooltipEvent) => tooltipEvent.data.tooltipInfo);
                bubbles.style("pointer-events", "all");
            }

            var sliceData = data.sliceData;

            var sliceContainers = this.sliceGraphicsContext.selectAll(".sliceContainer").data(sliceData);
            sliceContainers.enter()
                .append("g")
                .classed("sliceContainer", true);

            sliceContainers.exit().remove();

            var sliceLayout = this.sliceLayout;
            var slices = sliceContainers.selectAll(".slice")
                .data(function (d) {
                    return sliceLayout(d);
                }, (d: MapSliceContainer) => d.data.identity.getKey());

            slices.enter()
                .append("path")
                .classed("slice", true);

            slices
                .style("fill", (t: MapSliceContainer) => t.data.fill)
                .style("fill-opacity", (d) => ColumnUtil.getFillOpacity(d.data.selected, false, hasSelection, false))
                .style("stroke", (t: MapSliceContainer) => t.data.stroke)
                .style("strokeWidth", (t: MapSliceContainer) => t.data.strokeWidth)
                .style("stroke-opacity", (d) => ColumnUtil.getFillOpacity(d.data.selected, false, hasSelection, false))
                .style("cursor", "default")
                .attr("transform", (t: MapSliceContainer) => SVGUtil.translate(t.data.x, t.data.y))
                .attr('d', (t: MapSliceContainer) => {
                    return arc.innerRadius(0).outerRadius((t: MapSliceContainer) => t.data.radius)(t);
                });

            slices.exit().remove();

            this.updateInternalDataLabels(viewport, redrawDataLabels);

            if (this.tooltipsEnabled) {
                TooltipManager.addTooltip(slices, (tooltipEvent: TooltipEvent) => tooltipEvent.data.data.tooltipInfo);
                slices.style("pointer-events", "all");
            }

            var allData: SelectableDataPoint[] = data.bubbleData.slice();
            for (var i = 0, ilen = sliceData.length; i < ilen; i++) {
                allData.push.apply(allData, sliceData[i]);
            }

            var behaviorOptions: MapBehaviorOptions = {
                bubbles: bubbles,
                slices: this.sliceGraphicsContext.selectAll("path"),
                clearCatcher: this.clearCatcher,
                dataPoints: allData,
            };
            return behaviorOptions;
        }

        public updateInternalDataLabels(viewport: IViewport, redrawDataLabels: boolean): void {
            var labelSettings = this.dataLabelsSettings;
            var dataLabels: Label[] = [];
            if (labelSettings && (labelSettings.show || labelSettings.showCategory)) {
                var labelDataPoints = this.createLabelDataPoints();
                var labelLayout = new LabelLayout({
                    maximumOffset: NewDataLabelUtils.maxLabelOffset,
                    startingOffset: NewDataLabelUtils.startingLabelOffset
                });
                var labelDataPointsGroup: LabelDataPointsGroup = {
                    labelDataPoints: labelDataPoints,
                    maxNumberOfLabels: labelDataPoints.length
                };
                dataLabels = labelLayout.layout([labelDataPointsGroup], { width: viewport.width, height: viewport.height });
            }

            NewDataLabelUtils.drawLabelBackground(this.labelGraphicsContext, dataLabels, powerbi.visuals.DefaultBackgroundColor, powerbi.visuals.DefaultFillOpacity);
            NewDataLabelUtils.drawDefaultLabels(this.labelGraphicsContext, dataLabels, false); // Once we properly split up and handle show and showCategory, the false here should change to !labelSettings.showCategory
        }

        private createLabelDataPoints(): LabelDataPoint[] {
            var data = this.mapRendererData;
            var labelDataPoints: LabelDataPoint[] = [];
            var dataPoints = data.bubbleData;
            dataPoints = dataPoints.concat(_.map(data.sliceData, (value: MapSlice[]) => value[0]));
            var labelSettings = this.dataLabelsSettings;
            
            for (var i = 0; i < dataPoints.length; i++) {
                var dataPoint = dataPoints[i];
                var text = dataPoint.labeltext;

                var properties: TextProperties = {
                    text: text,
                    fontFamily: NewDataLabelUtils.LabelTextProperties.fontFamily,
                    fontSize: PixelConverter.fromPoint(labelSettings.fontSize),
                    fontWeight: NewDataLabelUtils.LabelTextProperties.fontWeight,
                };
                var textWidth = TextMeasurementService.measureSvgTextWidth(properties);
                var textHeight = TextMeasurementService.estimateSvgTextHeight(properties);

                labelDataPoints.push({
                    isPreferred: true,
                    text: text,
                    textSize: {
                        width: textWidth,
                        height: textHeight,
                    },
                    outsideFill: labelSettings.labelColor ? labelSettings.labelColor : NewDataLabelUtils.defaultInsideLabelColor, // Use inside for outside colors because we draw backgrounds for map labels
                    insideFill: NewDataLabelUtils.defaultInsideLabelColor,
                    parentType: LabelDataPointParentType.Point,
                    parentShape: {
                        point: {
                            x: dataPoint.x,
                            y: dataPoint.y,
                        },
                        radius: dataPoint.radius,
                        validPositions: MapBubbleDataPointRenderer.validLabelPositions,
                    },
                    fontSize: labelSettings.fontSize,
                    identity: undefined,
                    hasBackground: true,
                });
            }

            return labelDataPoints;
        }
    }

    export interface FilledMapParams {
        level: number;
        maxPolygons: number;
        strokeWidth: number;
    }

    export class MapShapeDataPointRenderer implements IMapDataPointRenderer {
        private mapControl: Microsoft.Maps.Map;
        private svg: D3.Selection;
        private clearSvg: D3.Selection;
        private clearCatcher: D3.Selection;
        private polygonInfo: MapPolygonInfo;
        private mapData: MapData;
        private shapeGraphicsContext: D3.Selection;
        private labelGraphicsContext: D3.Selection;
        private labelBackgroundGraphicsContext: D3.Selection;
        private maxShapeDimension: number;
        private mapRendererData: MapRendererData;
        private dataLabelsSettings: PointDataLabelsSettings;
        private filledMapDataLabelsEnabled: boolean;
        private tooltipsEnabled: boolean;
        private labelLayout: FilledMapLabelLayout;
        private static validLabelPolygonPositions: NewPointLabelPosition[] = [NewPointLabelPosition.Center, NewPointLabelPosition.Below, NewPointLabelPosition.Above, NewPointLabelPosition.Right, NewPointLabelPosition.Left, NewPointLabelPosition.BelowRight, NewPointLabelPosition.BelowLeft, NewPointLabelPosition.AboveRight, NewPointLabelPosition.AboveLeft];
        private root: JQuery;

        public static getFilledMapParams(category: string, dataCount: number): FilledMapParams {
            switch (category) {
                case MapUtil.CategoryTypes.Continent:
                case MapUtil.CategoryTypes.CountryRegion:
                    if (dataCount < 10) {
                        return { level: 2, maxPolygons: 50, strokeWidth: 0 };
                    }
                    else if (dataCount < 30) {
                        return { level: 2, maxPolygons: 20, strokeWidth: 0 };
                    }
                    return { level: 1, maxPolygons: 3, strokeWidth: 0 };
                default:
                    if (dataCount < 100) {
                        return { level: 1, maxPolygons: 5, strokeWidth: 6 };
                    }
                    if (dataCount < 200) {
                        return { level: 0, maxPolygons: 5, strokeWidth: 6 };
                    }
                    return { level: 0, maxPolygons: 5, strokeWidth: 0 };
            }
        }

        public static buildPaths(locations: IGeocodeBoundaryPolygon[]): IGeocodeBoundaryPolygon[] {
            var paths = [];
            for (var i = 0; i < locations.length; i++) {
                var location = locations[i];
                var polygon = location.geographic;

                if (polygon.length > 2) {
                    paths.push(location);
                }
            }

            return paths;
        }

        public constructor(fillMapDataLabelsEnabled: boolean, tooltipsEnabled: boolean) {
            this.filledMapDataLabelsEnabled = fillMapDataLabelsEnabled;
            this.tooltipsEnabled = tooltipsEnabled;
        }

        public init(mapControl: Microsoft.Maps.Map, mapDiv: JQuery, addClearCatcher: boolean): void {
            /*
                The layout of the visual would look like :
                <div class="visual mapControl">
                    <div class="MicrosoftMap">
                        <!-- Bing maps stuff -->
                        <svg>
                            <rect class="clearCatcher"></rect>
                        </svg>
                    </div>
                    <svg>
                        <g class="mapShapes>
                            <!-- our geometry -->
                        </g>
                    </svg>
                </div>                    

            */

            this.mapControl = mapControl;
            this.polygonInfo = new MapPolygonInfo();

            this.root = mapDiv;
            var root = d3.select(mapDiv[0]);
            root.attr('drag-resize-disabled', 'true'); // Enable panning within the maps in IE
            var svg = this.svg = root
                .append('svg')
                .style('position', 'absolute') // Absolute position so that the svg will overlap with the canvas.
                .style("pointer-events", "none");
            if (addClearCatcher) {
                var clearSvg = this.clearSvg = d3.select(<HTMLElement>this.mapControl.getRootElement())
                    .append('svg')
                    .style('position', 'absolute'); // Absolute position so that the svg will overlap with the canvas.
                this.clearCatcher = appendClearCatcher(clearSvg);
            }
            this.shapeGraphicsContext = svg
                .append('g')
                .classed('mapShapes', true);
            this.labelBackgroundGraphicsContext = svg
                .append("g")
                .classed(NewDataLabelUtils.labelBackgroundGraphicsContextClass.class, true);
            this.labelGraphicsContext = svg
                .append("g")
                .classed(NewDataLabelUtils.labelGraphicsContextClass.class, true);

            this.clearMaxShapeDimension();
            this.dataLabelsSettings = dataLabelUtils.getDefaultMapLabelSettings();
        }

        public setData(data: MapData): void {
            this.mapData = data;
        }

        public clearDataPoints(): void {
            this.mapData = {
                dataPoints: [],
                geocodingCategory: null,
            };
        }

        public getDataPointCount(): number {
            if (!this.mapData)
                return 0;
            // Filter out any data points without a location since those aren't actually being drawn
            return _.filter(this.mapData.dataPoints, (value: MapDataPoint) => !!value.paths).length;
        }

        public converter(viewport: IViewport, dataView: DataView, labelSettings: PointDataLabelsSettings, interactivityService?: IInteractivityService): MapRendererData {
            this.clearMaxShapeDimension();
            this.dataLabelsSettings = labelSettings;
            var strokeWidth = 1;

            var shapeData: MapShape[] = [];
            var formatStringProp = CustomMap.mapProps.general.formatString;

            var dataPoints = this.mapData ? this.mapData.dataPoints : [];
            for (var categoryIndex = 0, categoryCount = dataPoints.length; categoryIndex < categoryCount; categoryIndex++) {
                var categorical: DataViewCategorical = dataView ? dataView.categorical : null;
                var dataPoint: MapDataPoint = dataPoints[categoryIndex];
                var subDataPoint = dataPoint.subDataPoints[0];
                var paths = dataPoint.paths;

                var grouped: DataViewValueColumnGroup[];
                var sizeIndex = -1;
                var dataValuesSource: DataViewMetadataColumn;

                if (categorical && categorical.values) {
                    grouped = categorical.values.grouped();
                    sizeIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, "Size");
                    dataValuesSource = categorical.values.source;
                }

                if (paths) {
                    var value = dataPoint.value;
                    var categoryValue = dataPoint.categoryValue;

                    var seriesData: TooltipSeriesDataItem[] = [];
                    if (dataValuesSource) {
                        // Dynamic series
                        seriesData.push({ value: grouped[0].name, metadata: { source: dataValuesSource, values: [] } });
                    }
                    if (sizeIndex > -1) {
                        seriesData.push({ value: value, metadata: grouped[0].values[sizeIndex] });
                    }
                    var tooltipInfo: TooltipDataItem[];
                    if (this.tooltipsEnabled) {
                        tooltipInfo = TooltipBuilder.createTooltipInfo(formatStringProp, null, value, null, categorical.categories, seriesData);
                    }

                    var identity = subDataPoint.identity;
                    var idKey = identity.getKey();
                    var formattersCache = NewDataLabelUtils.createColumnFormatterCacheManager();

                    //Determine Largest Shape
                    var mainShapeIndex = MapShapeDataPointRenderer.getIndexOfLargestShape(paths);

                    for (var pathIndex = 0, pathCount = paths.length; pathIndex < pathCount; pathIndex++) {
                        var path = paths[pathIndex];
                        var labelFormatString = (dataView && dataView.categorical && !_.isEmpty(dataView.categorical.values)) ? valueFormatter.getFormatString(dataView.categorical.values[0].source, CustomMap.filledMapProps.general.formatString) : undefined;
                        this.setMaxShapeDimension(path.absoluteBounds.width, path.absoluteBounds.height);
                        var formatter = formattersCache.getOrCreate(labelFormatString, labelSettings);

                        shapeData.push({
                            absolutePointArray: path.absolute,
                            path: path.absoluteString,
                            fill: subDataPoint.fill,
                            stroke: subDataPoint.stroke,
                            strokeWidth: strokeWidth,
                            tooltipInfo: tooltipInfo,
                            identity: identity,
                            selected: false,
                            key: JSON.stringify({ id: idKey, pIdx: pathIndex }),
                            displayLabel: pathIndex === mainShapeIndex,
                            labeltext: categoryValue,
                            catagoryLabeltext: (value != null) ? NewDataLabelUtils.getLabelFormattedText(formatter.format(value)) : undefined,
                            labelFormatString: labelFormatString,
                        });
                    }
                }
            }

            if (interactivityService)
                interactivityService.applySelectionStateToData(shapeData);

            return { shapeData: shapeData };
        }

        public updateInternal(data: MapRendererData, viewport: IViewport, dataChanged: boolean, interactivityService: IInteractivityService, redrawDataLabels: boolean): MapBehaviorOptions {
            debug.assertValue(viewport, "viewport");
            CustomMap.removeTransform3d(this.root);

            this.mapRendererData = data;
            if (this.svg) {
                this.svg
                    .style("width", viewport.width.toString() + "px")
                    .style("height", viewport.height.toString() + "px");
            }
            if (this.clearSvg) {
                this.clearSvg
                    .style("width", viewport.width.toString() + "px")
                    .style("height", viewport.height.toString() + "px");
            }

            this.polygonInfo.reCalc(this.mapControl, viewport.width, viewport.height);
            this.shapeGraphicsContext.attr("transform", this.polygonInfo.transformToString(this.polygonInfo.transform));

            var hasSelection = interactivityService && interactivityService.hasSelection();

            var shapes = this.shapeGraphicsContext.selectAll("polygon").data(data.shapeData, (d: MapShape) => d.key);

            shapes.enter()
                .append("polygon")
                .classed("shape", true)
                .attr("points", (d: MapShape) => { // Always add paths to any new data points
                    return d.path;
                });

            shapes
                .style("fill", (d: MapShape) => d.fill)
                .style("fill-opacity", (d: MapShape) => ColumnUtil.getFillOpacity(d.selected, false, hasSelection, false))
                .style("cursor", "default");

            if (dataChanged) {
                // We only update the paths of existing shapes if we have a change in the data.  Updating the lengthy path
                // strings every update during resize or zooming/panning is extremely bad for performance.
                shapes
                    .attr("points", (d: MapShape) => {
                        return d.path;
                    });
            }

            shapes.exit()
                .remove();

            this.updateInternalDataLabels(viewport, redrawDataLabels);

            if (this.tooltipsEnabled) {
                TooltipManager.addTooltip(shapes, (tooltipEvent: TooltipEvent) => tooltipEvent.data.tooltipInfo);
                shapes.style("pointer-events", "all");
            }

            var behaviorOptions: MapBehaviorOptions = {
                shapes: shapes,
                clearCatcher: this.clearCatcher,
                dataPoints: data.shapeData,
            };

            return behaviorOptions;
        }

        public getDataPointPadding() {
            return 12;
        }

        public static getIndexOfLargestShape(paths: IGeocodeBoundaryPolygon[]): number {
            var largestShapeIndex = 0;
            var largestShapeArea = 0;

            for (var pathIndex = 0, pathCount = paths.length; pathIndex < pathCount; pathIndex++) {
                var path = paths[pathIndex];
                        
                // Using the area of the bounding box (and taking the largest)
                var currentShapeArea = path.absoluteBounds.width * path.absoluteBounds.height; 
                        
                if (currentShapeArea > largestShapeArea) {
                    largestShapeIndex = pathIndex;
                    largestShapeArea = currentShapeArea;
                }
            }

            return largestShapeIndex;
        }

        public updateInternalDataLabels(viewport: IViewport, redrawDataLabels: boolean): void {
            var labelSettings = this.dataLabelsSettings;
            var labels: Label[];

            if (labelSettings && (labelSettings.show || labelSettings.showCategory)) {
                var labelDataPoints = this.createLabelDataPoints();

                if (this.labelLayout === undefined) {
                    this.labelLayout = new FilledMapLabelLayout();
                }
                labels = this.labelLayout.layout(labelDataPoints, { width: viewport.width, height: viewport.height }, this.polygonInfo.transform, redrawDataLabels);
            }

            this.drawLabelStems(this.labelGraphicsContext, labels, labelSettings.show, labelSettings.showCategory);
            NewDataLabelUtils.drawLabelBackground(this.labelGraphicsContext, labels, powerbi.visuals.DefaultBackgroundColor, powerbi.visuals.DefaultFillOpacity);
            NewDataLabelUtils.drawDefaultLabels(this.labelGraphicsContext, labels, false, labelSettings.show && labelSettings.showCategory);
        }

        private clearMaxShapeDimension(): void {
            this.maxShapeDimension = 0;
        }

        private setMaxShapeDimension(width: number, height: number): void {
            this.maxShapeDimension = Math.max(width, this.maxShapeDimension);
            this.maxShapeDimension = Math.max(height, this.maxShapeDimension);
        }

        private createLabelDataPoints(): LabelDataPoint[] {
            var data = this.mapRendererData;
            var labelDataPoints: LabelDataPoint[] = [];
            if (this.filledMapDataLabelsEnabled) {
                var dataShapes = data.shapeData;
                var labelSettings = this.dataLabelsSettings;

                for (var i = 0; i < dataShapes.length; i++) {
                    var dataShape = dataShapes[i];
                    if (!dataShape.displayLabel) {
                        continue;
                    }
                    var text, secondRowText: string;
                    var secondRowTextWidth: number = 0;
                    var hasSecondRow: boolean = false;

                    if (this.dataLabelsSettings.show && !this.dataLabelsSettings.showCategory) {
                        text = dataShape.catagoryLabeltext;
                        if (text === undefined)
                            continue;
                    } else if (this.dataLabelsSettings.showCategory && !this.dataLabelsSettings.show) {
                        text = dataShape.labeltext;
                        if (text === undefined)
                            continue;
                    } else if (this.dataLabelsSettings.showCategory && this.dataLabelsSettings.show) {
                        text = dataShape.catagoryLabeltext;
                        secondRowText = dataShape.labeltext;
                        if (text === undefined && secondRowText === undefined)
                            continue;
                        hasSecondRow = true;
                    }

                    if (hasSecondRow) {
                        var secondRowProperties: TextProperties = {
                            text: secondRowText,
                            fontFamily: NewDataLabelUtils.LabelTextProperties.fontFamily,
                            fontSize: NewDataLabelUtils.LabelTextProperties.fontSize,
                            fontWeight: NewDataLabelUtils.LabelTextProperties.fontWeight,
                        };
                        secondRowTextWidth = TextMeasurementService.measureSvgTextWidth(secondRowProperties);
                    }

                    var firstRowProperties: TextProperties = {
                        text: text,
                        fontFamily: NewDataLabelUtils.LabelTextProperties.fontFamily,
                        fontSize: NewDataLabelUtils.LabelTextProperties.fontSize,
                        fontWeight: NewDataLabelUtils.LabelTextProperties.fontWeight,
                    };
                    var textWidth = TextMeasurementService.measureSvgTextWidth(firstRowProperties);
                    var textHeight = TextMeasurementService.estimateSvgTextHeight(firstRowProperties);

                    if (secondRowText && dataShape.labeltext !== undefined && dataShape.catagoryLabeltext !== undefined) {
                        textHeight = textHeight * 2;
                    }

                    var labelDataPoint: LabelDataPoint = {
                        parentType: LabelDataPointParentType.Polygon,
                        parentShape:
                        {
                            polygon: new Polygon(dataShape.absolutePointArray),
                            validPositions: MapShapeDataPointRenderer.validLabelPolygonPositions,
                        },
                        text: text,
                        secondRowText: secondRowText,
                        textSize: {
                            width: Math.max(textWidth, secondRowTextWidth),
                            height: textHeight,
                        },
                        insideFill: labelSettings.labelColor,
                        outsideFill: labelSettings.labelColor ? labelSettings.labelColor : NewDataLabelUtils.defaultInsideLabelColor, // Use inside for outside colors because we draw backgrounds for map labels                   
                        isPreferred: false,
                        identity: undefined,
                        hasBackground: true,
                    };
                    labelDataPoints.push(labelDataPoint);
                }
            }
            return labelDataPoints;
        }

        private drawLabelStems(labelsContext: D3.Selection, dataLabels: Label[], showText: boolean, showCategory: boolean) {
            var filteredLabels = _.filter(dataLabels, (d: Label) => d.isVisible);
            var key = (d: Label, index: number) => { return d.identity ? d.identity.getKeyWithoutHighlight() : index; };
            NewDataLabelUtils.drawLabelLeaderLines(labelsContext, filteredLabels, key, LeaderLineColor);
        }
    }

    /** Note: public for UnitTest */
    export interface SimpleRange {
        min: number;
        max: number;
    }

    export class CustomMap implements IVisual {
        public currentViewport: IViewport;

        private pendingGeocodingRender: boolean;
        private mapControl: Microsoft.Maps.Map;
        private minLongitude: number;
        private maxLongitude: number;
        private minLatitude: number;
        private maxLatitude: number;
        private mapViewSettings: MapViewSettings = new MapViewSettings();
        private mapViewApplyAutoZoom: boolean;
        private style: IVisualStyle;
        private colors: IDataColorPalette;
        private dataPointRenderer: IMapDataPointRenderer;
        private geocodingCategory: string;
        private legend: ILegend;
        private legendHeight;
        private legendData: LegendData;
        private element: JQuery;
        private dataView: DataView;
        private dataLabelsSettings: PointDataLabelsSettings;
        private static MapContainer = {
            cssClass: 'mapControl',
            selector: '.mapControl'
        };
        public static StrokeDarkenColorValue = 255 * 0.25;
        private interactivityService: IInteractivityService;
        private behavior: MapBehavior;
        private defaultDataPointColor: string;
        private showAllDataPoints: boolean;
        private dataPointsToEnumerate: LegendDataPoint[];
        private hasDynamicSeries: boolean;
        private geoTaggingAnalyzerService: powerbi.IGeoTaggingAnalyzerService;
        private enableGeoShaping: boolean;
        private host: IVisualHostServices;
        private receivedExternalViewChange = false;
        private executingInternalViewChange = false;
        private geocoder: IGeocoder;
        private mapControlFactory: IMapControlFactory;
        private tooltipsEnabled: boolean;
        private filledMapDataLabelsEnabled: boolean;
        private disableZooming: boolean;
        private disablePanning: boolean;
        private locale: string;
        private isLegendScrollable: boolean;
        private viewChangeThrottleInterval: number;
        private root: JQuery;

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: 'Category',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Location'),
                    description: data.createDisplayNameGetter('Role_DisplayName_LocationMapDescription'),
                    preferredTypes: [
                        { geography: { address: true } },
                        { geography: { city: true } },
                        { geography: { continent: true } },
                        { geography: { country: true } },
                        { geography: { county: true } },
                        { geography: { place: true } },
                        { geography: { postalCode: true } },
                        { geography: { region: true } },
                        { geography: { stateOrProvince: true } },
                    ],
                }, {
                    name: 'Series',
                    kind: VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Legend'),
                    description: data.createDisplayNameGetter('Role_DisplayName_LegendDescription')
                }, {
                    name: 'X',
                    kind: VisualDataRoleKind.GroupingOrMeasure, // GroupingOrMeasure if latLongGroupEnabled feature switch is on.
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Longitude'),
                    description: data.createDisplayNameGetter('Role_DisplayName_LongitudeMapDescription'),
                    preferredTypes: [
                        { geography: { longitude: true } }
                    ],
                }, {
                    name: 'Y',
                    kind: VisualDataRoleKind.GroupingOrMeasure, // GroupingOrMeasure if latLongGroupEnabled feature switch is on.
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Latitude'),
                    description: data.createDisplayNameGetter('Role_DisplayName_LatitudeMapDescription'),
                    preferredTypes: [
                        { geography: { latitude: true } }
                    ],
                }, {
                    name: 'Size',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Values'),
                    description: data.createDisplayNameGetter('Role_DisplayName_ValuesDescription'),
                    requiredTypes: [{ numeric: true }, { integer: true }],
                }, {
                    name: 'Gradient',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Gradient'),
                    description: data.createDisplayNameGetter('Role_DisplayName_GradientDescription'),
                    requiredTypes: [{ numeric: true }, { integer: true }],
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
                            type: { text: true }
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
                        maxBubbleSize: {
                            displayName: "Max bubble size",
                            type: { numeric: true }
                        },
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
                        },
                        fillRule: {
                            displayName: data.createDisplayNameGetter('Visual_Gradient'),
                            type: { fillRule: {} },
                            rule: {
                                inputRole: 'Gradient',
                                output: {
                                    property: 'fill',
                                    selector: ['Category'],
                                },
                            },
                        }
                    }
                },
                mapView: {
                    displayName: "Map view",
                    description: "Map view",
                    properties: {
                        autoZoom: {
                            displayName: "Auto-zoom",
                            type: { bool: true }
                        },
                        minZoom: {
                            displayName: "Min zoom",
                            type: { numeric: true  }
                        },
                        maxZoom: {
                            displayName: "Max zoom",
                            type: { numeric: true  }
                        },
                        zoom: {
                            displayName: "Zoom",
                            type: { numeric: true  }
                        },
                        latitude : {
                            displayName: "Latitude",
                            type: { numeric: true  }
                        },
                        longitude: {
                            displayName: "Longitude",
                            type: { numeric: true  }
                        }
                    }
                },
                categoryLabels: {
                    displayName: data.createDisplayNameGetter('Visual_CategoryLabels'),
                    description: data.createDisplayNameGetter('Visual_CategoryLabelsDescription'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter('Visual_Show'),
                            type: { bool: true }
                        },
                        color: {
                            displayName: data.createDisplayNameGetter('Visual_LabelsFill'),
                            description: data.createDisplayNameGetter('Visual_LabelsFillDescription'),
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: data.createDisplayNameGetter('Visual_TextSize'),
                            type: { formatting: { fontSize: true } }
                        },
                    },
                },
            },
            dataViewMappings: [{
                conditions: [
                    { 'Category': { min: 1, max: 1 }, 'Series': { max: 1 }, 'X': { max: 1, kind: VisualDataRoleKind.Measure }, 'Y': { max: 1, kind: VisualDataRoleKind.Measure }, 'Size': { max: 1 }, 'Gradient': { max: 0 } },
                    { 'Category': { min: 1, max: 1 }, 'Series': { max: 0 }, 'X': { max: 1, kind: VisualDataRoleKind.Measure }, 'Y': { max: 1, kind: VisualDataRoleKind.Measure }, 'Size': { max: 1 }, 'Gradient': { max: 1 } },
                ],
                categorical: {
                    categories: {
                        for: { in: 'Category' },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: {
                        group: {
                            by: 'Series',
                            select: [
                                { bind: { to: 'X' } },
                                { bind: { to: 'Y' } },
                                { bind: { to: 'Size' } },
                                { bind: { to: 'Gradient' } },
                            ],
                            dataReductionAlgorithm: { top: {} }
                        }
                    },
                    rowCount: { preferred: { min: 2 } }
                }
            }, {
                    conditions: [
                        { 'Category': { max: 0 }, 'Series': { max: 1 }, 'X': { max: 1, kind: VisualDataRoleKind.Grouping }, 'Y': { max: 1, kind: VisualDataRoleKind.Grouping }, 'Size': { max: 1 }, 'Gradient': { max: 0 } },
                        { 'Category': { max: 0 }, 'Series': { max: 0 }, 'X': { max: 1, kind: VisualDataRoleKind.Grouping }, 'Y': { max: 1, kind: VisualDataRoleKind.Grouping }, 'Size': { max: 1 }, 'Gradient': { max: 1 } }
                    ],
                    categorical: {
                        categories: {
                            select: [
                                { bind: { to: 'X' } },
                                { bind: { to: 'Y' } },
                            ],
                            dataReductionAlgorithm: { top: {} }
                        },
                        values: {
                            group: {
                                by: 'Series',
                                select: [
                                    { bind: { to: 'Size' } },
                                    { bind: { to: 'Gradient' } },
                                ],
                                dataReductionAlgorithm: { top: {} }
                            }
                        },
                        rowCount: { preferred: { min: 2 } }
                    },
                }],
            sorting: {
                custom: {},
            },
            drilldown: {
                roles: ['Category']
            },
        };
        public static mapProps: any = CustomMap.getProps(CustomMap.capabilities);
        public static filledMapProps: any = CustomMap.getProps(filledMapCapabilities);

        public static getProps(capabilities: VisualCapabilities): any {
            var result = {};
            for(var objectKey in capabilities.objects) {
                result[objectKey] = {};
                for(var propKey in capabilities.objects[objectKey].properties) {
                    result[objectKey][propKey] = <DataViewObjectPropertyIdentifier> { 
                        objectName: objectKey,
                        propertyName: propKey
                    };
                }
            }

            return result;
        }

        constructor(options: MapConstructionOptions) {
            if (options.filledMap) {
                this.dataPointRenderer = new MapShapeDataPointRenderer(options.filledMapDataLabelsEnabled, options.tooltipsEnabled);
                this.filledMapDataLabelsEnabled = options.filledMapDataLabelsEnabled;
                this.enableGeoShaping = true;
            }
            else {
                this.dataPointRenderer = new MapBubbleDataPointRenderer(options.tooltipsEnabled);
                this.enableGeoShaping = false;
            }
            this.mapControlFactory = options.mapControlFactory ? options.mapControlFactory : this.getDefaultMapControlFactory();
            this.behavior = options.behavior;
            this.tooltipsEnabled = options.tooltipsEnabled;
            this.disableZooming = options.disableZooming;
            this.disablePanning = options.disablePanning;
            this.isLegendScrollable = !!options.behavior;
            this.viewChangeThrottleInterval = options.viewChangeThrottleInterval;
        }

        public init(options: VisualInitOptions) {
            debug.assertValue(options, 'options');
            var element = this.element = options.element;
            this.pendingGeocodingRender = false;
            this.currentViewport = options.viewport;
            this.style = options.style;
            this.colors = this.style.colorPalette.dataColors;
            if (this.behavior)
                this.interactivityService = createInteractivityService(options.host);
            this.dataLabelsSettings = dataLabelUtils.getDefaultMapLabelSettings();
            this.legend = powerbi.visuals.createLegend(element, options.interactivity && options.interactivity.isInteractiveLegend, this.interactivityService, this.isLegendScrollable);
            this.legendHeight = 0;
            this.legendData = { dataPoints: [] };
            this.geoTaggingAnalyzerService = powerbi.createGeoTaggingAnalyzerService(options.host.getLocalizedString);
            this.host = options.host;
            if (options.host.locale)
                this.locale = options.host.locale();
            this.geocoder = options.host.geocoder();

            this.resetBounds();

            this.mapControlFactory.ensureMap(this.locale, () => {
                Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', {
                    callback: () => {
                        this.initialize(element[0]);
                    }
                });
            });
        }

        private addDataPoint(dataPoint: MapDataPoint): void {
            var location = dataPoint.location;
            this.updateBounds(location.latitude, location.longitude);

            this.scheduleRedraw();
        }

        private scheduleRedraw(): void {
            if (!this.pendingGeocodingRender && this.mapControl) {
                this.pendingGeocodingRender = true;
                // Maintain a 3 second delay between redraws from geocoded geometry
                setTimeout(() => {
                    this.updateInternal(true, true);
                    this.pendingGeocodingRender = false;
                }, 3000);
            }
        }

        private enqueueGeoCode(dataPoint: MapDataPoint): void {
            this.geocoder.geocode(dataPoint.geocodingQuery, this.geocodingCategory).then((location) => {
                if (location) {
                    dataPoint.location = location;
                    this.addDataPoint(dataPoint);
                }
            });
        }

        private enqueueGeoCodeAndGeoShape(dataPoint: MapDataPoint, params: FilledMapParams): void {
            this.geocoder.geocode(dataPoint.geocodingQuery, this.geocodingCategory).then((location) => {
                if (location) {
                    dataPoint.location = location;
                    this.enqueueGeoShape(dataPoint, params);
                }
            });
        }

        private enqueueGeoShape(dataPoint: MapDataPoint, params: FilledMapParams): void {
            debug.assertValue(dataPoint.location, "cachedLocation");
            this.geocoder.geocodeBoundary(dataPoint.location.latitude, dataPoint.location.longitude, this.geocodingCategory, params.level, params.maxPolygons)
                .then((result: IGeocodeBoundaryCoordinate) => {
                    var paths;
                    if (result.locations.length === 0 || result.locations[0].geographic) {
                        paths = MapShapeDataPointRenderer.buildPaths(result.locations);
                    }
                    else {
                        MapUtil.calcGeoData(result);
                        paths = MapShapeDataPointRenderer.buildPaths(result.locations);
                    }
                    dataPoint.paths = paths;
                    this.addDataPoint(dataPoint);
                });
        }

        private updateZoom(): void {
            // Restrict min/max zoom levels
            this.mapViewSettings.minZoom = Math.max(MapUtil.MinLevelOfDetail, Math.min(MapUtil.MaxLevelOfDetail,
                $.isNumeric(this.mapViewSettings.minZoom) ? Math.min(this.mapViewSettings.maxZoom, this.mapViewSettings.minZoom) : MapUtil.MinLevelOfDetail));
            this.mapViewSettings.maxZoom = Math.max(MapUtil.MinLevelOfDetail, Math.min(MapUtil.MaxLevelOfDetail,
                $.isNumeric(this.mapViewSettings.maxZoom) ? Math.max(this.mapViewSettings.minZoom, this.mapViewSettings.maxZoom) : MapUtil.MaxLevelOfDetail));

            if(this.mapViewApplyAutoZoom || !$.isNumeric(this.mapViewSettings.zoom)) {
                // Set zoom level after we rendered that map as we need the max size of the bubbles/ pie slices to calculate it
                var mapViewport = this.getMapViewPort();
                this.mapViewSettings.zoom = this.getOptimumLevelOfDetail(mapViewport.width, mapViewport.height);
            }

            this.mapViewSettings.zoom = Math.max(this.mapViewSettings.minZoom, Math.min(this.mapViewSettings.maxZoom, this.mapViewSettings.zoom));
        }

        private getOptimumLevelOfDetail(width: number, height: number): number {
            var dataPointCount = this.dataPointRenderer.getDataPointCount();
            if (dataPointCount === 0)
                return MapUtil.MinLevelOfDetail;

            var threshold: number = this.dataPointRenderer.getDataPointPadding();

            for (var levelOfDetail = MapUtil.MaxLevelOfDetail; levelOfDetail >= MapUtil.MinLevelOfDetail; levelOfDetail--) {
                var minXmaxY = MapUtil.latLongToPixelXY(this.minLatitude, this.minLongitude, levelOfDetail);
                var maxXminY = MapUtil.latLongToPixelXY(this.maxLatitude, this.maxLongitude, levelOfDetail);

                if (maxXminY.x - minXmaxY.x + threshold <= width && minXmaxY.y - maxXminY.y + threshold <= height) {
                    // if we have less than 2 data points we should not zoom in "too much"
                    if (dataPointCount < 2)
                        levelOfDetail = Math.min(MapUtil.MaxAutoZoomLevel, levelOfDetail);

                    return levelOfDetail;
                }
            }

            return MapUtil.MinLevelOfDetail;
        }

        private updateViewCenter(): void {
            if(!this.mapViewApplyAutoZoom && $.isNumeric(this.mapViewSettings.latitude) && $.isNumeric(this.mapViewSettings.longitude)) {
                var minLatitudeValue = Math.min(MapUtil.MinAllowedLatitude, MapUtil.MaxAllowedLatitude);
                var maxLatitudeValue = Math.max(MapUtil.MinAllowedLatitude, MapUtil.MaxAllowedLatitude);
                var minLongitudeValue = Math.min(MapUtil.MinAllowedLongitude, MapUtil.MaxAllowedLongitude);
                var maxLongitudeValue = Math.max(MapUtil.MinAllowedLongitude, MapUtil.MaxAllowedLongitude);

                this.mapViewSettings.latitude = Math.min(maxLatitudeValue, Math.max(minLatitudeValue, this.mapViewSettings.latitude));
                this.mapViewSettings.longitude = Math.min(maxLongitudeValue, Math.max(minLongitudeValue, this.mapViewSettings.longitude));
                return;
            }

            var minXmaxY = MapUtil.latLongToPixelXY(this.minLatitude, this.minLongitude, this.mapViewSettings.zoom);
            var maxXminY = MapUtil.latLongToPixelXY(this.maxLatitude, this.maxLongitude, this.mapViewSettings.zoom);
            this.mapViewSettings.center = MapUtil.pixelXYToLocation((minXmaxY.x + maxXminY.x) / 2.0, (maxXminY.y + minXmaxY.y) / 2.0, this.mapViewSettings.zoom);
        }

        private resetBounds(): void {
            this.minLongitude = MapUtil.MaxAllowedLongitude;
            this.maxLongitude = MapUtil.MinAllowedLongitude;
            this.minLatitude = MapUtil.MaxAllowedLatitude;
            this.maxLatitude = MapUtil.MinAllowedLatitude;
        }

        private updateBounds(latitude: number, longitude: number): void {
            if (longitude < this.minLongitude) {
                this.minLongitude = longitude;
            }

            if (longitude > this.maxLongitude) {
                this.maxLongitude = longitude;
            }

            if (latitude < this.minLatitude) {
                this.minLatitude = latitude;
            }

            if (latitude > this.maxLatitude) {
                this.maxLatitude = latitude;
            }
        }

        public static legendObject(dataView: DataView): DataViewObject {
            return dataView &&
                dataView.metadata &&
                dataView.metadata.objects &&
                <DataViewObject>dataView.metadata.objects['legend'];
        }

        public static isLegendHidden(dataView: DataView): boolean {
            var legendObject = CustomMap.legendObject(dataView);
            return legendObject != null && legendObject[legendProps.show] === false;
        }

        public static legendPosition(dataView: DataView): LegendPosition {
            var legendObject = CustomMap.legendObject(dataView);
            return legendObject && LegendPosition[<string>legendObject[legendProps.position]];
        }

        public static getLegendFontSize(dataView: DataView): number {
            var legendObject = CustomMap.legendObject(dataView);
            return (legendObject && <number>legendObject[legendProps.fontSize]) || SVGLegend.DefaultFontSizeInPt;
        }

        public static isShowLegendTitle(dataView: DataView): boolean {
            var legendObject = CustomMap.legendObject(dataView);
            return legendObject && <boolean>legendObject[legendProps.showTitle];
        }

        private legendTitle(): string {
            var legendObject = CustomMap.legendObject(this.dataView);
            return (legendObject && <string>legendObject[legendProps.titleText]) || this.legendData.title;
        }

        private renderLegend(legendData: LegendData): void {
            var hideLegend = CustomMap.isLegendHidden(this.dataView);
            var showTitle = CustomMap.isShowLegendTitle(this.dataView);
            var title = this.legendTitle();
            // Update the legendData based on the hide flag.  Cartesian passes in no-datapoints. OnResize reuses the legendData, so this can't mutate.
            var clonedLegendData: LegendData = {
                dataPoints: hideLegend ? [] : legendData.dataPoints,
                grouped: legendData.grouped,
                title: showTitle ? title : "",
                fontSize: CustomMap.getLegendFontSize(this.dataView)
            };

            // Update the orientation to match what's in the dataView
            var targetOrientation = CustomMap.legendPosition(this.dataView);
            if (targetOrientation !== undefined) {
                this.legend.changeOrientation(targetOrientation);
            } else {
                this.legend.changeOrientation(LegendPosition.Top);
            }

            this.legend.drawLegend(clonedLegendData, this.currentViewport);
        }

        /** Note: public for UnitTest */
        public static calculateGroupSizes(categorical: DataViewCategorical, grouped: DataViewValueColumnGroup[], groupSizeTotals: number[], sizeMeasureIndex: number, currentValueScale: SimpleRange): SimpleRange {
            var categoryCount = categorical.values[0].values.length;
            var seriesCount = grouped.length;

            for (var i = 0, len = categoryCount; i < len; ++i) {
                var groupTotal = null;
                if (sizeMeasureIndex >= 0) {
                    for (var j = 0; j < seriesCount; ++j) {
                        var value = grouped[j].values[sizeMeasureIndex].values[i];
                        if (value) {
                            if (groupTotal === null) {
                                groupTotal = value;
                            } else {
                                groupTotal += value;
                            }
                        }
                    }
                }

                groupSizeTotals.push(groupTotal);

                if (groupTotal) {
                    if (!currentValueScale) {
                        currentValueScale = {
                            min: groupTotal,
                            max: groupTotal
                        };
                    } else {
                        currentValueScale.min = Math.min(currentValueScale.min, groupTotal);
                        currentValueScale.max = Math.max(currentValueScale.max, groupTotal);
                    }
                }
            }

            return currentValueScale;
        }

        /** Note: public for UnitTest */
        public static calculateRadius(range: SimpleRange, value?: number): number {
            var rangeDiff = range ? range.max - range.min : 0;
            var radius = 6;
            if (range != null && value != null && rangeDiff !== 0) {
                radius = (14 * ((value - range.min) / rangeDiff)) + 6;
            }

            return radius;
        }

        /** Note: public for UnitTest */
        public static getGeocodingCategory(categorical: DataViewCategorical, geoTaggingAnalyzerService: IGeoTaggingAnalyzerService): string {
            if (categorical && categorical.categories && categorical.categories.length > 0 && categorical.categories[0].source) {
                // Check categoryString for manually specified information in the model
                var type = <ValueType>categorical.categories[0].source.type;
                if (type && type.categoryString) {
                    return geoTaggingAnalyzerService.getFieldType(type.categoryString);
                }

                // Check the category name
                var categoryName = categorical.categories[0].source.displayName;
                var geotaggedResult = geoTaggingAnalyzerService.getFieldType(categoryName);
                if (geotaggedResult)
                    return geotaggedResult;

                // Checking roles for VRM backwards compatibility
                var roles = categorical.categories[0].source.roles;
                if (roles) {
                    var roleNames = Object.keys(roles);
                    for (var i = 0, len = roleNames.length; i < len; ++i) {
                        var typeFromRoleName = geoTaggingAnalyzerService.getFieldType(roleNames[i]);
                        if (typeFromRoleName)
                            return typeFromRoleName;
                    }
                }
            }

            return undefined;
        }

        /** Note: public for UnitTest */
        public static hasSizeField(values: DataViewValueColumns, defaultIndexIfNoRole?: number): boolean {
            if (_.isEmpty(values))
                return false;

            for (var i = 0, ilen = values.length; i < ilen; i++) {
                var roles = values[i].source.roles;

                // case for Power Q&A since Power Q&A does not assign role to measures.
                if (!roles && i === defaultIndexIfNoRole && values[i].source.type.numeric)
                    return true;

                if (roles) {
                    var roleNames = Object.keys(roles);
                    for (var j = 0, jlen = roleNames.length; j < jlen; j++) {
                        var role = roleNames[j];
                        if (role === "Size")
                            return true;
                    }
                }
            }
            return false;
        }

        public static shouldEnumerateDataPoints(dataView: DataView, usesSizeForGradient: boolean): boolean {
            var hasSeries = DataRoleHelper.hasRoleInDataView(dataView, 'Series');
            var gradientRole = usesSizeForGradient ? 'Size' : 'Gradient';
            var hasGradientRole = DataRoleHelper.hasRoleInDataView(dataView, gradientRole);
            return hasSeries || !hasGradientRole;
        }

        public static shouldEnumerateCategoryLabels(enableGeoShaping: boolean, filledMapDataLabelsEnabled: boolean): boolean {
            return (!enableGeoShaping || filledMapDataLabelsEnabled);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            var enumeration = new ObjectEnumerationBuilder();
            switch (options.objectName) {
                case 'dataPoint':
                    if (CustomMap.shouldEnumerateDataPoints(this.dataView, this.enableGeoShaping)) {
                        var bubbleData: MapBubble[] = [];
                        //TODO: better way of getting this data
                        var hasDynamicSeries = this.hasDynamicSeries;
                        if (!hasDynamicSeries) {
                            var mapData = this.dataPointRenderer.converter(this.getMapViewPort(), this.dataView, this.dataLabelsSettings, this.interactivityService, this.tooltipsEnabled);
                            bubbleData = mapData.bubbleData;
                        }
                        CustomMap.enumerateDataPoints(enumeration,
                            (<MapBubbleDataPointRenderer>this.dataPointRenderer).maxBubbleSize,
                            this.dataPointsToEnumerate,
                            this.colors,
                            hasDynamicSeries,
                            this.defaultDataPointColor,
                            this.showAllDataPoints,
                            bubbleData);
                    }
                    break;
                case 'mapView':
                    CustomMap.enumerateMapView(enumeration, this.mapViewSettings);
                    break;
                case 'categoryLabels':
                    if (CustomMap.shouldEnumerateCategoryLabels(this.enableGeoShaping, this.filledMapDataLabelsEnabled)) {
                        dataLabelUtils.enumerateCategoryLabels(enumeration, this.dataLabelsSettings, true, true);
                    }
                    break;
                case 'legend':
                    if (this.hasDynamicSeries) {
                        CustomMap.enumerateLegend(enumeration, this.dataView, this.legend, this.legendTitle());
                    }
                    break;
                case 'labels':
                    if (this.filledMapDataLabelsEnabled) {
                        this.dataLabelsSettings = this.dataLabelsSettings ? this.dataLabelsSettings : dataLabelUtils.getDefaultMapLabelSettings();
                        var labelSettingOptions: VisualDataLabelsSettingsOptions = {
                            enumeration: enumeration,
                            dataLabelsSettings: this.dataLabelsSettings,
                            show: true,
                            displayUnits: true,
                            precision: true,
                        };
                        dataLabelUtils.enumerateDataLabels(labelSettingOptions);
                    }
                    break;
            }
            return enumeration.complete();
        }

        public static enumerateDataPoints(enumeration: ObjectEnumerationBuilder,
            maxBubbleSize: number,
            dataPoints: LegendDataPoint[],
            colors: IDataColorPalette,
            hasDynamicSeries: boolean,
            defaultDataPointColor: string,
            showAllDataPoints: boolean,
            bubbleData: MapBubble[]): void {

            var seriesLength = dataPoints && dataPoints.length;
            if(maxBubbleSize !== undefined) {
                enumeration.pushInstance({
                    objectName: 'dataPoint',
                    selector: null,
                    properties: {
                        maxBubbleSize: maxBubbleSize
                    }
                });
            }

            if (hasDynamicSeries) {
                for (var i = 0; i < seriesLength; i++) {

                    var dataPoint = dataPoints[i];
                    enumeration.pushInstance({
                        objectName: 'dataPoint',
                        displayName: dataPoint.label,
                        selector: dataPoint.identity.getSelector(),
                        properties: {
                            fill: { solid: { color: dataPoint.color } }
                        },
                    });
                }
            }
            else {
                enumeration.pushInstance({
                    objectName: 'dataPoint',
                    selector: null,
                    properties: {
                        defaultColor: { solid: { color: defaultDataPointColor || colors.getColorByIndex(0).value } }
                    },
                }).pushInstance({
                    objectName: 'dataPoint',
                    selector: null,
                    properties: {
                        showAllDataPoints: !!showAllDataPoints
                    },
                });

                if (bubbleData) {
                    for (var i = 0; i < bubbleData.length; i++) {
                        var bubbleDataPoint = bubbleData[i];
                        enumeration.pushInstance({
                            objectName: 'dataPoint',
                            displayName: bubbleDataPoint.labeltext,
                            selector: bubbleDataPoint.identity.getSelector(),
                            properties: {
                                fill: { solid: { color: Color.normalizeToHexString(bubbleDataPoint.fill) } }
                            },
                        });
                    }
                }

            }
        }

        public static enumerateMapView(enumeration: ObjectEnumerationBuilder, mapViewSettings: MapViewSettings): void {
            mapViewSettings = $.extend({}, mapViewSettings);
            enumeration.pushInstance(<VisualObjectInstance> {
                selector: null,
                properties: <any>mapViewSettings,
                objectName: 'mapView'
            });
        }

        public static enumerateLegend(enumeration: ObjectEnumerationBuilder, dataView: DataView, legend: ILegend, legendTitle: string): void {
            enumeration.pushInstance({
                selector: null,
                properties: {
                    show: !CustomMap.isLegendHidden(dataView),
                    position: LegendPosition[legend.getOrientation()],
                    showTitle: CustomMap.isShowLegendTitle(dataView),
                    titleText: legendTitle,
                    fontSize: CustomMap.getLegendFontSize(dataView)
                },
                objectName: 'legend'
            });
        }

        public onDataChanged(options: VisualDataChangedOptions): void {
            debug.assertValue(options, 'options');

            this.receivedExternalViewChange = false;

            this.dataLabelsSettings = dataLabelUtils.getDefaultMapLabelSettings();
            this.defaultDataPointColor = null;
            this.showAllDataPoints = null;
            var dataView = this.dataView = options.dataViews[0];
            var enableGeoShaping = this.enableGeoShaping;
            var warnings = [];
            var data: MapData = {
                dataPoints: [],
                geocodingCategory: null,
            };

            if (dataView) {
                // Handle object-based settings
                if (dataView.metadata && dataView.metadata.objects) {
                    var objects = dataView.metadata.objects;

                    this.mapViewSettings.autoZoom = DataViewObjects.getValue<boolean>(objects, CustomMap.mapProps.mapView.autoZoom, this.mapViewSettings.autoZoom);
                    var minZoom = DataViewObjects.getValue<number>(objects, CustomMap.mapProps.mapView.minZoom, this.mapViewSettings.minZoom);
                    var maxZoom = DataViewObjects.getValue<number>(objects, CustomMap.mapProps.mapView.maxZoom, this.mapViewSettings.maxZoom);
                    var zoom = DataViewObjects.getValue<number>(objects, CustomMap.mapProps.mapView.zoom, this.mapViewSettings.zoom);
                    var latitude = DataViewObjects.getValue<number>(objects, CustomMap.mapProps.mapView.latitude, this.mapViewSettings.latitude);
                    var longitude = DataViewObjects.getValue<number>(objects, CustomMap.mapProps.mapView.longitude, this.mapViewSettings.longitude);
                    this.mapViewApplyAutoZoom = this.mapViewSettings.autoZoom 
                        && this.mapViewSettings.minZoom === minZoom
                        && this.mapViewSettings.maxZoom === maxZoom
                        && this.mapViewSettings.zoom === zoom 
                        && this.mapViewSettings.latitude === latitude 
                        && this.mapViewSettings.longitude === longitude;
                    this.mapViewSettings.minZoom = minZoom;
                    this.mapViewSettings.maxZoom = maxZoom;
                    this.mapViewSettings.zoom = zoom;
                    this.mapViewSettings.latitude = latitude;
                    this.mapViewSettings.longitude = longitude;

                    if(this.dataPointRenderer instanceof MapBubbleDataPointRenderer) {
                        var dataPointRenderer = <MapBubbleDataPointRenderer>this.dataPointRenderer;
                        dataPointRenderer.maxBubbleSize = Math.round(Math.max(0,
                            DataViewObjects.getValue<number>(objects, CustomMap.mapProps.dataPoint.maxBubbleSize, dataPointRenderer.maxBubbleSize || 0)));
                    }

                    this.defaultDataPointColor = DataViewObjects.getFillColor(objects, CustomMap.mapProps.dataPoint.defaultColor);
                    this.showAllDataPoints = DataViewObjects.getValue<boolean>(objects, CustomMap.mapProps.dataPoint.showAllDataPoints);

                    this.dataLabelsSettings.showCategory = DataViewObjects.getValue<boolean>(objects, CustomMap.filledMapProps.categoryLabels.show, this.dataLabelsSettings.showCategory);

                    if (enableGeoShaping) {
                        this.dataLabelsSettings.precision = DataViewObjects.getValue(objects, CustomMap.filledMapProps.labels.labelPrecision, this.dataLabelsSettings.precision);
                        this.dataLabelsSettings.precision = (this.dataLabelsSettings.precision !== dataLabelUtils.defaultLabelPrecision && this.dataLabelsSettings.precision < 0) ? 0 : this.dataLabelsSettings.precision;
                        this.dataLabelsSettings.displayUnits = DataViewObjects.getValue<number>(objects, CustomMap.filledMapProps.labels.labelDisplayUnits, this.dataLabelsSettings.displayUnits);
                        var datalabelsObj = objects['labels'];
                        if (datalabelsObj) {
                            this.dataLabelsSettings.show = (datalabelsObj['show'] !== undefined) ? <boolean>datalabelsObj['show'] : this.dataLabelsSettings.show;
                            if (datalabelsObj['color'] !== undefined) {
                                this.dataLabelsSettings.labelColor = (<Fill>datalabelsObj['color']).solid.color;
                            }
                        }
                    }
                    else {
                        var categoryLabelsObj = <DataLabelObject>objects['categoryLabels'];
                        if (categoryLabelsObj)
                            dataLabelUtils.updateLabelSettingsFromLabelsObject(categoryLabelsObj, this.dataLabelsSettings);
                    }
                }

                // Convert data
                var colorHelper = new ColorHelper(this.colors, CustomMap.mapProps.dataPoint.fill, this.defaultDataPointColor);
                data = CustomMap.converter(dataView, colorHelper, this.geoTaggingAnalyzerService);

                // Create legend
                this.legendData = CustomMap.createLegendData(dataView, colorHelper);
                this.dataPointsToEnumerate = this.legendData.dataPoints;
                this.renderLegend(this.legendData);

                // Start geocoding or geoshaping
                if (data != null) {
                    this.geocodingCategory = data.geocodingCategory;
                    this.mapControlFactory.ensureMap(this.locale, () => {
                        var params;
                        if (enableGeoShaping) {
                            params = MapShapeDataPointRenderer.getFilledMapParams(this.geocodingCategory, data.dataPoints.length);
                        }
                        for (var i = 0; i < data.dataPoints.length; i++) {
                            var dataPoint = data.dataPoints[i];
                            if (!dataPoint.location) {
                                if (enableGeoShaping)
                                    this.enqueueGeoCodeAndGeoShape(dataPoint, params);
                                else
                                    this.enqueueGeoCode(dataPoint);
                            }
                            else if (enableGeoShaping && !dataPoint.paths) {
                                this.enqueueGeoShape(dataPoint, params);
                            }
                            else {
                                this.addDataPoint(dataPoint);
                            }
                        }
                    });
                }
                else {
                    // No data from conversion, so clear data points
                    this.clearDataPoints();
                }

                if (enableGeoShaping) {
                    if (!this.geocodingCategory || !this.geoTaggingAnalyzerService.isGeoshapable(this.geocodingCategory)) {
                        warnings.push(new FilledMapWithoutValidGeotagCategoryWarning());
                    }
                }
                    }
            else {
                this.clearDataPoints();
                this.renderLegend({
                    dataPoints: [],
                    title: undefined,
                });
                this.dataPointsToEnumerate = [];
                    }

            if (!_.isEmpty(warnings))
                this.host.setWarnings(warnings);

            this.dataPointRenderer.setData(data);

            this.updateInternal(true /* dataChanged */, true /* redrawDataLabels */);
        }

        public static converter(dataView: DataView, colorHelper: ColorHelper, geoTaggingAnalyzerService: IGeoTaggingAnalyzerService): MapData {
            var reader = powerbi.data.createIDataViewCategoricalReader(dataView);
            var dataPoints: MapDataPoint[] = [];
            var hasDynamicSeries = reader.hasDynamicSeries();
            var seriesColumnIdentifier = reader.getSeriesColumnIdentifier();
            var sizeQueryName = reader.getMeasureQueryName('Size');
            if (sizeQueryName == null)
                sizeQueryName = '';
            var hasSize = reader.hasValues('Size');
            var geocodingCategory = null;

            if (reader.hasCategories()) {
                // Calculate category totals and range for radius calculation
                var categoryTotals: number[] = [];
                var categoryTotalRange;
                if (hasSize) {
                    var categoryMin: number = undefined;
                    var categoryMax: number = undefined;
                    for (var categoryIndex = 0, categoryCount = reader.getCategoryCount(); categoryIndex < categoryCount; categoryIndex++) {
                        var categoryTotal = 0;
                        for (var seriesIndex = 0, seriesCount = reader.getSeriesCount(); seriesIndex < seriesCount; seriesIndex++) {
                            categoryTotal += reader.getValue('Size', categoryIndex, seriesIndex);
                        }
                        categoryTotals.push(categoryTotal);
                        if (categoryMin === undefined || categoryTotal < categoryMin)
                            categoryMin = categoryTotal;
                        if (categoryMax === undefined || categoryTotal > categoryMax)
                            categoryMax = categoryTotal;
                    }
                    categoryTotalRange = (categoryMin !== undefined && categoryMax !== undefined) ? {
                        max: categoryMax,
                        min: categoryMin,
                    } : undefined;
                    }

                var hasLatLongGroup = reader.hasCompositeCategories() && reader.hasCategoryWithRole('X') && reader.hasCategoryWithRole('Y');
                var hasCategoryGroup = reader.hasCategoryWithRole('Category');

                geocodingCategory = CustomMap.getGeocodingCategory(dataView.categorical, geoTaggingAnalyzerService);

                if (hasLatLongGroup || hasCategoryGroup) {
                    // Create data points
                    for (var categoryIndex = 0, categoryCount = reader.getCategoryCount(); categoryIndex < categoryCount; categoryIndex++) {
                        // Get category information
                        var categoryValue = undefined;
                        var categoryObjects = reader.getCategoryObjects(categoryIndex, 'Category');
                        var location: IGeocodeCoordinate = undefined;
                        if (hasCategoryGroup) {
                            // Set category value
                            categoryValue = reader.getCategoryValue(categoryIndex, 'Category');

                            // Create location from latitude and longitude if they exist as values
                            if (reader.hasValues('Y') && reader.hasValues('X')) {
                                var latitude = reader.getValue('Y', categoryIndex);
                                var longitude = reader.getValue('X', categoryIndex);
                                location = { latitude: latitude, longitude: longitude };
                                }
                                }
                                else {
                            // Combine latitude and longitude to create the category value
                            var latitude = reader.getCategoryValue(categoryIndex, 'Y');
                            var longitude = reader.getCategoryValue(categoryIndex, 'X');
                            categoryValue = latitude + ', ' + longitude;

                            // Create location from latitude and longitude
                            location = { latitude: latitude, longitude: longitude };
                                }
                        var value: number = hasSize ? categoryTotals[categoryIndex] : undefined;
                    
                        // Calculate sub data points by series
                        var subDataPoints: MapSubDataPoint[] = [];
                        var seriesCount = reader.getSeriesCount();
                        if (!hasSize) {
                            seriesCount = 1;
                            }
                        for (var seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
                            var color = hasDynamicSeries
                                ? colorHelper.getColorForSeriesValue(reader.getSeriesObjects(seriesIndex), seriesColumnIdentifier, reader.getSeriesName(seriesIndex).toString())
                                : colorHelper.getColorForMeasure(categoryObjects, sizeQueryName);

                            var colorRgb = Color.parseColorString(color);
                            var stroke = Color.hexString(Color.darken(colorRgb, CustomMap.StrokeDarkenColorValue));
                            colorRgb.A = 0.6;
                            var fill = Color.rgbString(colorRgb);

                            var identityBuilder = new SelectionIdBuilder()
                                .withCategory(reader.getCategoryColumn(hasCategoryGroup ? 'Category' : 'Y'), categoryIndex)
                                .withMeasure(sizeQueryName);
                            if (hasDynamicSeries && hasSize) {
                                identityBuilder = identityBuilder.withSeries(reader.getSeriesColumns(), reader.getValueColumn('Size', seriesIndex));
                        }

                            var subsliceValue = hasSize ? reader.getValue('Size', categoryIndex, seriesIndex) : undefined;
                            // Do not create subslices for data points with 0 or null 
                            if (subsliceValue || !hasSize) {
                                subDataPoints.push({
                                    value: subsliceValue,
                                    fill: fill,
                                    stroke: stroke,
                                    identity: identityBuilder.createSelectionId(),
                                });
                            }
                        }

                        // Skip data points that have a total value of 0 or null
                        if (value || !hasSize) {
                            dataPoints.push({
                                geocodingQuery: categoryValue,
                                value: value,
                                categoryValue: categoryValue,
                                subDataPoints: subDataPoints,
                                radius: CustomMap.calculateRadius(categoryTotalRange, value),
                                location: location,
                    });
                }
                }
            }
            }

            var mapData: MapData = {
                dataPoints: dataPoints,
                geocodingCategory: geocodingCategory,
            };

            return mapData;
        }

        public static createLegendData(dataView: DataView, colorHelper: ColorHelper): LegendData {
            var reader = powerbi.data.createIDataViewCategoricalReader(dataView);
            var legendDataPoints: LegendDataPoint[] = [];
            var legendTitle: string;
            if (reader.hasDynamicSeries() && reader.hasValues('Size')) {
                legendTitle = reader.getSeriesDisplayName();
                var seriesColumnIdentifier = reader.getSeriesColumnIdentifier();
                for (var seriesIndex = 0, seriesCount = reader.getSeriesCount(); seriesIndex < seriesCount; seriesIndex++) {
                    var color = colorHelper.getColorForSeriesValue(reader.getSeriesObjects(seriesIndex), seriesColumnIdentifier, reader.getSeriesName(seriesIndex).toString());
                    var identity = new SelectionIdBuilder().withSeries(reader.getSeriesColumns(), reader.getValueColumn('Size', seriesIndex)).createSelectionId();
                    legendDataPoints.push({
                        color: color,
                        label: valueFormatter.format(reader.getSeriesName(seriesIndex)),
                        icon: LegendIcon.Circle,
                        identity: identity,
                        selected: false,
                    });
                }
            }
            var legendData: LegendData = {
                dataPoints: legendDataPoints,
                title: legendTitle,
            };
            return legendData;
        }

        private swapLogoContainerChildElement() {
            // This is a workaround that allow maps to be printed from the IE and Edge browsers.
            // For some unknown reason, the presence of an <a> child element in the .LogoContainer
            // prevents dashboard map visuals from showing up when printed.
            // The trick is to swap out the <a> element with a <div> container.
            // There are no user impacts or visual changes.
            var logoContainer = this.element.find('.LogoContainer');

            if (logoContainer) {
                var aNode = logoContainer.find('a');
                if (aNode == null)
                    return;

                var divNode = $('<div>');
                aNode.children().clone().appendTo(divNode);
                aNode.remove();
                divNode.appendTo(logoContainer);
            }
        }

        public onResizing(viewport: IViewport): void {
            if (this.currentViewport.width !== viewport.width || this.currentViewport.height !== viewport.height) {
                this.currentViewport = viewport;
                this.renderLegend(this.legendData);
                this.updateInternal(false /* dataChanged */, false);
            }
        }

        private initialize(container: HTMLElement): void {
            var mapOptions = {
                credentials: MapUtil.Settings.BingKey,
                showMapTypeSelector: false,
                enableClickableLogo: false,
                enableSearchLogo: false,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                customizeOverlays: true,
                showDashboard: false,
                showScalebar: false,
                disableKeyboardInput: true, // Workaround for the BingMaps control moving focus from QnA
                disableZooming: this.disableZooming,
                disablePanning: this.disablePanning,
            };
            var divQuery = this.root = InJs.DomFactory.div().addClass(CustomMap.MapContainer.cssClass).appendTo(container);
            this.mapControl = this.mapControlFactory.createMapControl(divQuery[0], mapOptions);

            if (this.viewChangeThrottleInterval !== undefined) {
                Microsoft.Maps.Events.addThrottledHandler(this.mapControl, 'viewchange', () => { this.onViewChanged(); },
                    this.viewChangeThrottleInterval);
            } else {
                Microsoft.Maps.Events.addHandler(this.mapControl, 'viewchange', () => { this.onViewChanged(); });
            }

            Microsoft.Maps.Events.addHandler(this.mapControl, "viewchangeend", () => { this.onViewChangeEnded(); });
            this.dataPointRenderer.init(this.mapControl, divQuery, !!this.behavior);

            if (!this.pendingGeocodingRender) {
                this.updateInternal(true /* dataChanged */, true);
            }
        }

        private onViewChanged() {
            if (!this.executingInternalViewChange)
                this.receivedExternalViewChange = true;
            else
                this.executingInternalViewChange = false;
            this.updateOffsets(false, false /* dataChanged */);
            if (this.behavior)
                this.behavior.viewChanged();

            this.swapLogoContainerChildElement();
        }

        private onViewChangeEnded() {
            var mapViewSettings = $.extend(new MapViewSettings(), this.mapViewSettings);
            mapViewSettings.zoom = this.mapControl.getTargetZoom();
            mapViewSettings.center = this.mapControl.getTargetCenter();
            this.host.persistProperties(<VisualObjectInstancesToPersist> {
                    replace: [{
                        objectName: "mapView",
                        selector: null,
                        properties: <any>mapViewSettings
                    }]
                });

            this.dataPointRenderer.updateInternalDataLabels(this.currentViewport, true);
        }

        private getMapViewPort(): IViewport {
            var currentViewport = this.currentViewport;
            var legendMargins = this.legend.getMargins();

            var mapViewport = {
                width: currentViewport.width - legendMargins.width,
                height: currentViewport.height - legendMargins.height,
            };

            return mapViewport;
        }

        public static removeTransform3d(mapRoot: JQuery): void {
            // don't remove transform3d from bing maps images in safari (using applewebkit engine)
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (mapRoot && userAgent.indexOf('applewebkit') === -1) {
                var imageTiles = mapRoot.find('img');
                imageTiles.css('transform', '');
            }
        }

        private updateInternal(dataChanged: boolean, redrawDataLabels: boolean) {
            if (this.mapControl) {
                var isLegendVisible = this.legend.isVisible();

                if (!isLegendVisible)
                    this.legendData = { dataPoints: [] };

                var mapDiv = this.element.children(CustomMap.MapContainer.selector);
                var mapViewport = this.getMapViewPort();
                mapDiv.height(mapViewport.height);
                mapDiv.width(mapViewport.width);

                // With the risk of double drawing, if the position updates to nearly the same, the map control won't call viewchange, so explicitly update the points
                this.updateOffsets(dataChanged, redrawDataLabels);
                this.updateZoom();
                this.updateViewCenter();
                if (!this.receivedExternalViewChange || !this.interactivityService) {
                    this.executingInternalViewChange = true;
                    this.mapControl.restrictZoom(this.mapViewSettings.minZoom, this.mapViewSettings.maxZoom);
                    this.mapControl.setView({ center: this.mapViewSettings.center, zoom: this.mapViewSettings.zoom, animate: true });
                }
            }
        }

        private updateOffsets(dataChanged: boolean, redrawDataLabels: boolean) {
            var dataView = this.dataView;
            var data: MapRendererData;
            var viewport = this.getMapViewPort();
            if (dataView && dataView.categorical) {
                // currentViewport may not exist in UnitTests
                data = this.dataPointRenderer.converter(viewport, this.dataView, this.dataLabelsSettings, this.interactivityService, this.tooltipsEnabled);
            }
            else {
                data = {
                    bubbleData: [],
                    shapeData: [],
                    sliceData: [],
                };
            }

            var behaviorOptions = this.dataPointRenderer.updateInternal(data, viewport, dataChanged, this.interactivityService, redrawDataLabels);
            Legend.positionChartArea(d3.select(this.root[0]), this.legend);

            if (this.interactivityService && behaviorOptions) {
                this.interactivityService.bind(behaviorOptions.dataPoints, this.behavior, behaviorOptions);
            }
        }

        public onClearSelection(): void {
            this.interactivityService.clearSelection();
            this.updateOffsets(false, false /* dataChanged */);
        }

        private clearDataPoints(): void {
            this.dataPointRenderer.clearDataPoints();
            this.legend.drawLegend({ dataPoints: [] }, this.currentViewport);
        }

        private getDefaultMapControlFactory(): IMapControlFactory {
            return {
                createMapControl: (element: HTMLElement, options: Microsoft.Maps.MapOptions) => new Microsoft.Maps.Map(element, options),
                ensureMap: jsCommon.ensureMap,
            };
        }
    }
}