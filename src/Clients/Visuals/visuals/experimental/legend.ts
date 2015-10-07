/// <reference path="../../_references.ts"/>

module powerbi.visuals.experimental {

    export class LegendViewModel {
        boundingBox: BoundingBox;
    }

    export class LegendDataModel {
    }

    export class Legend implements ILayoutable {
        public dataModel: LegendData;
        private renderer: IRenderer;

        public init(options: VisualInitOptions) {
            this.renderer = this.getRenderer(options.preferredRenderer, options.rendererFactory);
        }

        convert(
            dataView: DataView,
            colorPalette: IDataColorPalette,
            formatString: string,
            defaultDataPointColor: string
            ): void {

            let dataViewHelper = new DataViewHelper(dataView);

            let seriesColumns = dataViewHelper.seriesColumns;
            let colorHelper = new ColorHelper(colorPalette, scatterChartProps.dataPoint.fill, defaultDataPointColor);

            let legendItems: LegendDataPoint[] = [];
            for (let i = 0, len = seriesColumns.length; i < len; i++) {
                let seriesColumn = seriesColumns[i];

                let identity = new SelectionIdBuilder()
                    .withSeries(dataView.categorical.values, seriesColumns[i])
                    .createSelectionId();

                let color = colorHelper.getColorForSeriesValue(seriesColumn.objects, dataViewHelper.seriesIdentity, seriesColumn.name);

                legendItems.push({
                    color: color,
                    icon: LegendIcon.Circle,
                    label: valueFormatter.format(seriesColumn.name, formatString),
                    identity: identity,
                    selected: false
                });
            }

            this.dataModel = <LegendData> {
                dataPoints: legendItems,
                title: "Legend",
            };
        }

        public getPreferredBoundingBox(bbox: BoundingBox): BoundingBox {
            return <BoundingBox> {
                top: bbox.top,
                left: bbox.left,
                height: bbox.height,
                width: 80,
            };
        }

        public layout(bbox: BoundingBox): SceneGraphNode {
            let viewModel: LegendViewModel = {
                boundingBox: bbox,
            };

            let sceneNode = new SceneGraphNode();
            sceneNode.render = () => this.renderer.render(viewModel);

            return sceneNode;
        }

        private getRenderer(type: RendererType, factory: RendererFactory): IRenderer {
            // TODO: this pattern is going to occur all over the place
            switch (type) {
                case RendererType.Canvas:
                    return new LegendCanvasRenderer(<CanvasRenderer>factory.getRenderer(RendererType.Canvas));
                //case RendererType.SVG:
                default:
                    return new LegendSvgRenderer(<SvgRenderer>factory.getRenderer(RendererType.SVG));
                //case RendererType.WebGL:
                //    return new LegendMinimalWebGLRenderer(<MinimalWebGLRenderer>renderer);
                //case RendererType.TwoJS:
                //    return new LegendTwoWebGLRenderer(<TwoWebGLRenderer>renderer);
                //case RendererType.PIXI:
                //    return new LegendPixiWebGLRenderer(<PixiWebGLRenderer>renderer);
            }

            return null;
        }
    }

    interface IRenderer {
        render(viewModel: LegendViewModel);
    }

    class LegendSvgRenderer implements IRenderer {
        private renderer: SvgRenderer;

        constructor(renderer: SvgRenderer) {
            this.renderer = renderer;
        }

        public render(viewModel: LegendViewModel) {
            let bbox = viewModel.boundingBox;

            DebugHelper.drawSvgRect(this.renderer.getElement(), bbox, "#0000ff", "legend");
        }
    }

    class LegendCanvasRenderer implements IRenderer {
        private renderer: CanvasRenderer;

        constructor(renderer: CanvasRenderer) {
            this.renderer = renderer;
        }

        public render(viewModel: LegendViewModel) {
            let bbox = viewModel.boundingBox;
            let canvas = this.renderer.getCanvasContext();

            DebugHelper.drawCanvasRect(canvas, bbox, "#0000ff", "legend");
        }
    }

    //class LegendPixiWebGLRenderer implements IRenderer {
    //    private renderer: PixiWebGLRenderer;

    //    constructor(renderer: PixiWebGLRenderer) {
    //        this.renderer = renderer;
    //    }

    //    public render(viewModel: LegendViewModel) {
    //        let bbox = viewModel.boundingBox;
    //        let graphics = this.renderer.createGraphics();

    //        graphics.beginFill(0x0000ff, 1);
    //        graphics.drawRect(bbox.left, bbox.top, bbox.width, bbox.height);
    //        graphics.endFill();
    //    }
    //}

    //class LegendMinimalWebGLRenderer implements IRenderer {
    //    private renderer: MinimalWebGLRenderer;

    //    constructor(renderer: MinimalWebGLRenderer) {
    //        this.renderer = renderer;
    //    }

    //    public render(viewModel: LegendViewModel) {
    //    }
    //}

    //class LegendTwoWebGLRenderer implements IRenderer {
    //    private renderer: TwoWebGLRenderer;

    //    constructor(renderer: TwoWebGLRenderer) {
    //        this.renderer = renderer;
    //    }
        
    //    public render(viewModel: LegendViewModel) {
    //        let bbox = viewModel.boundingBox;
    //        let graphics = this.renderer.createGraphics();

    //        let rect = graphics.makeRectangle(bbox.left, bbox.top, bbox.width, bbox.height);
    //        rect.fill = "#0000ff";
    //        rect.opacity = 0.2;
    //        rect.noStroke();
    //    }
    //}
}