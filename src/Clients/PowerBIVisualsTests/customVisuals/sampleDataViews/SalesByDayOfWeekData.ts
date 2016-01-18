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
    export function salesByDayOfWeekData(): powerbi.DataView {
        var fieldExpr = powerbi.data.SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "table1", name: "day of week" } });

        var categoryValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var categoryIdentities = categoryValues.map(function (value) {
            var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
            return powerbi.data.createDataViewScopeIdentity(expr);
        });
        var dataViewMetadata: powerbi.DataViewMetadata = {
            columns: [
                {
                    displayName: 'Day',
                    queryName: 'Day',
                    type: powerbi.ValueType.fromDescriptor({ text: true })
                },
                {
                    displayName: 'Previous week sales',
                    isMeasure: true,
                    format: "$0,000.00",
                    queryName: 'sales1',
                    type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                    objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                },
                {
                    displayName: 'This week sales',
                    isMeasure: true,
                    format: "$0,000.00",
                    queryName: 'sales2',
                    type: powerbi.ValueType.fromDescriptor({ numeric: true })
                }
            ]
        };

        var columns = [
            {
                source: dataViewMetadata.columns[1],
                // Sales Amount for 2014
                values: [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34, 570921.34],
            },
            {
                source: dataViewMetadata.columns[2],
                // Sales Amount for 2015
                values: [123455.43, 40566.43, 200457.78, 5000.49, 320000.57, 450000.34, 140832.67],
            }
        ];

        var dataValues: powerbi.DataViewValueColumns = powerbi.data.DataViewTransform.createValueColumns(columns);
        var tableDataValues = categoryValues.map(function (dayName, idx) {
            return [dayName, columns[0].values[idx], columns[1].values[idx]];
        });

        return {
            metadata: dataViewMetadata,
            categorical: {
                categories: [{
                    source: dataViewMetadata.columns[0],
                    values: categoryValues,
                    identity: categoryIdentities,
                }],
                values: dataValues
            },
            table: {
                rows: tableDataValues,
                columns: dataViewMetadata.columns,
            }
        };
    }
}