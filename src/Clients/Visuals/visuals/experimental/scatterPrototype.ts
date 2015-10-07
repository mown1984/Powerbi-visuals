/// <reference path="../../_references.ts"/>

module powerbi.visuals.experimental {
    import RgbColor = jsCommon.color.RgbColor;

    export module ScatterPrototype {
        export interface ScatterDataPointModel {
            x: number;
            y: number;
            size: number;
            color: RgbColor;
            selected: boolean;
            identity: SelectionId;
            //categoryValue: string;
        }

        export interface ScatterDataPointViewModel {
            x: number;
            y: number;
            radius: number;
            fill: RgbColor;
            //stroke: RgbColor;   // TODO: We need an RgbaColor structure
            alpha: number;
            key: string;
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
            private renderer: IRenderer;
            
            public init(options: VisualInitOptions) {
                this.initOptions = options;

                this.renderer = this.getRenderer(options.preferredRenderer, options.rendererFactory);

                this.legend = new Legend();
                this.legend.init(options);

                this.axes = new CartesianAxes();
            }

            public layout(boundingBox: BoundingBox): SceneGraphNode {
                // ---- Layout ----
                let layoutManager = new DockLayoutManager(boundingBox);

                let legendPosition = DockPosition.Left;  // TODO: get position from legend?
                let legendBoundingBox = layoutManager.measure(this.legend, legendPosition);
                let axesBoundingBox = layoutManager.measure(this.axes, DockPosition.Fill);

                // ---- Build Scene Graph ----
                let sceneNode = new SceneGraphNode();

                sceneNode.add(this.legend.layout(legendBoundingBox));
                sceneNode.add(this.axes.layout(axesBoundingBox, this.dataModel.xDomain, this.dataModel.yDomain));

                // NOTE: requires axes be laid out first
                // Another option is to separate out the plot area
                let plotArea = this.axes.getPlotArea();
                let viewModel = this.buildViewModel(this.dataModel, plotArea);
                sceneNode.render = () => this.renderer.render(viewModel);
                
                return sceneNode;
            }

