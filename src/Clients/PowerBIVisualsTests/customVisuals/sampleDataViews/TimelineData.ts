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

module powerbitests.customVisuals.sampleDataViews {
    import DataView = powerbi.DataView;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import DataViewMetadata = powerbi.DataViewMetadata;
    import SQExprBuilder = powerbi.data.SQExprBuilder;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;

    export class TimelineData {
        public getDataView(): DataView {
            let rows = [
                ['01.01.2014'],
                ['02.01.2014'],
                ['03.01.2014'],
                ['04.01.2014'],
                ['05.01.2014'],
                ['06.01.2014'],
                ['07.01.2014'],
                ['08.01.2014'],
                ['09.01.2014'],
                ['10.01.2014']
            ];
            let categoryValues = rows.map(function (value) {
                let arr = value[0].split('.');
                return (new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]))); // months in JavaScript start with 0
            });
            let dataViewMetadata: DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Order Date',
                        queryName: 'Order Date',
                        type: powerbi.ValueType.fromDescriptor({ dateTime: true })
                    }
                ]
            };
            let fieldExpr = SQExprBuilder.fieldExpr({ column: { schema: 's', entity: 'e', name: 'Order Date' } });
			let dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.DateTime);
            let groupSource1: DataViewMetadataColumn = { displayName: 'group1', type: dataTypeString, index: 0 };
			let tree: powerbi.DataViewTree = {
				root: {
					childIdentityFields: [{ ref: "Order Date" }]
				}
			};
            return {
                metadata: { columns: [groupSource1] },
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[0],
                        values: categoryValues,
                        identityFields: [fieldExpr],
                        objects: [
                            {
                                dataPoint: {
                                    fill: {
                                        solid: {
                                            color: 'rgb(165, 172, 175)'
                                        }
                                    }
                                }
                            },
                            {
                                dataPoint: {
                                    fill: {
                                        solid: {
                                            color: 'rgb(175, 30, 44)'
                                        }
                                    }
                                }
                            },
                        ]
                    }]
                },
                table: {
                    columns: [groupSource1],
                    rows: []
                },
				tree: tree
            };
        }
    }
}
