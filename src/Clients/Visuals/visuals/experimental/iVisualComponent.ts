module powerbi.visuals.experimental {

    export interface BoundingBox {
        top: number;
        left: number;
        width: number;
        height: number;
    }

    export interface IVisualComponent {
        getPreferredBoundingBox(bbox: BoundingBox): BoundingBox;
    }

    export interface RenderOptions<T> {
        viewModel: T;
        drawingSurface: D3.Selection;
    }
}