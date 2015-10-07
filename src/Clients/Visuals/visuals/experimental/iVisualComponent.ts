/// <reference path="../../_references.ts"/>

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
        layout(boundingBox: BoundingBox): SceneGraphNode;
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
        private rendererFactory: RendererFactory;

        constructor(root: IVisualComponent) {
            this.root = root;
        }

        public init(options: VisualInitOptions) {
            this.initOptions = options;

            this.root.init(options);

            this.rendererFactory = options.rendererFactory;
            this.setViewport(options.viewport);
        }

        public update(options: VisualUpdateOptions) {
            let dataView = options.dataViews[0];
            this.viewport = options.viewport;
            this.root.setData(dataView);
            this.draw(options.viewport);
        }

        private setViewport(viewport: IViewport): BoundingBox {
            let bbox: BoundingBox = {
                top: 0,
                left: 0,
                height: viewport.height,
                width: viewport.width,
            };

            this.rendererFactory.setViewport(bbox);

            return bbox;
        }

        private draw(viewport: IViewport) {
            let bbox = this.setViewport(viewport);

            let sceneGraph = this.root.layout(bbox);
            // Save scene graph for hit testing...

            // Render
            this.renderGraph(sceneGraph);

            //if (this.renderer.finish)
            //    this.renderer.finish();
        }

        private renderGraph(node: SceneGraphNode) {
            node.render();

            for (let child of node.children) {
                child.render();
            }
        }

        public onResizing(viewport: IViewport) {
            this.draw(viewport);
        }

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