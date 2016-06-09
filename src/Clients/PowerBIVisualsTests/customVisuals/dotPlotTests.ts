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
    import VisualClass = powerbi.visuals.samples.DotPlot;
    import ValueByNameData = powerbitests.customVisuals.sampleDataViews.ValueByNameData;

    describe("DotPlot", () => {
        let visualBuilder: DotPlotBuilder;
        let defaultDataViewBuilder: ValueByNameData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new DotPlotBuilder(1000,500);
            defaultDataViewBuilder = new ValueByNameData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            xit("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.children(".dotplotSelector").children(".dotplotGroup").length)
                        .toBeGreaterThan(0);
                    expect(visualBuilder.mainElement.children('.axisGraphicsContext').children(".x.axis").children(".tick").length)
                        .toBe(dataView.categorical.categories[0].values.length);
					visualBuilder.mainElement.children(".labels").children(".data-labels").each((i, x) => {
						let fill = x.getAttribute("style").replace("fill: ", "").replace(";", "");
						let hexFill = fill;
						if (_.startsWith(fill, '#')) {
							var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fill);
							hexFill = "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
						}
						expect(hexFill).toBe("rgb(18, 52, 86)");
						expect(window.getComputedStyle(x).fontSize).toBe("12px");
					});
                    done();
                });

                it("X-Axis Tick Labels have tooltip", (done) => {
                    dataView = defaultDataViewBuilder.getLongNamesDataView();
                    visualBuilder.update(dataView);
                    setTimeout(() => {
                        let numOfTicks: number = $('.tick').length;
                        /*TODO: run foreach tick*/
                        for (let i = 0; i < numOfTicks; i++)
                            expect(powerbitests.helpers.findElementText($('.tick').find('text').eq(i))).toContain('…');

                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(0))).toEqual('Sir Demetrius');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(1))).toEqual('Sir Montgomery');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(2))).toEqual('Sir Remington');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(3))).toEqual('Sir Forrester');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(4))).toEqual('Sir Christopher');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(5))).toEqual('Miss Annabelle');
                        expect(powerbitests.helpers.findElementTitle($('.tick').find('text').eq(6))).toEqual('Miss Emmaline');
                        done();
                    }, powerbitests.DefaultWaitForRender);
                });
            });
        });

        describe("xAxis tests", () => {
            beforeEach(() => {
                dataView.metadata.objects = {
                    categoryAxis: {
                        show: true,
                        showAxisTitle: true
                    }
                };
            });

            xit("check show xAxis", () => {
                visualBuilder.update(dataView);

                let lines = $('line');
                expect(lines.length).toEqual(7);
            });

            xit("check hide xAxis", () => {
                dataView.metadata.objects["categoryAxis"]["show"] = false;
                visualBuilder.update(dataView);

                let lines = $('line');
                for (var index = 0; index < lines.length; index++)
                    expect(lines[index].style.opacity).toEqual('0');
            });

            it("check hide xAxis label", (done) => {
                dataView.metadata.objects["categoryAxis"]["show"] = false;
                dataView.metadata.objects["categoryAxis"]["showAxisTitle"] = false;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let lines = $('.xAxisLabel');
                    expect(lines.length).toEqual(0);
                    done();
                });
            });

            xit("check show xAxis label", () => {
                dataView.metadata.objects["categoryAxis"]["showAxisTitle"] = true;
                visualBuilder.update(dataView);

                let lines = $('.xAxisLabel');
                expect(lines.length).toEqual(1);
            });

            xit("check label color", (done) => {
                let customColor = '#ff0000';
                dataView.metadata.objects["categoryAxis"]["labelColor"] = { solid: { color: customColor } };
                dataView.metadata.objects["categoryAxis"]["show"] = true;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let title = $('.xAxisLabel');
                    expect(title.css('fill')).toEqual(customColor);
                    let texts = d3.selectAll('g.tick text');
                    for (let i = 0; i < texts.length; i++)
                        for (let j = 0; j < texts[i].length; j++)
                            expect(texts[i][j].style.fill).toEqual(customColor);
                    done();
                });
            });
        });
    });

    class DotPlotBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
        }

        public get mainElement() {
            return this.element.children('svg');
        }
    }
}
