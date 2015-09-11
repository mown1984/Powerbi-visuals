module powerbi.visuals.experimental {

    export interface IVisualRenderer {
        type: RendererType;

        setViewport(bbox: BoundingBox): void;
    }

    export enum RendererType {
        SVG,
        Canvas,
    }

    export class SvgRenderer implements IVisualRenderer {
        private element: D3.Selection;

        public type: RendererType = RendererType.SVG;

        constructor(element: JQuery) {
            this.element = d3.select(element.get(0)).append('svg');
        }

        public setViewport(bbox: BoundingBox) {
            this.element.attr({
                width: bbox.width,
                height: bbox.height,
            });

            //this.element.style({
            //    position: "relative",
            //    top: bbox.top + "px",
            //    left: bbox.left + "px",
            //});
        }

        public getElement(): D3.Selection {
            return this.element;
        }
    }

    export class CanvasRenderer implements IVisualRenderer {
        private canvasElement: JQuery;
        private canvasContext: CanvasRenderingContext2D;

        public type: RendererType = RendererType.Canvas;

        constructor(element: JQuery) {
            this.canvasElement = $('<canvas>');
            element.append(this.canvasElement);
            
            let canvasNode = <HTMLCanvasElement>this.canvasElement.get(0);
            this.canvasContext = canvasNode.getContext('2d');
        }

        public setViewport(bbox: BoundingBox) {
            this.canvasElement.attr({
                width: bbox.width,
                height: bbox.height,
            });

            //this.canvasElement.css({
            //    position: "relative",
            //    top: bbox.top + "px",
            //    left: bbox.left + "px",
            //});
        }

        public getCanvasContext(): CanvasRenderingContext2D {
            return this.canvasContext;
        }
    }
}