            private getRenderer(type: RendererType, factory: RendererFactory): IRenderer {
                switch (type) {
                    case RendererType.SVG:
                        return new ScatterSvgRenderer(<SvgRenderer>factory.getRenderer(RendererType.SVG));
                    case RendererType.Canvas:
                        return new ScatterCanvasRenderer(<CanvasRenderer>factory.getRenderer(RendererType.Canvas));
                    case RendererType.WebGL:
                        //return new ScatterMinimalWebGLRenderer(<MinimalWebGLRenderer>renderer);
                        return new ScatterTextureWebGLRenderer(<MinimalWebGLRenderer>factory.getRenderer(RendererType.WebGL));
                    case RendererType.TwoJS:
                        return new ScatterTwoWebGLRenderer(<TwoWebGLRenderer>factory.getRenderer(RendererType.TwoJS));
                    case RendererType.PIXI:
                        return new ScatterPixiWebGLRenderer(<PixiWebGLRenderer>factory.getRenderer(RendererType.PIXI));
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
                        key: JSON.stringify(dataPoint.identity),
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
        }

        class ScatterSvgRenderer {
            private renderer: SvgRenderer;

            constructor(renderer: SvgRenderer) {
                this.renderer = renderer;
            }

            public render(viewModel: ScatterViewModel) {
                let svg = this.renderer.getElement();

                let plot = svg.select('.plot');

                if (plot.size() === 0) {
                    plot = svg.append('g').classed('plot', true);
                }

                let bbox = viewModel.boundingBox;
                plot.style('transform', SVGUtil.translate(bbox.left, bbox.top));

                let selection = plot.selectAll('.dataPoint').data(viewModel.dataPoints, (d) => d.key);
                selection.enter()
                    .append('circle')
                    .classed('dataPoint', true);

                selection.attr({
                    'cx': (d: ScatterDataPointViewModel) => d.x,
                    'cy': (d: ScatterDataPointViewModel) => d.y,
                    'fill': (d: ScatterDataPointViewModel) => jsCommon.color.rgbWithAlphaString(d.fill, d.alpha),
                    'stroke': 'black',
                    'stroke-width': 1,
                    'r': (d: ScatterDataPointViewModel) => d.radius,
                });

                selection.exit();

                DebugHelper.drawSvgRect(svg, bbox, '#00ff00', "plot");
            }
        }

        class ScatterCanvasRenderer {
            private renderer: CanvasRenderer;

            constructor(renderer: CanvasRenderer) {
                this.renderer = renderer;
            }

            public render(viewModel: ScatterViewModel) {
                let canvas = this.renderer.getCanvasContext();
                let bbox = viewModel.boundingBox;
                
                for (let point of viewModel.dataPoints) {
                    canvas.beginPath();
                    canvas.arc(
                        point.x,
                        point.y,
                        point.radius,
                        0,
                        2 * Math.PI,
                        false);
                    canvas.closePath();

                    let fill = jsCommon.color.rgbWithAlphaString(point.fill, point.alpha);
                    canvas.fillStyle = fill;
                    canvas.fill();

                    
                    canvas.lineWidth = 1;
                    canvas.strokeStyle = 'black';
                    canvas.stroke();
                }

                DebugHelper.drawCanvasRect(canvas, bbox, '#00ff00', "plot");
            }
        }

        class ScatterTwoWebGLRenderer {
            private renderer: TwoWebGLRenderer;

            constructor(renderer: TwoWebGLRenderer) {
                this.renderer = renderer;
            }

            public render(viewModel: ScatterViewModel) {
                let graphics: any = this.renderer.createGraphics();
                let bbox = viewModel.boundingBox;

                graphics.clear();
                for (let point of viewModel.dataPoints) {
                    let circle = graphics.makeCircle(
                        point.x,
                        point.y,
                        point.radius);

                    circle.fill = jsCommon.color.rgbString(point.fill);
                    circle.opacity = point.alpha;
                    circle.stroke = "black";
                    circle.linewidth = 1;

                    graphics.scene.add(circle);
                }

                let rect = graphics.makeRectangle(bbox.left, bbox.top, bbox.width, bbox.height);
                rect.fill = "#00ff00";
                rect.opacity = 0.2;
                rect.noStroke();
            }
        }

        class ScatterMinimalWebGLRenderer {
            private viewModel: ScatterViewModel;

            private vertexShader: WebGL.DefaultVertexShader;
            private vertexBuffer: WebGLBuffer;
            private colorBuffer: WebGLBuffer;
            private fragmentShader: WebGL.DefaultFragmentShader;
            private program: WebGLProgram;
            private gl: WebGLRenderingContext;
            private renderer: MinimalWebGLRenderer;

            private resolution: number = 8;
            private circleTemplate = this.makeCircleTemplate();

            constructor(renderer: MinimalWebGLRenderer) {
                this.renderer = renderer;
                this.gl = renderer.getGL();

                this.vertexShader = new WebGL.DefaultVertexShader();
                this.fragmentShader = new WebGL.DefaultFragmentShader();
                this.program = renderer.buildProgram(this.vertexShader, this.fragmentShader);
            }

            public render(viewModel: ScatterViewModel) {
                this.setViewModel(viewModel);
                this.draw();
            }

            public setViewModel(viewModel: ScatterViewModel) {
                this.viewModel = viewModel;
                let gl = this.gl;

                let vertices = [];
                let colors = [];
                for (let p of viewModel.dataPoints) {
                    this.makeCircle(p.x, p.y, p.radius, vertices);

                    // TODO: index buffer for colors?
                    let r = Math.random(), g = Math.random(), b = Math.random();
                    for (let i = 0; i < this.resolution * 3; i++) {
                        colors.push(r, g, b, 1.0);
                        //colors.push(p.fill.R / 255.0, p.fill.G / 255.0, p.fill.B / 255.0, p.alpha);
                    }
                }

                // Buffers
                this.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
                //(<any>this.vertexBuffer).itemSize = 2;

                this.colorBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
                //(<any>this.colorBuffer).itemSize = 4;
            }

            public draw() {
                let gl = this.gl;
                let renderer = this.renderer;

                gl.useProgram(this.program);  // TODO: check if it is already the last used program

                renderer.clear();

                // set buffers & attributes
                this.vertexShader.setAttributes(gl, this.vertexBuffer, this.colorBuffer, null, null);

                // set uniforms
                this.vertexShader.setUniforms(gl, renderer.bbox);

                //gl.drawArrays(gl.POINTS, 0, this.viewModel.dataPoints.length);
                gl.drawArrays(gl.TRIANGLES, 0, this.viewModel.dataPoints.length * (this.resolution));
            }

            private makeCircle(cx: number, cy: number, r: number, vertices: number[]) {
                let lastX: number, lastY: number;
                for (let i = 0; i <= this.resolution; i++) {
                    let t = i % this.resolution;
                    let x = cx + (r * this.circleTemplate[t * 2]);
                    let y = cy + (r * this.circleTemplate[t * 2 + 1]);

                    if (i > 0) {
                        vertices.push(cx, cy);
                        vertices.push(lastX, lastY);
                        vertices.push(x, y);
                    }

                    lastX = x;
                    lastY = y;
                }
            }

            private makeCircleTemplate(): number[] {
                let template = [];
                for (let i = 0; i < this.resolution; i++) {
                    let pct = i / this.resolution;
                    let theta = pct * Math.PI * 2;

                    template.push(Math.cos(theta), Math.sin(theta));
                }

                return template;
            }
        }

        class ScatterTextureWebGLRenderer {
            private viewModel: ScatterViewModel;

            private vertexShader: WebGL.DefaultVertexShader;
            private vertexBuffer: WebGLBuffer;
            private colorBuffer: WebGLBuffer;
            private texCoordBuffer: WebGLBuffer;
            private radiusBuffer: WebGLBuffer;
            private fragmentShader: WebGL.CircleFragmentShader;
            private program: WebGLProgram;
            private gl: WebGLRenderingContext;
            private renderer: MinimalWebGLRenderer;
            private canvas: HTMLCanvasElement;
            private canvasCtx: CanvasRenderingContext2D;
            private texture: WebGL.Texture;

            constructor(renderer: MinimalWebGLRenderer) {
                this.renderer = renderer;
                this.gl = renderer.getGL();

                this.vertexShader = new WebGL.DefaultVertexShader();
                this.fragmentShader = new WebGL.CircleFragmentShader();
                this.program = renderer.buildProgram(this.vertexShader, this.fragmentShader);

                let body = $('body');
                let canvasElement = $('<canvas>');
                body.append(canvasElement);
                this.canvas = <HTMLCanvasElement>canvasElement.get(0);
                this.canvasCtx = this.canvas.getContext('2d');
            }

            public render(viewModel: ScatterViewModel) {
                this.setViewModel(viewModel);
                this.draw();
            }

            public setViewModel(viewModel: ScatterViewModel) {
                this.viewModel = viewModel;
                let gl = this.gl;

                // TODO: will likely have to create a texture for each bubble, seems infeasible.

                let vertices = [];
                let texcoords = [];
                let colors = [];
                let radii = [];
                let vertexOffsets = [  // TODO: 0.5?
                    -1, 1,
                    1, 1,
                    1, -1,
                    -1, 1,
                    -1, -1,
                    1, -1];
                let texCycle = [
                    0, 1,
                    1, 1,
                    1, 0,
                    0, 1,
                    0, 0,
                    1, 0,
                ];

                for (let p of viewModel.dataPoints) {
                    let r = p.radius;
                    for (let i = 0; i < 6; i++) {
                        vertices.push(r * vertexOffsets[i * 2] + p.x, viewModel.boundingBox.height - (r * vertexOffsets[i * 2 + 1] + p.y));
                        texcoords.push(texCycle[i * 2], texCycle[i * 2 + 1]);
                        colors.push(p.fill.R / 255.0, p.fill.G / 255.0, p.fill.B / 255.0, p.alpha);
                        radii.push(r);
                    }
                }

                //gl.enable(gl.DEPTH_TEST);
                //gl.depthFunc(gl.LESS);  // TODO: might be the default...
                gl.enable(gl.BLEND);

                let texture = gl.createTexture();
                let textureUnit = 0;
                //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

                // TODO: maybe not necessary, always make canvas the max size rounded up to the next power of 2
                // make sure we can render it even if it's not a power of 2
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                this.texture = {
                    texture: texture,
                    unit: textureUnit,
                };

                // Buffers
                this.vertexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
                //(<any>this.vertexBuffer).itemSize = 2;

                this.colorBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
                //(<any>this.colorBuffer).itemSize = 4;

                this.texCoordBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

                this.radiusBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.radiusBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(radii), gl.STATIC_DRAW);
            }

            public draw() {
                let gl = this.gl;
                let renderer = this.renderer;

                gl.useProgram(this.program);  // TODO: check if it is already the last used program

                renderer.clear();

                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                // set buffers & attributes
                this.vertexShader.setAttributes(gl, this.vertexBuffer, this.colorBuffer, this.texCoordBuffer, this.radiusBuffer);

                // set uniforms
                this.vertexShader.setUniforms(gl, renderer.bbox);
                this.

                //gl.drawArrays(gl.POINTS, 0, this.viewModel.dataPoints.length);
                gl.drawArrays(gl.TRIANGLES, 0, this.viewModel.dataPoints.length * 6);
                //gl.drawElements(gl.TRIANGLES, this.viewModel.dataPoints.length * 2, gl.UNSIGNED_SHORT, 0);
            }
        }

