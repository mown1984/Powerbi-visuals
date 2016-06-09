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
    import VisualClass = powerbi.visuals.samples.SankeyDiagram;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import SankeyDiagramData = powerbitests.customVisuals.sampleDataViews.SankeyDiagramData;

    describe("SankeyDiagram", () => {
        let visualBuilder: SankeyDiagramBuilder;
        let defaultDataViewBuilder: SankeyDiagramData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new SankeyDiagramBuilder(1000,500);
            defaultDataViewBuilder = new SankeyDiagramData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            it("main element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                 visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.linksElement).toBeInDOM();
                    expect(visualBuilder.linksElements.length)
                        .toBe(dataView.categorical.categories[0].values.length);

                    let allCountries: string[] = dataView.categorical.categories[0].values.concat(dataView.categorical.categories[1].values);
                    let uniqueCountries = allCountries.sort().filter((value, index, array) => !index || value !== array[index - 1]);

                    expect(visualBuilder.nodesElement).toBeInDOM();
                    expect(visualBuilder.nodesElements.length)
                        .toEqual(uniqueCountries.length);

                    done();
                });
            });

            it("nodes labels on", done => {
                dataView.metadata.objects = {
                    labels: {
                        show: true
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.nodesElement.find('text').first().css('display')).toBe('block');
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
                    expect(visualBuilder.nodesElement.find('text').first().css('display')).toBe('none');
                    done();
                });
            });

            it("nodes labels change color", done => {
                dataView.metadata.objects = {
                    labels: {
                        fill: { solid: { color: "#123123" } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.nodesElement.find('text').first().css('fill'), "#123123");
                    done();
                });
            });

            it("link change color", done => {
                let objects = dataView.categorical.categories[0].objects = [];
                objects.push({
                    links: {
                        fill: { solid: { color: "#E0F600" } }
                    }
                });

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.linksElement.find('.link').first().css('stroke'), "#E0F600");
                    done();
                });
            });

            describe("selection and deselection", () => {
                const selectionSelector = ".selected";

                it("nodes", done => {
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.nodesElements.filter(selectionSelector)).not.toBeInDOM();
                        let node = visualBuilder.nodesElements.first();
                        powerbitests.helpers.clickElement(node);

                        helpers.renderTimeout(() => {
                            expect(node.filter(selectionSelector)).not.toBeInDOM();
                            expect(visualBuilder.nodesElements.filter(selectionSelector)).toBeInDOM();

                            powerbitests.helpers.clickElement(node);
                            helpers.renderTimeout(() => {
                                expect(visualBuilder.nodesElements.filter(selectionSelector)).not.toBeInDOM();
                                done();
                            });
                        });
                    });
                });

                it("links", done => {
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(visualBuilder.linksElements.filter(selectionSelector)).not.toBeInDOM();
                        let link = visualBuilder.linksElements.first();
                        powerbitests.helpers.clickElement(link);

                        helpers.renderTimeout(() => {
                            expect(link.filter(selectionSelector)).toBeInDOM();
                            expect(visualBuilder.linksElements.not(link).filter(selectionSelector)).not.toBeInDOM();

                            powerbitests.helpers.clickElement(link);
                            helpers.renderTimeout(() => {
                                expect(visualBuilder.linksElements.filter(selectionSelector)).not.toBeInDOM();
                                done();
                            });
                        });
                    });
                });
            });

            describe("data rendering", () => {
                it("negative and zero values", done => {
                    let dataLength: number = defaultDataViewBuilder.valuesSourceDestination.length;
                    let groupLength = Math.floor(dataLength/3) - 2;
                    let negativeValues = helpers.getRandomNumbers(groupLength, -100, 0);
                    let zeroValues = _.range(0, groupLength, 0);
                    let positiveValues = helpers.getRandomNumbers(dataLength - negativeValues.length - zeroValues.length, 1, 100);

                    defaultDataViewBuilder.valuesValue = negativeValues.concat(zeroValues).concat(positiveValues);

                    visualBuilder.updateRenderTimeout([defaultDataViewBuilder.getDataView()], () => {
                        expect(visualBuilder.linksElements.length).toBe(positiveValues.length);

                        done();
                    });
                });
            });
        });
    });

    class SankeyDiagramBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get mainElement(): JQuery {
            return this.element.children("svg.sankeyDiagram");
        }

        public get nodesElement(): JQuery  {
            return this.mainElement.children("g").children("g.nodes");
        }

        public get nodesElements(): JQuery  {
            return this.nodesElement.children("g.node");
        }

        public get linksElement(): JQuery  {
            return this.mainElement.children("g").children("g.links");
        }

        public get linksElements(): JQuery  {
            return this.linksElement.children("path.link");
        }
    }
}
