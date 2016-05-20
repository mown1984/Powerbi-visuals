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

module powerbitests {
    import IVisualHostServices = powerbi.IVisualHostServices;

    describe("Debug Visual", () => {
        const viewport: powerbi.IViewport = {
            height: 500,
            width: 500
        };
        let style = powerbi.visuals.visualStyles.create();

        describe("capabilities", () => {
            it("should register capabilities", () => {
                let plugin = powerbi.visuals.visualPluginFactory.create().getPlugin("debugVisual");

                expect(plugin).toBeDefined();
                expect(plugin.capabilities).toBe(powerbi.visuals.system.DebugVisual.capabilities);
            });
        });

        function buildUpdateOptions(viewport: powerbi.IViewport, object: powerbi.DataView): powerbi.VisualUpdateOptions {
            return {
                viewport: viewport,
                dataViews: [object],
            };
        };

        describe("visual", () => {
            let host: IVisualHostServices;
            let $element: JQuery;
            let initOptions: powerbi.VisualInitOptions;
            let debugVisual: powerbi.visuals.system.DebugVisual;

            beforeEach(() => {
                host = mocks.createVisualHostServices();
                $element = helpers.testDom("500", "500");

                initOptions = {
                    element: $element,
                    host: host,
                    viewport: viewport,
                    style: style
                };

                debugVisual = new powerbi.visuals.system.DebugVisual();
                debugVisual.init(initOptions);
            });

            describe("update", () => {               
                it("update with null dataview should call adaptor's update", () => {
                    let spy = spyOn((<any>debugVisual).adapter, 'update');
                    debugVisual.update(buildUpdateOptions(viewport, null));
                    let elem = $element.find('.debugVisualContainer').find('.custom');
                    expect(spy).toHaveBeenCalled();
                    expect(elem.length).toBe(1);
                });
            });

            describe("destroy", () => {
                it("destroy should call adaptor's destroy", () => {
                    let spy = spyOn((<any>debugVisual).adapter, 'destroy');
                    debugVisual.destroy();
                    expect(spy).toHaveBeenCalled();
                });
            });
            
            describe("refresh", () => {
                it("refresh should ask host to refesh", () => {
                    powerbi.localStorageService.setData('DEVELOPMENT_SERVER_URL', 'vrm/');
                    let hostSpy = spyOn((<any>debugVisual).host, 'visualCapabilitiesChanged').and.callFake(() => { });
                    let spy = spyOn($, 'get').and.callFake((one, two) => {
                        two('.hello{}');
                    });

                    let getScriptSpy = spyOn($, 'getScript').and.callFake((one, two) => {
                        two();
                    });

                    (<any>debugVisual).reloadAdapter();
                    expect(hostSpy).toHaveBeenCalled();
                    expect(getScriptSpy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });
}