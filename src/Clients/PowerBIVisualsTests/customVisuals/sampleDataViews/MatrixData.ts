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

/// <reference path="../../_references.ts"/>

module powerbitests.customVisuals.sampleDataViews {
    import DataView = powerbi.DataView;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import SQExprBuilder = powerbi.data.SQExprBuilder;
    import DataViewMatrix = powerbi.DataViewMatrix;
    import data = powerbi.data;
    import DataViewMetadata = powerbi.DataViewMetadata;
    import DataViewMatrixNode = powerbi.DataViewMatrixNode;
    import DataViewTreeNode = powerbi.DataViewTreeNode;
    import SQExpr = powerbi.data.SQExpr;

    export class MatrixData {

         public static getCountOfMatrixRootColumns(root: DataViewMatrixNode): number {
            if (!root || !root.children || !root.children.length){ 
                return 0;
            }

            function getChildrenCount(treeNode: DataViewTreeNode): number {
                return (!treeNode.children || !treeNode.children.length) 
                    ? 1 
                    : treeNode.children.map(getChildrenCount).reduce((a,b) => a + b) + 1;
            }

            return root.children.map(getChildrenCount).reduce((a,b) => a + b);
        }

        private convertMatrixDataToRoot(data) {
            let rowGroupSource1: SQExpr = SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "t", name: "rowgroup1" } });
            let rowGroupSource2: SQExpr = SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "t", name: "rowgroup2" } });
            let rowGroupSource3: SQExpr = SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "t", name: "rowgroup3" } });
            
            let root = $.extend(true, {}, data);
            for (let firstLevelKey in root.children) {
            let firstLevel = root.children[firstLevelKey];

                for (let secondLevelKey in firstLevel.children) {
                    let secondLevel = firstLevel.children[secondLevelKey];

                    for (let thirdLevelKey in secondLevel.children) {
                        let thridLevel = secondLevel.children[thirdLevelKey];

                        secondLevel.children[thirdLevelKey] =  this.getDataViewTreeNode(secondLevel, rowGroupSource3);
                        secondLevel.children[thirdLevelKey].values = thridLevel.values.map((x, i) => <any>{ value: x, valueSourceIndex: i });
                    }

                    firstLevel.children[secondLevelKey] = this.getDataViewTreeNode(secondLevel, rowGroupSource2);
                    firstLevel.children[secondLevelKey].children = secondLevel.children;
                    firstLevel.children[secondLevelKey].childIdentityFields = [rowGroupSource3];
                }

                root.children[firstLevelKey] = this.getDataViewTreeNode(firstLevel, rowGroupSource1);
                root.children[firstLevelKey].children = firstLevel.children;
                root.children[firstLevelKey].childIdentityFields = [rowGroupSource2];
            }

            root.childIdentityFields = [rowGroupSource1];
            return root;
        }

        private getDataViewTreeNode(node: any, rowGroupSource: SQExpr): DataViewTreeNode {
            return <DataViewTreeNode> {
                    value: node.value,
                    identity: data.createDataViewScopeIdentity(SQExprBuilder.equal(rowGroupSource, SQExprBuilder.text(node.value)))
                };
        }

        public getDataView(): DataView {
            let dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
            let dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);

            let dataViewMetadata: DataViewMetadata = {
                columns: [
                    {
                        displayName: 'measure1',
                        type: dataTypeNumber,
                        isMeasure: true,
                        index: 3,
                        objects: {
                             general: { formatString: '#.0' }
                        }
                    },
                    {
                        displayName: 'measure2',
                        type: dataTypeNumber,
                        isMeasure: true,
                        index: 4,
                        objects: {
                             general: { formatString: '#.00' }
                        }
                    },
                    {
                        displayName: 'measure3',
                        type: dataTypeNumber,
                        isMeasure: true,
                        index: 5,
                        objects: {
                             general: { formatString: '#' }
                        }
                    },
                    {
                        displayName: 'RowGroup1',
                        queryName: 'RowGroup1',
                        type: dataTypeString,
                        index: 0
                    },
                    {
                        displayName: 'RowGroup2',
                        queryName: 'RowGroup2',
                        type: dataTypeString,
                        index: 1
                    },
                    {
                        displayName: 'RowGroup3',
                        queryName: 'RowGroup3',
                        type: dataTypeString,
                        index: 2
                    }
                ]
            };

            let data = {
                children: [
                {
                    value: 'North America',
                    children: [
                        {
                            value: 'Canada',
                            children: [
                                { value: 'Ontario', values: [1000, 1001, 1002] },
                                { value: 'Quebec', values: [1010, 1011, 1012] }
                            ]
                        },
                        {
                            value: 'USA',
                            children: [
                                { value: 'Washington', values: [1100, 1101, 1102] },
                                { value: 'Oregon', values: [1110, 1111, 1112] }
                            ]
                        }
                    ]
                },
                {
                    value: 'South America',
                    children: [
                        {
                            value: 'Brazil',
                            children: [
                                { value: 'Amazonas', values: [2000, 2001, 2002] },
                                { value: 'Mato Grosso', values: [2010, 2011, 2012] }
                            ]
                        },
                        {
                            value: 'Chile',
                            children: [
                                { value: 'Arica', values: [2100, 2101, 2102] },
                                { value: 'Parinacota', values: [2110, 2111, 2112] }
                            ]
                        }
                    ]
                }]
            };

            var matrixThreeMeasuresThreeRowGroups: DataViewMatrix = {
                rows: {
                    root: this.convertMatrixDataToRoot(data),
                    levels: [
                        { sources: [dataViewMetadata[0]] },
                        { sources: [dataViewMetadata[1]] },
                        { sources: [dataViewMetadata[2]] }
                    ]
                },
                columns: {
                    root: {
                        children: [
                            { level: 0 },
                            { level: 0, levelSourceIndex: 1 },
                            { level: 0, levelSourceIndex: 2 }
                        ]
                    },
                    levels: [{
                        sources: [
                            dataViewMetadata[0],
                            dataViewMetadata[1],
                            dataViewMetadata[2]
                        ]
                    }]
                },
                valueSources: [
                    dataViewMetadata[0],
                    dataViewMetadata[1],
                    dataViewMetadata[2]
                ]
            };

            return {
                metadata: {
                    columns: [
                        dataViewMetadata[3],
                        dataViewMetadata[4],
                        dataViewMetadata[5]
                    ], segment: {}
                },
                matrix: matrixThreeMeasuresThreeRowGroups
            };
        }
    }
}