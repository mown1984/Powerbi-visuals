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

/// <reference path="../../_references.ts"/>

module powerbitests {
    import IVisualHostServices = powerbi.IVisualHostServices;

    describe("Debug Visual", () => {

        beforeEach(() => {
            powerbi.localStorageService.setData('DEVELOPMENT_SERVER_URL', 'vrm/');
            powerbi.localStorageService.setData('DEVELOPER_MODE_ENABLED', true);
        });

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
            let getSpy: jasmine.Spy;
            let getScriptSpy: jasmine.Spy;
            let getJSONSpy: jasmine.Spy;

            let mockVisualGuid = 'customDebugViz';
            class MockVisual implements powerbi.IVisual {
                init() { }
                update() { }
            }
            let mockVisualPlugin: powerbi.IVisualPlugin = {
                name: mockVisualGuid,
                class: mockVisualGuid,
                capabilities: {},
                create: () => new MockVisual(),
                custom: true
            };

            beforeEach(() => {

                host = mocks.createVisualHostServices();
                $element = helpers.testDom("500", "500");

                getSpy = spyOn($, 'get').and.callFake(url => {
                    let d = $.Deferred();
                    if (url.match(/status$/)) {
                        d.resolve(Date.now() + "\n" + mockVisualGuid);
                    } else if (url.match(/visual\.css$/)) {
                        d.resolve('.hello{}');
                    }
                    return d.promise();
                });
                
                getJSONSpy = spyOn($, 'getJSON').and.callFake(url => {
                    let d = $.Deferred();
                    d.resolve({
                        visual: {
                            guid: mockVisualGuid
                        },
                        capabilities: {}
                    });
                    return d.promise();
                });                

                getScriptSpy = spyOn($, 'getScript').and.callFake(url => {
                    let d = $.Deferred();
                    window['powerbi']['visuals']['plugins'][mockVisualGuid] = mockVisualPlugin;
                    d.resolve(null);
                    return d.promise();
                });

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
                    let elem = $element.find('.debugVisualContainer').find('.visual-' + mockVisualGuid);
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
                it("calling refresh should ask host to refesh", () => {
                    let adapterSpy = spyOn(powerbi.extensibility, 'createVisualAdapter').and.callThrough();
                    let hostSpy = spyOn((<any>debugVisual).host, 'visualCapabilitiesChanged').and.callFake(() => { });

                    expect(getJSONSpy.calls.count()).toBe(1);
                    expect(getScriptSpy.calls.count()).toBe(1);
                    expect(getSpy.calls.count()).toBe(2);

                    (<any>debugVisual).reloadAdapter();

                    expect(adapterSpy).toHaveBeenCalled();
                    expect(hostSpy).toHaveBeenCalled();
                    expect(getJSONSpy.calls.count()).toBe(2);
                    expect(getScriptSpy.calls.count()).toBe(2);
                    expect(getSpy.calls.count()).toBe(4);
                });

                it("update should be called upon refesh if previously updated", () => {
                    let adapterUpdateSpy = spyOn((<any>debugVisual).adapter, 'update');

                    debugVisual.update(buildUpdateOptions(viewport, null));
                    (<any>debugVisual).reloadAdapter();

                    expect(adapterUpdateSpy).toHaveBeenCalled();
                });
            });

            describe("auto refresh", () => {
                beforeEach(() => {
                    (<any>powerbi.visuals.system.DebugVisual).autoReloadPollTime = 0;
                });

                it("calling auto reload should set and clear the interval", () => {
                    expect((<any>debugVisual).autoReloadInterval).toBeFalsy();

                    (<any>debugVisual).toggleAutoReload();

                    expect((<any>debugVisual).autoReloadInterval).toBeTruthy();

                    (<any>debugVisual).toggleAutoReload();

                    expect((<any>debugVisual).autoReloadInterval).toBeFalsy();
                });

                it("should call refresh on interval", (done) => {
                    let reloadSpy = spyOn((<any>debugVisual), 'reloadAdapter');

                    (<any>debugVisual).toggleAutoReload();
                    expect(reloadSpy).not.toHaveBeenCalled();

                    setTimeout(() => {
                        expect(reloadSpy).toHaveBeenCalled();
                        done();
                    }, (<any>powerbi.visuals.system.DebugVisual).autoReloadPollTime);
                });
            });
        });

