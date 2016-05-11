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

module powerbitests.customVisuals {
    import VisualClass = powerbi.visuals.samples.MekkoChart;
    import MekkoChartData = sampleDataViews.MekkoChartData;
    import MekkoColumnChart = powerbi.visuals.samples.MekkoColumnChart;
    import MekkoColumnChartData = powerbi.visuals.samples.MekkoColumnChartData;
    import DataColorPalette = powerbi.visuals.DataColorPalette;
    import ColumnChartType = powerbi.visuals.ColumnChartType;
    import ColumnChartSeries = powerbi.visuals.ColumnChartSeries;
    import colorAssert = powerbitests.helpers.assertColorsMatch;

    powerbitests.mocks.setLocale();

    describe("MekkoChart", () => {
        describe("capabilities", () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: MekkoChartBuilder,
                dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new MekkoChartBuilder();
                dataViews = [new MekkoChartData().getDataView()];
            });

            it("main element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    expect(visualBuilder.categoriesAxis).toBeInDOM();
                    expect(visualBuilder.categoriesAxis.children("g.tick").length)
                        .toBe(dataViews[0].matrix.rows.root.children.length);

                    expect(visualBuilder.columnElement).toBeInDOM();
                    let series: JQuery = visualBuilder.columnElement.children("g.series");
                    expect(series.length)
                        .toBe(dataViews[0].matrix.columns.root.children.length);

                    for (let i = 0, length = series.length; i < length; i++) {
                        expect($(series[i]).children("rect.column").length)
                            .toBe(dataViews[0].matrix.rows.root.children.length);
                    }
                    done();
                }, DefaultWaitForRender);
            });
        });

        describe("MekkoColumnChartData", () => {
            describe("converter", () => {
                let dataView: powerbi.DataView,
                    mekkoColumnChartData: MekkoColumnChartData,
                    dataColorPalette: DataColorPalette;

                beforeEach(() => {
                    dataView = new MekkoChartData().getDataView();
                    dataColorPalette = new DataColorPalette();

                    mekkoColumnChartData = MekkoColumnChart.converter(
                        dataView.categorical,
                        dataColorPalette,
                        true,
                        false,
                        false,
                        dataView.metadata,
                        ColumnChartType.hundredPercentStackedBar);
                });

                it("mekkoColumnChartData is defined", () => {
                    expect(mekkoColumnChartData).toBeDefined();
                    expect(mekkoColumnChartData).not.toBeNull();
                });

                describe("series", () => {
                    let series: ColumnChartSeries[];

                    beforeEach(() => {
                        series = mekkoColumnChartData.series;
                    });

                    it("series are defined", () => {
                        expect(series).toBeDefined();
                        expect(series).not.toBeNull();
                    });

                    it("each element of series is defined", () => {
                        series.map((columnChartSeries: ColumnChartSeries) => {
                            expect(columnChartSeries).toBeDefined();
                            expect(columnChartSeries).not.toBeNull();
                        });
                    });

                    describe("identity", () => {
                        it("identity is defined", () => {
                            series.map((columnChartSeries: ColumnChartSeries) => {
                                expect(columnChartSeries.identity).toBeDefined();
                                expect(columnChartSeries.identity).not.toBeNull();
                            });
                        });

                        it("identity has key", () => {
                            series.map((columnChartSeries: ColumnChartSeries) => {
                                expect(columnChartSeries.identity.getKey()).toBeDefined();
                            });
                        });
                    });
                });

                describe("MekkoColumnChartData", () => {
                    describe("converter", () => {
                        let visualBuilder: MekkoChartBuilder,
                            dataViews: powerbi.DataView[];

                        beforeEach(() => {
                            visualBuilder = new MekkoChartBuilder();
                            dataViews = [new MekkoChartData().getDataView()];
                        });

                       it("mekko columnBorder on", done => {
                            dataViews[0].metadata.objects = {
                                columnBorder: {
                                    show: true
                                }
                            };
                            visualBuilder.updateRenderTimeout(dataViews, () => {
                                expect(visualBuilder.mainElement.find('.mekkoborder').first().attr('width')).toBeGreaterThan(0);
                                done();
                            });
                        });

                        it("nodes border change color", done => {
                            dataViews[0].metadata.objects = {
                                columnBorder: {
                                    color: { solid: { color: "#123123" } }
                                }
                            };

                            visualBuilder.updateRenderTimeout(dataViews, () => {
                                colorAssert(visualBuilder.mainElement.find('rect.mekkoborder').first().css('fill'), "#123123");
                                done();
                            });

                        });
                    });

                });
            });
        });

    });

        class MekkoChartBuilder extends VisualBuilderBase<VisualClass> {
            constructor(height: number = 200, width: number = 300, isMinervaVisualPlugin: boolean = false) {
                super(height, width, isMinervaVisualPlugin);
                this.build();
                this.init();
            }

            public get mainElement() {
                return this.element
                    .children("svg")
                    .children("g.axisGraphicsContext")
                    .parent();
            }

            public get categoriesAxis() {
                return this.mainElement
                    .children("g.axisGraphicsContext")
                    .children("g.x.axis.showLinesOnAxis");
            }

            public get columnElement() {
                return this.mainElement.find("svg.svgScrollable g.axisGraphicsContext .columnChartMainGraphicsContext");
            }

            private build(): void {
                this.visual = new VisualClass(null);
            }
        }
    }
        