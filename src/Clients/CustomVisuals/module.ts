/// <reference path="./_references.ts"/>

window.jsCommon = window.jsCommon || {};
window.powerbi = window.powerbi || {};
window.debug = window.debug || {};
window.InJs = window.InJs || {};

// require("../Visuals/module.ts");
// require("../VisualsCommon/module.ts");
// require("../VisualsContracts/module.ts");
// require("../VisualsData/module.ts");

requireAll(require.context("./", true, /\.less$/));

require("./visuals/asterPlot/visual/asterPlot.ts");
require("./visuals/tornadoChart/visual/tornadoChart.ts");
require("./visuals/mekkoChart/visual/mekkoChart.ts");
require("./visuals/sankeyDiagram/visual/sankeyDiagram.ts");
require("./visuals/bulletChart/visual/bulletChart.ts");
require("./visuals/wordCloud/visual/wordCloud.ts");
require("./visuals/chicletSlicer/visual/chicletSlicer.ts");
require("./visuals/chordChart/visual/chordChart.ts");
require("./visuals/enhancedScatterChart/visual/enhancedScatterChart.ts");
require("./visuals/globeMap/visual/globeMap.ts");
require("./visuals/radarChart/visual/radarChart.ts");
require("./visuals/histogram/visual/histogram.ts");
require("./visuals/dotPlot/visual/dotPlot.ts");
require("./visuals/forceGraph/visual/forceGraph.ts");
require("./visuals/gantt/visual/gantt.ts");
require("./visuals/timeline/visual/timeline.ts");
require("./visuals/streamGraph/visual/streamGraph.ts");
require("./visuals/lineDotChart/visual/lineDotChart.ts");
require("./visuals/sunburst/visual/sunburst.ts");
require("./plugins.ts");
require("./services/customVisualPluginService.ts");

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