        class ScatterPixiWebGLRenderer implements IRenderer {
            private renderer: PixiWebGLRenderer;

            constructor(renderer: PixiWebGLRenderer) {
                this.renderer = renderer;
            }

            public render(viewModel: ScatterViewModel) {
                let graphics = this.renderer.createGraphics();
                let bbox = viewModel.boundingBox;

                for (let point of viewModel.dataPoints) {
                    graphics.lineStyle(1, 0x0, 1);
                    graphics.beginFill(this.colorToNumber(point.fill), point.alpha);
                    graphics.drawCircle(
                        point.x,
                        point.y,
                        point.radius);
                    graphics.endFill();
                }

                graphics.beginFill(0x00ff00, 0.2);
                graphics.drawRect(bbox.left, bbox.top, bbox.width, bbox.height);
                graphics.endFill();

                this.renderer.render(graphics);
            }

            private colorToNumber(color: RgbColor): number {
                return ((color.R & 0xff) << 16) | ((color.G & 0xff) << 8) | (color.B & 0xff);
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

        interface IRenderer {
            render(viewMode: ScatterViewModel);
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
                y: bbox.top,
                x: bbox.left,
                "stroke-width": "1px",
                stroke: color,
                fill: jsCommon.color.rgbWithAlphaString(jsCommon.color.parseRgb(color), 0.2),
            });
        }

        export function drawCanvasRect(canvas: CanvasRenderingContext2D, bbox: BoundingBox, color: string, tag: string): void {
            canvas.lineWidth = 1;
            canvas.strokeStyle = color;
            canvas.strokeRect(bbox.left, bbox.top, bbox.width, bbox.height);

            canvas.fillStyle = jsCommon.color.rgbWithAlphaString(jsCommon.color.parseRgb(color), 0.2);
            canvas.fillRect(bbox.left, bbox.top, bbox.width, bbox.height);
        }
    }
}