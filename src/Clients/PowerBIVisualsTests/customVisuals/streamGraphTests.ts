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
    import InteractivityService = powerbi.visuals.InteractivityService;
    import SVGUtil = powerbi.visuals.SVGUtil;
    import VisualClass = powerbi.visuals.samples.StreamGraph;
    import StreamData = powerbi.visuals.samples.StreamData;
    import colorAssert = powerbitests.helpers.assertColorsMatch;

    powerbitests.mocks.setLocale();

    describe("StreamGraph", () => {
        describe('capabilities', () => {
            let streamGraphCapabilities = VisualClass.capabilities;

            it("registered capabilities", () => expect(streamGraphCapabilities).toBeDefined());

            it("Capabilities should include dataRoles", () => expect(streamGraphCapabilities.dataRoles).toBeDefined());

            it("Capabilities should include dataViewMappings", () => expect(streamGraphCapabilities.dataViewMappings).toBeDefined());

            it("Capabilities should include objects", () => expect(streamGraphCapabilities.objects).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: StreamGraphBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new StreamGraphBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.ProductSalesByDateData().getDataView()];
            });

            it("path is not throwing exceptions (NaN values)", () => {
                dataViews[0].categorical.values[0].values = [NaN];
                dataViews[0].categorical.values[1].values = [NaN];
                dataViews[0].categorical.values[2].values = [NaN];
                dataViews[0].categorical.values[3].values = [NaN];

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let containsNaN: boolean = false;
                $(".streamGraph .dataPointsContainer").children("path").each(function (index, value) {
                    let nanLocation: number = ($(value).attr("d")).indexOf("NaN");
                    containsNaN = nanLocation !== -1;
                    expect(containsNaN).toBeFalsy();
                });
            });

            it("should display text in x-axis and not values", () => {
                dataViews[0].categorical.categories[0].values = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let isNumber: boolean = false;
                let regExp = /\d/;
                $(".streamGraph .axisGraphicsContext .x.axis g").children("text").each(function (index, value) {
                    isNumber = regExp.test($(value).text());
                    expect(isNumber).toBeFalsy();
                });
            });

            it("should ellipsis text if its too long", () => {
                let dataView: powerbi.DataView[] = [new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataView()];

                let dataPointsArray: number[] = [];
                for (let i = 0; i < dataViews[0].categorical.values.length; i++) {
                    dataPointsArray = dataPointsArray.concat(dataView[0].categorical.values[i].values);
                }

                let max: number = _.max(dataPointsArray);
                dataView[0].categorical.values[0].values[0] = max * 1000.00;

                visualBuilder.update(dataView);
                SVGUtil.flushAllD3Transitions();

                let tick = $(".streamGraph .axisGraphicsContext .y.axis g").children("text").last().text();/*.each(function (index, value) { ticks.push($(value).text()); });*/
                let isNumber: number = 0;
                isNumber = tick.indexOf("…");
                expect(isNumber).toBeGreaterThan(-1);
            });

            it("x axis on", () => {
                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: true
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(xAxis).toBeInDOM();
                expect(xAxis.children("g.tick")).toBeInDOM();
                expect(xAxis.children('g').length).toBeGreaterThan(0);
            });

            it("x axis off", () => {
                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: false
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis").children('g');

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(xAxis.length).toBe(0);
            });

            it("y axis on", () => {
                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: true
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(yAxis).toBeInDOM();
                expect(yAxis.children("g.tick")).toBeInDOM();
                expect(yAxis.children('g').length).toBeGreaterThan(0);
            });

            it("y axis off", () => {
                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: false
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis").children('g');

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(yAxis.length).toBe(0);
            });

            it("x axis title on", () => {
                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: true,
                        showAxisTitle: true
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(xAxis.children("text")).toBeInDOM();
            });

            it("x axis title off", () => {
                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: true,
                        showAxisTitle: false
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(xAxis.children("text").length).toBe(0);
            });

            it("y axis title on", () => {
                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: true,
                        showAxisTitle: true
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(yAxis.children("text")).toBeInDOM();
            });

            it("y axis title off", () => {
                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: true,
                        showAxisTitle: false
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                expect(yAxis.children("text").length).toBe(0);
            });

            it("x axis change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: true,
                        labelColor: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis .tick");
                colorAssert(xAxis.children('text').css('fill'), blackColor);

                dataViews[0].metadata.objects = {
                    categoryAxis: {
                        show: true,
                        labelColor: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                colorAssert(xAxis.children('text').css("fill"), greyColor);
            });

            it("y axis change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: true,
                        labelColor: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis .tick");
                colorAssert(yAxis.children('text').css('fill'), blackColor);

                dataViews[0].metadata.objects = {
                    valueAxis: {
                        show: true,
                        labelColor: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                colorAssert(yAxis.children('text').css("fill"), greyColor);
            });

            it("data labels on", () => {
                dataViews[0].metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let labels = $(".streamGraph .labels");
                expect(labels).toBeInDOM();
                expect(labels.children('text').length).toBeGreaterThan(0);
            });

            it("data labels off", () => {
                dataViews[0].metadata.objects = {
                    labels: {
                        show: false
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let labels = $(".streamGraph .labels");
                expect(labels.length).toBe(0);
            });

            it("data labels change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataViews[0].metadata.objects = {
                    labels: {
                        show: true,
                        color: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let labels = $(".streamGraph .labels");
                colorAssert(labels.first().find('text').css("fill"), blackColor);

                dataViews[0].metadata.objects = {
                    labels: {
                        show: true,
                        color: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                colorAssert(labels.first().find('text').css("fill"), greyColor);
            });

            it("data labels change font size", () => {
                dataViews[0].metadata.objects = {
                    labels: {
                        show: true,
                        fontSize: 15,
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let labels = $(".streamGraph .labels");
                expect(labels.first().find('text').css("font-size")).toBe('20px');
            });

            it("data labels position validation", () => {
                dataViews = [new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataViewWithoutImages()];
                dataViews[0].metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();
                let labels = $(".streamGraph .labels").children('text');

                // First and last labels should not be shown
                expect(labels.length).toBe(3);

                // Verify that the first label is not drawn on the axis
                expect(labels.first().attr('x')).toBeGreaterThan(5);
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", () => {
                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();
                expect($('.streamGraph .layer').length).toBe(dataViews[0].categorical.values.length);
            });

            it("legend should be in DOM", () => {
                dataViews[0].metadata.objects = {
                    legend: {
                        show: true
                    }
                };
                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let legend = $(".legend");
                expect(legend).toBeInDOM();
            });

            it("Should add right amount of legend items", () => {
                dataViews = [new powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData().getDataView()];

                dataViews[0].metadata.objects = {
                    legend: {
                        show: true
                    },
                };
                visualBuilder.update(dataViews);
                SVGUtil.flushAllD3Transitions();

                let legendGroup = $(".legend #legendGroup");
                let legendItemsCount = legendGroup.children.length;
                expect(legendItemsCount).toBe(dataViews[0].categorical.values.length);
            });

            it('selection state set on converter result including clear', () => {
                let colors = powerbi.visuals.visualStyles.create().colorPalette.dataColors;

                // Create mock interactivity service
                let interactivityService = <InteractivityService>powerbi.visuals.createInteractivityService(visualBuilder.hostObject);
                let seriesSelectionId = powerbi.visuals.SelectionId.createWithMeasure(dataViews[0].metadata.columns[1].groupName);
                interactivityService['selectedIds'] = [seriesSelectionId];

                let streamData: StreamData = visualBuilder.converter(dataViews[0], colors, interactivityService);

                // We should see the selection state applied to resulting data
                expect(streamData.dataPoints[0][0].selected).toBe(true);
                expect(streamData.dataPoints[0][5].selected).toBe(true);
                expect(streamData.dataPoints[0][10].selected).toBe(true);
                expect(streamData.dataPoints[0][15].selected).toBe(true);
                expect(streamData.dataPoints[1][0].selected).toBe(false);
                expect(streamData.dataPoints[1][5].selected).toBe(false);
                expect(streamData.dataPoints[1][10].selected).toBe(false);
                expect(streamData.dataPoints[1][15].selected).toBe(false);

                interactivityService.clearSelection();
                streamData = visualBuilder.converter(dataViews[0], colors, interactivityService);

                // Verify the selection has been cleared
                expect(streamData.dataPoints[0][0].selected).toBe(false);
                expect(streamData.dataPoints[0][5].selected).toBe(false);
                expect(streamData.dataPoints[0][10].selected).toBe(false);
                expect(streamData.dataPoints[0][15].selected).toBe(false);
            });
        });
    });

    class StreamGraphBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 200, width: number = 300, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element.children('svg.streamGraph');
        }

        public get legendElement() {
            return this.element.children('svg.legend');
        }

        public get hostObject() {
            return this.host;
        }

        public initInteractivity(interactivity: powerbi.InteractivityOptions) {
            this.visual.init(
                {
                    element: this.element,
                    host: this.host,
                    style: this.style,
                    viewport: this.viewport,
                    interactivity: interactivity,
                }
            );
        }

        public converter(dataView: powerbi.DataView, colors: powerbi.IDataColorPalette, interactivityService: InteractivityService): StreamData {
            return this.visual.converter(dataView, colors, interactivityService);
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}