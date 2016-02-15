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
    ts = require("gulp-typescript"),
    maps = require("gulp-sourcemaps"),
    changed = require("gulp-changed"),
    uglify = require("gulp-uglify"),
    clone = require("gulp-clone"),
    rename = require("gulp-rename"),
    nop = require("gulp-nop"),
    merge = require("merge2"),
    os = require("os");

var config = require("./config.js");

var isDebug = config.debug || false,
    nonminJs = config.nonminJs;

/**
 * TypeScript compile.
 * 
 * Map production notes:
 *   Path by default to sources for portal - "../ts/" + project name
 *   To debug in some other place:
 *    * change sourceRootMapPrefix option eg "../../" - to refer to sources from "<proj>/obj" folder
 *    * run "gulp build --sourceRootMapPrefix=../../" from proj folder gives the same result.
 *
 * Note: If sourceRootMapFullPath option is defined in gulp/config.json then such path will be used instead 
 *  of "sourceRootMapPrefix + Project name" for all projects. To override path for single project:
 *  cd proj_folder && gulp build --sourceRootMapFullPath=some/path
 *  
 * @param {String} projectPath
 * @param {TsProjecrt} tsProjecrt
 * @param {Function} cb callback from gulp task that have to be called when this task is done.
 */
function tsc(projectPath, tsProjecrt, cb) {
    var gulpOptions = {
            cwd: projectPath
        },
        errorCache = [],
        currentCwd = process.cwd();

    process.chdir(projectPath);

    var PROJ_NAME = tsProjecrt.options.projectName,
        SOURCE_ROOT_PATH = config.sourceRootMapFullPath || config.sourceRootMapPrefix + PROJ_NAME,
        OUT_FILE_NAME = tsProjecrt.options.outFileName;

    var tscResult = tsProjecrt.src().on("error", function (err) {
        errorCache.push(err);
    })
        .pipe(config.generateMaps ? maps.init() : nop())
        .pipe(ts(tsProjecrt, undefined, ts.reporter.longReporter()));

    process.chdir(currentCwd);

    return merge([
        // .d.ts
        tscResult.dts
            .pipe(changed("./", {
                hasChanged: changed.compareSha1Digest,
                cwd: projectPath,
                extension: ".ts"
            }))
            .pipe(gulp.dest("./", gulpOptions)),
        nonminJs
            ? tscResult.js
            .pipe(clone())
            .pipe(changed("./", {
                hasChanged: changed.compareSha1Digest,
                cwd: projectPath,
                extension: ".js"
            }))
            .pipe(rename({
                extname: ".nonmin.js"
            }))
            .pipe(uglify(getNonminJsUglifyOptions()))
            .pipe(gulp.dest("./", gulpOptions))
            : nop(),
        // .js
        tscResult.js
            .pipe(clone())
            .pipe(changed("./", {
                hasChanged: changed.compareSha1Digest,
                cwd: projectPath,
                extension: ".js"
            }))
            .pipe(config.generateMaps ? maps.write("./", getWriteMapOptions(SOURCE_ROOT_PATH)) : nop())
            .pipe(gulp.dest("./", gulpOptions)).on("end", function () {

            // reinit `maps` in order to use already generated .js and .map files.
            gulp.src(["obj/" + OUT_FILE_NAME + ".js"], gulpOptions)
                .pipe(config.generateMaps ? maps.init({ loadMaps: true }) : nop())
                .pipe(config.uglifyJs ? uglify(getJsUglifyOptions(isDebug)) : nop())
                .pipe(rename({ extname: ".min.js" }))
                .pipe(maps.write("./", getWriteMapOptions()))
                .pipe(gulp.dest("./obj", gulpOptions).on("end", function () {
                    if (errorCache.length > 0) {
                        cb && cb(errorCache.join(os.EOL));
                    } else {
                        cb && cb();
                    }
                }));
        }),
    ]);
}

/**
 * Options for uglify module.
 * 
 * @param {Boolean} isDebug defines if debug mode is enabled/disabled
 * @returns {Object} options.
 */
function getJsUglifyOptions(isDebug) {
    return {
        compress: {
            drop_console: true,
            pure_funcs: [
                "debug.assertValue",
                "debug.assertFail",
                "debug.assert",
                "debug.assertAnyValue",
                "debug.assertNonEmpty",
            ],
            warnings: false,
            dead_code: true,
            sequences: true,
            properties: true,
            conditionals: true,
            comparisons: true,
            booleans: true,
            cascade: true,
            unused: true,
            loops: true,
            if_return: true,
            join_vars: true,
            global_defs: {
                "DEBUG": isDebug
            }
        }
    };
}

/**
 * Options for .nonmin uglify module.
 * 
 * @param {Boolean} isDebug defines if debug mode is enabled/disabled
 * @returns {Object} options.
 */
function getNonminJsUglifyOptions() {
    var options = getJsUglifyOptions(false);

    options.mangle = false;
    options.output = {
        beautify: true
    };

    return options;
}

/**
 * Options to generate source maps.
 * 
 * @param {String} sourcePath Path to sources that will be used in map files.
 * @returns {Object}
 */
function getWriteMapOptions(sourcePath) {
    return {
        // includeContent: true - useful when you don't have sources on server.
        includeContent: config.includeContentToMap || false,
        sourceRoot: sourcePath
    };
}

module.exports = tsc;