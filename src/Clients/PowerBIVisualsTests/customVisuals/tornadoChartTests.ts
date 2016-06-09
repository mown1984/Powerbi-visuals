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

/// <reference path="../_references.ts"/>

module powerbitests.customVisuals {
    import VisualClass = powerbi.visuals.samples.TornadoChart;
    import TornadoChartDataView = powerbi.visuals.samples.TornadoChartDataView;
    import TornadoChartSeries = powerbi.visuals.samples.TornadoChartSeries;
    import TornadoChartPoint = powerbi.visuals.samples.TornadoChartPoint;
    import SalesByCountryData = powerbitests.customVisuals.sampleDataViews.SalesByCountryData;
    import DataViewValueColumns = powerbi.DataViewValueColumns;
    import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;

    powerbitests.mocks.setLocale();

    describe("TornadoChart", () => {
        let visualBuilder: TornadoChartBuilder;
        let defaultDataViewBuilder: SalesByCountryData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new TornadoChartBuilder(1000, 500);
            defaultDataViewBuilder = new SalesByCountryData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            let tornadoChartCapabilities = VisualClass.capabilities;

            it("registered capabilities", () => expect(tornadoChartCapabilities).toBeDefined());

            it("Capabilities should include dataViewMappings", () => expect(tornadoChartCapabilities.dataViewMappings).toBeDefined());

            it("Capabilities should include dataRoles", () => expect(tornadoChartCapabilities.dataRoles).toBeDefined());

            it("Capabilities should include objects", () => expect(tornadoChartCapabilities.objects).toBeDefined());
        });

        describe("DOM tests", () => {
            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let renderedCategories = visualBuilder.mainElement.find('.columns').children().length / 2;
                    expect(renderedCategories).toBeGreaterThan(0);
                    expect(renderedCategories).toBeLessThan(dataView.categorical.categories[0].values.length + 1);
                    done();
                });
            });

            it("Clear catcher covers the whole visual", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let clearCatcher = visualBuilder.mainElement.children("g").first().children().first().find('clearCatcher');
                    expect(clearCatcher).toBeDefined();
                    done();
                });
            });

            it("Categories tooltip is rendered correctly", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    var categoriesTooltip = visualBuilder.mainElement.find('.category-title');
                    expect($(categoriesTooltip[0]).text()).toBe('Australia');
                    expect($(categoriesTooltip[1]).text()).toBe('Canada');
                    expect($(categoriesTooltip[2]).text()).toBe('France');
                    done();
                });
            });

            it("Data Labels should be displayed correctly when using dates as category values", (done) => {
                dataView = new powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData().getDataView();
                dataView.metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                // Manually change the category format to be a date format
                dataView.categorical.categories[0].source.format = 'dddd\, MMMM %d\, yyyy';

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let labels: JQuery = visualBuilder.mainElement.find('.labels .label-text');
                    expect(labels.length).toBeGreaterThan(0);

                    // Verify label text is formatted correctly
                    expect($(labels[0]).text()).toBe("0.74M");
                    expect($(labels[3]).text()).toBe("0.30M");
                    expect($(labels[5]).text()).toBe("0.81M");
                    done();
                });
            });

            it("Scrolling should not be enabled when there is no data", () => {
                visualBuilder = new TornadoChartBuilder(500, 50);
                visualBuilder.update(dataView);

                // Check that the scroll bar and data exists
                expect(visualBuilder.mainElement.find('.y rect').length).toBe(1);
                expect(visualBuilder.mainElement.find('.columns').children().length).toBe(2);

                // Clear data
                dataView.categorical.categories = null;
                visualBuilder.update(dataView);

                // Check that the scroll bar and data are removed
                expect(visualBuilder.mainElement.find('.y rect').length).toBe(0);
                expect(visualBuilder.mainElement.find('.columns').children().length).toBe(0);
            });
        });

        describe("parseSeries", () => {
            let visualInstance: VisualClass;

            beforeEach(() => {
                visualBuilder.update(dataView);

                visualInstance = visualBuilder.visualInstance;
            });

            it("every argument is null", () => {
                callParseSeriesAndExpectExceptions(null, null, null, null);
            });

            it("every argument is undefined", () => {
                callParseSeriesAndExpectExceptions(undefined, undefined, undefined, undefined);
            });

            it("index is negative, other arguments are null", () => {
                callParseSeriesAndExpectExceptions(null, -5, null, null);
            });

            it("every argument is correct", () => {
                let index: number = 0,
                    series: TornadoChartSeries;

                series = callParseSeriesAndExpectExceptions(
                    dataView.categorical.values,
                    index,
                    true,
                    dataView.categorical.values.grouped()[index]);

                expect(series.categoryAxisEnd).toBeDefined();
                expect(series.name).toBeDefined();

                expect(series.selectionId).toBeDefined();
                expect(series.selectionId).not.toBeNull();
                expect(series.selectionId.getKey()).toBeDefined();

                expect(series.categoryAxisEnd).toBeDefined();
            });

            function callParseSeriesAndExpectExceptions(
                dataViewValueColumns: DataViewValueColumns,
                index: number,
                isGrouped: boolean,
                columnGroup: DataViewValueColumnGroup): TornadoChartSeries {

                let series: TornadoChartSeries;

                expect(() => {
                    series = visualInstance.parseSeries(
                        dataViewValueColumns,
                        index,
                        isGrouped,
                        columnGroup);
                }).not.toThrow();

                return series;
            }
        });

        describe("Converter tests", () => {
            let tornadoChartDataView: TornadoChartDataView,
                tornadoChartSeries: TornadoChartSeries[];

            beforeEach(() => {
                visualBuilder.update(dataView);

                tornadoChartDataView = visualBuilder.converter(dataView);
                tornadoChartSeries = tornadoChartDataView.series;
            });

            it("tornadoChartDataView is defined", () => {
                expect(tornadoChartDataView).toBeDefined();
                expect(tornadoChartDataView).not.toBeNull();
            });

            describe("DataPoints", () => {
                it("dataPoints are defined", () => {
                    expect(tornadoChartDataView.dataPoints).toBeDefined();
                    expect(tornadoChartDataView.dataPoints).not.toBeNull();
                    expect(tornadoChartDataView.dataPoints.length).toBeGreaterThan(0);
                });

                it("identity is defined with key", () => {
                    tornadoChartDataView.dataPoints.forEach((dataPoint: TornadoChartPoint) => {
                        expect(dataPoint.identity).toBeDefined();
                        expect(dataPoint.identity).not.toBeNull();

                        expect(dataPoint.identity.getKey()).toBeDefined();
                        expect(dataPoint.identity.getKey()).not.toBeNull();
                    });
                });
            });

            describe("Series", () => {
                it("series are defined", () => {
                    expect(tornadoChartSeries).toBeDefined();
                    expect(tornadoChartSeries).not.toBeNull();
                });

                it("identity is defined with key", () => {
                    tornadoChartSeries.forEach((series: TornadoChartSeries) => {
                        expect(series.selectionId).not.toBeNull();
                        expect(series.selectionId.getKey()).toBeDefined();
                    });
                });
            });
        });
    });

    class TornadoChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get visualInstance(): VisualClass {
            return this.visual;
        }

        public get mainElement() {
            return this.element.children("svg.tornado-chart");
        }

        public converter(dataView: powerbi.DataView): TornadoChartDataView {
            return this.visual.converter(dataView);
        }
    }
}
