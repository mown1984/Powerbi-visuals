module powerbi.visuals.experimental {

    export class DataViewHelper {
        private dataView: DataView;
        private isCategorical: boolean;
        private _grouped: DataViewValueColumnGroup[];

        public get hasDynamicSeries(): boolean {
            return !!this.seriesSource;
        }

        public get categoryColumn(): DataViewCategoryColumn {
            return this.dataView.categorical.categories[0];
        }

        public get categoryValues(): any[] {
            return this.categoryColumn.values;
        }

        public get categoryObjects(): DataViewObjects[] {
            return this.categoryColumn.objects;
        }

        public get categoryType(): ValueType {
            return this.categoryColumn.source.type;
        }

        public get seriesColumns(): DataViewValueColumnGroup[] {
            if (this._grouped == null)
                this._grouped = this.dataView.categorical.values.grouped();

            return this._grouped;
        }

        // Only valid for Dynamic Series
        public get seriesSource(): DataViewMetadataColumn {
            return this.dataView.categorical.values.source;
        }

        // Only valid for Dynamic Series
        public get seriesIdentity(): data.SQExpr[] {
            // TODO: should identityFields be part of the "source"?
            return this.dataView.categorical.values.identityFields;
        }

        constructor(dataView: DataView) {
            this.dataView = dataView;
        }
    }
}