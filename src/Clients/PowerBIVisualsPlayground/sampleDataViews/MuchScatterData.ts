/*
*  Power BI Visualizations
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved. 
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*   
*  The above copyright notice and this permission notice shall be included in 
*  all copies or substantial portions of the Software.
*   
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/

/// <reference path="../_references.ts"/>

module powerbi.visuals.sampleDataViews {
    import DataViewTransform = powerbi.data.DataViewTransform;

    export class MuchScatterData extends SampleDataViews implements ISampleDataViewsMethods {

        public name: string = "MuchScatterData";
        public displayName: string = "Much Scatter Data";

        public visuals: string[] = ['scatterChart'];

        private sampleData: number[][];

        private ranges: NumberRange[] = [
            {  // X
                min: 100,
                max: 1000,
            }, {  // Y
                min: 32345,
                max: 65234634,
            }, {  // Size
                min: 2,
                max: 235,
            }];

        private categoryCount: number = 3000;

        constructor() {
            super();
            this.randomize();
        }
        
        public getDataViews(): DataView[] {

            var fieldExpr = powerbi.data.SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "table1", name: "country" } });

            var categoryValues = _.map(_.range(0, this.categoryCount), (n) => n.toString());

            var categoryIdentities = categoryValues.map(function (value) {
                var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                return powerbi.data.createDataViewScopeIdentity(expr);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Category',
                        queryName: 'Category',
                        type: powerbi.ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: 'X',
                        isMeasure: true,
                        format: "g",
                        queryName: 'select0',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        //objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                    },
                    {
                        displayName: 'Y',
                        isMeasure: true,
                        format: "g",
                        queryName: 'select1',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true })
                    },
                    {
                        displayName: 'Size',
                        isMeasure: true,
                        format: "g",
                        queryName: 'select2',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true })
                    }
                ]
            };

            var columns = [
                {
                    source: dataViewMetadata.columns[1],
                    values: this.sampleData[0],
                },
                {
                    source: dataViewMetadata.columns[2],
                    values: this.sampleData[1],
                },
                {
                    source: dataViewMetadata.columns[3],
                    values: this.sampleData[2],
                }
            ];

            var dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);

            return [{
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: categoryValues,
                        identity: categoryIdentities,
                    }],
                    values: dataValues
                },
            }];
        }

        public randomize(): void {
            this.sampleData = [];
            for (let i of [0, 1, 2]) {
                this.sampleData[i] = [];
                for (let c = 0; c < this.categoryCount; c++) {
                    this.sampleData[i][c] = _.random(this.ranges[i].min, this.ranges[i].max);
                }
            }
        }

    }
}