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
    import SQExprBuilder = powerbi.data.SQExprBuilder;
    import ValueType = powerbi.ValueType;
    import DataViewMetadata = powerbi.DataViewMetadata;
    import DataViewMatrix = powerbi.DataViewMatrix;
    import data = powerbi.data;
    import DataView = powerbi.DataView;

    export class GanttData {

        public getDataView(): DataView {
            let titles = [
                "Apply for Permits",
                "Cabinets",
                "Carpet, Tile and Appliances",
                "Dry In",
                "Drywall",
                "Exterior Finishes",
                "Final Acceptance",
                "Finish Electrical",
                "Finish HVAC",
                "Finish Plumbing",
                "Foundation",
                "Framing",
                "Insulation",
                "Landscaping and Grounds Work",
                "Paint (Interior)",
                "Prepare Site",
                "Utility Rough-Ins"];

            let dataViewMetadata: DataViewMetadata = {
                columns: [
                    {
                        displayName: "Complete Percentage",
                        queryName: "Sum(Gantt.Complete Percentage)",
                        format: "0%",
                        roles: { Completion: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: "Duration",
                        queryName: "Sum(Gantt.Duration)",
                        format: undefined,
                        roles: { Duration: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: "Task",
                        queryName: "Gantt.Task",
                        format: undefined,
                        roles: { Task: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: "Start Date",
                        queryName: "Gantt.Start Date",
                        format: undefined,
                        roles: { StartDate: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    {
                        displayName: "Resource",
                        queryName: "Gantt.Resource",
                        format: undefined,
                        roles: { Resource: true },
                        type: ValueType.fromDescriptor({ text: true })
                    }
                ]
            };

            let rowGroupColumn = SQExprBuilder.fieldExpr({ column: { schema: undefined, entity: "ProjectSample-v011", name: "Task" } });

            let matrixChilds = [];
            for (var key in titles) {
                //Create a matrix->rows->root child object
                let matrixChildren = {
                    value: titles[key],
                    identity: data.createDataViewScopeIdentity(SQExprBuilder.equal(rowGroupColumn, SQExprBuilder.text(titles[key]))),
                    children: [
                        {
                            value: new Date(2015, 0, 1),
                            values: [
                                {
                                    //random value between 1 and 28
                                    value: Math.floor(Math.random() * 28) + 1
                                },
                                {
                                    //random value between 1 and 100
                                    value: Math.floor(Math.random() * 100) + 1
                                }
                            ]
                        }
                    ]
                };
                matrixChilds.push(matrixChildren);
            }

            let matrixColumns: DataViewMatrix = {
                rows: {
                    root: {
                        children: matrixChilds,
                    },
                    levels: [
                        { sources: [dataViewMetadata.columns[2]] },
                        { sources: [dataViewMetadata.columns[3]] },
                        { sources: [dataViewMetadata.columns[4]] }
                    ]
                },
                columns: {
                    root: {
                        children: [
                            { level: 0 },
                            { level: 0, levelSourceIndex: 1 }
                        ]
                    },
                    levels: [
                        { sources: [dataViewMetadata.columns[1], dataViewMetadata.columns[0]] }
                    ]
                },
                valueSources: [dataViewMetadata.columns[1], dataViewMetadata.columns[0]]
            };

            return {
                metadata: dataViewMetadata,
                matrix: matrixColumns
            };
        }
    }
}