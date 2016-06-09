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
    import VisualClass = powerbi.visuals.samples.ForceGraph;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import ForceGraphData = powerbitests.customVisuals.sampleDataViews.ForceGraphData;

    describe("ForceGraph", () => {
        let visualBuilder: ForceGraphBuilder;
        let defaultDataViewBuilder: ForceGraphData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new ForceGraphBuilder(1000,500);
            defaultDataViewBuilder = new ForceGraphData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            it("svg element created", () => expect(visualBuilder.element[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let categorySourceLength  = _.unique(dataView.categorical.categories[0].values).length;
                    let categoryTargetLength  = _.unique(dataView.categorical.categories[1].values).length;
                    expect(visualBuilder.mainElement.children("path.link").length).toBe(Math.max(categorySourceLength, categoryTargetLength));
                    expect(visualBuilder.mainElement.children("g.node").length).toBe(categorySourceLength + categoryTargetLength);
                    done();
                });
            });

            it("nodes labels on", done => {
                dataView.metadata.objects = { labels: { show: true } };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.children("g.node").first().find('text').length).toBe(1);
                    done();
                });
            });

            it("nodes labels off", done => {
                dataView.metadata.objects = { labels: { show: false } };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.children("g.node").first().find('text').length).toBe(0);
                    done();
                });
            });

            it("nodes labels change color", done => {
                dataView.metadata.objects = { 
                    labels: { 
                        color: { solid: { color: "#123123" } } 
                    } 
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.mainElement.children('g.node').first().find('text').css("fill"), "#123123");

                    dataView.metadata.objects = {
                        labels: {
                            color: { solid: { color: "#324435" } }
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        colorAssert(visualBuilder.mainElement.children('g.node').first().find('text').css("fill"), "#324435");
                        done();
                    });

                });
            });

            it("nodes labels change font size", done => {
                dataView.metadata.objects = {
                    labels: {
                        fontSize: 16
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let nodeTextFontSise = Math.round(parseFloat(
                        visualBuilder.mainElement.children('g.node').first().find('text').css("font-size")));
                    expect(nodeTextFontSise).toBe(21);
                    done();
                });
            });
        });
    });

    class ForceGraphBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get mainElement() {
            return this.element.children("svg.forceGraph");
        }
    }
}
