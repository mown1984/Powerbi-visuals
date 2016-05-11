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
    import GranularityType = powerbi.visuals.samples.GranularityType;
    import VisualClass = powerbi.visuals.samples.Timeline;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import TimeLineData = powerbi.visuals.samples.TimelineData;
    import TimelineCursorOverElement = powerbi.visuals.samples.TimelineCursorOverElement;

    powerbitests.mocks.setLocale();

    describe("Timeline", () => {
        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("converter", () => {
            let visualBuilder: TimelineBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new TimelineBuilder();
                dataViews = [new customVisuals.sampleDataViews.TimelineData().getDataView()];
            });

            it("prepareValues", () => {
                let prepareValuesResults: Date[],
                    values: any;

                values = [
                    new Date("2001-01-01"),
                    null,
                    undefined,
                    NaN
                ];

                prepareValuesResults = visualBuilder.visualObject.prepareValues(values);

                expect(prepareValuesResults).toBeDefined();
                expect(prepareValuesResults.length).toEqual(1);
                expect(prepareValuesResults[0].getTime()).toEqual(new Date("2001-01-01").getTime());
            });

            it("identity column name is not changed for non-hierarchical source", () => {
                visualBuilder.update(dataViews);

                let column = <powerbi.data.SQColumnRefExpr>dataViews[0].categorical.categories[0].identityFields[0];
                expect(column.ref).toEqual("Order Date");
            });
        });

        describe("DOM tests", () => {
            let visualBuilder: TimelineBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new TimelineBuilder();
                dataViews = [new customVisuals.sampleDataViews.TimelineData().getDataView()];
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("basic update", (done) => {
                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;
                setTimeout(() => {
                    let countOfDays = visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").length;
					let countOfTextItems = visualBuilder.mainElement.children("g.mainArea").children("g").children(".label").children().length;

                    expect(countOfDays).toBe(dataViews[0].categorical.categories[0].values.length);
                    expect(countOfTextItems).toBe(15);
					let cellRects = visualBuilder.mainElement.find(".cellRect");
					cellRects.last().d3Click(0, 0);
					let fill = window.getComputedStyle(cellRects[0]).fill;
					let hexFill = fill;
					if (_.startsWith(fill, '#')) {
						var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fill);
						hexFill = "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
					}
					expect(hexFill).toBe("rgb(255, 255, 255)");
					let cellHeight = parseInt(cellRects[0].attributes.getNamedItem("height").value.replace("px", ""), 10);
					expect(cellHeight).toBeLessThan(60.1);
					expect(cellHeight).toBeGreaterThan(29.9);
                    done();
                }, DefaultWaitForRender);
            });

            it("apply blank row data", (done) => {
                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;

                setTimeout(() => {
                    dataViews[0].categorical.categories[0].values.push(null);
                    visualBuilder.update(dataViews);

                    setTimeout(() => {
                        let countOfDays = visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").length;
                        expect(countOfDays).toBe(dataViews[0].categorical.categories[0].values.length-1);
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            });

            it("change color for header", (done) => {
                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;

                setTimeout(() => {
                    let item: powerbi.DataViewObjects = {
                        rangeHeader: {
                            fontColor: {
                                solid: {
                                    color: "#00B8AA"
                                }
                            }
                        }
                    };

                    colorAssert(visualBuilder.mainElement.children('g.rangeTextArea').children('text').css('fill'), '#777777');

                    dataViews[0].metadata.objects = item;
                    visualBuilder.update(dataViews);

                    setTimeout(() => {
                        colorAssert(visualBuilder.mainElement.children('g.rangeTextArea').children('text').css('fill'), '#00B8AA');
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            });

            it("change color for selected cell color", (done) => {
                dataViews[0].metadata.objects = {};
                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;

                setTimeout(() => {
                    let item: powerbi.DataViewObjects = {
                        cells: {
                            fillSelected: {
                                solid: {
                                    color: "#00B8AA"
                                }
                            }
                        }
                    };

                    colorAssert(visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").css('fill'), '#ADD8E6');

                    dataViews[0].metadata.objects = item;
                    visualBuilder.update(dataViews);

                    setTimeout(() => {
                        colorAssert(visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").css('fill'), '#00B8AA');
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            });

            it("change color for notselected cell color", (done) => {
                dataViews[0].metadata.objects = {};
                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;

                setTimeout(() => {
                    let item: powerbi.DataViewObjects = {
                        cells: {
                            fillUnselected: {
                                solid: {
                                    color: "#00B8AA"
                                }
                            }
                        }
                    };

                    colorAssert(visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").css('fill'), '#ADD8E6');

                    let rows = [
                        ['02.01.2014'], ];
                    let value = rows.map(function (value) {
                        let arr = value[0].split('.');
                        return (new Date(Number(arr[2]), Number(arr[1]) - 1, Number(arr[0]))); 
                    });
                    dataViews[0].categorical.categories[0].values = value;
                    dataViews[0].metadata.objects = item;
                    visualBuilder.update(dataViews);

                    setTimeout(() => {
                        colorAssert(visualBuilder.mainElement.children("g.mainArea").children(".cellsArea").children(".cellRect").css('fill'), '#00B8AA');
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            });

            describe("clearCatcher", () => {
                let clearCatcherElement: JQuery;

                beforeEach((done) => {
                    visualBuilder.update(dataViews);
                    visualBuilder.currentPeriod = GranularityType.day;

                    spyOn(visualBuilder.visualObject, "clear");

                    setTimeout(() => {
                        clearCatcherElement = visualBuilder.element.find(".clearCatcher");

                        done();
                    }, DefaultWaitForRender);
                });

                it("click - event", () => {
                    clearCatcherElement.d3Click(0, 0);

                    expectToCallMethodClear();
                });

                it("touchstart - event", () => {
                    clearCatcherElement.d3TouchStart();

                    expectToCallMethodClear();
                });

                function expectToCallMethodClear(): void {
                    expect(visualBuilder.visualObject["clear"]).toHaveBeenCalled();
                }
            });

            describe("granularity", () => {
                let periodSlicerSelectionRectElements: JQuery;

                beforeEach((done) => {
                    visualBuilder.update(dataViews);
                    visualBuilder.currentPeriod = GranularityType.month;

                    spyOn(visualBuilder.visualObject, "redrawPeriod");

                    setTimeout(() => {
                        periodSlicerSelectionRectElements = visualBuilder.element.find(".periodSlicerSelectionRect");

                        done();
                    }, DefaultWaitForRender);
                });

                it("mousedown - event", () => {
                    $(periodSlicerSelectionRectElements[0]).d3MouseDown(0, 0);

                    expectToCallRedrawPeriod(GranularityType.year);
                });

                it("touchstart - event", () => {
                    $(periodSlicerSelectionRectElements[4]).d3TouchStart();

                    expectToCallRedrawPeriod(GranularityType.day);
                });

                function expectToCallRedrawPeriod(granularity: GranularityType): void {
                    expect(visualBuilder.visualObject.redrawPeriod).toHaveBeenCalledWith(granularity);
                }
            });
        });

        describe("methods", () => {
            let visualBuilder: TimelineBuilder,
                dataViews: powerbi.DataView[];

            beforeEach((done) => {
                visualBuilder = new TimelineBuilder();
                dataViews = [new customVisuals.sampleDataViews.TimelineData().getDataView()];

                visualBuilder.update(dataViews);
                visualBuilder.currentPeriod = GranularityType.day;

                setTimeout(done, DefaultWaitForRender);
            });

            describe("findCursorOverElement", () => {
                it("-9999", () => {
                    expectToCallFindCursorOverElement(-9999, 0);
                });

                it("9999", () => {
                    expectToCallFindCursorOverElement(9999, 9);
                });

                it("120", () => {
                    expectToCallFindCursorOverElement(120, 2);
                });

                it("220", () => {
                    expectToCallFindCursorOverElement(220, 4);
                });

                function expectToCallFindCursorOverElement(x: number, expectedIndex: number): void {
                    let cursorOverElement: TimelineCursorOverElement = visualBuilder.visualObject.findCursorOverElement(x);

                    expect(cursorOverElement).not.toBeNull();
                    expect(cursorOverElement.index).toEqual(expectedIndex);
                    expect(cursorOverElement.datapoint).not.toBeNull();
                    expect(cursorOverElement.datapoint).not.toBeUndefined();
                }
            });
        });
    });

    class TimelineBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 400, width: number = 600, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get visualObject(): VisualClass {
            return this.visual;
        }

        public get mainElement() {
            return this.element
                .children("div")
                .children("svg.Timeline");
        }

        public set currentPeriod(period: number) {
            this.visual.selectPeriod(period);
        }

        public click(data: TimeLineData): void {
            this.visual.setSelection(data);
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}