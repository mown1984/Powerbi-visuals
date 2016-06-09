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

module powerbi.visuals {
    const unsupportedVisuals: string[] = ['play', 'subview', 'smallMultiple'];

    export interface IHostInformation {
        name: string;
    }

    export interface IVisualPluginService {
        getPlugin(type: string): IVisualPlugin;
        getVisuals(): IVisualPlugin[];
        capabilities(type: string): VisualCapabilities;
        removeAnyCustomVisuals(): void;
        requireSandbox(plugin: IVisualPlugin): boolean;
        isCustomVisual(visual: string): boolean;
        isScriptVisual(type: string): boolean;
        // VSTS 6217994 - [R Viz] Remove temporary DataViewAnalysis validation workaround of static R Script Visual mappings
        isScriptVisualQueryable(): boolean;
        shouldDisableVisual(type: string, mapDisabled: boolean): boolean;
        getInteractivityOptions(visualType: string): InteractivityOptions;
        getTelemetryHostInformation: () => IHostInformation;
    }

    export interface MinervaVisualFeatureSwitches {
        /**
         * This feature switch enables the data-dot & column combo charts.
         */
        dataDotChartEnabled?: boolean;

        /**
         * Visual should prefer to request a higher volume of data.
         */
        preferHigherDataVolume?: boolean;

        sandboxVisualsEnabled?: boolean;

        /**
        * R visual is enabled for consumption.
        * When turned on, R script will be executed against local R (for PBID) or AML (for PBI.com).
        * When turned off, R script will not be executed and the visual is treated as a static image visual.
        */
        scriptVisualEnabled?: boolean;

        /**
        * R visual is enabled for authoring.
        * When turned on, R visual will appear in the visual gallery.
        */
        scriptVisualAuthoringEnabled?: boolean;

        isLabelInteractivityEnabled?: boolean;

        sunburstVisualEnabled?: boolean;

        filledMapDataLabelsEnabled?: boolean;

        lineChartLabelDensityEnabled?: boolean;

        /**
         * Enables button to center map to the current location
         */
        mapCurrentLocationEnabled?: boolean;

        /**
         * Enables conditional formatting of the background color of cells for table visuals.
         */
        conditionalFormattingEnabled?: boolean;

        tooltipBucketEnabled?: boolean;
        
        /**
         * Load more data for Cartesian charts (column, bar, line, and combo). 
         */
        cartesianLoadMoreEnabled?: boolean;
    }

    export module visualPluginFactory {
        export class VisualPluginService implements IVisualPluginService {
            
            private plugins: jsCommon.IStringDictionary<IVisualPlugin>;
            protected featureSwitches: MinervaVisualFeatureSwitches;

            public constructor(featureSwitches: MinervaVisualFeatureSwitches) {
                this.plugins = <any>powerbi.visuals.plugins;
                this.featureSwitches = featureSwitches;
            }

            /**
             * Gets metadata for all registered.
             */
            public getVisuals(): IVisualPlugin[] {
                let registry = this.plugins,
                    names: string[] = Object.keys(registry);

                return names.map(name => registry[name]);
            }

            public getPlugin(type: string): IVisualPlugin {
                if (!type) {
                    return;
                }

                let plugin: IVisualPlugin = this.plugins[type];
                if (!plugin) {
                    return;
                }

                return plugin;
            }

            public capabilities(type: string): VisualCapabilities {
                let plugin = this.getPlugin(type);
                if (plugin)
                    return plugin.capabilities;
            }

            public requireSandbox(plugin: IVisualPlugin): boolean {
                return plugin && plugin.custom;
            }

            public removeAnyCustomVisuals() {
                let plugins = powerbi.visuals.plugins;
                for (let key in plugins) {
                    let p: IVisualPlugin = plugins[key];
                    if (p.custom) {
                        delete plugins[key];
                    }
                }
            }

