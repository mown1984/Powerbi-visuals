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
var gulp = require("gulp");
var merge = require("merge2");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglifyjs");
var rename = require("gulp-rename");
var runSequence = require("run-sequence");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var minifyCSS = require("gulp-minify-css");
var typedoc = require("gulp-typedoc"); 
var spritesmith = require("gulp.spritesmith");
var git = require("gulp-git");
var tslint = require("gulp-tslint");
var download = require("gulp-download");
var unzip = require("gulp-unzip");
var fs = require("fs");
var minimist = require("minimist");
var express = require("express");
var open = require("gulp-open");
var gutil = require("gulp-util");
var cliParser = require("./cliParser.js");
var common = require("./common.js");

var isDebug = Boolean(cliParser.cliOptions.debug);

var filesOption = common.getOptionFromCli(cliParser.cliOptions.files);

var jsUglifyOptions = {
    compress: {
        drop_console: true,
        pure_funcs: [
            "debug.assertValue",
            "debug.assertFail",
            "debug.assert",
            "debug.assertAnyValue"
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
            "DEBUG": false
        }
    }
};

var internalsPaths = ["src/Clients/VisualsCommon/obj/VisualsCommon.js",
    "src/Clients/VisualsData/obj/VisualsData.js",
    "src/Clients/Visuals/obj/Visuals.js"];

var externalsPath = [
    "src/Clients/Externals/ThirdPartyIP/JQuery/2.1.3/jquery.min.js",
    "src/Clients/Externals/ThirdPartyIP/D3/d3.min.js",
    "src/Clients/Externals/ThirdPartyIP/LoDash/lodash.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.culture.en-US.js",
    "src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.js"
];

module.exports = {
    getBuildPaths : getBuildPaths,
    internalsPaths : internalsPaths,
    externalsPath : externalsPath
};

/* ------------------------ GET PATH --------------------------------------- */
function getBuildPaths(projectPath, outFileName, includePaths) {
    var paths = [];

    if (includePaths && includePaths.length > 0) {
        paths = paths.concat(includePaths.map(function (path) {
            return projectPath + "/" + path;
        }));
    } else {
        paths.push(projectPath + "/**/*.ts");
    }

    paths.push("!" + projectPath + "/obj/**");
    paths.push("!" + projectPath + "/**/*.d.ts");

    return paths;
}


function getPathsForVisualsTests(paths) {
    var includePaths = [];

    if (paths && paths.length > 0) {
        includePaths.push("_references.ts");
        includePaths = includePaths.concat(paths.map(function (path) {
            return "visuals/" + path;
        }));
    }

    return includePaths;
}

/* --------------------------- BUILD PROJECTS---------------------------------- */
var dontEmitTSbuildErrors = false;
function buildProject(projectPath, outFileName, includePaths) {
    var paths = getBuildPaths(projectPath, outFileName, includePaths);
    var srcResult = gulp.src(paths);

    if (isDebug)
        srcResult = srcResult.pipe(sourcemaps.init());

    var tscResult = srcResult
        .pipe(ts({
            sortOutput: true,
            target: "ES5",
            declarationFiles: true,
            noEmitOnError: dontEmitTSbuildErrors,
            out: projectPath + "/obj/" + outFileName + ".js"
        }));

    if (isDebug) {
        tscResult.js = tscResult.js.pipe(sourcemaps.write());
    }

    if (isDebug)
        return merge([tscResult.js.pipe(gulp.dest("./")),
            tscResult.dts.pipe(gulp.dest("./"))]);
    else
        return merge([tscResult.dts.pipe(gulp.dest("./")),
            tscResult.js
                .pipe(uglify(outFileName + ".js", jsUglifyOptions))
                .pipe(gulp.dest(projectPath + "/obj"))
        ]);
}

gulp.task("build:visuals_common", function () {
    return buildProject("src/Clients/VisualsCommon", "VisualsCommon");
});

gulp.task("build:visuals_data", function () {
    return buildProject("src/Clients/VisualsData", "VisualsData");
});

gulp.task("build:visuals_project:ts", function () {
    return buildProject("src/Clients/Visuals", "Visuals");
});

gulp.task("build:visuals_playground_project", function () {
    return buildProject("src/Clients/PowerBIVisualsPlayground", "PowerBIVisualsPlayground");
});

