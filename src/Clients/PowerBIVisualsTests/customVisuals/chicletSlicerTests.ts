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
    import VisualClass = powerbi.visuals.samples.ChicletSlicer;
    import colorAssert = powerbitests.helpers.assertColorsMatch;

    describe("ChicletSlicer", () => {
        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: ChicletSlicerBuilder;
            let dataViews: powerbi.DataView[];

            beforeEach(() => {
                visualBuilder = new ChicletSlicerBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataView()];
            });

            it("main element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());
            it("update", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    expect(visualBuilder.visibleGroup[0]).toBeInDOM();
                    expect(visualBuilder.visibleGroup.children("div.row").children(".cell").length)
                        .toBe(dataViews[0].categorical.categories[0].values.length);
                    done();
                }, DefaultWaitForRender);
            });

            it("change font size", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        textSize: 16
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    let fontUnit = 'px',
                        fontSize = visualBuilder.visibleGroup.children("div.row").children('.cell').first().find('span').css('font-size'),
                        fontSizeVal = Math.round(Number((fontSize.split(fontUnit))[0]))+fontUnit;

                    expect(fontSizeVal).toBe('21px');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets height", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        height: 50
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    expect(visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('height')).toBe('50px');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets width", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        width: 50
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    expect(visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('width')).toBe('50px');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets background", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        background: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.mainElement.children("div.slicerBody").css('background-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets background transparency", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        background: { solid: { color: '#123234' } },
                        transparency: 30
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.mainElement.children("div.slicerBody").css('background-color'), 'rgba(18, 50, 52, 0.701961)');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets selected color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        selectedColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    let item = visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first();
                    item.click();
                    colorAssert(item.css('background-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets unselected color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        unselectedColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('background-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets disabled color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        disabledColor: { solid: { color: '#123234' } }
                    }
                };

                let highlights = dataViews[0].categorical.values[0]['highlights'] = [];
                highlights.push(null);

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('background-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets outline color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        outlineColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets outline color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        outlineColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets text color", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        fontColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').first().find('span').css('color'), '#123234');
                    done();
                }, DefaultWaitForRender);
            });

            it("change chiclets outline style", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        borderStyle: "Rounded"
                    }
                };

                visualBuilder.update(dataViews);

                setTimeout(() => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-radius'), '10px');
                    done();
                }, DefaultWaitForRender);
            });

            it("fit chiclet height to font size with images", done => {
                dataViews[0].metadata.objects = {
                    rows: {
                        height: 0
                    }
                };

                visualBuilder.update(dataViews);
                setTimeout(() => {
                    let containerHeight: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer").height());
                    let slicerFontSize: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer .slicerText").css('font-size').replace(/[^-\d\.]/g, ''));
                    let textProp = powerbi.visuals.samples.ChicletSlicer.getChicletTextProperties(jsCommon.PixelConverter.toPoint(slicerFontSize)); 
                    let slicerTextDelta: number = powerbi.TextMeasurementService.estimateSvgTextBaselineDelta(textProp);
                    let slicerImgHeight: number = Number(visualBuilder.visibleGroup.find('div.row .cell:first .slicerItemContainer .slicer-img-wrapper').height());

                    expect(containerHeight).toBeGreaterThan(slicerFontSize + slicerTextDelta + slicerImgHeight);                                          
                    done();
                }, DefaultWaitForRender);
            });

            it("fit chiclet height to font size without images", done => {
                dataViews = [new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataViewWithoutImages()];
                dataViews[0].metadata.objects = {
                    rows: {
                        height: 0
                    }
                };

                visualBuilder.update(dataViews);
                setTimeout(() => {
                    let containerHeight: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer").height());
                    let slicerFontSize: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer .slicerText").css('font-size').replace(/[^-\d\.]/g, ''));
                    let textProp = powerbi.visuals.samples.ChicletSlicer.getChicletTextProperties(jsCommon.PixelConverter.toPoint(slicerFontSize));
                    let slicerTextDelta: number = powerbi.TextMeasurementService.estimateSvgTextBaselineDelta(textProp);

                    expect(containerHeight).toBeGreaterThan(slicerFontSize + slicerTextDelta);
                    done();
                }, DefaultWaitForRender);
            });

            describe('selection', function () {
                let selectionId = [{
                    "selectior":{"data":[]}
                }];

                it("chiclet selection is loaded", function (done) {
                    visualBuilder.update(dataViews);

                    setTimeout(function () {
                        let selectedItems = visualBuilder
                            .visibleGroup
                            .find('.slicerItemContainer')
                            .last().click();
                        visualBuilder.update(dataViews);

                        setTimeout(function () {
                            let savedSelectedItems = visualBuilder.getSelectedPoints();
                            expect(savedSelectedItems.length).toBe(selectedItems.length);
                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                    return true;
                });

                it("saved chiclet selection is received", function (done) {
                    dataViews[0].metadata.objects = {
                        general: {
                            selection: JSON.stringify( selectionId )
                        }
                    };
                    visualBuilder.update(dataViews);

                    setTimeout(function () {
                        let selection = visualBuilder.getSavedSelection();
                        expect(selection).toBeDefined();
                        expect(selection).toEqual( selectionId );
                        done();
                    }, DefaultWaitForRender);
                });

                it("chiclet selection is saved", function (done) {
                    visualBuilder.update(dataViews);
                    setTimeout(function () {
                        visualBuilder.saveSelection(selectionId);
                        visualBuilder.update(dataViews);

                        setTimeout(function () {
                            let selection =  visualBuilder.getSelectionState().items;
                            let stateSelection = visualBuilder.getSelectionState().state;
                            expect(selection).toBeDefined();
                            expect(stateSelection).toBeDefined();
                            expect(stateSelection).toBe(true);
                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                });
            });

        });
    });

    class ChicletSlicerBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 500, width: number = 500, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }
        private build(): void {
            this.visual = new VisualClass();
        }
        public get mainElement() {
            return this.element.children("div.chicletSlicer");
        }
        public get visibleGroup() {
            return this.mainElement
                .children("div.slicerBody")
                .children("div.scrollRegion")
                .children("div.visibleGroup");
        }
        public saveSelection(selectionIds): void {
            return this.visual['settings']['general'].setSavedSelection(selectionIds);
        }
        public getSelectedPoints() {
            return this.visual['behavior']
                .dataPoints
                .map( (item) => { if(item.selected) return item; })
                .filter(Boolean);
        }
        public getSavedSelection(): string[] {
            return this.visual['settings']['general'].getSavedSelection();
        }
        public getSelectionState() {
            return {
                items : this.visual['settings']['general']['selection'],
                state : this.visual['isSelectionSaved'],
            };
        }
    }
}
