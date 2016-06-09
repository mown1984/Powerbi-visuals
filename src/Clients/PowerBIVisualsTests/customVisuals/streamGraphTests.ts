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
    import DataView = powerbi.DataView;
    import VisualClass = powerbi.visuals.samples.StreamGraph;
    import StreamData = powerbi.visuals.samples.StreamData;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import ProductSalesByDateData = powerbitests.customVisuals.sampleDataViews.ProductSalesByDateData;
    import IDataColorPalette = powerbi.IDataColorPalette;
    import DataColorPalette = powerbi.visuals.DataColorPalette;
    import StreamDataPoint = powerbi.visuals.samples.StreamDataPoint;
    import SelectionId = powerbi.visuals.SelectionId;

    powerbitests.mocks.setLocale();

    describe("StreamGraph", () => {
        let visualBuilder: StreamGraphBuilder,
            defaultDataViewBuilder: ProductSalesByDateData,
            dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new StreamGraphBuilder(1000, 500);
            defaultDataViewBuilder = new ProductSalesByDateData();
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
            xit("path is not throwing exceptions (NaN values)", () => {
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

            xit("should display text in x-axis and not values", () => {
                dataView.categorical.categories[0].values = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                visualBuilder.updateflushAllD3Transitions(dataView);

                let isNumber: boolean = false;
                let regExp = /\d/;
                $(".streamGraph .axisGraphicsContext .x.axis g").children("text").each(function (index, value) {
                    isNumber = regExp.test($(value).text());
                    expect(isNumber).toBeFalsy();
                });
            });

            xit("should ellipsis text if its too long", () => {
                dataView = new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataView();

                let dataPointsArray: number[] = [];
                for (let i = 0; i < dataView.categorical.values.length; i++) {
                    dataPointsArray = dataPointsArray.concat(dataView.categorical.values[i].values);
                }

                dataView.categorical.values[0].values[0] = 1e+14;

                visualBuilder.updateflushAllD3Transitions(dataView);

                let tick = $(".streamGraph .axisGraphicsContext .y.axis g").children("text").last().text();/*.each(function (index, value) { ticks.push($(value).text()); });*/
                expect(tick.indexOf("…")).toBeGreaterThan(-1);
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

            xit("x axis title on", () => {
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

            xit("y axis title on", () => {
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

            xit("x axis change color", () => {
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

            xit("y axis change color", () => {
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

            xit("data labels on", () => {
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

            xit("data labels change color", () => {
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

            xit("data labels change font size", () => {
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

            xit("data labels position validation", () => {
                let dataViewBuilder = new powerbitests.customVisuals.sampleDataViews.ValueByNameData();
                dataViewBuilder.valuesValue = d3.range(dataViewBuilder.valuesCategory.length);
                dataView = dataViewBuilder.getDataView();
                let dataLength = dataView.categorical.categories[0].values.length;
                dataView.metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.viewport.width = 300;
                visualBuilder.updateflushAllD3Transitions(dataView);

                let labels = $(".streamGraph .labels").children('text');

                // 10 values - 1 from the left and 1 from the right are cut
                expect(labels.length).toBe(dataLength - 2);

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

        describe("converter", () => {
            let colors: IDataColorPalette;

            beforeEach(() => {
                colors = new DataColorPalette();
            });

            it("arguments are null", () => {
                callConverterAndExpectExceptions(null, null);
            });

            it("arguments are undefined", () => {
                callConverterAndExpectExceptions(undefined, undefined);
            });

            it("dataView is correct", () => {
                callConverterAndExpectExceptions(dataView, colors);
            });

            describe("streamData", () => {
                let streamData: StreamData;

                beforeEach(() => {
                    streamData = callConverterAndExpectExceptions(dataView, colors);
                });

                it("streamData is defined", () => {
                    expect(streamData).toBeDefined();
                    expect(streamData).not.toBeNull();
                });

                it("dataPoints is defined", () => {
                    let dataPoints: StreamDataPoint[][] = streamData.dataPoints;

                    expect(dataPoints).toBeDefined();
                    expect(dataPoints).not.toBeNull();
                });

                it("every dataPoint is defined", () => {
                    streamData.dataPoints.forEach((dataPoint: StreamDataPoint[]) => {
                        expect(dataPoint).toBeDefined();
                        expect(dataPoint).not.toBeNull();
                        expect(dataPoint.length).toBeGreaterThan(0);
                    });
                });

                it("every item of dataPoint is defined", () => {
                    streamData.dataPoints.forEach((dataPoint: StreamDataPoint[]) => {
                        dataPoint.forEach((streamDataPoint: StreamDataPoint) => {
                            expect(streamDataPoint).toBeDefined();
                            expect(streamDataPoint).not.toBeNull();
                        });
                    });
                });

                it("every identity of dataPoint is defined", () => {
                    streamData.dataPoints.forEach((dataPoint: StreamDataPoint[]) => {
                        dataPoint.forEach((streamDataPoint: StreamDataPoint) => {
                            let identity: SelectionId = streamDataPoint.identity;

                            expect(identity).toBeDefined();
                            expect(identity).not.toBeNull();
                        });
                    });
                });
            });

            function callConverterAndExpectExceptions(dataView: DataView, colors: powerbi.IDataColorPalette): StreamData {
                let streamData: StreamData;

                expect(() => {
                    streamData = visualBuilder.converter(dataView, colors);
                }).not.toThrow();

                return streamData;
            }
        });
    });

    class StreamGraphBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get mainElement() {
            return this.element.children('svg.streamGraph');
        }

        public get legendElement() {
            return this.element.children('svg.legend');
        }

        public converter(dataView: DataView, colors: powerbi.IDataColorPalette): StreamData {
            return this.visual.converter(dataView, colors);
        }
    }
}