gulp.task("build:visuals_tests", function () {
    return buildProject(
        "src/Clients/PowerBIVisualsTests",
        "PowerBIVisualsTests",
        getPathsForVisualsTests(filesOption));
});

/* --------------------------- LESS/CSS ---------------------------------- */
gulp.task("build:visuals_sprite", function () {
    var spriteData = gulp.src("src/Clients/Visuals/images/sprite-src/*.png").pipe(spritesmith({
        imgName: "images/visuals.sprites.png",
        cssName: "styles/sprites.less"
    }));

    return spriteData.pipe(gulp.dest("src/Clients/Visuals/"));
});
gulp.task("build:visuals_less", function () {
    var css = gulp.src(["src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.css",
       			 "src/Clients/Visuals/styles/visuals.less"])
        .pipe(less())
        .pipe(concat("visuals.css"));

    if (!isDebug) {
        css = css.pipe(minifyCSS());
    }

    return css.pipe(gulp.dest("build/styles"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

/* -------------- COMBINERS LINKERS CONCATENATORS ------------------------- */
function concatFilesWithSourceMap(source, outFileName) {
    var result = source;

    if (isDebug)
        result = result.pipe(sourcemaps.init({loadMaps: true}));

    result = result.pipe(concat(outFileName));

    if (isDebug)
        result = result.pipe(sourcemaps.write());

    return result;
}

gulp.task("combine:internal_js", function () {
    var srcResult = gulp.src(internalsPaths, {
        base: "build"
    });

    if (isDebug)
        return concatFilesWithSourceMap(srcResult, "powerbi-visuals.js")
            .pipe(gulp.dest("build/scripts"))
            .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"))
    else
        return concatFilesWithSourceMap(srcResult, "powerbi-visuals.js")
            .pipe(uglify("powerbi-visuals.js", jsUglifyOptions))
            .pipe(gulp.dest("build/scripts"))
            .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

gulp.task("combine:all", function () {
    var src = [
        "build/scripts/externals.min.js"
    ];

    src.push("build/scripts/powerbi-visuals.js");

    return concatFilesWithSourceMap(gulp.src(src), "powerbi-visuals.all.js")
        .pipe(gulp.dest("build/scripts"));
});

/* --------------------------- EXTERNALS ---------------------------------- */
gulp.task("combine:external_js", function () {
    return gulp.src(externalsPath)
        .pipe(concat("externals.min.js"))
        .pipe(gulp.dest("build/scripts"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"));
});

/* --------------------------- TS-LINT ---------------------------------- */
var tslintPaths = ["src/Clients/VisualsCommon/**/*.ts",
    "!src/Clients/VisualsCommon*/obj/*.*",
    "!src/Clients/VisualsCommon/**/*.d.ts",
    "src/Clients/VisualsData/**/*.ts",
    "!src/Clients/VisualsData*/obj/*.*",
    "!src/Clients/VisualsData/**/*.d.ts",
    "src/Clients/Visuals/**/*.ts",
    "!src/Clients/Visuals*/obj/*.*",
    "!src/Clients/Visuals/**/*.d.ts",
    "src/Clients/PowerBIVisualsTests/**/*.ts",
    "!src/Clients/PowerBIVisualsTests*/obj/*.*",
    "!src/Clients/PowerBIVisualsTests/**/*.d.ts",
    "src/Clients/PowerBIVisualsPlayground/**/*.ts",
    "!src/Clients/PowerBIVisualsPlayground*/obj/*.*",
    "!src/Clients/PowerBIVisualsPlayground/**/*.d.ts"];

gulp.task("tslint", function () {
    return gulp.src(tslintPaths)
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});
/* --------------------------- COPY FILES ---------------------------------- */
gulp.task("copy:internal_dependencies_visuals_playground", function () {
    var src = [];
    src.push("src/Clients/PowerBIVisualsPlayground/obj/PowerBIVisualsPlayground.js");

    return gulp.src(src)
        .pipe(rename("PowerBIVisualsPlayground.js"))
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground"))
});
gulp.task("copy:image_dependencies_visuals_playground", function () {
    var src = [];
    src.push("src/Clients/Visuals/images/visuals.sprites.png");

    return gulp.src(src)
        .pipe(gulp.dest("src/Clients/PowerBIVisualsPlayground/images"))
});
/* --------------------------- BUILD SEQUENCIES ---------------------------------- */
gulp.task("build:visuals_project", function (callback) {
    runSequence("build:visuals_project:ts", "build:visuals_sprite", "build:visuals_less", callback);
});

gulp.task("build:visuals:projects", function (callback) {
    runSequence(
        "build:visuals_common",
        "build:visuals_data",
        "build:visuals_project",
        "combine:internal_js",
        "combine:external_js",
        //"combine:all",
        "build:visuals_playground",
        callback);
});

gulp.task("build:visuals_playground", function (callback) {
    runSequence(
        "build:visuals_playground_project",
        "copy:internal_dependencies_visuals_playground",
        "copy:image_dependencies_visuals_playground",
        callback);
});

gulp.task("build:visuals", function (callback) {
     if (isDebug)
    runSequence(
        "build:visuals:projects",
        callback); 
     else
    runSequence(
        "tslint",
        "build:visuals:projects",
        callback);
});
gulp.task("build:visuals:debug", function (callback) {
    isDebug = true;
    runSequence(
        "build:visuals:projects",
        callback);
});

/* ------------------------ BUILD PACKAGES ------------------------------- */

gulp.task("build:package", function(callback) {
    runSequence(
        "build:package_minified",
        "copy:package_js_minified",
        "copy:package_css_minified",
        "build:package_unminified",
        "copy:package_js_unminified",
        "copy:package_css_unminified",
        "combine:internal_d_ts",
        "combine:external_d_ts",
        "copy:package_sprite",
        callback);
});

gulp.task("copy:package_js_minified", function () {
    return copyPackageFile("build/scripts/powerbi-visuals.all.js", "powerbi-visuals.min.js");
});

gulp.task("copy:package_js_unminified", function () {
    return copyPackageFile("build/scripts/powerbi-visuals.all.js", "powerbi-visuals.js");
});

gulp.task("copy:package_css_minified", function () {
    return copyPackageFile("build/styles/visuals.css", "visuals.min.css");
});

gulp.task("copy:package_css_unminified", function () {
    return copyPackageFile("build/styles/visuals.css", "visuals.css");
});

gulp.task("copy:package_sprite", function () {
    return copyPackageFile("src/Clients/Visuals/images/visuals.sprites.png", "images/visuals.sprites.png");
});

gulp.task("build:package_minified", function (callback) {
    isDebug = false;
    runSequence(
        "build:package_projects",
        callback);
});

gulp.task("build:package_unminified", function (callback) {
    isDebug = true;
    runSequence(
        "build:package_projects",
        callback);
});

gulp.task("build:package_projects", function (callback) {
    runSequence(
        "build:visuals_common",
        "build:visuals_data",
        "build:visuals_project",
        "combine:internal_js",
        "combine:external_js",
        "combine:all",
        callback);
});

gulp.task("combine:internal_d_ts", function() {
    return combine({
        src: [
            "src/Clients/VisualsCommon/obj/VisualsCommon.d.ts",
            "src/Clients/VisualsData/obj/VisualsData.d.ts",
            "src/Clients/Visuals/obj/Visuals.d.ts"
        ],
        name: "powerbi-visuals.d.ts",
        destinationPath: "lib"
    });
});

gulp.task("combine:external_d_ts", function() {
    return combine({
        src: [
            "src/Clients/Typedefs/jquery/jquery.d.ts",
            "src/Clients/Typedefs/d3/d3.d.ts"
        ],
        name: "powerbi-externals.d.ts",
        destinationPath: "lib"
    });
});

/**
 * Concatenate given files into one.
 * <br/>
 * <p>Option object props: <br/>
 *  src {String[]} - Array of paths with files to combine <br/>
 *  name {String} - Name of resulting file.<br/>
 *  destinationPath {String} - Destination path where file will be placed.<br/>
 * <p/>
 * @
 * @param {Object} options
 */
function combine(options) {
    return gulp.src(options.src)
        .pipe(concat(options.name))
        .pipe(gulp.dest(options.destinationPath));
}

function copyPackageFile(inputFile, outputFile) {
	var src = [];
    src.push(inputFile);
	
	return gulp.src(src)
        .pipe(rename(outputFile))
        .pipe(gulp.dest("lib"))
}


