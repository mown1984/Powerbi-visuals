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
    import VisualClass = powerbi.visuals.samples.TornadoChart;
    import TornadoChartDataView = powerbi.visuals.samples.TornadoChartDataView;
    import TornadoChartSeries = powerbi.visuals.samples.TornadoChartSeries;

    powerbitests.mocks.setLocale();

    describe("TornadoChart", () => {
        let visualBuilder: TornadoChartBuilder;
        let defaultDataBuilder: powerbitests.customVisuals.sampleDataViews.SalesByCountryData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new TornadoChartBuilder(500,1500);
            defaultDataBuilder = new powerbitests.customVisuals.sampleDataViews.SalesByCountryData();
            dataView = defaultDataBuilder.getDataView();
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
        });

        describe("Converter tests", () => {
            let tornadoChartDataView: TornadoChartDataView;
            let series: TornadoChartSeries[];

            beforeEach(() => {
                tornadoChartDataView = visualBuilder.converter(dataView);
                series = tornadoChartDataView.series;
            });

            xit("tornadoChartDataView is defined", () => {
                expect(tornadoChartDataView).toBeDefined();
                expect(tornadoChartDataView).not.toBeNull();
            });

            describe("Series", () => {
                xit("Series are defined", () => {
                    expect(series).toBeDefined();
                    expect(series).not.toBeNull();
                });

                xit("Identity is defined with key", () => {
                    for (let tornadoChartSeries of series) {
                        expect(tornadoChartSeries.selectionId).not.toBeNull();
                        expect(tornadoChartSeries.selectionId.getKey()).toBeDefined();
                    }
                });
            });
        });
    });

    class TornadoChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number, width: number, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element.children('svg.tornado-chart');
        }

        private build(): void {
            this.visual = new VisualClass();
        }

        public converter(dataView: powerbi.DataView): TornadoChartDataView {
            return this.visual.converter(dataView);
        }
    }
}