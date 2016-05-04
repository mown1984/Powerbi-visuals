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
    import VisualClass = powerbi.visuals.samples.PulseChart;

    describe("PulseChart", () => {
        afterEach(() => helpers.d3TimerEnabled = true);

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: PulseChartBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new PulseChartBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.PulseChartData().getDataView()];
            });

            it("svg element created", () =>expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataViews, () => {
                    expect(visualBuilder.mainElement.children("g.y.axis").children("g.tick")).toBeInDOM();
                    expect(visualBuilder.gaps).toBeInDOM();
                    expect(visualBuilder.animationDot).toBeInDOM();
                    expect(visualBuilder.lineContainer.children("path.line")).toBeInDOM();
                    expect(visualBuilder.xAxisNode.children("path.domain")).toBeInDOM();
                    expect(visualBuilder.xAxisNode.children("g.tick")).toBeInDOM();
                    expect(visualBuilder.tooltipContainer).toBeInDOM();
                    done();
                });
            });

            describe("popup", () => {
                it("always on top - chart height", (done) => {
                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        let charHeight = visualBuilder.chart[0].getBoundingClientRect().height;
                        helpers.setMetadataObjects(dataViews, { popup: { alwaysOnTop: true } });

                        visualBuilder.updateRenderTimeout(dataViews, () => {
                            expect(visualBuilder.chart[0].getBoundingClientRect().height).toBeGreaterThan(charHeight);
                            done();
                        });
                    });
                });

                it("hidden - chart height and top", (done) => {
                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        let position = helpers.getRelativePosition(visualBuilder.element, visualBuilder.chart);
                        let charHeight = visualBuilder.chart[0].getBoundingClientRect().height;
                        helpers.setMetadataObjects(dataViews, { popup: { show: false } });

                        visualBuilder.updateRenderTimeout(dataViews, () => {
                            expect(visualBuilder.chart[0].getBoundingClientRect().height).toBeGreaterThan(charHeight);
                            expect(helpers.getRelativePosition(visualBuilder.element, visualBuilder.chart).y).toBeLessThan(position.y);
                            done();
                        });
                    });
                });

                describe("interaction", () => {
                    it("click", (done) => {
                        visualBuilder.updateRenderTimeout(dataViews, () => {
                            let firstDot = visualBuilder.dotsContainerDot.first();
                            powerbitests.helpers.clickElement(firstDot);

                            helpers.renderTimeout(() => {
                                let firstPopup = visualBuilder.tooltipContainerTooltip.first();
                                expect(firstPopup).toBeInDOM();
                                powerbitests.helpers.clickElement(firstDot);

                                helpers.renderTimeout(() => {
                                    expect(firstPopup).not.toBeInDOM();
                                    done();
                                });
                            });
                        });
                    });
                });
            });

            describe("dots", () => {
                it("default dot size", (done) => {
                    let dotSize = 25;
                    helpers.setMetadataObjects(dataViews, { dots: { 
                        size: dotSize,
                        minSize: dotSize - 1,
                        maxSize: dotSize + 1
                    } });

                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        expect(_.parseInt(visualBuilder.dotsContainerDot.attr('r'))).toEqual(dotSize);
                        done();
                    });
                });
            });

            describe("xAxis", () => {
                it("backgroundColor set", (done) => {
                    let color = "#FF0000";
                    helpers.setMetadataObjects(dataViews, { xAxis: { backgroundColor: { solid: { color: color } } } });

                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        powerbitests.helpers.assertColorsMatch(
                            visualBuilder.xAxisNodeTick.children("rect.axisBox").css("fill"), color);
                        done();
                    });
                });
            });

            describe("playback", () => {
                it("autoplay position set", (done) => {
                    helpers.setMetadataObjects(dataViews, {
                        playback: {
                            autoplay: true,
                            position: JSON.stringify(<powerbi.visuals.samples.PulseChartAnimationPosition>{ 
                                    series: 0,
                                    index: dataViews[0].categorical.categories[0].values.length/2
                                })
                        }
                    });

                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        let pathElem = visualBuilder.lineContainer.children("path.line");
                        let chartWidth = visualBuilder.chart[0].getBoundingClientRect().width;
                        let pathWidth = pathElem[0].getBoundingClientRect().width;

                        expect(pathWidth).toBeGreaterThan(chartWidth/3);
                        expect(pathWidth).toBeLessThan(chartWidth*2/3);
                        done();
                    });
                });

                it("popup is hidden when pressing play during pause", (done) => {
                    helpers.d3TimerEnabled = false;

                    let eventIndex = dataViews[0].categorical.values[1].values
                        .map((x, i) => <any>{ value: x, index: i }).filter(x => x.value)[0].index;

                    helpers.setMetadataObjects(dataViews, {
                        playback: {
                            autoplay: true,
                            position: JSON.stringify(<powerbi.visuals.samples.PulseChartAnimationPosition>{ 
                                    series: 0,
                                    index: eventIndex - 1
                                })
                            }
                         });

                    visualBuilder.updateRenderTimeout(dataViews, () => {
                        let popup = visualBuilder.tooltipContainerTooltip.first();
                        expect(popup).toBeInDOM();
                        powerbitests.helpers.clickElement(visualBuilder.animationPlay);

                        helpers.renderTimeout(() => {
                            expect(popup).not.toBeInDOM();
                            done();
                        });
                    });
                });
            });
        });
    });

    class PulseChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 500, width: number = 800, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement(): JQuery {
            return this.element.children('svg.pulseChart');
        }

        public get gaps(): JQuery {
            return this.mainElement.children('g.gaps');
        }

        public get animationDot(): JQuery {
            return this.mainElement.children('g.dots').children("circle.animationDot");
        }

        public get chart(): JQuery {
            return this.mainElement.children('g.chart');
        }

        public get lineNode(): JQuery {
            return this.chart.children('g.lineNode');
        }

        public get lineContainer(): JQuery {
            return this.lineNode.children('g.lineContainer');
        }

        public get dotsContainer(): JQuery {
            return this.lineNode.children('g.dotsContainer');
        }

        public get dotsContainerDot(): JQuery {
            return this.dotsContainer.children("circle.dot");
        }

        public get xAxisNode(): JQuery {
            return this.lineNode.children('g.xAxisNode');
        }

        public get xAxisNodeTick(): JQuery {
            return this.xAxisNode.children("g.tick");
        }

        public get tooltipContainer(): JQuery {
            return this.lineNode.children('g.tooltipContainer');
        }

        public get tooltipContainerTooltip(): JQuery {
            return this.tooltipContainer.children('g.Tooltip');
        }

        public get animationPlay(): JQuery {
            return this.mainElement.children("g").children("g.animationPlay");
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}