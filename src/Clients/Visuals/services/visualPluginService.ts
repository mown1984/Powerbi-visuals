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

module powerbi.visuals {
    const unsupportedVisuals: string[] = ['play', 'subview', 'smallMultiple'];

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

    export interface SmallViewPortProperties {
        cartesianSmallViewPortProperties: CartesianSmallViewPortProperties;
        gaugeSmallViewPortProperties: GaugeSmallViewPortProperties;
        funnelSmallViewPortProperties: FunnelSmallViewPortProperties;
        DonutSmallViewPortProperties: DonutSmallViewPortProperties;
    }

    export interface CreateDashboardOptions {
        tooltipsEnabled: boolean;
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

        function createDashboardPlugins(plugins: jsCommon.IStringDictionary<IVisualPlugin>, options: CreateDashboardOptions, featureSwitches?: MinervaVisualFeatureSwitches) {
            let tooltipsOnDashboard: boolean = options.tooltipsEnabled;
            let lineChartLabelDensityEnabled: boolean = featureSwitches && featureSwitches.lineChartLabelDensityEnabled;
            let tooltipBucketEnabled = featureSwitches && featureSwitches.tooltipBucketEnabled;
            let conditionalFormattingEnabled = featureSwitches ? featureSwitches.conditionalFormattingEnabled : false;
            let cartesianLoadMoreEnabled: boolean = featureSwitches && featureSwitches.cartesianLoadMoreEnabled;

            // Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.barChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.StackedBar,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Clustered Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.clusteredBarChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.ClusteredBar,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Clustered Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.clusteredColumnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.ClusteredColumn,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.columnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.StackedColumn,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Data Dot Clustered Combo Chart
            createPlugin(plugins, powerbi.visuals.plugins.dataDotClusteredColumnComboChart, () => new CartesianChart({
                chartType: CartesianChartType.DataDotClusteredColumnCombo,
                tooltipsEnabled: tooltipsOnDashboard,
            }));
            // Data Dot Stacked Combo Chart
            createPlugin(plugins, powerbi.visuals.plugins.dataDotStackedColumnComboChart, () => new CartesianChart({
                chartType: CartesianChartType.DataDotStackedColumnCombo,
                tooltipsEnabled: tooltipsOnDashboard,
            }));
            // Donut Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.donutChart, tooltipBucketEnabled), () => new DonutChart({
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));

