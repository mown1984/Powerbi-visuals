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
    import VisualClass = powerbi.visuals.samples.Gantt;
    import DataView = powerbi.DataView;

    describe("Gantt", () => {
        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            let visualBuilder: GanttBuilder;
            let dataViews: DataView[];

            beforeEach(() => {
                visualBuilder = new GanttBuilder();
                dataViews = [new customVisuals.sampleDataViews.GanttData().getDataView()];
            });

            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.update(dataViews);
                setTimeout(() => {
                    let countOfTaskLines = visualBuilder.mainElement
                        .children("g.task-lines")
                        .children("rect")
                        .length;
                    let countOfTaskLabels = visualBuilder.mainElement
                        .children("g.task-labels")
                        .children("text")
                        .length;
                    let countOfTasks = visualBuilder.mainElement
                        .children("g.chart")
                        .children("g.tasks")
                        .children("g.task")
                        .length;

                    expect(countOfTaskLines).toBe(dataViews[0].matrix.rows.root.children.length);
                    expect(countOfTaskLabels).toBe(dataViews[0].matrix.rows.root.children.length);
                    expect(countOfTasks).toBe(dataViews[0].matrix.rows.root.children.length);

                    done();
                }, DefaultWaitForRender);
            });
        });
    });

    class GanttBuilder extends VisualBuilderBase<VisualClass> {
        constructor(height: number = 200, width: number = 300, isMinervaVisualPlugin: boolean = false) {
            super(height, width, isMinervaVisualPlugin);
            this.build();
            this.init();
        }

        public get mainElement() {
            return this.element
                .children("rect.clearCatcher")
                .children("div.chart")
                .children("div.gantt-body")
                .children("svg");
        }

        private build(): void {
            this.visual = new VisualClass();
        }
    }
}