        describe("visual - offline", () => {
            let host: IVisualHostServices;
            let $element: JQuery;
            let initOptions: powerbi.VisualInitOptions;
            let debugVisual: powerbi.visuals.system.DebugVisual;
            let getSpy: jasmine.Spy;
            let getJSONSpy: jasmine.Spy;
            let getScriptSpy: jasmine.Spy;

            beforeEach(() => {

                host = mocks.createVisualHostServices();
                $element = helpers.testDom("500", "500");

                getSpy = spyOn($, 'get').and.callFake(url => {
                    let d = $.Deferred();
                    d.reject();
                    return d.promise();
                });
                
                getJSONSpy = spyOn($, 'getJSON').and.callFake(url => {
                    let d = $.Deferred();
                    d.reject();
                    return d.promise();
                });                

                getScriptSpy = spyOn($, 'getScript').and.callFake(url => {
                    let d = $.Deferred();
                    d.reject();
                    return d.promise();
                });

                initOptions = {
                    element: $element,
                    host: host,
                    viewport: viewport,
                    style: style
                };

                debugVisual = new powerbi.visuals.system.DebugVisual();
                debugVisual.init(initOptions);
            });

            describe("init", () => {
                it("Should display error message", () => {
                    let elem = $element.find('.debugVisualContainer .errorContainer');
                    expect(elem.length).toBe(1);
                });
            });
            
            describe("refresh", () => {
                it("Should not try to get script, json, or css if status call fails", () => {
                    expect(getSpy.calls.count()).toBe(1);
                    expect(getJSONSpy).not.toHaveBeenCalled();
                    expect(getScriptSpy).not.toHaveBeenCalled();

                    (<any>debugVisual).reloadAdapter();

                    expect(getSpy.calls.count()).toBe(2);
                    expect(getJSONSpy).not.toHaveBeenCalled();
                    expect(getScriptSpy).not.toHaveBeenCalled();
                });

            });            

            describe("auto refresh", () => {
                beforeEach(() => {
                    (<any>powerbi.visuals.system.DebugVisual).autoReloadPollTime = 0;
                });

                it("Should stop automatically on failures", (done) => {
                    (<any>debugVisual).toggleAutoReload();
                    expect((<any>debugVisual).autoReloadInterval).toBeTruthy();

                    setTimeout(() => {
                        expect((<any>debugVisual).autoReloadInterval).toBeFalsy();

                        done();
                    }, (<any>powerbi.visuals.system.DebugVisual).autoReloadPollTime);
                });
            });

        });

        describe("visual - disabled", () => {
            let host: IVisualHostServices;
            let $element: JQuery;
            let initOptions: powerbi.VisualInitOptions;
            let debugVisual: powerbi.visuals.system.DebugVisual;
            let getSpy: jasmine.Spy;

            beforeEach(() => {
                powerbi.localStorageService.setData('DEVELOPER_MODE_ENABLED', undefined);

                host = mocks.createVisualHostServices();
                $element = helpers.testDom("500", "500");

                getSpy = spyOn($, 'get');

                initOptions = {
                    element: $element,
                    host: host,
                    viewport: viewport,
                    style: style
                };

                debugVisual = new powerbi.visuals.system.DebugVisual();
                debugVisual.init(initOptions);
            });

            describe("init", () => {
                it("Should display error message", () => {
                    let elem = $element.find('.debugVisualContainer .errorContainer');
                    expect(elem.length).toBe(1);
                });

                it("Should not attempt to contact server", () => {
                    expect(getSpy).not.toHaveBeenCalled();
                });
            });

        });

    });
}