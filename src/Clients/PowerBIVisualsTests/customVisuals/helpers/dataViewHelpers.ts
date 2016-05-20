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
    const EnglishAlphabetLowerCase = "abcdefghijklmnopqrstuwxyz";
    const EnglishAlphabetUpperCase = "ABCDEFGHIJKLMNOPQRSTUWXYZ";

    export function addIdentityToDataViewBuilderCategoryColumnOptions(
        options: { source: powerbi.DataViewMetadataColumn, values: any[] }): powerbi.data.DataViewBuilderCategoryColumnOptions {
        debug.assertValue(options && options.source && options.source.queryName, "source.queryName is not defined");
        let categoryField = powerbi.data.SQExprBuilder.entity('schema', 'table', options.source.queryName);
        return <powerbi.data.DataViewBuilderCategoryColumnOptions>_.merge(options, { 
                identityFrom : { 
                        fields: [categoryField],
                        identities: options.values.map(mocks.dataViewScopeIdentity)
                    }
            });
    }

    export function getTableDataValues(categoryValues: any[], columns: any[]): any[] {
        return categoryValues.map((category, idx) => {
            var categoryDataValues = columns.map(x => <any>x.values[idx]);
            categoryDataValues.unshift(category);
            return categoryDataValues;
        });
    }

    export function getRandomNumbers(count: number, min: number = 0, max: number = 1): number[] {
        return _.range(count).map(x => getRandomNumber(min, max));
    }

    export function getRandomUniqueNumbers(count: number, min: number = 0, max: number = 1): number[] {
        let result: number[] = [];
        for(let i = 0; i< count; i++) {
            result.push(getRandomNumber(min, max, result));
        }

        return result;
    }

    export function getRandomNumber(
        min: number,
        max: number,
        exceptionList?: number[],
        changeResult: (number) => number = x => x): number {
        let result = changeResult(Math.random() * (max - min) + min);
        if(exceptionList && exceptionList.length && _.contains(exceptionList, result)) {
            return getRandomNumber(min, max, exceptionList);
        }

        return result;
    }

    export function getRandomInt(min: number, max: number, exceptionList?: number[]): number {
        return getRandomNumber(max, min, exceptionList, Math.floor);
    }

    export function getRandomUniqueSortedDates(count: number, start: Date, end: Date): Date[] {
        return getRandomUniqueNumbers(count, start.getTime(), end.getTime()).sort().map(x => new Date(x));
    }

    export function getRandomDate(start: Date, end: Date, exceptionList?: Date[]): Date {
        return new Date(getRandomNumber(start.getTime(), end.getTime(), exceptionList.map(x => x.getTime())));
    }

    export function getRandomWord(
        minLength: number,
        maxLength: number,
        alphabet: string|string[] = EnglishAlphabetLowerCase + EnglishAlphabetUpperCase): string {
        let alphabetLength = alphabet.length;
        let length = getRandomInt(minLength, maxLength);
        let strings = <string[]>_.range(length).map(x => alphabet[getRandomInt(0, alphabetLength)]);
        return strings.join('');
    }

    export function getRandomText(
        wordCount: number,
        minLength: number,
        maxLength: number,
        alphabet: string|string[] = EnglishAlphabetLowerCase + EnglishAlphabetUpperCase): string {
        let words = <string[]>_.range(alphabet.length).map(x => getRandomWord(minLength, maxLength, alphabet));
        return words.join(' ');
    }
}