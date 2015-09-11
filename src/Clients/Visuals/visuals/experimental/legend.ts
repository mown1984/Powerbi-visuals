module powerbi.visuals.experimental {

    export class LegendViewModel {
        boundingBox: BoundingBox;
    }

    export class LegendDataModel {
    }

    export class Legend implements IVisualComponent {
        public dataModel: LegendData;

        constructor(
            dataView: DataView,
            colorPalette: IDataColorPalette,
            formatString: string,
            defaultDataPointColor: string
            ) {

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

        public render(options: RenderOptions<LegendViewModel>) {
            let viewModel = options.viewModel;
            let bbox = viewModel.boundingBox;

            DebugHelper.drawRect(options.drawingSurface, bbox, "blue", "legend");
        }

        public layout(bbox: BoundingBox): LegendViewModel {
            return <LegendViewModel> {
                boundingBox: bbox,
            };
        }
    }

}