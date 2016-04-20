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
    import VisualClass = powerbi.visuals.samples.Histogram;

    describe("HistogramChart", () => {
        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: HistogramChartBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new HistogramChartBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.ValueByAgeData().getDataView()];
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());
            it("update", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {                    
                    var binsNumber = d3.layout.histogram().frequency(true)(dataViews[0].categorical.categories[0].values).length;
                    expect(visualBuilder.mainElement.find('.column').length).toBe(binsNumber);
                    done();
                }, DefaultWaitForRender);
            });
        });

        describe('property pane changes', () => {
            let visualBuilder: HistogramChartBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new HistogramChartBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.ValueByAgeData().getDataView()];
            });

            it('Validate data point color change', (done) => {
                dataViews[0].metadata.objects = {
                    dataPoint: {
                        fill: {
                            solid: { color: '#ff0000' }
                        }
                    }
                };

                visualBuilder.update(dataViews);
                setTimeout(() => {
                    var elements = visualBuilder.mainElement.find('.column');
                    elements.each((index, elem) => {
                        expect($(elem).css('fill')).toBe('#ff0000');
                    });
                    done();
                }, DefaultWaitForRender);
            });

            it('Validate bins count change', (done) => {
                dataViews[0].metadata.objects = {
                    general: {
                        bins: 3
                    }
                };
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    var binsCount = visualBuilder.mainElement.find('.column').length;
                    dataViews[0].metadata.objects = {
                        general: {
                            bins: 6
                        }
                    };

                    visualBuilder.update(dataViews);
                    setTimeout(() => {
                        var binsAfterUpdate = visualBuilder.mainElement.find('.column').length;
                        expect(binsCount).toBe(3);
                        expect(binsAfterUpdate).toBeGreaterThan(binsCount);
                        expect(binsAfterUpdate).toBe(6);
                        done();
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);                
            });

            it('Validate start bigger than end at y axis', (done) => {
                dataViews[0].metadata.objects = {
                    yAxis: {
                        start: 65,
                        end:33
                    }
                };

                visualBuilder.update(dataViews);
                setTimeout(() => {
                    var firstY = parseInt(visualBuilder.mainElement.find('.axis:last .tick:first text').text(),10);
                    expect(firstY).toBe(0);
                  
                    done();
                }, DefaultWaitForRender);
            });

            it('Validate Data Label', (done) => {
                dataViews[0].metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.update(dataViews);
                setTimeout(() => {
                    var columns = (visualBuilder.mainElement.find('.columns rect')).length;
                    var dataLabels = (visualBuilder.mainElement.find('.labels text')).length;
                    expect(columns).toBe(dataLabels);

                    done();
                }, DefaultWaitForRender);
            });
        });
    });

    class HistogramChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 200, width: number = 1000, isMinervaVisualPlugin: boolean = false) {
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
    }
}