            public isCustomVisual(visual: string): boolean {
                if (visual) {

                    if (this.plugins[visual]) {
                        return this.plugins[visual].custom === true;
                    }
                    else if (_.include(unsupportedVisuals, visual)) {
                        /*use the hardcoded unsupported visual list to distinguish unsupported visual with custom visual when the plugin object is not in memory*/
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }

            public isScriptVisual(type: string): boolean{
                let visualCapabilities = this.capabilities(type);
                if (visualCapabilities && visualCapabilities.dataViewMappings && ScriptResultUtil.findScriptResult(visualCapabilities.dataViewMappings)) {
                    return true;
                }
                return false;
            }

            public shouldDisableVisual(type: string, mapDisabled: boolean): boolean {
                return (type === plugins.map.name || type === plugins.filledMap.name) && mapDisabled;
            }

            public isScriptVisualQueryable(): boolean {
                // Feature switch determines if Script visuals are query visuals - currently non-query in PBI site
                return (this.featureSwitches !== undefined && this.featureSwitches.scriptVisualEnabled);
            }

            public getInteractivityOptions(visualType: string): InteractivityOptions {
                let interactivityOptions: InteractivityOptions = {
                    overflow: 'hidden',
                };
                return interactivityOptions;
            }

            getTelemetryHostInformation(): IHostInformation {
                return { name: "" };
            }
        }

        export function createPlugin(
            visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>,
            base: IVisualPlugin,
            create: IVisualFactoryMethod,
            modifyPluginFn?: (plugin: IVisualPlugin) => void): void {

            let visualPlugin = Prototype.inherit(base);
            visualPlugin.create = create;
            if (modifyPluginFn) {
                modifyPluginFn(visualPlugin);
            }
            visualPlugins[base.name] = visualPlugin;
        }

        // This plug-in service is used when displaying visuals for insights.
        export class InsightsPluginService extends VisualPluginService {
            private visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>;

            public constructor(featureSwitches: MinervaVisualFeatureSwitches) {
                super(featureSwitches);

                debug.assertValue(featureSwitches, 'featureSwitches');

                this.visualPlugins = {};

                // Clustered Bar Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.clusteredBarChart, () => new CartesianChart({
                    chartType: CartesianChartType.ClusteredBar,
                    animator: new WebColumnChartAnimator(),
                    tooltipsEnabled: true
                }));

                // Column Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.columnChart, () => new CartesianChart({
                    chartType: CartesianChartType.StackedColumn,
                    animator: new WebColumnChartAnimator(),
                    tooltipsEnabled: true
                }));

                // Donut Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.donutChart, () => new DonutChart({
                    animator: new WebDonutChartAnimator(),
                    tooltipsEnabled: true,
                }));

                // Hundred Percent Stacked Bar Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.hundredPercentStackedBarChart, () => new CartesianChart({
                    chartType: CartesianChartType.HundredPercentStackedBar,
                    animator: new WebColumnChartAnimator(),
                    tooltipsEnabled: true
                }));

                // Hundred Percent Stacked Column Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.hundredPercentStackedColumnChart, () => new CartesianChart({
                    chartType: CartesianChartType.HundredPercentStackedColumn,
                    animator: new WebColumnChartAnimator(),
                    tooltipsEnabled: true
                }));

                // Line Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.lineChart, () => new CartesianChart({
                    chartType: CartesianChartType.Line,
                    animator: new BaseAnimator(),
                    tooltipsEnabled: true,
                }));

                // Area Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.areaChart, () => new CartesianChart({
                    chartType: CartesianChartType.Area,
                    animator: new BaseAnimator(),
                    tooltipsEnabled: true,
                }));

                // Pie Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.pieChart, () => new DonutChart({
                    sliceWidthRatio: 0,
                    animator: new WebDonutChartAnimator(),
                    tooltipsEnabled: true,
                }));

                // Scatter Chart
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.scatterChart, () => new CartesianChart({
                    chartType: CartesianChartType.Scatter,
                    animator: new BaseAnimator(),
                    tooltipsEnabled: true,
                }), undefined);
            }

            public getPlugin(type: string): IVisualPlugin {
                if (this.visualPlugins[type]) {
                    return this.visualPlugins[type];
                }

                return super.getPlugin(type);
            }

            public requireSandbox(plugin: IVisualPlugin): boolean {
                return (this.featureSwitches.sandboxVisualsEnabled) && (!plugin || (plugin && plugin.custom));
            }

            getTelemetryHostInformation(): IHostInformation {
                return { name: "Insights" };
            }
        }

        // this function is called by tests
        export function create(): IVisualPluginService {
            return new VisualPluginService(undefined);
        }

        export function createVisualPluginService(featureSwitch: MinervaVisualFeatureSwitches): IVisualPluginService {
            return new VisualPluginService(featureSwitch);
        }

        export function createInsights(featureSwitches: MinervaVisualFeatureSwitches): IVisualPluginService {
            return new InsightsPluginService(featureSwitches);
        }
    }
}
