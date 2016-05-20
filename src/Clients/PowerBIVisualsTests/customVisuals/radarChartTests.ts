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
    import VisualClass = powerbi.visuals.samples.RadarChart;
    import ColorAssert = powerbitests.helpers.assertColorsMatch;
    import PixelConverter = jsCommon.PixelConverter;

	powerbitests.mocks.setLocale();
	
    describe("RadarChart", () => {
        let visualBuilder: RadarChartBuilder;
        let dataView: powerbi.DataView;
        let dataViewBuilder: powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData;

        beforeEach(() => {
            visualBuilder = new RadarChartBuilder(500, 1000);
            dataViewBuilder = new powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData();
            dataView = dataViewBuilder.getDataView();
        });

        describe('Capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("legend element created", () => {
                expect($(visualBuilder.mainElement[1]).attr('class')).toBe('legend');
            });

            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.find("g.axis").children("text.axisLabel").length)
                        .toBe(dataView.categorical.categories[0].values.length);
                    expect(visualBuilder.mainElement.find("g.chartNode").first().children("circle.chartDot").length)
                        .toBe(dataView.categorical.categories[0].values.length);
                    done();
                });
            });

            it("update with empty data point", (done) => {
                dataView.categorical.values[0].values[2] = null;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.find("g.axis").children("text.axisLabel").length)
                        .toBe(dataView.categorical.categories[0].values.length);
                    expect(visualBuilder.mainElement.find("g.chartNode").first().children("circle.chartDot").length)
                        .toBe(dataView.categorical.categories[0].values.length - 1);
                    done();
                });
            });
        });

        describe("Drawing tests", () => {

            it("data points highlights", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let firstPoint = visualBuilder.mainElement.find("circle.chartDot").first();
                    let secondPoint = visualBuilder.mainElement.find("circle.chartDot").last();

                    expect(firstPoint.css("opacity")).toBe("1");
                    expect(secondPoint.css("opacity")).toBe("1");

                    firstPoint.d3Click(parseInt(firstPoint.attr("cx"), 10), parseInt(firstPoint.attr("cy"), 10));
                    expect(firstPoint.css("opacity")).toBe("1");

                    // The value is approximate because of the chutzpah test. In the browser, the test passes with the specific value (0.4).
                    expect(Math.round((parseFloat(secondPoint.css("opacity"))*100))/100).toBe(0.4);

                    done();
                });
            });

            it("legend highlights", (done) => {
                RadarChartBuilder.changeDataColor(dataView, "#123123");
                 visualBuilder.updateRenderTimeout(dataView, () => {
                    let firstLegendItem = visualBuilder.mainElement.find("circle.legendIcon").first();
                    let secondLegendItem = visualBuilder.mainElement.find("circle.legendIcon").last();
                    let notSelectedColor = "#a6a6a6";
                    let firstItemColorBeforeSelection = firstLegendItem.css("fill");
                    let secondItemColorBeforeSelection = secondLegendItem.css("fill");
                    ColorAssert(firstItemColorBeforeSelection, "#123123");

                    secondLegendItem.d3Click(parseInt(secondLegendItem.attr("cx"), 10), parseInt(secondLegendItem.attr("cy"), 10));
                    ColorAssert(firstLegendItem.css("fill"), notSelectedColor);
                    ColorAssert(secondLegendItem.css("fill"), secondItemColorBeforeSelection);

                    done();
                });
            });

            it("interactivity legend highlights", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let firstPoint = visualBuilder.mainElement.find("circle.chartDot").first();
                    let secondPoint = visualBuilder.mainElement.find("circle.chartDot").last();
                    let firstLegendItem = visualBuilder.mainElement.find("circle.legendIcon").first();

                    expect(firstPoint.css("opacity")).toBe("1");
                    expect(secondPoint.css("opacity")).toBe("1");

                    firstLegendItem.d3Click(parseInt(firstLegendItem.attr("cx"), 10), parseInt(firstLegendItem.attr("cy"), 10));
                    expect(firstPoint.css("opacity")).toBe("1");

                    // The value is approximate because of the chutzpah test. In the browser, the test passes with the specific value (0.4).
                    expect(Math.round((parseFloat(secondPoint.css("opacity"))*100))/100).toBe(0.4);

                    done();
                });
            });
        });

        describe('Property pane changes', () => {
            describe('Legend', () => {

                it("show legend on", (done) => {
                    dataView.metadata.objects =
                    {
                        legend: {
                            show: true
                        }
                    };
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.mainElement.find("g#legendGroup").children.length).toBe(dataView.categorical.values.length);
                        done();
                    });
                });

                it("show legend off", (done) => {
                    dataView.metadata.objects =
                    {
                        legend: {
                            show: false
                        }
                    };
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.mainElement.find("g#legendGroup")).toBeEmpty();
                        done();
                    });
                });
            });

            describe('Data Colors', () => {

                it("change data color", (done) => {

                    // Init by one color
                    RadarChartBuilder.changeDataColor(dataView, "#123123");
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let polygon = visualBuilder.mainElement.find('.chartPolygon').first();
                        ColorAssert(polygon.css("fill"), "#123123");

                        // Change data color
                        RadarChartBuilder.changeDataColor(dataView, "#ab1234");
                        visualBuilder.update(dataView);
                        let polygonAfterUpdate = visualBuilder.mainElement.find('.chartPolygon').first();
                        ColorAssert(polygonAfterUpdate.css("fill"), "#ab1234");
                        done();
                    });
                });
            });

            describe("Data Labels", () => {

                it("nodes labels on", done => {
                    dataView.metadata.objects = {
                        labels: {
                            show: true
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.mainElement.find("g.labels").length).toBe(1);
                        done();
                    });
                });

                it("nodes labels off", done => {
                    dataView.metadata.objects = {
                        labels: {
                            show: false
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.mainElement.find("g.labels").length).toBe(0);
                        done();
                    });
                });

                it("nodes labels change color", done => {
                    RadarChartBuilder.changeDataLabelColor(dataView, "#123123");
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let dataLabel = visualBuilder.mainElement.find('.data-labels').first();
                        ColorAssert(dataLabel.css("fill"), "#123123");
                        RadarChartBuilder.changeDataLabelColor(dataView, "#324435");

                        visualBuilder.updateRenderTimeout(dataView, () => {
                            let dataLabelAfterUpdate = visualBuilder.mainElement.find('.data-labels').first();

                            ColorAssert(dataLabelAfterUpdate.css("fill"), "#324435");
                            done();
                        });
                    });
                });

                it("nodes labels change font size", done => {
                    dataView.metadata.objects = {
                        labels: {
                            show: true,
                            fontSize: 16
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let label = visualBuilder.mainElement.find('.data-labels').first();
                        expect(Math.round(parseInt(label.css('font-size'), 10))).toBe(Math.round(parseInt(PixelConverter.fromPoint(16), 10)));
                        done();
                    });
                });

                it("nodes labels change percision - decimal places", done => {
                    let decimalPlaces = 4;

                    dataView.metadata.objects = {
                        labels: {
                            show: true,
                            labelPrecision: decimalPlaces,
                            labelDisplayUnits: 1
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let labelText = visualBuilder.mainElement.find('.data-labels').first().text();
                        let percisionValues = labelText.split('.');
                        expect(percisionValues[1].length).toBe(decimalPlaces);
                        done();
                    });
                });

                it("nodes labels change display unit", done => {
                   
                    dataView.metadata.objects = {
                        labels: {
                            show: true,
                            displayUnits: 2
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let labelText = visualBuilder.mainElement.find('.data-labels').first().text();
                        let lastChart = labelText.charAt(labelText.length-1);
                        expect(lastChart).toBe("K");
                        done();
                    });
                });
            });
        });
    });

    class RadarChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number, width: number, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element.children("svg");
        }

        private build(): void {
            this.visual = new VisualClass();
        }

        //Helpers
        public static changeDataColor(dataView: powerbi.DataView, colorValue: string): void {
            dataView.categorical.values[0].source.objects = {
                dataPoint: {
                    fill: { solid: { color: colorValue } }
                }
            };
        }

        public static changeDataLabelColor(dataView: powerbi.DataView, colorValue: string): void {
            dataView.metadata.objects = {
                labels: {
                    show: true,
                    color: { solid: { color: colorValue } }
                }
            };
        }
    }
}