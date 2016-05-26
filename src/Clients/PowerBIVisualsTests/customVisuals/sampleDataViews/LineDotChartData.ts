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
    import getRandomUniqueSortedDates = helpers.getRandomUniqueSortedDates;
    import getRandomNumbers = helpers.getRandomNumbers;
    import ValueType = powerbi.ValueType;

    export class LineDotChartData extends DataViewBuilder {
        private static CountOfValues: number = 50;

        private static MinDate: Date = new Date(2014, 9, 12, 3, 9, 50);
        private static MaxDate: Date = new Date(2016, 3, 1, 2, 43, 3);

        private static MinValue: number = 0;
        private static MaxValue: number = 5361;

        public static create(): LineDotChartData {
            return new LineDotChartData();
        }

        public getDataView(): DataView {
            return this.createCategoricalDataViewBuilder([{
                source: {
                    displayName: "Updated Date",
                    type: ValueType.fromDescriptor({ dateTime: true }),
                    roles: { Date: true }
                },
                values: getRandomUniqueSortedDates(
                    LineDotChartData.CountOfValues,
                    LineDotChartData.MinDate,
                    LineDotChartData.MaxDate)
            }], [{
                source: {
                    displayName: "Values",
                    type: ValueType.fromDescriptor({ integer: true }),
                    roles: { Values: true }
                },
                values: getRandomNumbers(
                    LineDotChartData.CountOfValues,
                    LineDotChartData.MinValue,
                    LineDotChartData.MaxValue)
            }], null, null).build();
        }
    }
}
