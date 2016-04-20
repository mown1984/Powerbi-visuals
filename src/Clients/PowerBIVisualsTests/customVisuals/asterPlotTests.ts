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
    import LegendData = powerbi.visuals.LegendData;
    import VisualClass = powerbi.visuals.samples.AsterPlot;
    import PixelConverter = jsCommon.PixelConverter;
    import Helpers = powerbitests.helpers;

    powerbitests.mocks.setLocale();

    describe("AsterPlot", () => {
        describe('capabilities', () => {
            let asterPlotCapabilities = VisualClass.capabilities;

            it("Should register capabilities", () => expect(asterPlotCapabilities).toBeDefined());

            it("Should include dataRoles", () => expect(asterPlotCapabilities.dataRoles).toBeDefined());

            it("Should include dataViewMappings", () => expect(asterPlotCapabilities.dataViewMappings).toBeDefined());

            it("Should include objects", () => expect(asterPlotCapabilities.objects).toBeDefined());

        });

        describe("DOM tests", () => {
            let visualBuilder: AsterPlotBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new AsterPlotBuilder(300, 500);
                dataViews = [new powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData().getDataView()];
            });

            it("Should create svg element", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("Should draw right amount of slices", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    expect(visualBuilder.mainElement.find('.asterSlice').length)
                        .toBe(dataViews[0].categorical.categories[0].values.length);
                    done();
                }, DefaultWaitForRender);
            });

            it("Should add center label", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    let centerText: JQuery = $(".asterPlot .centerLabel");
                    expect(centerText).toBeInDOM();
                    done();
                }, DefaultWaitForRender);
            });

            it("Should not add center label to DOM when there is no data", (done) => {
                visualBuilder.update([]);
                setTimeout(() => {
                    let centerText: JQuery = $(".asterPlot .centerLabel");
                    expect(centerText.length).toBe(0);
                    done();
                }, DefaultWaitForRender);
            });

            describe("Data Labels", () => {
                beforeEach(() => {
                    dataViews[0].metadata.objects = {
                        labels: {
                            show: true
                        }
                    };
                });
                
                it("Default Data Labels", (done) => {
                    visualBuilder.update(dataViews);
                    setTimeout(() => {
                        let numOfLabels = dataViews[0].categorical.values[0].values.length;
                        let labels: JQuery = $(".asterPlot .labels .data-labels");
                        expect(labels.length).toBe(numOfLabels);
                        let lines: JQuery = $(".asterPlot .lines .line-label");
                        expect(lines.length).toBe(numOfLabels);
                        let slices: JQuery = $(".asterPlot .asterSlice");
                        expect(slices.length).toBe(numOfLabels);
                        done();
                    }, DefaultWaitForRender);
                });

                it("Data Labels have conflict with viewport", (done) => {
                    visualBuilder.update(dataViews);
                    setTimeout(() => {
                        let numOfLabels = dataViews[0].categorical.values[0].values.length;
                        let labels: JQuery = $(".asterPlot .labels .data-labels");
                        let lines: JQuery = $(".asterPlot .lines .line-label");
                        expect(lines.length).toBe(numOfLabels);
                        expect(labels.length).toBe(numOfLabels);
                        //The viewport is reduced
                        visualBuilder.updateWithViewport(dataViews, { height: 200, width: 350 });
                        let labelsAfterResize: JQuery = $(".asterPlot .labels .data-labels");
                        let linesAfterResize: JQuery = $(".asterPlot .lines .line-label");
                        expect(labelsAfterResize.length).toBe(numOfLabels);
                        expect(linesAfterResize.length).toBe(numOfLabels);

                        let firsrtLabelX = $(labels).first().attr('x');
                        let firsrtLabelY = $(labels).first().attr('y');
                        //let lastLabelX = $(labels).last().attr('x');
                        let lastLabelY = $(labels).last().attr('y');
                        let firsrtResizeLabelX = $(labelsAfterResize).first().attr('x');
                        let firsrtResizeLabelY = $(labelsAfterResize).first().attr('y');
                        //let lastResizeLabelX = $(labelsAfterResize).last().attr('x');
                        let lastResizeLabelY = $(labelsAfterResize).last().attr('y');

                        expect(firsrtLabelX).toBeGreaterThan(parseFloat(firsrtResizeLabelX));
                        expect(firsrtLabelY).toBeLessThan(parseFloat(firsrtResizeLabelY));

                        // TODO: uncomment and fix
                        //expect(lastLabelX).toBeGreaterThan(parseFloat(lastResizeLabelX));
                        expect(lastLabelY).toBeLessThan(parseFloat(lastResizeLabelY));

                        done();
                    }, DefaultWaitForRender);
                });

                it("Data Labels - Decimal value for Labels should have a limit to 17", (done) => {
                    dataViews[0].metadata.objects = {
                        labels: {
                            show: true,
                            labelPrecision: 5666
                        }
                    };

                    visualBuilder.update(dataViews);
                    setTimeout(() => {
                        let labels: JQuery = $(".asterPlot .labels .data-labels");
                        let dataLabels = $(labels).first().text();
                        let maxPrecision: number = 17;
                        expect(dataLabels).toBe("0.86618686000000000M");
                        expect(dataLabels.length - 3).toBe(maxPrecision);
                        done();
                    }, DefaultWaitForRender);
                });
            });

            describe("Default Legend", () => {
                let defaultLegendLabelFontSize = 8;

                beforeEach(() => {
                    dataViews[0].metadata.objects = {
                        legend: {
                            show: true
                        }
                    };
                    visualBuilder.update(dataViews);
                });

                it("Should add legend", () => {
                    let legend: JQuery = $(".legend");
                    expect(legend).toBeInDOM();
                });

                it("Should color legend title & items with default color", () => {
                    let legendGroup: JQuery = visualBuilder.LegendGroupElement;
                    let legendTitle: JQuery = legendGroup.children('.legendTitle');
                    let firstLegendItemText: JQuery = getLegendTextOfFirstLegendItem(legendGroup);
                    Helpers.assertColorsMatch(legendTitle.css('fill'), LegendData.DefaultLegendLabelFillColor);
                    Helpers.assertColorsMatch(firstLegendItemText.css('fill'), LegendData.DefaultLegendLabelFillColor);
                });

                it("Should set legend title & tooltip to text from dataview", () => {
                    let legendTitle: JQuery = visualBuilder.LegendGroupElement.children(".legendTitle");
                    expect(legendTitle.length).toEqual(1);

                    let legendTitleText: string = Helpers.findElementText(legendTitle);
                    let legendTitleTitle: string = Helpers.findElementTitle(legendTitle);
                    let expectedDefaultTitleAndToolTipText: string = dataViews[0].categorical.categories[0].source.displayName;
                    expect(legendTitleText).toEqual(expectedDefaultTitleAndToolTipText);
                    expect(legendTitleTitle).toEqual(expectedDefaultTitleAndToolTipText);
                });

                it("Should set legend title and legend items with default font size", () => {
                    let defaultLabelFontSizeInPixels: string = Math.round(PixelConverter.fromPointToPixel(defaultLegendLabelFontSize)) + "px";
                    let legendGroup: JQuery = visualBuilder.LegendGroupElement;
                    let legendTitle: JQuery = legendGroup.find('.legendTitle');
                    let firstLegendItemText: JQuery = getLegendTextOfFirstLegendItem(legendGroup);
                    expect(legendTitle.css('font-size')).toBe(defaultLabelFontSizeInPixels);
                    expect(firstLegendItemText.css('font-size')).toBe(defaultLabelFontSizeInPixels);
                });
            });

            describe("Custom Legend", () => {
                let labelColor: string = powerbi.visuals.dataLabelUtils.defaultLabelColor;
                let labelFontSizeInPoints = 10;  // 10 (in points) ==> 13.333333 (in pixels)
                let labelFonSizeInPixels: string = Math.round(PixelConverter.fromPointToPixel(labelFontSizeInPoints)) + "px";
                let customLegendTitle = "My title";

                beforeEach(() => {
                    dataViews[0].metadata.objects = {
                        legend: {
                            titleText: customLegendTitle,
                            show: true,
                            showTitle: true,
                            labelColor: { solid: { color: labelColor } },
                            fontSize: labelFontSizeInPoints,
                            position: "LeftCenter",
                        }
                    };
                });

                it("Should add legend", () => {
                    visualBuilder.update(dataViews);

                    let legend: JQuery = $(".legend");
                    expect(legend).toBeInDOM();
                });

                it("Should add right amount of legend items", () => {
                    visualBuilder.update(dataViews);

                    let legendItems: JQuery = $("#legendGroup .legendItem");
                    expect(legendItems.length).toEqual(dataViews[0].categorical.categories[0].values.length);
                });

                it("Should set legend title & tooltip to user configured text", () => {
                    visualBuilder.update(dataViews);

                    let legendTitle: JQuery = visualBuilder.LegendGroupElement.children(".legendTitle");
                    expect(legendTitle.length).toEqual(1);

                    let legendTitleText: string = Helpers.findElementText(legendTitle);
                    let legendTitleTitle: string = Helpers.findElementTitle(legendTitle);
                    expect(legendTitleText).toEqual(customLegendTitle);
                    expect(legendTitleTitle).toEqual(customLegendTitle);
                });

                it('Should color legend title & items with user configured color', () => {
                    visualBuilder.update(dataViews);

                    let legendGroup: JQuery = visualBuilder.LegendGroupElement;
                    let legendTitle: JQuery = legendGroup.children('.legendTitle');
                    let firstLegendItemText: JQuery = getLegendTextOfFirstLegendItem(legendGroup);
                    Helpers.assertColorsMatch(legendTitle.css('fill'), labelColor);
                    Helpers.assertColorsMatch(firstLegendItemText.css('fill'), labelColor);
                });

                it('Should set legend title and legend items with user configured font size', () => {
                    visualBuilder.update(dataViews);

                    let legendGroup: JQuery = visualBuilder.LegendGroupElement;
                    let legendTitle: JQuery = legendGroup.find('.legendTitle');
                    let firstLegendItemText: JQuery = getLegendTextOfFirstLegendItem(legendGroup);
                    expect(legendTitle.css('font-size')).toBe(labelFonSizeInPixels);
                    expect(firstLegendItemText.css('font-size')).toBe(labelFonSizeInPixels);
                });
            });
        });
    });

    function getLegendTextOfFirstLegendItem(legendGroup: JQuery) {
        return legendGroup.children('.legendItem').first().children('.legendText');
    }

    class AsterPlotBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 200, width: number = 300, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element.children("svg");
        }

        public get LegendGroupElement(): JQuery {
            return this.element.children(".legend").children('#legendGroup');
        }

        private build(): void {
            if (this.isMinervaVisualPlugin) {
                this.visual = <any>powerbi.visuals.visualPluginFactory.create().getPlugin("asterPlot");
            } else {
                this.visual = new VisualClass();
            }
            }

            public updateWithViewport(dataViews: powerbi.DataView[], viewport: powerbi.IViewport ): void {
                this.visual.update(<powerbi.VisualUpdateOptions>{
                    dataViews: dataViews,
                    viewport: viewport
                });
        }
    }
}