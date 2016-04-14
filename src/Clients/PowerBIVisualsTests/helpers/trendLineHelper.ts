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

module powerbitests.helpers {
    import DataView = powerbi.DataView;
    import DataViewBuilderSeriesData = powerbi.data.DataViewBuilderSeriesData;
    import DataViewObjects = powerbi.DataViewObjects;
    import SQExpr = powerbi.data.SQExpr;
    import SQExprBuilder = powerbi.data.SQExprBuilder;
    import ValueType = powerbi.ValueType;

    const dashedArray = '5px, 5px';
    const dottedArray = '1px, 5px';

    export interface VerifyTrendLineProperties {
        color: string;
        opacity: number;
        style: string;
    };

    export function verifyTrendLines(lines: JQuery, properties: VerifyTrendLineProperties[]) {
        expect(lines.length).toBe(properties.length);

        lines.each((i, element) => {
            let line = $(element);
            verifyTrendLine(line, properties[i]);
        });
    }

    export function verifyTrendLine(line: JQuery, properties: VerifyTrendLineProperties) {
        helpers.assertColorsMatch(line.css('stroke'), properties.color);

        if (properties.style === powerbi.visuals.lineStyle.dotted)
            expect(line.css('stroke-dasharray')).toEqual(dottedArray);
        else if (properties.style === powerbi.visuals.lineStyle.dashed)
            expect(line.css('stroke-dasharray')).toEqual(dashedArray);
        else
            expect(line.css('stroke-dasharray')).toBeUndefined();

        expect(parseFloat(line.css('stroke-opacity'))).toBeCloseTo(properties.opacity, 3);
    }

    export function buildTrendLineDataViews(objects: DataViewObjects, combined: boolean, xIsMeasure: boolean): DataView[] {
        let categoryField = SQExprBuilder.entity('schema', 'table', 'category_column');
        let seriesField = SQExprBuilder.entity('schema', 'table', 'series_column');

        let dataView = xIsMeasure
            ? buildSourceDataViewWithXMeasure(categoryField, seriesField)
            : buildSourceDataViewWithXCategory(categoryField, seriesField);
        dataView.metadata.objects = objects;

        let regressionDataView = buildRegressionDataView(categoryField, seriesField, combined);
        regressionDataView.metadata.objects = objects;

        return [dataView, regressionDataView];
    }

    function buildSourceDataViewWithXCategory(categoryField: SQExpr, seriesField: SQExpr): DataView {
        return powerbi.data.createCategoricalDataViewBuilder().withCategory({
            identityFrom: {
                fields: [categoryField],
            },
            source: {
                displayName: 'col1',
                queryName: 'col1',
                index: 0,
                type: ValueType.fromDescriptor({ numeric: true }),
                roles: {
                    'Category': true
                },
            },
            values: [1, 2, 3, 4, 5, 6],
        }).withGroupedValues({
            groupColumn: {
                source: {
                    displayName: 'col2',
                    queryName: 'col2',
                    index: 1,
                    isMeasure: false,
                    type: ValueType.fromDescriptor({ text: true }),
                    roles: {
                        'Series': true
                    },
                },
                values: ['a', 'b'],
                identityFrom: {
                    fields: [seriesField]
                }
            },
            valueColumns: [{
                source: {
                    displayName: 'col3',
                    queryName: 'col3',
                    index: 2,
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ numeric: true }),
                    roles: {
                        'Y': true
                    },
                }
            }],
            data: [
                [{ values: [10, 20, 30, 40, 50, 60] }],
                [{ values: [15, 25, 35, 45, 55, 65] }]
            ],
        }).build();
    }

    function buildSourceDataViewWithXMeasure(categoryField: SQExpr, seriesField: SQExpr): DataView {
        return powerbi.data.createCategoricalDataViewBuilder().withCategory({
            identityFrom: {
                fields: [categoryField],
            },
            source: {
                displayName: 'col1',
                queryName: 'col1',
                index: 0,
                type: ValueType.fromDescriptor({ text: true }),
                roles: {
                    'Category': true
                },
            },
            values: ['a', 'b', 'c', 'd', 'e', 'f'],
        }).withGroupedValues({
            groupColumn: {
                source: {
                    displayName: 'col2',
                    queryName: 'col2',
                    index: 1,
                    isMeasure: false,
                    type: ValueType.fromDescriptor({ text: true }),
                    roles: {
                        'Series': true
                    },
                },
                values: ['a', 'b'],
                identityFrom: {
                    fields: [seriesField]
                }
            },
            valueColumns: [
                {
                    source: {
                        displayName: 'x',
                        queryName: 'x',
                        index: 2,
                        isMeasure: true,
                        type: ValueType.fromDescriptor({ numeric: true }),
                        roles: {
                            'X': true
                        },
                    }
                }, {
                    source: {
                        displayName: 'y',
                        queryName: 'y',
                        index: 3,
                        isMeasure: true,
                        type: ValueType.fromDescriptor({ numeric: true }),
                        roles: {
                            'Y': true
                        },
                    }
                }
            ],
            data: [
                [{ values: [1, 2, 3, 4, 5, 6] }, { values: [10, 20, 30, 40, 50, 60] }],
                [{ values: [1, 2, 3, 4, 5, 6] }, { values: [15, 25, 35, 45, 55, 65] }]
            ],
        }).build();
    }

    function buildRegressionDataView(categoryField: SQExpr, seriesField: SQExpr, combined: boolean): DataView {
        let series: string[];
        let data: DataViewBuilderSeriesData[][];
        if (combined) {
            series = ['a'];
            data = [[{ values: [10, 65] }]];
        }
        else {
            series = ['a', 'b'];
            data = [
                [{ values: [10, 60] }],
                [{ values: [15, 65] }]
            ];
        }

        let regressionDataView = powerbi.data.createCategoricalDataViewBuilder().withCategory({
            identityFrom: {
                fields: [categoryField],
            },
            source: {
                displayName: 'col1Regression',
                queryName: 'RegressionX',
                type: ValueType.fromDescriptor({ numeric: true }),
                roles: {
                    'regression.X': true
                },
            },
            values: [1, 6],
        }).withGroupedValues({
            groupColumn: {
                source: {
                    displayName: 'col3Regression',
                    queryName: "RegressionSeries",
                    type: ValueType.fromDescriptor({ text: true }),
                    isMeasure: false,
                    roles: {
                        'regression.Series': true
                    },
                },
                values: series,
                identityFrom: {
                    fields: [seriesField]
                }
            },
            valueColumns: [{
                source: {
                    displayName: 'col3',
                    queryName: 'RegressionY',
                    isMeasure: true,
                    type: ValueType.fromDescriptor({ numeric: true }),
                    roles: {
                        'regression.Y': true
                    },
                }
            }],
            data: data,
        }).build();

        return regressionDataView;
    }
}