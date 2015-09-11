module powerbi.visuals.experimental {
    import RgbColor = jsCommon.color.RgbColor;

    export module ScatterPrototype {
        export interface ScatterDataPointModel {
            x: number;
            y: number;
            size: number;
            color: RgbColor;
            selected: boolean;
            //categoryValue: string;
        }

        export interface ScatterDataPointViewModel {
            x: number;
            y: number;
            radius: number;
            fill: RgbColor;
            //stroke: RgbColor;   // TODO: We need an RgbaColor structure
            alpha: number;
        }

        export interface ScatterViewModel {
            dataPoints: ScatterDataPointViewModel[];
            boundingBox: BoundingBox;
        }

        export interface ScatterDataModel {
            dataPoints: ScatterDataPointModel[];
            sizeRange: NumberRange;
            xDomain: Domain;
            yDomain: Domain;
            hasSelection: boolean;
        }

        export class ScatterVisual implements IVisualComponent {
            private initOptions: VisualInitOptions;
            private legend: Legend;
            private axes: CartesianAxes;

            private dataModel: ScatterDataModel;
            
            public init(options: VisualInitOptions) {
                this.initOptions = options;

                this.legend = new Legend();
                this.axes = new CartesianAxes();
            }

            public layout(boundingBox: BoundingBox, renderer: IVisualRenderer): SceneGraphNode {
                // ---- Layout ----
                let layoutManager = new DockLayoutManager(boundingBox);

                let legendPosition = DockPosition.Left;  // TODO: get position from legend?
                let legendBoundingBox = layoutManager.measure(this.legend, legendPosition);
                let axesBoundingBox = layoutManager.measure(this.axes, DockPosition.Fill);

                // ---- Build Scene Graph ----
                let sceneNode = new SceneGraphNode();

                sceneNode.add(this.legend.layout(legendBoundingBox, renderer));
                sceneNode.add(this.axes.layout(axesBoundingBox, this.dataModel.xDomain, this.dataModel.yDomain, renderer));

                // NOTE: requires axes be laid out first
                // Another option is to separate out the plot area
                let viewModel = this.buildViewModel(this.dataModel, boundingBox);
                sceneNode.render = this.getRenderMethod(viewModel, renderer);
                
                return sceneNode;
            }

            private getRenderMethod(viewModel: ScatterViewModel, renderer: IVisualRenderer) {
                switch (renderer.type) {
                    case RendererType.SVG:
                        return () => new ScatterSvgRenderer(viewModel).render(<SvgRenderer>renderer);
                    case RendererType.Canvas:
                        return () => new ScatterCanvasRenderer(viewModel).render(<CanvasRenderer>renderer);
                }

                return null;
            }

            public buildViewModel(model: ScatterDataModel, boundingBox: BoundingBox): ScatterViewModel {
                let dataPoints: ScatterDataPointViewModel[] = [];

                // TODO: may need other axes properties. like what?
                let xScale = this.axes.xScale;
                let yScale = this.axes.yScale;

                for (let dataPoint of model.dataPoints) {
                    dataPoints.push(<ScatterDataPointViewModel> {
                        x: boundingBox.left + xScale(dataPoint.x),
                        y: boundingBox.top + yScale(dataPoint.y),
                        fill: dataPoint.color,
                        alpha: BubbleHelper.getBubbleOpacity(dataPoint.selected, model.hasSelection),
                        radius: BubbleHelper.getBubbleRadius(dataPoint.size, model.sizeRange, boundingBox),
                    });
                }

                return {
                    dataPoints: dataPoints,
                    boundingBox: boundingBox,
                };
            }

            public setData(dataView: DataView) {
                this.buildDataModel(dataView, this.initOptions.style.colorPalette.dataColors);

                this.legend.convert(dataView, this.initOptions.style.colorPalette.dataColors, "", null);
                this.axes.convert(dataView);
            }

            private buildDataModel(dataView: DataView, colorPalette: IDataColorPalette, defaultDataPointColor?: string): void {
                this.dataModel = new ScatterChartDataConverter(dataView).convert(colorPalette, defaultDataPointColor);
            }

            //public update(options: VisualUpdateOptions) {
            //    let dataView = options.dataViews[0];

            //    let plotAreaDataModel = PerfectScatter.converter(dataView);
            //    //TODO: fix null params
            //    let legendDataModel = Legend.converter(dataView.categorical.values, null, "", null);
            //    let axesDataModels = 

            //    let plotAreaBoundingBox = PerfectScatter.getPreferredLayout(plotAreaDataModel);
            //    let legendBoundingBox = Legend.getPreferredLayout(legendDataModel);
            //    //...

            //    this.reconcileLayout(/*...*/);

            //    let legendViewModel = Legend.layout(legenDataModel, finalLegendBoundingBox);
            //    let plotAreaViewModel = PerfectScatter.layout(plotAreaDataModel, finalPlotAreaBoundingBox);

            //    Legend.render(legendViewModel);
            //    //AxesHelper.render(axes[]);
            //    PerfectScatter.render({viewModel: viewModel});
            //}
        }

        class ScatterSvgRenderer {
            private viewModel: ScatterViewModel;

            constructor(viewModel: ScatterViewModel) {
                this.viewModel = viewModel;
            }

            public render(renderer: SvgRenderer) {
                let svg = renderer.getElement();

                let plot = svg.select('.plot');

                if (plot.size() === 0) {
                    plot = svg.append('g').classed('plot', true);
                }

                let bbox = this.viewModel.boundingBox;
                plot.style('transform', SVGUtil.translate(bbox.left, bbox.top));

                let selection = plot.selectAll('.dataPoint').data(this.viewModel.dataPoints);
                selection.enter()
                    .append('circle')
                    .classed('dataPoint', true);

                selection.attr({
                    'cx': (d: ScatterDataPointViewModel) => d.x,
                    'cy': (d: ScatterDataPointViewModel) => d.y,
                    'fill': (d: ScatterDataPointViewModel) => jsCommon.color.rgbString(d.fill),
                    'r': (d: ScatterDataPointViewModel) => d.radius,
                });

                selection.exit();

                DebugHelper.drawSvgRect(svg, bbox, "green", "plot");
            }
        }

        class ScatterCanvasRenderer {
            private viewModel: ScatterViewModel;

            constructor(viewModel: ScatterViewModel) {
                this.viewModel = viewModel;
            }

            public render(renderer: CanvasRenderer) {
                let canvas = renderer.getCanvasContext();
                let bbox = this.viewModel.boundingBox;
                
                for (let point of this.viewModel.dataPoints) {
                    canvas.beginPath();
                    canvas.arc(
                        point.x,
                        point.y,
                        point.radius,
                        0,
                        2 * Math.PI,
                        false);
                    canvas.closePath();

                    //context.fillStyle = jsCommon.color.rgbWithAlphaString(point.fill, point.alpha);
                    //context.fill();

                    let color = jsCommon.color.rgbWithAlphaString(point.fill, point.alpha);
                    canvas.lineWidth = 1;
                    canvas.strokeStyle = color;
                    canvas.stroke();
                }

                DebugHelper.drawCanvasRect(canvas, bbox, "green", "plot");
            }
        }

        class ScatterMetadata {
            public xIndex: number;
            public yIndex: number;
            public sizeIndex: number;

            constructor(grouped: DataViewValueColumnGroup[]) {
                let xIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, 'X');
                let yIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, 'Y');
                let sizeIndex = DataRoleHelper.getMeasureIndexOfRole(grouped, 'Size');

                let xCol: DataViewMetadataColumn;
                let yCol: DataViewMetadataColumn;
                let sizeCol: DataViewMetadataColumn;
                let xAxisLabel = "";
                let yAxisLabel = "";

                if (grouped && grouped.length) {
                    let firstGroup = grouped[0],
                        measureCount = firstGroup.values.length;

                    if (!(xIndex >= 0))
                        xIndex = ScatterMetadata.getDefaultMeasureIndex(measureCount, yIndex, sizeIndex);
                    if (!(yIndex >= 0))
                        yIndex = ScatterMetadata.getDefaultMeasureIndex(measureCount, xIndex, sizeIndex);
                    if (!(sizeIndex >= 0))
                        sizeIndex = ScatterMetadata.getDefaultMeasureIndex(measureCount, xIndex, yIndex);

                    if (xIndex >= 0) {
                        xCol = firstGroup.values[xIndex].source;
                        xAxisLabel = firstGroup.values[xIndex].source.displayName;
                    }
                    if (yIndex >= 0) {
                        yCol = firstGroup.values[yIndex].source;
                        yAxisLabel = firstGroup.values[yIndex].source.displayName;
                    }
                    if (sizeIndex >= 0) {
                        sizeCol = firstGroup.values[sizeIndex].source;
                    }
                }

                this.xIndex = xIndex;
                this.yIndex = yIndex;
                this.sizeIndex = sizeIndex;
            }

            private static getDefaultMeasureIndex(count: number, usedIndex: number, usedIndex2: number): number {
                for (let i = 0; i < count; i++) {
                    if (i !== usedIndex && i !== usedIndex2)
                        return i;
                }
            }
        }

        class ScatterChartDataConverter {
            private dataView: DataView;
            private dataViewHelper: DataViewHelper;

            constructor(dataView: DataView) {
                this.dataView = dataView;
                this.dataViewHelper = new DataViewHelper(dataView);
            }

            public convert(colorPalette: IDataColorPalette, defaultDataPointColor?: string): ScatterDataModel {
                let categoryValues = this.dataViewHelper.categoryValues;
                let categoryObjects = this.dataViewHelper.categoryObjects;
                let seriesColumns = this.dataViewHelper.seriesColumns;

                let scatterMetadata = new ScatterMetadata(seriesColumns);

                let colorHelper = new ColorHelper(colorPalette, scatterChartProps.dataPoint.fill, defaultDataPointColor);
                //let categoryFormatter = categoryValues.length > 0
                //    ? valueFormatter.create({ format: valueFormatter.getFormatString(this.dataViewHelper.categoryColumn.source, scatterChartProps.general.formatString), value: categoryValues[0], value2: categoryValues[categoryValues.length - 1] })
                //    : valueFormatter.createDefaultFormatter(null);

                let sizeRange: NumberRange = this.computeMinMax(seriesColumns, scatterMetadata.sizeIndex);

                let dataPoints: ScatterDataPointModel[] = [];
                for (let categoryIdx = 0, catLen = categoryValues.length; categoryIdx < catLen; categoryIdx++) {
                    //let categoryValue = categoryValues[categoryIdx];

                    for (let seriesIdx = 0, seriesLen = seriesColumns.length; seriesIdx < seriesLen; seriesIdx++) {
                        let seriesColumn = seriesColumns[seriesIdx];
                        let seriesValues = seriesColumn.values;

                        let xColumn = ScatterChartDataConverter.getMeasureColumn(scatterMetadata.xIndex, seriesValues);
                        let yColumn = ScatterChartDataConverter.getMeasureColumn(scatterMetadata.yIndex, seriesValues);
                        let sizeColumn = ScatterChartDataConverter.getMeasureColumn(scatterMetadata.sizeIndex, seriesValues);

                        let xVal = ScatterChartDataConverter.getMeasureValue(xColumn, categoryIdx);
                        let yVal = ScatterChartDataConverter.getMeasureValue(yColumn, categoryIdx, 0);
                        let size = ScatterChartDataConverter.getMeasureValue(sizeColumn, categoryIdx);

                        let hasNullValue = (xVal == null) || (yVal == null);
                        if (hasNullValue)
                            continue;

                        let color: RgbColor;
                        if (this.dataViewHelper.hasDynamicSeries) {
                            color = jsCommon.color.parseRgb(colorHelper.getColorForSeriesValue(seriesColumn.objects, this.dataViewHelper.seriesIdentity, seriesColumn.name));
                        }
                        else {
                            // If we have no Size measure then use a blank query name
                            let measureSource = (sizeColumn != null)
                                ? sizeColumn.source.queryName
                                : '';

                            color = jsCommon.color.parseRgb(colorHelper.getColorForMeasure(categoryObjects && categoryObjects[categoryIdx], measureSource));
                        }

                        let identity = SelectionIdBuilder.builder()
                            .withCategory(this.dataViewHelper.categoryColumn, categoryIdx)
                            .withSeries(this.dataView.categorical.values, seriesColumn)
                            .createSelectionId();

						// TODO: tooltips

                        let dataPoint: ScatterDataPointModel = {
                            x: xVal,
                            y: yVal,
                            size: size,
                            //category: categoryFormatter.format(categoryValue),
                            color: color,
                            //selected: false,
                            identity: identity,
                            selected: false,
                            //tooltipInfo: tooltipInfo,
                            //labelFill: labelSettings.labelColor,
                        };

                        dataPoints.push(dataPoint);
                    }
                }

                // TODO: integrate in main loop?
                let xDomain: Domain = Domain.createFromValues(_.map(dataPoints, d => d.x));
                let yDomain: Domain = Domain.createFromValues(_.map(dataPoints, d => d.y));

                return <ScatterDataModel> {
                    dataPoints: dataPoints,
                    sizeRange: sizeRange,
                    xDomain: xDomain,
                    yDomain: yDomain,
                };
            }

            private static getMeasureColumn(measureIndex: number, seriesValues: DataViewValueColumn[]): DataViewValueColumn {
                if (measureIndex >= 0)
                    return seriesValues[measureIndex];

                return null;
            }

            private static getMeasureValue(measureColumn: DataViewValueColumn, index: number, defaultValue: any = null): any {
                return measureColumn && measureColumn.values ? measureColumn.values[index] : defaultValue;
            }

            private computeMinMax(seriesColumns: DataViewValueColumnGroup[], sizeColumnIndex: number): NumberRange {
                let sizeRange: NumberRange = {};
                for (let seriesColumn of seriesColumns) {
                    let sizeColumn = ScatterChartDataConverter.getMeasureColumn(sizeColumnIndex, seriesColumn.values);
                    let currentRange: NumberRange = AxisHelper.getRangeForColumn(sizeColumn);
                    if (sizeRange.min == null || sizeRange.min > currentRange.min) {
                        sizeRange.min = currentRange.min;
                    }
                    if (sizeRange.max == null || sizeRange.max < currentRange.max) {
                        sizeRange.max = currentRange.max;
                    }
                }

                return sizeRange;
            }
        }

        module BubbleHelper {
            let AreaOf300By300Chart = 90000;
            let MinSizeRange = 200;
            let MaxSizeRange = 3000;

            export function getBubbleRadius(value: number, valueRange: NumberRange, boundingBox: BoundingBox): number {
                let min = valueRange.min || 0;
                min = Math.min(min, 0);

                let max = valueRange.max || 0;
                max = Math.max(max, 0);

                // TODO: calculate this in converter?
                let valueDataRange = {
                    minRange: min,
                    maxRange: max,
                    delta: max - min
                };

                // TODO: calculate this only once per update
                let bubblePixelAreaSizeRange = getBubblePixelAreaSizeRange(boundingBox, MinSizeRange, MaxSizeRange);

                return projectSizeToPixels(value, valueDataRange, bubblePixelAreaSizeRange) / 2;
            }

            function getBubblePixelAreaSizeRange(boundingBox: BoundingBox, minSizeRange: number, maxSizeRange: number): DataRange {
                let ratio = 1.0;
                if (boundingBox.height > 0 && boundingBox.width > 0) {
                    let minDimension = Math.min(boundingBox.height, boundingBox.width);
                    ratio = (minDimension * minDimension) / AreaOf300By300Chart;
                }

                let minRange = Math.round(minSizeRange * ratio);
                let maxRange = Math.round(maxSizeRange * ratio);
                return {
                    minRange: minRange,
                    maxRange: maxRange,
                    delta: maxRange - minRange
                };
            }

            function projectSizeToPixels(size: number, actualSizeDataRange: DataRange, bubblePixelAreaSizeRange: DataRange): number {
                // Project value on the required range of bubble area sizes
                let projectedSize = bubblePixelAreaSizeRange.maxRange;
                if (actualSizeDataRange.delta !== 0) {
                    let value = Math.min(Math.max(size, actualSizeDataRange.minRange), actualSizeDataRange.maxRange);
                    projectedSize = project(value, actualSizeDataRange, bubblePixelAreaSizeRange);
                }

                projectedSize = Math.sqrt(projectedSize / Math.PI) * 2;

                return Math.round(projectedSize);
            }

            function project(value: number, actualSizeDataRange: DataRange, bubblePixelAreaSizeRange: DataRange): number {
                if (actualSizeDataRange.delta === 0 || bubblePixelAreaSizeRange.delta === 0) {
                    return (rangeContains(actualSizeDataRange, value)) ? bubblePixelAreaSizeRange.minRange : null;
                }

                let relativeX = (value - actualSizeDataRange.minRange) / actualSizeDataRange.delta;
                return bubblePixelAreaSizeRange.minRange + relativeX * bubblePixelAreaSizeRange.delta;
            }

            function rangeContains(range: DataRange, value: number): boolean {
                return range.minRange <= value && value <= range.maxRange;
            }

            export function getBubbleOpacity(selected: boolean, hasSelection: boolean): number {
                if (hasSelection && !selected) {
                    return ScatterChart.DimmedBubbleOpacity;
                }
                return ScatterChart.DefaultBubbleOpacity;
            }
        }
    }

    export module DebugHelper {
        export function drawSvgRect(drawingSurface: D3.Selection, bbox: BoundingBox, color: string, tag: string): void {
            let placeholder = drawingSurface.select('.debug' + tag);
            if(placeholder.size() === 0) {
                placeholder = drawingSurface.append('rect').classed('debug' + tag, true);
            }

            placeholder.style('transform', SVGUtil.translate(bbox.left, bbox.top));
            placeholder.attr({
                width: bbox.width,
                height: bbox.height,
                "stroke-width": "1px",
                stroke: color,
                fill: "none",
            });
        }

        export function drawCanvasRect(canvas: CanvasRenderingContext2D, bbox: BoundingBox, color: string, tag: string): void {
            canvas.lineWidth = 1;
            canvas.strokeStyle = color;
            canvas.strokeRect(bbox.left, bbox.top, bbox.width, bbox.height);
        }
    }
}