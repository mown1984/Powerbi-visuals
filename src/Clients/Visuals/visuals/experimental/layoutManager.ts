module powerbi.visuals.experimental {

    export class SceneGraphNode {
        public children: SceneGraphNode[];

        constructor(children: SceneGraphNode[] = []) {
            this.children = children;
        }
    }

    export enum DockPosition {
        Top,
        Left,
        Bottom,
        Right,
        Fill,
    }

    module LayoutHelper {
        export function BoxDiff(box1: BoundingBox, box2: BoundingBox): BoundingBox {
            // box1 - box2
            return box1;
        }
    }

    export class DockLayoutManager {
        private parentBoundingBox: BoundingBox;
        private bbox: BoundingBox;

        constructor(bbox: BoundingBox) {
            this.bbox = _.clone(bbox);
            this.parentBoundingBox = bbox;
        }

        public measure<TDataModel>(component: IVisualComponent, position: DockPosition): BoundingBox {
            let bbox = component.getPreferredBoundingBox(this.bbox);

            // Calculate remaining space
            switch (position) {
                case DockPosition.Top:
                    break;
                case DockPosition.Left:
                    this.bbox.left += bbox.width;
                    this.bbox.width -= bbox.width;
                    break;
                case DockPosition.Bottom:
                    break;
                case DockPosition.Right:
                    break;
                case DockPosition.Fill:
                    this.bbox.height = 0;
                    this.bbox.width = 0;
                    break;
            };

            return bbox;
        }

        public arrange(): void {

        }
    }
}