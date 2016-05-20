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
    import DataView = powerbi.DataView;
    import InteractivityService = powerbi.visuals.InteractivityService;
    import VisualClass = powerbi.visuals.samples.StreamGraph;
    import StreamData = powerbi.visuals.samples.StreamData;
    import StreamGraphSeries = powerbi.visuals.samples.StreamGraphSeries;
    import colorAssert = powerbitests.helpers.assertColorsMatch;

    powerbitests.mocks.setLocale();

    describe("StreamGraph", () => {
        let visualBuilder: StreamGraphBuilder;
        let defaultDataViewBuilder: powerbitests.customVisuals.sampleDataViews.ProductSalesByDateData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new StreamGraphBuilder(500, 1000);
            defaultDataViewBuilder = new powerbitests.customVisuals.sampleDataViews.ProductSalesByDateData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            let streamGraphCapabilities = VisualClass.capabilities;

            it("registered capabilities", () => expect(streamGraphCapabilities).toBeDefined());

            it("Capabilities should include dataRoles", () => expect(streamGraphCapabilities.dataRoles).toBeDefined());

            it("Capabilities should include dataViewMappings", () => expect(streamGraphCapabilities.dataViewMappings).toBeDefined());

            it("Capabilities should include objects", () => expect(streamGraphCapabilities.objects).toBeDefined());
        });

        describe("DOM tests", () => {
            it("path is not throwing exceptions (NaN values)", () => {
                dataView.categorical.values[0].values = [NaN];
                dataView.categorical.values[1].values = [NaN];
                dataView.categorical.values[2].values = [NaN];
                dataView.categorical.values[3].values = [NaN];

                visualBuilder.updateflushAllD3Transitions(dataView);

                let containsNaN: boolean = false;
                $(".streamGraph .dataPointsContainer").children("path").each(function (index, value) {
                    let nanLocation: number = ($(value).attr("d")).indexOf("NaN");
                    containsNaN = nanLocation !== -1;
                    expect(containsNaN).toBeFalsy();
                });
            });

            it("should display text in x-axis and not values", () => {
                dataView.categorical.categories[0].values = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                visualBuilder.updateflushAllD3Transitions(dataView);

                let isNumber: boolean = false;
                let regExp = /\d/;
                $(".streamGraph .axisGraphicsContext .x.axis g").children("text").each(function (index, value) {
                    isNumber = regExp.test($(value).text());
                    expect(isNumber).toBeFalsy();
                });
            });

            it("should ellipsis text if its too long", () => {
                dataView = new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataView();

                let dataPointsArray: number[] = [];
                for (let i = 0; i < dataView.categorical.values.length; i++) {
                    dataPointsArray = dataPointsArray.concat(dataView.categorical.values[i].values);
                }

                let max: number = _.max(dataPointsArray);
                dataView.categorical.values[0].values[0] = max * 1000.00;

                visualBuilder.updateflushAllD3Transitions(dataView);

                let tick = $(".streamGraph .axisGraphicsContext .y.axis g").children("text").last().text();/*.each(function (index, value) { ticks.push($(value).text()); });*/
                let isNumber: number = 0;
                isNumber = tick.indexOf("…");
                expect(isNumber).toBeGreaterThan(-1);
            });

            it("x axis on", () => {
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(xAxis).toBeInDOM();
                expect(xAxis.children("g.tick")).toBeInDOM();
                expect(xAxis.children('g').length).toBeGreaterThan(0);
            });

            it("x axis off", () => {
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: false
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis").children('g');

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(xAxis.length).toBe(0);
            });

            it("y axis on", () => {
                dataView.metadata.objects = {
                    valueAxis: {
                        show: true
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(yAxis).toBeInDOM();
                expect(yAxis.children("g.tick")).toBeInDOM();
                expect(yAxis.children('g').length).toBeGreaterThan(0);
            });

            it("y axis off", () => {
                dataView.metadata.objects = {
                    valueAxis: {
                        show: false
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis").children('g');

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(yAxis.length).toBe(0);
            });

            it("x axis title on", () => {
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true,
                        showAxisTitle: true
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(xAxis.children("text")).toBeInDOM();
            });

            it("x axis title off", () => {
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true,
                        showAxisTitle: false
                    }
                };
                let xAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(xAxis.children("text").length).toBe(0);
            });

            it("y axis title on", () => {
                dataView.metadata.objects = {
                    valueAxis: {
                        show: true,
                        showAxisTitle: true
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(yAxis.children("text")).toBeInDOM();
            });

            it("y axis title off", () => {
                dataView.metadata.objects = {
                    valueAxis: {
                        show: true,
                        showAxisTitle: false
                    }
                };
                let yAxis = $(".streamGraph .axisGraphicsContext");

                visualBuilder.updateflushAllD3Transitions(dataView);

                expect(yAxis.children("text").length).toBe(0);
            });

            it("x axis change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true,
                        labelColor: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let xAxis = $(".streamGraph .axisGraphicsContext .x.axis .tick");
                colorAssert(xAxis.children('text').css('fill'), blackColor);

                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true,
                        labelColor: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                colorAssert(xAxis.children('text').css("fill"), greyColor);
            });

            it("y axis change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataView.metadata.objects = {
                    valueAxis: {
                        show: true,
                        labelColor: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let yAxis = $(".streamGraph .axisGraphicsContext .y.axis .tick");
                colorAssert(yAxis.children('text').css('fill'), blackColor);

                dataView.metadata.objects = {
                    valueAxis: {
                        show: true,
                        labelColor: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                colorAssert(yAxis.children('text').css("fill"), greyColor);
            });

            it("data labels on", () => {
                dataView.metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels");
                expect(labels).toBeInDOM();
                expect(labels.children('text').length).toBeGreaterThan(0);
            });

            it("data labels off", () => {
                dataView.metadata.objects = {
                    labels: {
                        show: false
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels");
                expect(labels.length).toBe(0);
            });

            it("data labels change color", () => {
                let blackColor = "#111111";
                let greyColor = "#999999";
                dataView.metadata.objects = {
                    labels: {
                        show: true,
                        color: { solid: { color: blackColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels");
                colorAssert(labels.first().find('text').css("fill"), blackColor);

                dataView.metadata.objects = {
                    labels: {
                        show: true,
                        color: { solid: { color: greyColor } }
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                colorAssert(labels.first().find('text').css("fill"), greyColor);
            });

            it("data labels change font size", () => {
                dataView.metadata.objects = {
                    labels: {
                        show: true,
                        fontSize: 15,
                    }
                };

                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels");
                expect(labels.first().find('text').css("font-size")).toBe('20px');
            });

            it("data labels position validation", () => {
                dataView = new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataViewWithoutImages();
                dataView.metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.viewport.width = 300;
                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels").children('text');

                // For 5 series that have 5 values each we should see only 13
                // 25 values - 5 from the left and 5 from the right are cut, 2 are colliding with other labels
                expect(labels.length).toBe(15);

                // Verify that the first label is not drawn on the axis
                expect(labels.first().attr('x')).toBeGreaterThan(5);
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", () => {
                visualBuilder.updateflushAllD3Transitions(dataView);
                expect($('.streamGraph .layer').length).toBe(dataView.categorical.values.length);
            });

            it("legend should be in DOM", () => {
                dataView.metadata.objects = {
                    legend: {
                        show: true
                    }
                };
                visualBuilder.updateflushAllD3Transitions(dataView);

                let legend = $(".legend");
                expect(legend).toBeInDOM();
            });

            it("Should add right amount of legend items", () => {
                dataView = new powerbitests.customVisuals.sampleDataViews.SalesByDayOfWeekData().getDataView();

                dataView.metadata.objects = {
                    legend: {
                        show: true
                    },
                };
                visualBuilder.updateflushAllD3Transitions(dataView);

                let legendGroup = $(".legend #legendGroup");
                let legendItemsCount = legendGroup.children.length;
                expect(legendItemsCount).toBe(dataView.categorical.values.length);
            });
        });

        describe("Converter tests", () => {
            let streamData: StreamData,
                interactivityService: InteractivityService,
                colors: powerbi.IDataColorPalette = powerbi.visuals.visualStyles.create().colorPalette.dataColors;

            beforeEach(() => {
                interactivityService = <InteractivityService>powerbi.visuals.createInteractivityService(visualBuilder.host);
                streamData = visualBuilder.converter(dataView, colors, interactivityService);
            });

            it("streamData is defined", () => {
                expect(streamData).toBeDefined();
                expect(streamData).not.toBeNull();
            });

            describe("Series", () => {
                let series: StreamGraphSeries[];

                beforeEach(() => {
                    series = streamData.series;
                });

                it("Series are defined", () => {
                    expect(series).toBeDefined();
                    expect(series).not.toBeNull();
                });

                it("Identity is defined with key", () => {
                    for (let layer of series) {
                        expect(layer.identity).not.toBeNull();
                        expect(layer.identity.getKey()).toBeDefined();
                    }
                });
            });

            it('Selection state set on converter result including clear', () => {

                // Create mock interactivity service
                let seriesSelectionId = powerbi.visuals.SelectionId.createWithMeasure(dataView.metadata.columns[1].queryName);
                interactivityService['selectedIds'] = [seriesSelectionId];

                let series: powerbi.visuals.samples.StreamGraphSeries[] = visualBuilder.converter(dataView, colors, interactivityService).series;

                // We should see the selection state applied to resulting data
                expect(series[0].selected).toBe(true);
                expect(series[1].selected).toBe(false);
                expect(series[2].selected).toBe(false);
                expect(series[3].selected).toBe(false);

                interactivityService.clearSelection();
                series = visualBuilder.converter(dataView, colors, interactivityService).series;

                // Verify the selection has been cleared
                expect(series[0].selected).toBe(false);
                expect(series[1].selected).toBe(false);
                expect(series[2].selected).toBe(false);
                expect(series[3].selected).toBe(false);
            });
        });
    });

    class StreamGraphBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number, width: number, isMinervaVisualPlugin: boolean = false) {
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

        public converter(dataView: DataView, colors: powerbi.IDataColorPalette, interactivityService: InteractivityService): StreamData {
            return this.visual.converter(dataView, colors, interactivityService);
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}