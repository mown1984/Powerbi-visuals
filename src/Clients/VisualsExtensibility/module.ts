/// <reference path="./_references.ts"/>

window.jsCommon = window.jsCommon || {};
window.powerbi = window.powerbi || {};
window.debug = window.debug || {};
window.InJs = window.InJs || {};

// require("../VisualsContracts/module.ts");
// require("../VisualsCommon/module.ts");
// require("../VisualsData/module.ts");

require("./typedefs/typedefs.ts");
require("./telemetry/generateGuid.ts");
require("./telemetry/events.ts");
require("./decorators/VisualPlugin.ts");
require("./components/selectionManager.ts");
require("./components/selectionIdBuilder.ts");
require("./versioning/VisualAdapter.ts");
require("./versioning/VisualSafeExecutionWrapper.ts");
require("./versioning/versions/v1.0.0.ts");
require("./versioning/versions/v1.1.0.ts");
