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
"use strict";

var projects = require("../../../gulp/projects.js");
var gulp = require("gulp");
var path = require("path");
var sourcemaps = require("gulp-sourcemaps");
var merge = require("merge2");
var ts = require("gulp-typescript");

var config = require("../../../gulp/config.js");
var testUtils = require("../../../gulp/testUtils.js");

module.exports = projects.initProject(
    "powerBIVisualsTests", // proj name
    __dirname, // project folder
    {
        deps: [
            require("../VisualsContracts/gulpProject"),
            require("../VisualsExtensibility/gulpProject"),
            require("../VisualsCommon/gulpProject"),
            require("../VisualsData/gulpProject"),
            require("../Visuals/gulpProject"),
            require("../CustomVisuals/gulpProject")
        ], // dependencies
        staticFiles: [
            {
                source: [
                    "../../../lib/powerbi-customVisuals-externals.min.js",
                    "../../../lib/visuals.css",
                    "../../../lib/powerbi-visuals.all.js",
                    "../../../node_modules/jasmine-jquery/lib/jasmine-jquery.js",
                    "../externals/ThirdPartyIP/MomentJS/moment.min.js",
                    "../externals/ThirdPartyIP/Velocity/velocity.min.js",
                    "../externals/ThirdPartyIP/Velocity/velocity.ui.min.js",
                    "../externals/ThirdPartyIP/QuillJS/quill.min.js",
                    "../externals/ThirdPartyIP/JQueryScrollbar/jquery.scrollbar.min.js",
                    "../externals/css/jquery.scrollbar.css",
                    "../externals/css/nouislider.min.css",
                    "../externals/css/nouislider.pips.css",
                    "../externals/ThirdPartyIP/noUiSlider/nouislider.min.js",
                    "../../../node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
                    "../../../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
                    "../../../node_modules/jasmine-core/lib/jasmine-core/boot.js",
                    "../../../node_modules/jasmine-core/lib/jasmine-core/jasmine.css",
                    "../CustomVisuals/styles/CustomVisuals.css",
                    "../CustomVisuals/obj/CustomVisuals.js",
                ],
                dest: "./obj/",
            }
        ],
        drop: [
            {
                source: ["./obj/**/*"],
                dest: [config.paths.VisualsDropTests]
            }
        ],
        // TODO: refactor: crate special project type for tests and add specific task eg `prepareTest`
        afterBuild: function (proj) {
            var glob = require("glob");

            var taskName = proj.buildWithDepsTask + "-prepareTests";

            gulp.task(taskName, function () {
                var tests = glob.sync("./**/*Tests.js", {
                    cwd: path.join(proj.projFolder, "/obj")
                }),
                    src = [
                        "visuals.css",
                        "jquery.scrollbar.css",
                        "powerbi-visuals.all.js",
                        "jasmine-jquery.js",
                        "velocity.min.js",
                        "velocity.ui.min.js",
                        "quill.min.js",
                        "moment.min.js",
                        "jquery.scrollbar.min.js",
                        "nouislider.min.js",
                        "mocks.js",
                        "./extensibility/extensibilityMocks.js",
                        "./extensibility/extensibilityHelpers.js",
                        "common.js",
                        "sqFieldDef.js",
                        "./helpers/helpers.js",
                        "./helpers/kpiHelper.js",
                        "./helpers/performanceTestsHelpers.js",
                        "./helpers/referenceLineHelper.js",
                        "./helpers/slicerHelper.js",
                        "./helpers/tableDataViewHelper.js",
                        "./helpers/tablixHelper.js",
                        "./helpers/trendLineHelper.js",
                        "./jasmineMatchers/toEqualDeep.js",
                        "./jasmineMatchers/toEqualSQExpr.js",
                        "./utils/bingSocial/NewsDataFactory.js",
                        "./utils/bingSocial/TweetFactory.js",
                        "powerbi-customVisuals-externals.min.js",
                        "CustomVisuals.css",
                        "CustomVisuals.js",
                        "./customVisuals/helpers/dataViewHelpers.js",
                        "./customVisuals/helpers/visualTestHelpers.js",
                        "./customVisuals/sampleDataViews/DataViewBuilder.js",
                        "./customVisuals/sampleDataViews/SalesByCountryData.js",
                        "./customVisuals/sampleDataViews/SankeyDiagramData.js",
                        "./customVisuals/sampleDataViews/MekkoChartData.js",
                        "./customVisuals/sampleDataViews/BulletChartData.js",
                        "./customVisuals/sampleDataViews/CountriesData.js",
                        "./customVisuals/sampleDataViews/CarLogosData.js",
                        "./customVisuals/sampleDataViews/ValueByNameGroupData.js",
                        "./customVisuals/sampleDataViews/SalesByDayOfWeekData.js",
                        "./customVisuals/sampleDataViews/forceGraphData.js",
                        "./customVisuals/sampleDataViews/GanttData.js",
                        "./customVisuals/sampleDataViews/TimelineData.js",
                        "./customVisuals/sampleDataViews/valueByAgeData.js",
                        "./customVisuals/sampleDataViews/ProductSalesByDateData.js",
                        "./customVisuals/sampleDataViews/EnhancedScatterChartData.js",
                        "./customVisuals/sampleDataViews/PulseChartData.js",
                        "./customVisuals/sampleDataViews/ValueByNameData.js",
                        "./customVisuals/sampleDataViews/LineDotChartData.js",
                        "./customVisuals/VisualBuilderBase.js"
                    ].concat(tests),
                    jasminePaths = [
                        "jasmine.css",
                        "jasmine.js",
                        "jasmine-html.js",
                        "boot.js"
                    ];

                testUtils.createHtmlTestRunner(path.join(proj.projFolder, "./obj/index.html"), jasminePaths.concat(src));
            });

            return taskName;
        },
        tsc: {
            uglifyJs: false,
            nonminJs: false,
            declarationFiles: false,
            experimentalDecorators: true,
            mapConfig: {
                generateMaps: true
            }
        },
        watch: {
            includes: ['/**/*.ts']
        }
    });