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
    import DataView = powerbi.DataView;
    import DataViewMetadata = powerbi.DataViewMetadata;
    import ValueType = powerbi.ValueType;
    import DataViewTransform = powerbi.data.DataViewTransform;
    import DataViewValueColumns = powerbi.DataViewValueColumns;
    import DataViewValueColumn = powerbi.DataViewValueColumn;

    export class PulseChartData {
        static ValuesCount = 100;

        public getDataView(): DataView {
            let dataViewMetadata: DataViewMetadata = {
                    columns: [{
                        displayName: 'Timestamp',
                        queryName: 'Timestamp',
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { Timestamp: true }
                    },
                    {
                        displayName: 'Value',
                        queryName: 'Value',
                        type: ValueType.fromDescriptor({ integer: true }),
                        roles: { Value: true }
                    }]
                };

            let columns: DataViewValueColumn[] = [{
                    source: dataViewMetadata.columns[1],
                    values: helpers.generateNumbers(PulseChartData.ValuesCount)
                }];

            let categoryValues = helpers.generateDates(PulseChartData.ValuesCount, new Date(2014,0,1), new Date(2015,5,10));

            let dataValues: DataViewValueColumns = DataViewTransform.createValueColumns(columns);
            let fieldExpr = SQExprBuilder.fieldExpr({ column: { schema: 's', entity: "table1", name: "names" } });
            let categoryIdentities = categoryValues.map((value) =>
                powerbi.data.createDataViewScopeIdentity(SQExprBuilder.equal(fieldExpr, SQExprBuilder.dateTime(value))));

            return {
                   metadata: dataViewMetadata,
                   categorical: {
                       categories: [{
                            source: dataViewMetadata.columns[0],
                            values: categoryValues,
                            identity: categoryIdentities
                        }],
                        values: dataValues
                    }
               };
        }
    }
}
