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

module powerbitests {
    import lineStyle = powerbi.visuals.lineStyle;
    import ObjectEnumerationBuilder = powerbi.visuals.ObjectEnumerationBuilder;
    import TrendLineHelper = powerbi.visuals.TrendLineHelper;
    import TrendLine = powerbi.visuals.TrendLine;
    import DataViewTransform = powerbi.data.DataViewTransform;

    describe('TrendLineHelper', () => {
        let samplePoints: powerbi.visuals.IPoint[] = [{ x: 0, y: 0 }, { x: 100, y: 100 }];

        describe('enumerateObjectInstances', () => {
            it('with no trend lines generates a trend line object', () => {
                let enumerationBuilder = new ObjectEnumerationBuilder();
                TrendLineHelper.enumerateObjectInstances(enumerationBuilder, undefined);
                let instances = enumerationBuilder.complete().instances;

                expect(instances.length).toBe(1);
                expect(instances[0]).toEqual({
                    selector: null,
                    properties: {
                        show: false,
                    },
                    objectName: 'trend',
                });
            });

            it('with trend line object', () => {
                let enumerationBuilder = new ObjectEnumerationBuilder();

                let trendLine: TrendLine = {
                    points: samplePoints,
                    show: true,
                    lineColor: { fill: { solid: { color: 'red' } } },
                    style: lineStyle.dotted,
                    transparency: 20,
                    combineSeries: true,
                    y2Axis: false,
                };

                TrendLineHelper.enumerateObjectInstances(enumerationBuilder, [trendLine]);
                let instances = enumerationBuilder.complete().instances;

                expect(instances[0]).toEqual({
                    selector: null,
                    properties: {
                        show: true,
                        lineColor: { fill: { solid: { color: 'red' } } },
                        style: lineStyle.dotted,
                        transparency: 20,
                        combineSeries: true,
                    },
                    objectName: 'trend',
                });
            });
        });

        describe('readDataViews', () => {
            it('invalid data views', () => {
                expect(TrendLineHelper.readDataViews([])).toEqual([]);
                expect(TrendLineHelper.readDataViews([null])).toEqual([]);
            });

            it('single regression data view', () => {
                let [layerDataView, regressionDataView] = helpers.buildTrendLineDataViews({ trend: { show: true } }, /*  */ true, /* xIsMeasure */ false);

                expect(TrendLineHelper.readDataViews([layerDataView, regressionDataView]).length).toBe(1);
                expect(TrendLineHelper.readDataViews([layerDataView])).toEqual([]);
            });

            it('multiple regression data views', () => {
                let [layer1, regression1] = helpers.buildTrendLineDataViews({ trend: { show: true } }, /* combined */ true, /* xIsMeasure */ false);
                let [layer2, regression2] = helpers.buildTrendLineDataViews({ trend: { show: true } }, /* combined */ true, /* xIsMeasure */ false);

                let trendLines = TrendLineHelper.readDataViews([layer1, layer2, regression1, regression2]);
                expect(trendLines.length).toBe(2);
                expect(trendLines[0].y2Axis).toBe(false);
                expect(trendLines[1].y2Axis).toBe(true);
            });
        });

        describe('readDataView', () => {
            it('invalid data view', () => {
                expect(TrendLineHelper.readDataView(null, false)).toBeUndefined();

                expect(TrendLineHelper.readDataView({ single: { value: 10 }, metadata: { columns: [] } }, false)).toBeUndefined();

                expect(TrendLineHelper.readDataView({
                    categorical: {
                        categories: [],
                        values: DataViewTransform.createValueColumns(),
                    },
                    metadata: {
                        columns: []
                    },
                }, false)).toBeUndefined();

                // Only category column
                let categoryField = powerbi.data.SQExprBuilder.entity('schema', 'table', 'category_column');
                let categoryValues = ['a', 'b'];
                expect(TrendLineHelper.readDataView(
                    powerbi.data.createCategoricalDataViewBuilder().withCategory({
                        identityFrom: {
                            fields: [categoryField],
                            identities: _.map(categoryValues, v => mocks.dataViewScopeIdentity(v))
                        },
                        source: {
                            displayName: 'category column',
                            isMeasure: false,
                            index: 0,
                            queryName: 'select1',
                            roles: { 'Category': true },
                            type: powerbi.ValueType.fromDescriptor({ text: true }),
                        },
                        values: categoryValues
                    }).build(), false)).toBeUndefined();

                // Only value column
                expect(TrendLineHelper.readDataView(
                    powerbi.data.createCategoricalDataViewBuilder().withValues({
                        columns: [
                            {
                                source: {
                                    displayName: 'value column',
                                    isMeasure: false,
                                    index: 0,
                                    queryName: 'select1',
                                    roles: { 'Y': true },
                                    type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                },
                                values: [1],
                            }
                        ]
                    }).build(), false)).toBeUndefined();
            });

            it('data view with defaults', () => {
                let dataView = buildValidGroupedDataView();

                expect(TrendLineHelper.readDataView(dataView, false)).toEqual([{
                    points: [{ x: 1, y: 10 }, { x: 6, y: 65 }],
                    show: false,
                    lineColor: { solid: { color: '#000' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: true,
                    y2Axis: false,
                }]);
            });

            it('grouped data view for multiple series', () => {
                let dataView = buildValidGroupedDataView(false);
                dataView.metadata.objects = {
                    trend: {
                        show: true,
                        combineSeries: false,
                    }
                };

                expect(TrendLineHelper.readDataView(dataView, false)).toEqual([{
                    points: [{ x: 1, y: 10 }, { x: 6, y: 60 }],
                    show: true,
                    lineColor: { solid: { color: '#000' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: false,
                    y2Axis: false,
                }, {
                    points: [{ x: 1, y: 15 }, { x: 6, y: 65}],
                    show: true,
                    lineColor: { solid: { color: '#000' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: false,
                    y2Axis: false,
                }]);
            });

            it('legacy color', () => {
                let dataView = buildValidGroupedDataView();

                dataView.categorical.values[0].source.objects = {
                    dataPoint: {
                        fill: { solid: { color: '#123' } },
                    }
                };

                expect(TrendLineHelper.readDataView(dataView, false)).toEqual([{
                    points: [{ x: 1, y: 10 }, { x: 6, y: 65 }],
                    show: false,
                    lineColor: { solid: { color: '#123' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: true,
                    y2Axis: false,
                }]);

                // --- Legacy color overrides line color
                dataView.metadata.objects = {
                    trend: {
                        lineColor: { solid: { color: '#456' } }
                    },
                    dataPoint: {
                        fill: { solid: { color: '#123' } },
                    }
                };

                expect(TrendLineHelper.readDataView(dataView, false)).toEqual([{
                    points: [{ x: 1, y: 10 }, { x: 6, y: 65 }],
                    show: false,
                    lineColor: { solid: { color: '#123' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: true,
                    y2Axis: false,
                }]);
            });

            it('invalid numbers', () => {
                let dataView = buildValidGroupedDataView();

                dataView.categorical.categories[0].values = [20, null];
                dataView.categorical.values[0].values = [NaN, 100];
                dataView.categorical.values.grouped()[0].values[0].values = [NaN, 100];

                expect(TrendLineHelper.readDataView(dataView, false)).toEqual([{
                    points: [],
                    show: false,
                    lineColor: TrendLineHelper.defaults.color,
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: true,
                    y2Axis: false,
                }]);
            });

            it('use y2 axis', () => {
                let dataView = buildValidGroupedDataView();

                expect(TrendLineHelper.readDataView(dataView, true)).toEqual([{
                    points: [{ x: 1, y: 10 }, { x: 6, y: 65 }],
                    show: false,
                    lineColor: { solid: { color: '#000' } },
                    transparency: TrendLineHelper.defaults.transparency,
                    style: TrendLineHelper.defaults.lineStyle,
                    combineSeries: true,
                    y2Axis: true,
                }]);
            });
        });

        it('isDataViewForRegression', () => {
            let dataView: powerbi.DataView = {
                single: {
                    value: 10
                },
                metadata: {
                    columns: [
                        {
                            displayName: 'column1',
                            index: 0,
                            isMeasure: true,
                            queryName: 'select1',
                            roles: {
                                'Category': true,
                            },
                            type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                        }
                    ]
                }
            };

            expect(TrendLineHelper.isDataViewForRegression(dataView)).toBe(false);

            dataView.metadata.columns[0].roles['regression.X'] = true;

            expect(TrendLineHelper.isDataViewForRegression(dataView)).toBe(true);
        });

        function buildValidGroupedDataView(combined: boolean = true, xIsMeasure: boolean = false): powerbi.DataView {
            return helpers.buildTrendLineDataViews({ trend: { show: false } }, combined, xIsMeasure)[1];
        }
    });
}