            // Funnel Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.funnel, tooltipBucketEnabled), () => new FunnelChart({
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Gauge
            createPlugin(plugins, powerbi.visuals.plugins.gauge, () => new Gauge({
                tooltipsEnabled: tooltipsOnDashboard,
            }));
            // Hundred Percent Stacked Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.hundredPercentStackedBarChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.HundredPercentStackedBar,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Hundred Percent Stacked Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.hundredPercentStackedColumnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.HundredPercentStackedColumn,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Line Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Line,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipsOnDashboard && tooltipBucketEnabled,
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Area Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.areaChart, tooltipBucketEnabled),() => new CartesianChart({
                chartType: CartesianChartType.Area,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipsOnDashboard && tooltipBucketEnabled,
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
            }));
            // Stacked Area Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.stackedAreaChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.StackedArea,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipsOnDashboard && tooltipBucketEnabled,
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
            }));
            // Line Clustered Combo Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineClusteredColumnComboChart, tooltipBucketEnabled, true), () => new CartesianChart({
                chartType: CartesianChartType.LineClusteredColumnCombo,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Line Stacked Combo Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineStackedColumnComboChart, tooltipBucketEnabled, true), () => new CartesianChart({
                chartType: CartesianChartType.LineStackedColumnCombo,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Pie Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.pieChart, tooltipBucketEnabled), () => new DonutChart({
                sliceWidthRatio: 0,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Scatter Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.scatterChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Scatter,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Treemap
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.treemap, tooltipBucketEnabled), () => new Treemap({
                isScrollable: false,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Waterfall Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.waterfallChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Waterfall,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Map
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.map, tooltipBucketEnabled), () => new Map({
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                disableZooming: true,
                disablePanning: true,
            }));
            // Filled Map
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.filledMap, tooltipBucketEnabled), () => new Map({
                filledMap: true,
                tooltipsEnabled: tooltipsOnDashboard,
                tooltipBucketEnabled: tooltipBucketEnabled,
                disableZooming: true,
                disablePanning: true,
            }));

            // Matrix
            createPlugin(plugins, powerbi.visuals.plugins.matrix, () => new Matrix({
            }));
            // Table
            createPlugin(plugins, powerbi.visuals.plugins.table, () => new Table({
                isConditionalFormattingEnabled: conditionalFormattingEnabled,
            }));
        }

        function createMinervaPlugins(plugins: jsCommon.IStringDictionary<IVisualPlugin>, featureSwitches?: MinervaVisualFeatureSwitches) {
            let scriptVisualEnabled: boolean = featureSwitches ? featureSwitches.scriptVisualEnabled : false;
            let scriptVisualAuthoringEnabled: boolean = featureSwitches ? featureSwitches.scriptVisualAuthoringEnabled : false;
            let isLabelInteractivityEnabled: boolean = featureSwitches ? featureSwitches.isLabelInteractivityEnabled : false;
            let conditionalFormattingEnabled = featureSwitches ? featureSwitches.conditionalFormattingEnabled : false;
            let fillMapDataLabelsEnabled: boolean = featureSwitches ? featureSwitches.filledMapDataLabelsEnabled : false;
            let lineChartLabelDensityEnabled: boolean = featureSwitches ? featureSwitches.lineChartLabelDensityEnabled : false;
            let tooltipBucketEnabled = featureSwitches ? featureSwitches.tooltipBucketEnabled : false;
            let cartesianLoadMoreEnabled: boolean = featureSwitches && featureSwitches.cartesianLoadMoreEnabled;

            // Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.barChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.StackedBar,
                isScrollable: true, animator: new WebColumnChartAnimator(),
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Card
            createPlugin(plugins, powerbi.visuals.plugins.card, () => new Card({
                isScrollable: true,
                animator: new BaseAnimator(),
            }));
            // Clustered Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.clusteredBarChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.ClusteredBar,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Clustered Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.clusteredColumnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.ClusteredColumn,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.columnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.StackedColumn,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Data Dot Clustered Combo Chart
            createPlugin(plugins, powerbi.visuals.plugins.dataDotClusteredColumnComboChart, () => new CartesianChart({
                chartType: CartesianChartType.DataDotClusteredColumnCombo,
                isScrollable: true,
                tooltipsEnabled: true,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior(), new DataDotChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
            }));
            // Data Dot Stacked Combo Chart
            createPlugin(plugins, powerbi.visuals.plugins.dataDotStackedColumnComboChart, () => new CartesianChart({
                chartType: CartesianChartType.DataDotStackedColumnCombo,
                isScrollable: true,
                tooltipsEnabled: true,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior(), new DataDotChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
            }));
            // Donut Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.donutChart, tooltipBucketEnabled), () => new DonutChart({
                animator: new WebDonutChartAnimator(),
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                behavior: new DonutChartWebBehavior(),
            }));
            // Funnel Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.funnel, tooltipBucketEnabled), () => new FunnelChart({
                animator: new WebFunnelAnimator(),
                behavior: new FunnelWebBehavior(),
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Gauge
            createPlugin(plugins, powerbi.visuals.plugins.gauge, () => new Gauge({
                animator: new BaseAnimator(),
                tooltipsEnabled: true,
            }));
            // Hundred Percent Stacked Bar Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.hundredPercentStackedBarChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.HundredPercentStackedBar,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Hundred Percent Stacked Column Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.hundredPercentStackedColumnChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.HundredPercentStackedColumn,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Line Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Line,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new BaseAnimator(),
                behavior: new CartesianChartBehavior([new LineChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Area Chart
            createPlugin(plugins, powerbi.visuals.plugins.areaChart, () => new CartesianChart({
                chartType: CartesianChartType.Area,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new BaseAnimator(),
                behavior: new CartesianChartBehavior([new LineChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
            }));
            // Stacked Area Chart
            createPlugin(plugins, powerbi.visuals.plugins.stackedAreaChart, () => new CartesianChart({
                chartType: CartesianChartType.StackedArea,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new BaseAnimator(),
                behavior: new CartesianChartBehavior([new LineChartWebBehavior()]),
                lineChartLabelDensityEnabled: lineChartLabelDensityEnabled,
            }));
            // Line Clustered Combo Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineClusteredColumnComboChart, tooltipBucketEnabled, true), () => new CartesianChart({
                chartType: CartesianChartType.LineClusteredColumnCombo,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior(), new LineChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Line Stacked Combo Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.lineStackedColumnComboChart, tooltipBucketEnabled, true), () => new CartesianChart({
                chartType: CartesianChartType.LineStackedColumnCombo,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new WebColumnChartAnimator(),
                behavior: new CartesianChartBehavior([new ColumnChartWebBehavior(), new LineChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
                cartesianLoadMoreEnabled: cartesianLoadMoreEnabled
            }));
            // Pie Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.pieChart, tooltipBucketEnabled), () => new DonutChart({
                sliceWidthRatio: 0,
                animator: new WebDonutChartAnimator(),
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                behavior: new DonutChartWebBehavior(),
            }));
            // Scatter Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.scatterChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Scatter,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                animator: new BaseAnimator(),
                behavior: new CartesianChartBehavior([new ScatterChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
            }));
            // Treemap
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.treemap, tooltipBucketEnabled), () => new Treemap({
                animator: new WebTreemapAnimator,
                isScrollable: true,
                behavior: new TreemapWebBehavior(),
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
            }));
            // Waterfall Chart
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.waterfallChart, tooltipBucketEnabled), () => new CartesianChart({
                chartType: CartesianChartType.Waterfall,
                isScrollable: true,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                behavior: new CartesianChartBehavior([new WaterfallChartWebBehavior()]),
                isLabelInteractivityEnabled: isLabelInteractivityEnabled,
            }));
            // Map
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.map, tooltipBucketEnabled), () => new Map({
                behavior: new MapBehavior(),
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                isLegendScrollable: true,
            }));
            // Filled Map
            createPlugin(plugins, enableTooltipBucket(powerbi.visuals.plugins.filledMap, tooltipBucketEnabled), () => new Map({
                filledMap: true,
                behavior: new MapBehavior,
                tooltipsEnabled: true,
                tooltipBucketEnabled: tooltipBucketEnabled,
                filledMapDataLabelsEnabled: fillMapDataLabelsEnabled,
                isLegendScrollable: true,
            }));
            // Slicer
            createPlugin(plugins, powerbi.visuals.plugins.slicer, () => new Slicer({
                behavior: new SlicerWebBehavior(),
            }));
            // Matrix
            createPlugin(plugins, powerbi.visuals.plugins.matrix, () => new Matrix({
            }));
            // Table
            createPlugin(plugins, powerbi.visuals.plugins.table, () => new Table({
                isConditionalFormattingEnabled: conditionalFormattingEnabled,
            }));;

            if (scriptVisualEnabled && scriptVisualAuthoringEnabled) {
                // R visual
                createPlugin(
                    plugins,
                    powerbi.visuals.plugins.scriptVisual,
                    () => new ScriptVisual({ canRefresh: true }));
            }
        }
        
        export function enableTooltipBucket(pluginOld: IVisualPlugin, tooltipBucketEnabled?: boolean, isCombo: boolean = false): IVisualPlugin {
            if (!tooltipBucketEnabled)
                return pluginOld;

            let pluginNew: IVisualPlugin = _.clone(pluginOld);

            pluginNew.capabilities = _.clone(pluginOld.capabilities);

            pluginNew.capabilities.dataRoles = _.clone(pluginOld.capabilities.dataRoles);

            pluginNew.capabilities.dataRoles.push(
                {
                    name: 'Tooltips',
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Tooltips'),
                    joinPredicate: JoinPredicateBehavior.None,
                    //TODO: description: data.createDisplayNameGetter('Role_DisplayName_TooltipsDescription'),
                    //TODO: requiredTypes: [{ numeric: true }, { integer: true }],
                }
            );

            pluginNew.capabilities.dataViewMappings = _.clone(pluginOld.capabilities.dataViewMappings);
            for (let i = 0; i < pluginOld.capabilities.dataViewMappings.length; i++) {
                let categorical: DataViewCategoricalMapping = pluginOld.capabilities.dataViewMappings[i].categorical;
                let matrix: DataViewCategoricalMapping = pluginOld.capabilities.dataViewMappings[i].matrix;
                let mapping = categorical ? categorical : matrix;

                if (!mapping)
                    continue;

                let values = mapping.values;
                if (!values)
                    continue;

                pluginNew.capabilities.dataViewMappings[i] = _.cloneDeep(pluginOld.capabilities.dataViewMappings[i]);

                if (categorical) {
                    values = pluginNew.capabilities.dataViewMappings[i].categorical.values;
                }
                if (matrix) {
                    values = pluginNew.capabilities.dataViewMappings[i].matrix.values;
                }

                let group = (<DataViewGroupedRoleMapping>values).group;
                if (group)
                    group.select.push({ for: { in: 'Tooltips' } });

                let select = (<DataViewListRoleMapping>values).select;
                if (select && !isCombo)
                    select.push({ for: { in: 'Tooltips' } });

            }
            return pluginNew;
        }

        export class PlaygroundVisualPluginService extends VisualPluginService {
            private visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>;

            public constructor() {
                super(undefined);

                this.visualPlugins = <any>powerbi.visuals.plugins;

                createMinervaPlugins(this.visualPlugins, null);
            }

            public getVisuals(): IVisualPlugin[] {
                let registry = this.visualPlugins,
                    names: string[] = Object.keys(registry);

                return names.map(name => registry[name]);
            }

            public getPlugin(type: string): IVisualPlugin {
                if (!type) {
                    return;
                }

                let plugin: IVisualPlugin = this.visualPlugins[type];
                if (!plugin) {
                    return;
                }

                return plugin;
            }

            public capabilities(type: string): VisualCapabilities {
                let plugin = this.getPlugin(type);
                if (plugin) {
                    return plugin.capabilities;
                }
            }
        }

        /**
         * This plug-in service is used when displaying visuals on the dashboard.
         */
        export class DashboardPluginService extends VisualPluginService {
            private visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>;

            public constructor(featureSwitches: MinervaVisualFeatureSwitches, options: CreateDashboardOptions) {
                super(featureSwitches);

                debug.assertValue(featureSwitches, 'featureSwitches');

                this.visualPlugins = {};

                createDashboardPlugins(this.visualPlugins, options, this.featureSwitches);
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
        }

        export class MobileVisualPluginService extends VisualPluginService {
            private visualPlugins: jsCommon.IStringDictionary<IVisualPlugin>;
            private smallViewPortProperties;
            public static MinHeightLegendVisible = 125;
            public static MinHeightAxesVisible = 125;
            public static MinHeightGaugeSideNumbersVisible = 80;
            public static GaugeMarginsOnSmallViewPort = 10;
            public static MinHeightFunnelCategoryLabelsVisible = 80;
            public static MaxHeightToScaleDonutLegend = 300;

            public constructor(smallViewPortProperties?: SmallViewPortProperties, featureSwitches?: MinervaVisualFeatureSwitches) {
                super(featureSwitches);

                this.smallViewPortProperties = smallViewPortProperties || {
                    CartesianSmallViewPortProperties: {
                        hideAxesOnSmallViewPort: true,
                        hideLegendOnSmallViewPort: true,
                        MinHeightLegendVisible: MobileVisualPluginService.MinHeightLegendVisible,
                        MinHeightAxesVisible: MobileVisualPluginService.MinHeightAxesVisible,
                    },
                    GaugeSmallViewPortProperties: {
                        hideGaugeSideNumbersOnSmallViewPort: true,
                        smallGaugeMarginsOnSmallViewPort: true,
                        MinHeightGaugeSideNumbersVisible: MobileVisualPluginService.MinHeightGaugeSideNumbersVisible,
                        GaugeMarginsOnSmallViewPort: MobileVisualPluginService.GaugeMarginsOnSmallViewPort,
                    },
                    FunnelSmallViewPortProperties: {
                        hideFunnelCategoryLabelsOnSmallViewPort: true,
                        minHeightFunnelCategoryLabelsVisible: MobileVisualPluginService.MinHeightFunnelCategoryLabelsVisible,
                    },
                    DonutSmallViewPortProperties: {
                        maxHeightToScaleDonutLegend: MobileVisualPluginService.MaxHeightToScaleDonutLegend,
                    },
                };

                let conditionalFormattingEnabled = featureSwitches ? featureSwitches.conditionalFormattingEnabled : false;

                // Disable tooltips for mobile
                TooltipManager.ShowTooltips = false;

                // Don't trim overflow data on mobile
                let trimOrdinalDataOnOverflow = false;

                let mapThrottleInterval: number = this.getMapThrottleInterval();

                this.visualPlugins = {};
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.areaChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.Area,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.barChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.StackedBar,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.clusteredBarChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.ClusteredBar,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.clusteredColumnChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.ClusteredColumn,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.columnChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.StackedColumn,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.comboChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.ComboChart,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.dataDotChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.DataDot,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.dataDotClusteredColumnComboChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.DataDotClusteredColumnCombo,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.dataDotStackedColumnComboChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.DataDotStackedColumnCombo,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.hundredPercentStackedBarChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.HundredPercentStackedBar,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.hundredPercentStackedColumnChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.HundredPercentStackedColumn,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.stackedAreaChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.StackedArea,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.waterfallChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.Waterfall,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.lineChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.Line,
                        cartesianSmallViewPortProperties: this.smallViewPortProperties.CartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.lineClusteredColumnComboChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.LineClusteredColumnCombo,
                        cartesianSmallViewPortProperties: this.smallViewPortProperties.CartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.lineStackedColumnComboChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.LineStackedColumnCombo,
                        cartesianSmallViewPortProperties: this.smallViewPortProperties.CartesianSmallViewPortProperties,
                        trimOrdinalDataOnOverflow: trimOrdinalDataOnOverflow
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.scatterChart,
                    () => new CartesianChart({
                        chartType: CartesianChartType.Scatter,
                        cartesianSmallViewPortProperties: this.smallViewPortProperties.CartesianSmallViewPortProperties,
                        behavior: new CartesianChartBehavior([new ScatterChartMobileBehavior()])
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.gauge,
                    () => new Gauge({
                        gaugeSmallViewPortProperties: this.smallViewPortProperties.GaugeSmallViewPortProperties
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.funnel,
                    () => new FunnelChart({
                        animator: null,
                        funnelSmallViewPortProperties: this.smallViewPortProperties.FunnelSmallViewPortProperties
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.donutChart,
                    () => new DonutChart({
                        disableGeometricCulling: true,
                        smallViewPortProperties: this.smallViewPortProperties.DonutSmallViewPortProperties
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.pieChart,
                    () => new DonutChart({
                        sliceWidthRatio: 0,
                        disableGeometricCulling: true,
                        smallViewPortProperties: this.smallViewPortProperties.DonutSmallViewPortProperties
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.matrix,
                    () => new Matrix({
                        isTouchEnabled: true
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.table,
                    () => new Table({
                        isTouchEnabled: true,
                        isConditionalFormattingEnabled: conditionalFormattingEnabled,
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.map,
                    () => new Map({
                        viewChangeThrottleInterval: mapThrottleInterval,
                        enableCurrentLocation: featureSwitches ? featureSwitches.mapCurrentLocationEnabled : false
                    }));
                createPlugin(this.visualPlugins, powerbi.visuals.plugins.filledMap,
                    () => new Map({
                        filledMap: true,
                        viewChangeThrottleInterval: mapThrottleInterval
                    }));
            }

            public getPlugin(type: string): IVisualPlugin {
                if (this.visualPlugins[type])
                    return this.visualPlugins[type];

                return super.getPlugin(type);
            }

            public requireSandbox(plugin: IVisualPlugin): boolean {
                if (this.featureSwitches)
                    return (this.featureSwitches.sandboxVisualsEnabled) && (!plugin || (plugin && plugin.custom));
                else
                    return super.requireSandbox(plugin);
            }

            // Windows phone webView chokes when zooming on heavy maps,
            // this is a workaround to allow a relatively smooth pinch to zoom experience.
            private getMapThrottleInterval(): number {
                const windowsPhoneThrottleInterval = 100;
                let userAgentLowerCase = navigator.userAgent.toLowerCase();
                if (userAgentLowerCase.indexOf('windows phone') !== -1) {
                    return windowsPhoneThrottleInterval;
                }

                return undefined;
            }

            public getInteractivityOptions(visualType: string): InteractivityOptions {
                let mobileOptions: InteractivityOptions = {
                    overflow: this.getMobileOverflowString(visualType),
                    isInteractiveLegend: this.isChartSupportInteractivity(visualType),
                    selection: true,
                };

                return mobileOptions;
            }

            private getMobileOverflowString(visualType: string): string {
                switch (visualType) {
                    case 'multiRowCard':
                        return 'visible';

                    default:
                        return 'hidden';
                }
            }

            private isChartSupportInteractivity(visualType: string): boolean {
                switch (visualType) {
                    case 'areaChart':
                    case 'barChart':
                    case 'clusteredBarChart':
                    case 'clusteredColumnChart':
                    case 'columnChart':
                    case 'donutChart':
                    case 'hundredPercentStackedBarChart':
                    case 'hundredPercentStackedColumnChart':
                    case 'lineChart':
                    case 'pieChart':
                    case 'scatterChart':
                    case 'table':
                    case 'matrix':
                    case 'multiRowCard':
                        return true;

                    default:
                        return false;
                }
            }
        }

        // this function is called by tests
        export function create(): IVisualPluginService {
            return new VisualPluginService(undefined);
        }

        export function createVisualPluginService(featureSwitch: MinervaVisualFeatureSwitches): IVisualPluginService {
            return new VisualPluginService(featureSwitch);
        }

        export function createDashboard(featureSwitches: MinervaVisualFeatureSwitches, options: CreateDashboardOptions): IVisualPluginService {
            return new DashboardPluginService(featureSwitches, options);
        }

        export function createInsights(featureSwitches: MinervaVisualFeatureSwitches): IVisualPluginService {
            return new InsightsPluginService(featureSwitches);
        }

        export function createMobile(smallViewPortProperties?: SmallViewPortProperties, featureSwitches?: MinervaVisualFeatureSwitches): IVisualPluginService {
            return new MobileVisualPluginService(smallViewPortProperties, featureSwitches);
        }
    }
}
