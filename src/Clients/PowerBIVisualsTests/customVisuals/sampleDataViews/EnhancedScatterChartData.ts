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
    import ValueType = powerbi.ValueType;

    export class EnhancedScatterChartData extends DataViewBuilder {
        public static ColumnCategory: string = "Date";
        public static ColumnSeries: string = "Country";
        public static ColumnX: string = "X";
        public static ColumnY: string = "Y";
        public static ColumnSize: string = "Size";

        public valuesCategory: Date[] = helpers.getDateYearRange(new Date(2016, 0, 1), new Date(2019, 0, 10), 1);
        public valuesSeries: string[] = ["Canada", "United States", "Russia"];
        public valuesX: number[] = helpers.getRandomUniqueNumbers(this.valuesCategory.length, 100, 1000);
        public valuesY: number[] = helpers.getRandomUniqueNumbers(this.valuesCategory.length, 100, 1000);
        public valuesSize: number[] = helpers.getRandomUniqueNumbers(this.valuesCategory.length, 10, 20);

        public getDataView(columnNames?: string[]): powerbi.DataView {
            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: EnhancedScatterChartData.ColumnCategory,
                        roles: { Category: true },
                        type: ValueType.fromDescriptor({ dateTime: true })
                    },
                    values: this.valuesCategory
                },
                {
                    isGroup: true,
                    source: { 
                        displayName: EnhancedScatterChartData.ColumnSeries,
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    values: this.valuesSeries,
                }
                ],[
                {
                    source: {
                        displayName: EnhancedScatterChartData.ColumnX,
                        format: '#,0.00',
                        isMeasure: true,
                        roles: { 'X': true },
                    },
                    values: this.valuesX
                },
                {
                    source: {
                        displayName: EnhancedScatterChartData.ColumnY,
                        format: '#,0',
                        isMeasure: true,
                        roles: { 'Y': true },
                    },
                    values: this.valuesY
                },
                {
                    source: {
                        displayName: EnhancedScatterChartData.ColumnSize,
                        format: '#,0',
                        isMeasure: true,
                        roles: { 'Size': true },
                    },
                    values: this.valuesSize
                }], columnNames).build();
        }
    }
}