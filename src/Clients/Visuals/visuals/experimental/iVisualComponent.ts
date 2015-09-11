module powerbi.visuals.experimental {

    export class SceneGraphNode {
        public children: SceneGraphNode[];

        public render: () => void;

        constructor(children: SceneGraphNode[] = []) {
            this.children = children;
        }

        public add(node: SceneGraphNode): void {
            this.children.push(node);
        }

        public hitTest(coordinates: Point): HitTestResult {
            return {};
        }
    }

    export interface HitTestResult {
    }

    export interface BoundingBox {
        top: number;
        left: number;
        width: number;
        height: number;
    }

    export interface IVisualComponent {
        init(options: VisualInitOptions): void;
        setData(dataView: DataView): void;
        layout(boundingBox: BoundingBox, renderer: IVisualRenderer): SceneGraphNode;
        //render(): SceneGraphNode;
    }

	export interface ILayoutable {
        getPreferredBoundingBox(bbox: BoundingBox): BoundingBox;
    }

    export interface RenderOptions<T> {
        viewModel: T;
        //drawingSurface: D3.Selection;
        //renderer: IVisualRenderer;
    }
    
    export class BasicVisual implements IVisual {
        private root: IVisualComponent;
        private initOptions: VisualInitOptions;
        private viewport: IViewport;
        private renderer: IVisualRenderer;

        constructor(root: IVisualComponent) {
            this.root = root;
        }

        public init(options: VisualInitOptions) {
            this.initOptions = options;

            this.root.init(options);

            this.renderer = new SvgRenderer(this.initOptions.element);
            //this.renderer = new CanvasRenderer(this.initOptions.element);
        }

        public update(options: VisualUpdateOptions) {
            let dataView = options.dataViews[0];

            this.viewport = options.viewport;

            this.root.setData(dataView);

            let bbox: BoundingBox = {
                top: 0,
                left: 0,
                height: options.viewport.height,
                width: options.viewport.width,
            };
            this.renderer.setViewport(bbox);

            let sceneGraph = this.root.layout(bbox, this.renderer);
            // Save scene graph for hit testing...

            // Render
            this.renderGraph(sceneGraph);
        }

        private renderGraph(node: SceneGraphNode) {
            node.render();

            for (let child of node.children) {
                child.render();
            }
        }

        public onResizing(viewport: IViewport) { /*NOT NEEDED*/ }

        public onDataChanged(options: VisualDataChangedOptions) {
            this.update(<VisualUpdateOptions> {
                dataViews: options.dataViews,
                suppressAnimations: options.suppressAnimations,
                viewport: this.viewport,
            });
        }

        public destroy() { }
    }
}