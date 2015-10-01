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
var gulp = require("gulp"),
    runSequence = require("run-sequence"),
    tslint = require("gulp-tslint"),
    gutil = require("gulp-util"),
    visualsBuild = require("./visualsBuild.js");

var lintErrors = false;
var lintReporter = function (output, file, options) {
    if (output.length > 0)
        lintErrors = true;
    // file is a reference to the vinyl File object 
    console.log("Found " + output.length + " errors in " + file.path);
    for (var i = 0; i < output.length; i++)
        gutil.log("TsLint Error " + i + ": ", "", gutil.colors
            .red(" line:" + output[i].endPosition.line + ", char:" + output[i].endPosition.character +
                ", message: " + output[i].failure));
    // options is a reference to the reporter options, e.g. including the emitError boolean 
    gutil.log("", "", gutil.colors.magenta("Waiting for changes..."));
};

gulp.task("start:watchers", function (callback) {
    gulp.watch(visualsBuild.getBuildPaths("src/Clients/VisualsCommon", "VisualsCommon")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on("error", function (error) {})
            .on("end", function () {
                if (!lintErrors)
                    runSequence("build:visuals_common");
            }));
    });
    gulp.watch(visualsBuild.getBuildPaths("src/Clients/VisualsData", "VisualsData")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on("error", function (error) {})
            .on("end", function () {
                if (!lintErrors)
                    runSequence("build:visuals_data");
            }));
    });
    gulp.watch(visualsBuild.getBuildPaths("src/Clients/Visuals", "Visuals")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on("error", function (error) {})
            .on("end", function () {
                if (!lintErrors)
                    runSequence("build:visuals_project:ts");
            }));
    });
    gulp.watch(visualsBuild.getBuildPaths("src/Clients/PowerBIVisualsPlayground", "PowerBIVisualsPlayground")).on("change", function (file) {
        lintErrors = false;
        gulp.src(file.path).pipe(tslint()).pipe(tslint.report(lintReporter).on("error", function (error) {})
            .on("end", function () {
                if (!lintErrors)
                    runSequence("build:visuals_playground", function(e){ gutil.log("", "", gutil.colors.magenta("Waiting for changes...")); });
            }));
    });

    gulp.watch("src/Clients/Visuals/images/sprite-src/*.png", ["build:visuals_sprite"]);
    gulp.watch(["src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.css", "src/Clients/Visuals/styles/*.less", "src/Clients/StyleLibrary/less/*.less", "src/Clients/PowerBI/styles/*.less",
     "src/Clients/Visuals/images/visuals.sprites.png", "src/Clients/Visuals/styles/sprites.less"], ["build:visuals_less"]);
    gulp.watch(visualsBuild.externalsPath, ["combine:external_js"]).on("change", function (file) {
                    runSequence("combine:external_js", function(e){ gutil.log("", "", gutil.colors.magenta("Waiting for changes...")); });
    });
    gulp.watch(visualsBuild.internalsPaths, ["combine:internal_js"]).on("change", function (file) {
                    runSequence("combine:internal_js", function(e){ gutil.log("", "", gutil.colors.magenta("Waiting for changes...")); });
    });
    gutil.log("", "", gutil.colors.magenta("Continuous build successfully started"));
    gutil.log("", "", gutil.colors.magenta("Waiting for changes..."));

    });

gulp.task("continuous_build_debug", function (callback) {
    isDebug = true;
    runSequence(
        "continuous_build",
        callback);
});
gulp.task("continuous_build", function (callback) {
    dontEmitTSbuildErrors = true;
// first time build 
    runSequence(
        "build:visuals:projects",
        "start:watchers",
        callback);

});

