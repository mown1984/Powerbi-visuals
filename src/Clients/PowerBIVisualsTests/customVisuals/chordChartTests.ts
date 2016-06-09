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
    import VisualClass = powerbi.visuals.samples.ChordChart;
    import VisualBuilderBase = powerbitests.customVisuals.VisualBuilderBase;
    import helpers = powerbitests.helpers;
    import PixelConverter = jsCommon.PixelConverter;
    import ValueByNameGroupData = powerbitests.customVisuals.sampleDataViews.ValueByNameGroupData;

	powerbitests.mocks.setLocale();
	
    describe("ChordChart", () => {
        let visualBuilder: ChordChartBuilder;
        let defaultDataViewBuilder: ValueByNameGroupData;
        let dataView: powerbi.DataView;

        beforeEach(() => {
            visualBuilder = new ChordChartBuilder(1000,500);
            defaultDataViewBuilder = new ValueByNameGroupData();
            dataView = defaultDataViewBuilder.getDataView();
        });

        describe('capabilities', () => {
            it("registered capabilities", () => expect(VisualClass.capabilities).toBeDefined());
        });

        describe("DOM tests", () => {
            it("svg element created", () => expect(visualBuilder.mainElement[0]).toBeInDOM());

            it("update", (done) => {
                visualBuilder.updateRenderTimeout(dataView, () => {
                    let valuesLength = _.sum(dataView.categorical.values.map(x => x.values.filter(_.isNumber).length));
                    let categoriesLength = dataView.categorical.values.length + dataView.categorical.categories[0].values.length;

                    expect(visualBuilder.mainElement.children("g").children("g.chords").children("path").length)
                        .toBe(valuesLength);
                    expect(visualBuilder.mainElement.children("g").children("g.ticks").children("g.slice-ticks").length)
                        .toBe(categoriesLength);
                    expect(visualBuilder.mainElement.children("g").children("g.slices").children("path.slice").length)
                        .toBe(categoriesLength);
                    expect(visualBuilder.element.find('.chordChart').attr('height')).toBe(visualBuilder.viewport.height.toString());
                    expect(visualBuilder.element.find('.chordChart').attr('width')).toBe(visualBuilder.viewport.width.toString());
                    done();
                });
            });

            it("update axis on", (done) => {
                dataView.metadata.objects = { axis: { show: true } };
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.ticks .slice-ticks').length).toBeGreaterThan(0);
                    done();
                });
            });

            it("update axis off", (done) => {

                let axis: powerbi.DataViewObjects = { axis: { show: false } };
                dataView.metadata.objects = axis;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.ticks .slice-ticks').length).toBe(0);
                    done();
                });
            });

            it("update labels on", (done) => {
                dataView.metadata.objects = { labels: { show: true, color: { solid: { color: '#222222' } }, fontSize: 22 } };
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.labels .data-labels').length).toBeGreaterThan(0);
                    let label = visualBuilder.element.find('.labels .data-labels').first();
                    helpers.assertColorsMatch(label.css('fill'), "#222222");
                    expect(Math.round(parseInt(label.css('font-size'), 10))).toBe(Math.round(parseInt(PixelConverter.fromPoint(22), 10)));
                    done();
                });
            });

            it("update labels off", (done) => {
                dataView.metadata.objects = { labels: { show: false } };
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.labels .data-labels').length).toBe(0);
                    done();
                });
            });
        });

        describe('enumerateObjectInstances', () => {
             xit("update data Colors off", (done) => {
                dataView.metadata.objects = { dataPoint: { showAllDataPoints: false } };
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'dataPoint' }, result => {
                    expect(result[1].properties['showAllDataPoints']).toBeFalsy();
                    expect(result[2]).toBeUndefined();
                    done();
                });
            });

            it("update data Colors on", (done) => {
                dataView.metadata.objects = { dataPoint: { showAllDataPoints: true } };
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'dataPoint' }, result => {
                    expect(result[1].properties['showAllDataPoints']).toBeTruthy();
                    expect(result[2].properties['fill']).toBeDefined();
                    done();
                });
            });

            it('enumerateObjectInstances axis', (done) => {
                dataView.metadata.objects = { axis: { show: true } };
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'axis' }, result => {
                    expect(result[0]).toBeDefined();
                    expect(result[0].objectName).toBe('axis');
                    expect(result[0].displayName).toBe('Axis');
                    expect(result[0].properties['show']).toBe(true);
                    done();
                });
            });

            it('enumerateObjectInstances labels', (done) => {
                dataView.metadata.objects = { labels: { show: true, fontSize: '20px', color: { solid: { color: '#222222' } } } };
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'labels' }, result => {
                    expect(result[0]).toBeDefined();
                    expect(result[0].objectName).toBe('labels');
                    expect(result[0].displayName).toBe('Labels');
                    expect(result[0].properties['show']).toBe(true);
                    expect(result[0].properties['color']).toBe('#222222');
                    expect(result[0].properties['fontSize']).toBe('20px');
                    done();
                });
            });
        });
    });

    class ChordChartBuilder extends VisualBuilderBase<VisualClass> {
        constructor(width: number, height: number, isMinervaVisualPlugin: boolean = false) {
            super(width, height, isMinervaVisualPlugin);
        }

        public get mainElement() {
            return this.element.children("svg.chordChart");
        }

        protected build() {
            return new VisualClass();
        }

        public enumerateObjectInstances(options: powerbi.EnumerateVisualObjectInstancesOptions): powerbi.VisualObjectInstance[] {
            return this.visual.enumerateObjectInstances(options);
        }
    }
}
