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
    import DataViewTransform = powerbi.data.DataViewTransform;

    export class GanttData {

        public name: string = "GanttData";
        public displayName: string = "Gantt Data";

        public visuals: string[] = ['gantt'];

        private sampleData = [
            ["Spec", "MOLAP connectivity", "1/10/2016", 10, "Mey", 0.95],
            ["Design", "Clickthrough", "12/22/2015", 3, "John", 1],
            ["Dev", "Tech design", "1/20/2016", 20, "JohnV", 0.5],
            ["Dev", "Front End dev", "1/1/2016", 10, "Sheng", 0.1],
            ["Dev", "Connection", "1/15/2016", 3, "Gentiana", 1],
            ["Dev", "Query Pipeline", "12/20/2015", 20, "Just", 0.05],
            ["Spec", "Gateway", "1/11/2016", 20, "Darshan", 0.1],
            ["Spec", "EGW", "1/16/2016", 5, "Mini", 0.25],
            ["Dev", "Development", "1/20/2016", 40, "Shay", 0.05],
            ["Dev", "Desktop", "1/10/2016", 1, "Ehren", 0.1],
            ["Dev", "Service Fixup", "1/9/2016", 3, "James", 0.99],
            ["Dev", "BugFixing", "1/4/2016", 20, "Matt", 0],
            ["Design", "Clickthrough", "12/22/2015", 3, "John", 1],
            ["Dev", "Tech design", "1/20/2016", 20, "JohnV", 0.5],
            ["Dev", "Front End dev", "1/1/2016", 10, "Sheng", 0.1],
            ["Dev", "Connection", "1/15/2016", 3, "Gentiana", 1],
            ["Dev", "Query Pipeline", "12/20/2015", 20, "Just", 0.05],
            ["Spec", "Gateway", "1/11/2016", 20, "Darshan", 0.1],
            ["Spec", "EGW", "1/16/2016", 5, "Mini", 0.25],
            ["Dev", "Development", "1/20/2016", 40, "Shay", 0.05],
            ["Dev", "Desktop", "1/10/2016", 1, "Ehren", 0.1],
            ["Dev", "Service Fixup", "1/9/2016", 3, "James", 0.99],
            ["Dev", "BugFixing", "1/4/2016", 20, "Matt", 0],
            ["Dev", "Connection", "1/15/2016", 3, "Gentiana", 1],
            ["Dev", "Query Pipeline", "12/20/2015", 20, "Just", 0.05],
            ["Spec", "Gateway", "1/11/2016", 20, "Darshan", 0.1],
            ["Spec", "EGW", "1/16/2016", 5, "Mini", 0.25],
            ["Dev", "Development", "1/20/2017", 40, "Shay", 0.05],
            ["Dev", "Desktop", "1/10/2017", 1, "Ehren", 0.1],
            ["Dev", "Service Fixup", "1/9/2017", 3, "James", 0.99],
            ["Dev", "BugFixing", "1/4/2017", 20, "Last Name", 0],
        ];

        public getDataViews(): powerbi.DataView[] {

            var fieldExpr = powerbi.data.SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "table1", name: "country" } });

            var categoryValues = ["Type", "Task", "StartDate", "Duration", "Resource", "Completion"];
            var categoryIdentities = categoryValues.map(function (value) {
                var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                return powerbi.data.createDataViewScopeIdentity(expr);
            });
        
            // Metadata, describes the data columns, and provides the visual with hints
            // so it can decide how to best represent the data
            var dataViewMetadata: powerbi.DataViewMetadata = {
                columns: [
                    {
                        displayName: 'Type',
                        queryName: 'Type',
                        type: powerbi.ValueType.fromDescriptor({ text: true }),
                        roles: { 'Type': true }
                    },
                    {
                        displayName: 'Task',
                        queryName: 'Task',
                        type: powerbi.ValueType.fromDescriptor({ text: true }),
                        roles: { 'Task': true }
                    },
                    {
                        displayName: 'Start Date',
                        queryName: 'StartDate',
                        type: powerbi.ValueType.fromDescriptor({ dateTime: true }),
                        roles: { 'StartDate': true }
                    },
                    {
                        displayName: 'Duration',
                        queryName: 'Duration',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        roles: { 'Duration': true }
                    },
                    {
                        displayName: 'Resource',
                        queryName: 'Resource',
                        type: powerbi.ValueType.fromDescriptor({ text: true }),
                        roles: { 'Resource': true }
                    },
                    {
                        displayName: 'Complete Precntege',
                        queryName: 'CompletePrecntege',
                        type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        roles: { 'Completion': true }
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
                },
                {
                    source: dataViewMetadata.columns[4],
                    values: this.sampleData[3],
                },
                {
                    source: dataViewMetadata.columns[5],
                    values: this.sampleData[4],
                }
            ];

            var dataValues: powerbi.DataViewValueColumns = DataViewTransform.createValueColumns(columns);
            var tableDataValues = this.sampleData;

            return [{
                metadata: dataViewMetadata,
                categorical: {
                    categories: [{
                        source: dataViewMetadata.columns[1],
                        values: categoryValues,
                        identity: categoryIdentities,
                    }],
                    values: dataValues
                },
                table: {
                    rows: tableDataValues,
                    columns: dataViewMetadata.columns,
                }
            }];
        }

        public randomize(): void {
        }
    }
}