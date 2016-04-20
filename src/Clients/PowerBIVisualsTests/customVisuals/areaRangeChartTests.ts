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
    import AreaRangeChart = powerbi.visuals.samples.AreaRangeChart;
    import SelectionId = powerbi.visuals.SelectionId;
    import VisualClass = powerbi.visuals.samples.AreaRangeChart;
    powerbitests.mocks.setLocale();

    describe("AreaRangeChart", () => {

        let visualBuilder: AreaRangeChartBuilder;
        let dataViews: powerbi.DataView[];

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            beforeEach(() => {
                visualBuilder = new AreaRangeChartBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.AreaRangeChartData().getDataView()];
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());
            it("update", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    expect(visualBuilder.mainElement.children("g.chart").children("path.area"))
                        .toBeInDOM();
                    expect(visualBuilder.mainElement.children("g.axis").children("g.axis").first().children("g.tick").length)
                        .toBe(dataViews[0].categorical.categories[0].values.length);
                    done();
                }, DefaultWaitForRender);
            });
        });

        describe("AreaRangeChart Dataview Validation", () => {
            let blankCategoryValue: string = '(Blank)';
            let colors = powerbi.visuals.visualStyles.create().colorPalette.dataColors;
            let hostServices = powerbitests.mocks.createVisualHostServices();

            beforeEach(() => {
                visualBuilder = new AreaRangeChartBuilder();
                dataViews = [new powerbitests.customVisuals.sampleDataViews.AreaRangeChartData().getDataView()];
            });

            it('selection state set on converter result including clear', () => {
                
                // Create mock interactivity service
                let interactivityService = <powerbi.visuals.InteractivityService>powerbi.visuals.createInteractivityService(hostServices);
                let seriesSelectionId = SelectionId.createWithMeasure(dataViews[0].metadata.columns[2].queryName);
                interactivityService['selectedIds'] = [seriesSelectionId];

                // We should see the selection state applied to resulting data
                let actualData = AreaRangeChart.converter(dataViews[0], blankCategoryValue, colors, false, interactivityService);

                // Verify the selection has been made
                expect(actualData.series[0].selected).toBe(true);
                for (let datapoint of actualData.series[0].data)
                    expect(datapoint.selected).toBe(true);

                interactivityService.clearSelection();
                actualData = AreaRangeChart.converter(dataViews[0], blankCategoryValue, colors, false, interactivityService);

                // Verify the selection has been cleared
                expect(actualData.series[0].selected).toBe(false);
                for (let datapoint of actualData.series[0].data)
                    expect(datapoint.selected).toBe(false);
            });
        });
    });

    class AreaRangeChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 200, width: number = 2000, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element.children("svg.areaRangeChart");
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}
