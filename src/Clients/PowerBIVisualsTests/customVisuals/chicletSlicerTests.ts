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
    import VisualClass = powerbi.visuals.samples.ChicletSlicer;
    import CarLogosData = powerbitests.customVisuals.sampleDataViews.CarLogosData;
    import colorAssert = powerbitests.helpers.assertColorsMatch;
    import VisualBuilderBase = powerbitests.customVisuals.VisualBuilderBase;

    describe("ChicletSlicer", () => {
        let visualBuilder: ChicletSlicerBuilder;
        let defaultDataViewBuilder: CarLogosData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new ChicletSlicerBuilder(1000,500);
            defaultDataViewBuilder = new CarLogosData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            it("main element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());
            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.visibleGroup[0]).toBeInDOM();
                    expect(visualBuilder.visibleGroup.children("div.row").children(".cell").length)
                        .toBe(dataView.categorical.categories[0].values.length);
                    done();
                });
            });

            it("change font size", done => {
                dataView.metadata.objects = {
                    rows: {
                        textSize: 16
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let fontUnit = 'px',
                        fontSize = visualBuilder.visibleGroup.children("div.row").children('.cell').first().find('span').css('font-size'),
                        fontSizeVal = Math.round(Number((fontSize.split(fontUnit))[0]))+fontUnit;

                    expect(fontSizeVal).toBe('21px');
                    done();
                });
            });

            it("change chiclets height", done => {
                dataView.metadata.objects = {
                    rows: {
                        height: 50
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('height')).toBe('50px');
                    done();
                });
            });

            it("change chiclets width", done => {
                dataView.metadata.objects = {
                    rows: {
                        width: 50
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('width')).toBe('50px');
                    done();
                });
            });

            it("change chiclets background", done => {
                dataView.metadata.objects = {
                    rows: {
                        background: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.mainElement.children("div.slicerBody").css('background-color'), '#123234');
                    done();
                });
            });

            it("change chiclets background transparency", done => {
                dataView.metadata.objects = {
                    rows: {
                        background: { solid: { color: '#123234' } },
                        transparency: 30
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.mainElement.children("div.slicerBody").css('background-color'), 'rgba(18, 50, 52, 0.701961)');
                    done();
                });
            });

            it("change chiclets selected color", done => {
                dataView.metadata.objects = {
                    rows: {
                        selectedColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let item = visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first();
                    item.click();
                    colorAssert(item.css('background-color'), '#123234');
                    done();
                });
            });

            it("change chiclets unselected color", done => {
                dataView.metadata.objects = {
                    rows: {
                        unselectedColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('background-color'), '#123234');
                    done();
                });
            });

            it("change chiclets hover color", done => {
                dataView.metadata.objects = {
                    rows: {
                        hoverColor: { solid: { color: '#123234' } }
                    }
                };
                visualBuilder.updateRenderTimeout(dataView, () => {
                    $("div.row").children('.cell').children('.slicerItemContainer').first().attr('id', 'customHoveredEl');
                    document.getElementById('customHoveredEl').dispatchEvent( new Event('mouseover') );
                    colorAssert(d3.select( d3.select('#customHoveredEl').selectAll(".slicerText")[0].pop() ).style('color'), '#123234');
                    done();
                });
            });

            it("change chiclets disabled color", done => {
                dataView.metadata.objects = {
                    rows: {
                        disabledColor: { solid: { color: '#123234' } }
                    }
                };

                let highlights = dataView.categorical.values[0]['highlights'] = [];
                highlights.push(null);

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('background-color'), '#123234');
                    done();
                });
            });

            it("change chiclets outline color", done => {
                dataView.metadata.objects = {
                    rows: {
                        outlineColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-color'), '#123234');
                    done();
                });
            });

            it("change chiclets outline color", done => {
                dataView.metadata.objects = {
                    rows: {
                        outlineColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-color'), '#123234');
                    done();
                });
            });

            it("change chiclets text color", done => {
                dataView.metadata.objects = {
                    rows: {
                        fontColor: { solid: { color: '#123234' } }
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').first().find('span').css('color'), '#123234');
                    done();
                });
            });

            it("change chiclets outline style", done => {
                dataView.metadata.objects = {
                    rows: {
                        borderStyle: "Rounded"
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    colorAssert(visualBuilder.visibleGroup.children("div.row").children('.cell').children('.slicerItemContainer').first().css('border-radius'), '10px');
                    done();
                });
            });

            it("fit chiclet height to font size with images", done => {
                dataView.metadata.objects = {
                    rows: {
                        height: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let containerHeight: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer").height());
                    let slicerFontSize: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer .slicerText").css('font-size').replace(/[^-\d\.]/g, ''));
                    let textProp = powerbi.visuals.samples.ChicletSlicer.getChicletTextProperties(jsCommon.PixelConverter.toPoint(slicerFontSize)); 
                    let slicerTextDelta: number = powerbi.TextMeasurementService.estimateSvgTextBaselineDelta(textProp);
                    let slicerImgHeight: number = Number(visualBuilder.visibleGroup.find('div.row .cell:first .slicerItemContainer .slicer-img-wrapper').height());

                    expect(containerHeight).toBeGreaterThan(slicerFontSize + slicerTextDelta + slicerImgHeight);
                    done();
                });
            });

            it("fit chiclet height to font size without images", done => {
                dataView = new powerbitests.customVisuals.sampleDataViews.CarLogosData().getDataView([CarLogosData.ColumnCategory, CarLogosData.ColumnValues]);

                dataView.metadata.objects = {
                    rows: {
                        height: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let containerHeight: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer").height());
                    let slicerFontSize: number = Number(visualBuilder.visibleGroup.find("div.row .cell:first .slicerItemContainer .slicerText").css('font-size').replace(/[^-\d\.]/g, ''));
                    let textProp = powerbi.visuals.samples.ChicletSlicer.getChicletTextProperties(jsCommon.PixelConverter.toPoint(slicerFontSize));
                    let slicerTextDelta: number = powerbi.TextMeasurementService.estimateSvgTextBaselineDelta(textProp);

                    expect(containerHeight).toBeGreaterThan(slicerFontSize + slicerTextDelta);
                    done();
                });
            });

            xit("negative image split should behave like 0 (auto)", done => {
                dataView.metadata.objects = {
                    images: {
                        imageSplit: -1,
                    }
                };
                visualBuilder.update(dataView);
                let chicletImageHeight = visualBuilder.visibleGroup.find("div.row .cell .slicerItemContainer .slicer-img-wrapper").css('height');
                dataView.metadata.objects = {
                    images: {
                        imageSplit: 0,
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletImageHeight0 = visualBuilder.visibleGroup.find("div.row .cell .slicerItemContainer .slicer-img-wrapper").css('height');
                    expect(chicletImageHeight).toEqual(chicletImageHeight0);
                    done();
                });
            });

            it("negative chiclet rows number should behave like 0 rows (auto) when orientation is vertical", done => {
                dataView.metadata.objects = {
                    general: {
                        orientation: "Vertical",
                        Rows: -1
                    }
                };
                visualBuilder.update(dataView);
                let chicletTotalRows = visualBuilder.visibleGroup.children("div.row").first().children('.cell').length;
                dataView.metadata.objects = {
                    general: {
                        orientation: "Vertical",
                        Rows: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletTotalRows0 = visualBuilder.visibleGroup.children("div.row").first().children('.cell').length;
                    expect(chicletTotalRows).toEqual(chicletTotalRows0);
                    done();
                });
            });

            it("negative chiclet rows number should behave like 0 rows (auto) when orientation is horizontal", done => {
                dataView.metadata.objects = {
                    general: {
                        orientation: "Horizontal",
                        Rows: -1
                    }
                };
                visualBuilder.update(dataView);
                let chicletTotalRows = visualBuilder.visibleGroup.children("div.row").length;
                dataView.metadata.objects = {
                    general: {
                        orientation: "Horizontal",
                        Rows: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletTotalRows0 = visualBuilder.visibleGroup.children("div.row").length;
                    expect(chicletTotalRows).toEqual(chicletTotalRows0);
                    done();
                });
            });

            it("negative chiclet columns number should behave like 0 columns (auto) when orientation is vertical", done => {
                dataView.metadata.objects = {
                    general: {
                        orientation: "Vertical",
                        Columns: -1
                    }
                };
                visualBuilder.update(dataView);
                let chicletTotalColumns = visualBuilder.visibleGroup.children("div.row").length;
                dataView.metadata.objects = {
                    general: {
                        orientation: "Vertical",
                        Columns: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletTotalColumns0 = visualBuilder.visibleGroup.children("div.row").length;
                    expect(chicletTotalColumns).toEqual(chicletTotalColumns0);
                    done();
                });
            });

            it("negative chiclet columns number should behave like 0 columns (auto) when orientation is horizontal", done => {
                dataView.metadata.objects = {
                    general: {
                        orientation: "Horizontal",
                        Columns: -1
                    }
                };
                visualBuilder.update(dataView);
                let chicletTotalColumns = visualBuilder.visibleGroup.children("div.row").first().children('.cell').length;
                dataView.metadata.objects = {
                    general: {
                        orientation: "Horizontal",
                        Columns: 0
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletTotalColumns0 = visualBuilder.visibleGroup.children("div.row").first().children('.cell').length;
                    expect(chicletTotalColumns).toEqual(chicletTotalColumns0);
                    done();
                });
            });

            it("negative chiclet width should behave like 0 width (auto)", done => {
                dataView.metadata.objects = {
                    rows: {
                        width: -1,
                    }
                };

                visualBuilder.update(dataView);
                let chicletCellWidth = visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('width');
                dataView.metadata.objects = {
                    rows: {
                        width: 0,
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletCellWidth0 = visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('width');
                    expect(chicletCellWidth).toEqual(chicletCellWidth0);
                    done();
                });
            });

            xit("negative chiclet height should behave like 0 height (auto)", done => {
                dataView.metadata.objects = {
                    rows: {
                        height: -1,
                    }
                };

                visualBuilder.update(dataView);
                let chicletCellHeight = visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('height');

                dataView.metadata.objects = {
                    rows: {
                        height: 0,
                    }
                };

                visualBuilder.updateRenderTimeout(dataView, () => {
                    let chicletCellHeight0 = visualBuilder.visibleGroup.children("div.row").children('.cell').first().css('height');
                    expect(chicletCellHeight).toEqual(chicletCellHeight0);
                    done();
                });

            });

            describe('selection', () => {
                let selectionId = [{
                    "selectior":{"data":[]}
                }];

                it("chiclet selection is loaded", done => {
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let selectedItems = visualBuilder
                            .visibleGroup
                            .find('.slicerItemContainer')
                            .last().click();

                        visualBuilder.updateRenderTimeout(dataView, () => {
                            let savedSelectedItems = visualBuilder.getSelectedPoints();
                            expect(savedSelectedItems.length).toBe(selectedItems.length);
                            done();
                        });
                    });
                });

                it("saved chiclet selection is received", done => {
                    dataView.metadata.objects = {
                        general: {
                            selection: JSON.stringify( selectionId )
                        }
                    };

                    visualBuilder.updateRenderTimeout(dataView, () => {
                        let selection = visualBuilder.getSavedSelection();
                        expect(selection).toBeDefined();
                        expect(selection).toEqual( selectionId );
                        done();
                    });
                });

                it("chiclet selection is saved", done => {
                    visualBuilder.updateRenderTimeout(dataView, () => {
                        visualBuilder.saveSelection(selectionId);

                        visualBuilder.updateRenderTimeout(dataView, () => {
                            let selection =  visualBuilder.getSelectionState().items;
                            let stateSelection = visualBuilder.getSelectionState().state;
                            expect(selection).toBeDefined();
                            expect(stateSelection).toBeDefined();
                            expect(stateSelection).toBe(true);
                            done();
                        });
                    });
                });
            });

        });
    });

    class ChicletSlicerBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        protected build() {
            return new VisualClass();
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
            return this.visual['behavior']['dataPoints']
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
