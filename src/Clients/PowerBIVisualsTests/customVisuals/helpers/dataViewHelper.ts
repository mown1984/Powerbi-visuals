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

module powerbitests.customVisuals.helpers {
    export function getTableDataValues(categoryValues: any[], columns: any[]): any[] {
        return categoryValues.map((category, idx) => {
            var categoryDataValues = columns.map(x => <any>x.values[idx]);
            categoryDataValues.unshift(category);
            return categoryDataValues;
        });
    }

    export function generateNumbers(count: number): number[] {
        let values = Array.apply(null, Array(count)).map(x => 0);
        for (let i = 0; i < 5; ++i) {
            let x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (let i = 0; i < count; i++) {
                let w = (i / count - y) * z;
                values[i] += x * Math.exp(-w * w);
            }
        }

        return values.map(x => Math.max(0, x) * 10000);
    }

    export function generateDates(count: number, start: Date, end: Date): Date[] {
        let dates: Date[] = [];
        for(let i=0; i<count; i++) {
            let randDate = this.randomDate(start, end);
            if(_.contains(dates,randDate)) {
                i--;
            } else {
                dates.push(randDate);
            }
        }

        return dates.sort((a,b) => a.getTime() > b.getTime() ? 1 : -1);
    }

    export function randomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}