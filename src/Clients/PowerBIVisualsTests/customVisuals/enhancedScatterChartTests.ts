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
    import VisualClass = powerbi.visuals.samples.EnhancedScatterChart;
    import EnhancedScatterChartData = customVisuals.sampleDataViews.EnhancedScatterChartData;
    import PixelConverter = jsCommon.PixelConverter;
    import Helpers = powerbitests.helpers;
    powerbitests.mocks.setLocale();

    describe("EnhancedScatterChart", () => {
        let visualBuilder: EnhancedScatterChartBuilder;
        let defaultDataViewBuilder: EnhancedScatterChartData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new EnhancedScatterChartBuilder(500, 1000);
            defaultDataViewBuilder = new EnhancedScatterChartData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("Should be registered", () => expect(VisualClass.capabilities).toBeDefined());

            it('Should include dataViewMappings', () => {
                expect(VisualClass.capabilities.dataViewMappings).toBeDefined();
            });

            it('Should include dataRoles', () => {
                expect(VisualClass.capabilities.dataRoles).toBeDefined();
            });

            it('Should not suppressDefaultTitle', () => {
                expect(VisualClass.capabilities.suppressDefaultTitle).toBeUndefined();
            });
        });

        describe("DOM tests", () => {
            it("Should create svg element", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("Should draw right amount of dots", () => {
                visualBuilder.update(dataView);

                let countOfDot: number = visualBuilder.mainElement
                    .children("svg.svgScrollable")
                    .children("g.axisGraphicsContext")
                    .children("g.mainGraphicsContext")
                    .children("svg")
                    .children("path.dot").length;

                expect(countOfDot).toBe(dataView.categorical.categories[0].values.length);
            });

            it('Should contain axis tick', () => {
                visualBuilder.update(dataView);

                let selector: string = '.enhancedScatterChart .axisGraphicsContext .x.axis .tick';
                expect($(selector).length).toBeGreaterThan(0);
                expect(Helpers.findElementText($(selector).find('text').first())).toBeDefined();
            });

            it('Should use selected font size for data labels', () => {
                let labelFontSizeInPoints = 9;  // 9 (in points) ==> 12 (in pixels)
                let labelFonSizeInPixels: string = Math.round(PixelConverter.fromPointToPixel(labelFontSizeInPoints)) + "px";
                dataView.metadata.objects = {
                    categoryLabels: {
                        fontSize: labelFontSizeInPoints,
                        show: true,
                    }
                };

                visualBuilder.update(dataView);

                let selector: string = '.enhancedScatterChart .mainGraphicsContext .labels .data-labels';
                expect($(selector).length).toBeGreaterThan(0);
                let firstDataLabelFontSize: string = $(selector).first().css('font-size');
                expect(firstDataLabelFontSize).toBe(labelFonSizeInPixels);
            });

            it('Should color dots with selected color', () => {
                let hexCustomColor = "#00ff00"; // intentionally different from default red
                dataView.metadata.objects = {
                    dataPoint: { defaultColor: { solid: { color: hexCustomColor } } }
                };

                visualBuilder.update(dataView);

                let selector: string = '.enhancedScatterChart .mainGraphicsContext .ScatterMarkers .dot';
                expect($(selector).length).toBeGreaterThan(0);
                let itemColor: string = $(selector).first().css('fill');
                Helpers.assertColorsMatch(itemColor, hexCustomColor);
            });

            it('Fill color should be false when category labels = on && fill point = off', (done) => {
                dataView = defaultDataViewBuilder.getDataView([
                    EnhancedScatterChartData.ColumnCategory, 
                    EnhancedScatterChartData.ColumnSeries,
                    EnhancedScatterChartData.ColumnX,
                    EnhancedScatterChartData.ColumnY]);

                dataView.metadata.objects = {
                    fillPoint: { show: false },
                    categoryLabels: { show: true }
                };

                visualBuilder.updateRenderTimeout(dataView, () => { 
                    let selector: string = '.enhancedScatterChart .mainGraphicsContext .ScatterMarkers .dot';
                    $(selector).each((index, elem) => {
                        let opacity = $(elem).css('fill-opacity');
                        expect(opacity).toBe("0");
                    });
                    done();
                });
            });

            describe("Legend", () => {
                let labelColor: string = powerbi.visuals.dataLabelUtils.defaultLabelColor;
                let labelFontSizeInPoints = 10;  // 10 (in points) ==> 13.333333 (in pixels)
                let labelFonSizeInPixels: number = Math.round(PixelConverter.fromPointToPixel(labelFontSizeInPoints));

                beforeEach(() => {
                    dataView.metadata.objects = {
                        legend: {
                            titleText: 'my title text',
                            show: true,
                            showTitle: true,
                            labelColor: { solid: { color: labelColor } },
                            fontSize: labelFontSizeInPoints,
                        }
                    };
                });

                it("Should add legend", () => {
                    visualBuilder.update(dataView);

                    let legend: JQuery = $(".enhancedScatterChart .legend");
                    expect(legend).toBeInDOM();
                });

                it("Should add right amount of legend items", () => {
                    visualBuilder.update(dataView);

                    let legendItems: JQuery = $(".enhancedScatterChart #legendGroup .legendItem");
                    expect(legendItems.length).toEqual(dataView.categorical.values.grouped().length);
                });

                it("Should add correct legend title & tooltip", () => {
                    visualBuilder.update(dataView);

                    let legendTitle: JQuery = visualBuilder.LegendGroupElement.children(".legendTitle");
                    expect(legendTitle.length).toEqual(1);

                    let legendTitleText: string = Helpers.findElementText(legendTitle);
                    let legendTitleTitle: string = Helpers.findElementTitle(legendTitle);
                    expect(legendTitleText).toEqual('my title text');
                    expect(legendTitleTitle).toEqual('my title text');
                });

                it('Should color legend title & items with selected color', () => {
                    visualBuilder.update(dataView);

                    let legendGroup: JQuery = visualBuilder.LegendGroupElement;
                    let legendTitle: JQuery = legendGroup.children('.legendTitle');
                    let firstLegendItemText: JQuery = getLegendTextOfFirstLegendItem(legendGroup);
                    Helpers.assertColorsMatch(legendTitle.css('fill'), labelColor);
                    Helpers.assertColorsMatch(firstLegendItemText.css('fill'), labelColor);
                });

                it('Should use selected font size for legend title and legend items', (done) => {
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let legendTitleFontSize: number =
                            Math.round(parseFloat(visualBuilder.LegendGroupElement.find('.legendTitle').css('font-size')));
                        let firstLegendItemTextFontSize: number =
                            Math.round(parseFloat(getLegendTextOfFirstLegendItem(visualBuilder.LegendGroupElement).css('font-size')));

                        expect(legendTitleFontSize).toBe(labelFonSizeInPixels);
                        expect(firstLegendItemTextFontSize).toBe(labelFonSizeInPixels);
                        done();
                    });
                });
            });
        });
    });

    function getLegendTextOfFirstLegendItem(legendGroup: JQuery) {
        return legendGroup.children('.legendItem').first().children('.legendText');
    }

    class EnhancedScatterChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number, width: number, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement(): JQuery {
            return this.element.children("svg").children("g.axisGraphicsContext").parent();
        }

        public get LegendGroupElement(): JQuery {
            return this.element.children(".legend").children('#legendGroup');
        }

        private build(): void {
            this.visual = new VisualClass();
        }

        public getMarkers(): JQuery {
            return $('.scatterChart .mainGraphicsContext circle.dot');
        }
    }
}