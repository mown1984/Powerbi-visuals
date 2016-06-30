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
    import coreHelpers = powerbitests.helpers;
    import PixelConverter = jsCommon.PixelConverter;
    import VisualSettings = powerbi.visuals.samples.ChordChartSettings;
    import ChordChartData = powerbitests.customVisuals.sampleDataViews.ChordChartData;

	powerbitests.mocks.setLocale();
	
    describe("ChordChart", () => {
        let visualBuilder: ChordChartBuilder;
        let defaultDataViewBuilder: ChordChartData;
        let dataView: powerbi.DataView;
        let settings: VisualSettings;

        beforeEach(() => {
            visualBuilder = new ChordChartBuilder(1000,500);
            defaultDataViewBuilder = new ChordChartData();
            dataView = defaultDataViewBuilder.getDataView();
            settings = dataView.metadata.objects = <any>new VisualSettings();
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

                    expect(visualBuilder.mainElement.children("g.chords").children("path").length)
                        .toBe(valuesLength);
                    expect(visualBuilder.mainElement.children("g.ticks").children("g.slice-ticks").length)
                        .toBe(categoriesLength);
                    expect(visualBuilder.mainElement.children("g.slices").children("path.slice").length)
                        .toBe(categoriesLength);
                    expect(visualBuilder.element.find('.chordChart').attr('height')).toBe(visualBuilder.viewport.height.toString());
                    expect(visualBuilder.element.find('.chordChart').attr('width')).toBe(visualBuilder.viewport.width.toString());
                    done();
                });
            });

            it("update axis on", (done) => {
                settings.axis.show = true;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.ticks .slice-ticks').length).toBeGreaterThan(0);
                    done();
                });
            });

            it("update axis off", (done) => {
                settings.axis.show = false;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.element.find('.ticks .slice-ticks').length).toBe(0);
                    done();
                });
            });

            it("update labels on", (done) => {
                settings.labels.show = true;
                settings.labels.color = <any>{ solid: { color: "#222222" } };
                settings.labels.fontSize = 22;

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.dataLabels.length).toBeGreaterThan(0);
                    let label = visualBuilder.dataLabels.first();
                    coreHelpers.assertColorsMatch(label.css('fill'), "#222222");
                    expect(Math.round(parseInt(label.css('font-size'), 10)))
                        .toBe(Math.round(parseInt(PixelConverter.fromPoint(22), 10)));
                    done();
                });
            });

            it("update labels off", (done) => {
                settings.labels.show = false;
                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.dataLabels.length).toBe(0);
                    done();
                });
            });

            it("labels shouldn't be overlapped", (done) => {
                settings.labels.show = true;
                settings.labels.fontSize = 40;
                visualBuilder.viewport.height = 100;
                visualBuilder.viewport.width = 1000;

                visualBuilder.updateRenderTimeout(dataView, () => {
                    var isInRange = (value, min, max) => value >= min && value <= max;
                    expect(helpers.isSomeTextElementOverlapped(visualBuilder.dataLabels.toArray(), isInRange)).toBeFalsy();
                    done();
                }, 50);
            });

            it("labels shouldn't be cut off", (done) => {
                visualBuilder.viewport.height = 200;
                visualBuilder.viewport.width = 200;
                defaultDataViewBuilder.valuesValue = _.range(1, defaultDataViewBuilder.valuesCategoryGroup.length);

                dataView = defaultDataViewBuilder.getDataView();

                settings = dataView.metadata.objects = <any>new VisualSettings();
                settings.labels.show = true;

                visualBuilder.updateRenderTimeout(dataView, () => {
                    expect(visualBuilder.mainElement.children("g.labels")[0].getBoundingClientRect().left)
                        .toBeGreaterThan(0);
                    expect(helpers.isSomeTextElementInOrOutElement(
                        visualBuilder.mainElement[0],
                        visualBuilder.dataLabels.toArray(),
                        (v1,v2) => v1 >= v2)).toBeTruthy();
                    done();
                });
            });

            it("labels shouldn't be visible on right side", (done) => {
                visualBuilder.viewport.height = 500;
                visualBuilder.viewport.width = 500;
                
                defaultDataViewBuilder.valuesCategoryGroup = 
                    _.range(20).map(x => [x + "xxxxxxxxxxx", x + "yyyyyyyyyyyyyy"]);
                defaultDataViewBuilder.valuesValue =
                    _.range(1, defaultDataViewBuilder.valuesCategoryGroup.length);

                dataView = defaultDataViewBuilder.getDataView();

                settings = dataView.metadata.objects = <any>new VisualSettings();
                settings.labels.show = true;
                settings.labels.fontSize = 40;

                visualBuilder.updateRenderTimeout(dataView, () => {
                    var rightLabels = visualBuilder.dataLabels.filter((i,x) => parseFloat($(x).attr('x')) > 0);
                    expect(rightLabels).toBeInDOM();
                    done();
                });
            });
        });

        describe('enumerateObjectInstances', () => {
             it("update data Colors off", (done) => {
                settings.dataPoint.showAllDataPoints = false;
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'dataPoint' }, result => {
                    expect(result.instances[0].properties['showAllDataPoints']).toBeFalsy();
                    done();
                });
            });

            it("update data Colors on", (done) => {
                settings.dataPoint.showAllDataPoints = true;
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'dataPoint' }, result => {
                    expect(result.instances[0].properties['showAllDataPoints']).toBeTruthy();
                    expect(result.instances[1].properties['fill']).toBeDefined();
                    done();
                });
            });

            it('enumerateObjectInstances axis', (done) => {
                settings.axis.show = true;
                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'axis' }, result => {
                    expect(result.instances[0]).toBeDefined();
                    expect(result.instances[0].objectName).toBe('axis');
                    expect(result.instances[0].properties['show']).toBe(true);
                    done();
                });
            });

            it('enumerateObjectInstances labels', (done) => {
                settings.labels.show = true;
                settings.labels.fontSize = 20;
                settings.labels.color = <any>{ solid: { color: "#222222" } };

                visualBuilder.updateEnumerateObjectInstancesRenderTimeout(dataView, { objectName: 'labels' }, result => {
                    expect(result.instances[0]).toBeDefined();
                    expect(result.instances[0].objectName).toBe('labels');
                    expect(result.instances[0].properties['show']).toBe(settings.labels.show);
                    expect(result.instances[0].properties['color']).toBe("#222222");
                    expect(result.instances[0].properties['fontSize']).toBe(settings.labels.fontSize);
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
            return this.element.children("svg.chordChart").children("g");
        }

        public get dataLabels() {
            return this.mainElement.children("g.labels").children("text.data-labels");
        }

        protected build() {
            return new VisualClass();
        }

        public enumerateObjectInstances(options: powerbi.EnumerateVisualObjectInstancesOptions) {
            return this.visual.enumerateObjectInstances(options);
        }
    }
}
