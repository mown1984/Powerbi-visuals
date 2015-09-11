module powerbi.visuals.experimental {

    export class AxesViewModel {
    }

    export interface AxisDataModel {
        /** the data domain. [min, max] for a scalar axis, or [1...n] index array for ordinal */
        dataDomain: number[];
        /** the DataViewMetadataColumn will be used for dataType and tick value formatting */
        metaDataColumn: DataViewMetadataColumn;
        /** identifies the property for the format string */
        formatStringProp: DataViewObjectPropertyIdentifier;
        /** if true and the dataType is numeric or dateTime, create a linear axis, else create an ordinal axis */
        isScalar?: boolean;
    };

    export class Domain {
        public min: number;
        public max: number;
        
        constructor(min: number = 0, max: number = 0) {
            this.setDomain(min, max);
        }

        public setDomain(min: number = 0, max: number = 0): void {
            this.min = min;
            this.max = max;
        }

        public static createFromValues(values: number[]): Domain {
            let min = d3.min(values);
            let max = d3.max(values);
            return new Domain(min, max);
        }

        public static createFromNestedValues<TOuter>(values: TOuter[], unpack: (p: TOuter) => number[]): Domain {
            let min = d3.min(values, (v) => d3.min(unpack(v)));
            let max = d3.max(values, (v) => d3.max(unpack(v)));
            return new Domain(min, max);
        }

        public static createOrdinal(count: number): Domain {
            return new Domain(0, count);
        }
    }

    export class CartesianAxes implements ILayoutable {
        private dataModels: AxisDataModel[];
        private isXScalar: boolean;
        private categoryDomain: Domain;

        public xScale: D3.Scale.GenericScale<any>;
        public yScale: D3.Scale.GenericScale<any>;

        // TODO: should axes use the data view to compute domain, etc.
        // Or, should it use the data model for the visual? I think the latter.

        public convert(dataView: DataView): void {
            let dataViewHelper = new DataViewHelper(dataView);

            // TODO: using first category value only
            let categoryValues = dataViewHelper.categoryValues;
            let categoryType = dataViewHelper.categoryType;

            this.isXScalar = powerbi.visuals.AxisHelper.isOrdinal(categoryType);

            //let categoryMetadata = dataView.categorical.values[0].source;
            // TODO: first series source is not always right (multi-measure case)
            //let values = dataView.categorical.values;
            //let valueMetadata = dataView.categorical.values[0].source;

            this.categoryDomain = this.isXScalar
                ? Domain.createFromValues(categoryValues)
                : Domain.createOrdinal(categoryValues.length);

            //let valueDomain: Domain = Domain.createFromNestedValues(values, (v) => v.values);

            //let categoryAxisDataModel: AxisDataModel = {
            //    dataDomain: categoryDataDomain,
            //    metaDataColumn: categoryMetadata,
            //    formatStringProp: { objectName: 'general', propertyName: 'formatString' }, //TODO: this should be from capabilities
            //    isScalar: isScalar,
            //};

            //let valueAxisDataModel: AxisDataModel = {
            //    dataDomain: valueDataDomain,
            //    metaDataColumn: valueMetadata,
            //    formatStringProp: { objectName: 'general', propertyName: 'formatString' }, //TODO: this should be from capabilities
            //    isScalar
            //};

            //this.dataModels = [categoryAxisDataModel, valueAxisDataModel];
        }

        public getPreferredBoundingBox(bbox: BoundingBox): BoundingBox {
            return <BoundingBox> {
                top: bbox.top,
                left: bbox.left,
                height: bbox.height,
                width: bbox.width,
            };
        }

        public layout(bbox: BoundingBox, xDomain: Domain, yDomain: Domain, renderer: IVisualRenderer): SceneGraphNode {
            let node = new SceneGraphNode();

            node.render = () => { };

            // TODO: padding/margins?
            // TODO: should range be in absolute pixels or relative? depends on how we use the scale I think.
            this.xScale = d3.scale.linear()
                .range([0, bbox.width])
                .domain([xDomain.min, xDomain.max]);

            this.yScale = d3.scale.linear()
                .range([0, bbox.height])
                .domain([yDomain.min, yDomain.max]);

            return node;
        }

        public layoutAxes(boundingBox: BoundingBox): IAxisProperties[] {
            let models = this.dataModels;

            // TODO: not all optionals are set, e.g. getValuefn
            let categoryOptions: CreateAxisOptions = {
                pixelSpan: boundingBox.width,
                dataDomain: models[0].dataDomain,
                metaDataColumn: models[0].metaDataColumn,
                formatStringProp: models[0].formatStringProp,
                outerPadding: 0, //TODO
                isCategoryAxis: true,
                isScalar: models[0].isScalar,
                isVertical: false,
                useTickIntervalForDisplayUnits: models[0].isScalar,
            };
            let valueOptions: CreateAxisOptions = {
                pixelSpan: boundingBox.width,
                dataDomain: models[1].dataDomain,
                metaDataColumn: models[1].metaDataColumn,
                formatStringProp: models[1].formatStringProp,
                outerPadding: 0, //TODO
                isCategoryAxis: false,
                isScalar: models[1].isScalar,
                isVertical: true,
                useTickIntervalForDisplayUnits: true,
            };

            let catAxisProps = powerbi.visuals.AxisHelper.createAxis(categoryOptions);
            let valueAxisProps = powerbi.visuals.AxisHelper.createAxis(valueOptions);

            return [catAxisProps, valueAxisProps];
        }

        public render(options: RenderOptions<AxesViewModel>) {
            //options.xAxisGraphicsElement.call(options.axes.x.axis);
            // ...
        }
    }
}