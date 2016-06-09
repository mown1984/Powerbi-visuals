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
    powerbitests.mocks.setLocale();
    import VisualClass = powerbi.visuals.samples.WordCloud;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import CountriesData = powerbitests.customVisuals.sampleDataViews.CountriesData;

    describe("WordCloud", () => {
        let visualBuilder: WordCloudBuilder;
        let defaultDataViewBuilder: CountriesData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new WordCloudBuilder(1000,500);
            defaultDataViewBuilder = new CountriesData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        // function that returns afghanistan from an array
        const func = e => e.innerHTML === "Afghanistan" || e.textContent === "Afghanistan";

        // function that uses grep to filter
        const grep = (val) => {
            return $.grep(val, func);
        };

        describe("DOM tests", () => {
            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("basic update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.children("g").children("g.words").children("text.word").length)
                        .toBeGreaterThan(0);
                    done();
                });
            });

            it("Word stop property change", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray()).length)
                        .toBeGreaterThan(0);

                    dataView.metadata.objects = { stopWords: { show: true, words: "Afghanistan" } };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray()).length)
                            .toBe(0);
                        done();
                    });
                }, 100);
            });

            it("Word returns after word stop property is changed back", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray()).length)
                        .toBeGreaterThan(0);

                    dataView.metadata.objects = { stopWords: { show: true, words: "Afghanistan" } };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        expect(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray()).length)
                            .toBe(0);

                        dataView.metadata.objects = { stopWords: { show: false } };

                        visualBuilder.updateRenderTimeout(dataView, () => {
                            expect(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray()).length)
                                .toBeGreaterThan(0);
                            done();
                        });
                    }, 100);
                }, 200);
            });

            it("change color for first country (Afghanistan)", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let baseWordColor = $(grep(visualBuilder.mainElement.children("g").children("g.words").children("text.word").toArray())).css('fill');

                    dataView.categorical.categories[0].objects = [{ dataPoint: { fill: { solid: { color: "#00B8AA" } } } }];

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        colorAssert(($(grep(visualBuilder.mainElement
                            .children("g")
                            .children("g.words")
                            .children("text.word").toArray())).css('fill')), baseWordColor, true);
                        done();
                    });
                }, 100);
            });

            it("click on first visual, then click on the second visual dosen't remove items", (done) => {
                let secondVisualBuilder = new WordCloudBuilder(500, 1000);

                visualBuilder.update(dataView);

                secondVisualBuilder.updateRenderTimeout(dataView, () => {
                    let firstWord = visualBuilder.mainElement.children("g").children("g.words").children("text.word").first();
                    firstWord.d3Click(parseInt(firstWord.attr("x"), 10), parseInt(firstWord.attr("y"), 10));
                    setTimeout(() => {
                        let secondWord = secondVisualBuilder.mainElement.children("g").children("g.words").children("text.word").first();
                        secondWord.d3Click(parseInt(secondWord.attr("x"), 10), parseInt(secondWord.attr("y"), 10));
                        setTimeout(() => {
                            expect(secondVisualBuilder.mainElement.children("g").children("g.words").children("text.word").length).toBe(
                                visualBuilder.mainElement.children("g").children("g.words").children("text.word").length);
                            done();
                        });
                    });
                }, 100);
            });
        });
    });

    class WordCloudBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get mainElement() {
            return this.element.children("svg.wordCloud");
        }
    }
}
