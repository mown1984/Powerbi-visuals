module powerbi.visuals.experimental {

    export class LegendViewModel {
        boundingBox: BoundingBox;
    }

    export class LegendDataModel {
    }

    export class Legend implements ILayoutable {
        public dataModel: LegendData;

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

        public layout(bbox: BoundingBox, renderer: IVisualRenderer): SceneGraphNode {
            let viewModel: LegendViewModel = {
                boundingBox: bbox,
            };

            let sceneNode = new SceneGraphNode();
            sceneNode.render = this.getRenderMethod(viewModel, renderer);

            return sceneNode;
        }

        private getRenderMethod(viewModel: LegendViewModel, renderer: IVisualRenderer) {
            // TODO: this pattern is going to occur all over the place
            switch (renderer.type) {
                case RendererType.SVG:
                    return () => new LegendSvgRenderer(viewModel).render(<SvgRenderer>renderer);
                case RendererType.Canvas:
                    return () => new LegendCanvasRenderer(viewModel).render(<CanvasRenderer>renderer);
            }

            return null;
        }
    }

    class LegendSvgRenderer {
        private viewModel: LegendViewModel;

        constructor(viewModel: LegendViewModel) {
            this.viewModel = viewModel;
        }

        public render(renderer: SvgRenderer) {
            let bbox = this.viewModel.boundingBox;

            DebugHelper.drawSvgRect(renderer.getElement(), bbox, "blue", "legend");
        }
    }

    class LegendCanvasRenderer {
        private viewModel: LegendViewModel;

        constructor(viewModel: LegendViewModel) {
            this.viewModel = viewModel;
        }

        public render(renderer: CanvasRenderer) {
            let bbox = this.viewModel.boundingBox;
            let canvas = renderer.getCanvasContext();

            DebugHelper.drawCanvasRect(canvas, bbox, "blue", "legend");
        }
    }
}