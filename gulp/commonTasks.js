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

var gulp = require("gulp"),
    path = require("path"),
    runSequence = require("run-sequence").use(gulp);

module.exports = function (pathToProj) {

    /**
     * Builds current project and its dependencies if dependecy is not already built.
     */
    gulp.task("build", function (callback) {

        var utils = require("./utils.js");
        var gulpProj = require(path.join(pathToProj, "gulpProject"));

        gulpProj.initBuildTasks();

        var depsToRun = utils.checkDepsArtifacts(gulpProj);
        gulp.task("build-inc", depsToRun.map(function (proj) {
            return proj.buildWithDepsTask;
        }), function (cb) {
            runSequence.apply(null, gulpProj.buildTasks.concat(cb));
        });

        runSequence("build-inc", callback);
    });

    /**
     * Rebuilds current project with all dependencies.
     */
    gulp.task("rebuild", function (callback) {

        var gulpProj = require(path.join(pathToProj, "gulpProject"));
        runSequence(gulpProj.buildWithDepsTask, callback);
    });
}