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

var projects = require("../../../gulp/projects.js"),
    gulp = require("gulp"),
    path = require("path"),
    sourcemaps = require("gulp-sourcemaps"),
    merge = require("merge2"),
    ts = require("gulp-typescript");

var config = require("../../../gulp/config.js");

module.exports = projects.initProject(
    "powerBIVisualsTests", // proj name
    __dirname, // project folder
    {
        deps: [
            require("../VisualsCommon/gulpProject"),
            require("../VisualsData/gulpProject"),
            require("../Visuals/gulpProject"),
            require("../CustomVisuals/gulpProject")
        ],
        drop: [
            {
                source: ["./obj/**/*.js"],
                dest: [config.paths.VisualsDropTests]
            }
        ],
        afterBuild:function() {
            var taskName = "powerBIVisualsTests:compile";

            gulp.task(taskName, buildTests);

            return taskName;
        },

        watch: {
            includes: ['/**/*.ts']
        }
    });

function buildTests() {
    var options = {
        cwd: __dirname
    };

     var tsProject = ts.createProject(path.join(__dirname, "tsconfig.json"), {
            typescript: require("typescript"),
            sortOutput: false,
            target: "ES5",
            declarationFiles: false,
            noEmitOnError: false
        });

    var srcResult = tsProject.src();

    srcResult = srcResult.pipe(sourcemaps.init());

    var tscResult = srcResult
        .pipe(ts(tsProject));

    tscResult.js = tscResult.js.pipe(sourcemaps.write("./"));

    return merge([
        tscResult.js.pipe(gulp.dest("./obj", options)),
        tscResult.dts.pipe(gulp.dest("./obj", options))
    ]);
}