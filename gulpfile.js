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
    runSequence = require("run-sequence").use(gulp),
    path = require("path"),
    gutil = require("gulp-util"),
    webpack = require("webpack"),
    utils = require("./build/utils.js"),
    options = require("./build/options"),
    karma = require("karma"),
    opn = require("opn"),
    WebpackDevServer = require("webpack-dev-server"),
    uglify = require("gulp-uglify"),
    gulpMinifyCSS = require("gulp-minify-css"),
    cssjanus = require("gulp-cssjanus"),
    merge = require("merge2"),
    clone = require("gulp-clone"),
    Q = require("q"),
    packageBuilder = require("./build/packageBuilder.js"),
    rename = require("gulp-rename");

var uglifyOptions = require("./build/webpack/uglifyOptions.js").uglifyOptions;
var nonminOptions = require("./build/webpack/uglifyOptions.js").nonminOptions;

require("./build/symlinkToDirectoryLib.js");

var externalsJs = [
    "src/Clients/Externals/ThirdPartyIP/JQuery/2.1.3/jquery.min.js",
    "src/Clients/Externals/ThirdPartyIP/jqueryui/1.11.4/jquery-ui.min.js",
    "src/Clients/Externals/ThirdPartyIP/D3/d3.min.js",
    "src/Clients/Externals/ThirdPartyIP/LoDash/lodash.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.min.js",
    "src/Clients/Externals/ThirdPartyIP/GlobalizeJS/globalize.culture.en-US.js"
];

var sandDanceExternalsJs = [
    "src/Clients/Externals/ThirdPartyIP/hammer/hammer-206.js",
    "src/Clients/Externals/ThirdPartyIP/mat4x/mat4x.js",
    "src/Clients/Externals/ThirdPartyIP/vuePlotCore/vuePlotCore.js"
];
var externalsDts = [
    "src/Clients/Typedefs/jquery/jquery.d.ts",
    "src/Clients/Typedefs/microsoftMaps/Microsoft.Maps.d.ts",
    "src/Clients/Typedefs/quill/quill.d.ts",
    "src/Clients/Typedefs/lodash/lodash.d.ts",
    "src/Clients/Typedefs/d3/d3.d.ts"
];

function getWebPackConfig(watchMode, path) {
    var pathToConf = path || "./webpack.config.js";

    var webpackConfig = require(pathToConf);

    if (!options.generateMaps) {
        webpackConfig.devtool = undefined;
        webpackConfig.ts.compilerOptions.sourceMap = false;
    }

    if (watchMode === true) {
        // enable watcher
        webpackConfig.watch = true;

        if (!options.tslintOnChange) {
            webpackConfig.module.preLoaders = [];
        }
    } else {
        if (!options.tslintOnBuild) {
            webpackConfig.module.preLoaders = [];
        }
    }

    return webpackConfig;
}

gulp.task("build:copy-externals", function () {
    
    var dest = "./lib";

    return Q.all([
        utils.copy({
            cwd: __dirname,
            source: externalsJs,
            destination: dest,
            join: "powerbi-visuals-externals.min.js"
        }),
        utils.copy({
            cwd: __dirname,
            source: externalsDts,
            destination: dest,
            join: "powerbi-externals.d.ts",
            newLine: "\n"
        }),
        utils.copy({
            cwd: __dirname,
            source: sandDanceExternalsJs,
            destination: dest,
            join: "powerbi-customVisuals-externals.min.js"
        })
    ]);
});

gulp.task("build:projects", ["build:copy-externals"], function () {

    // build only Visuals projects
    return runBuild(true).then(function () {
        // run post build task
        return Q.nfcall(runSequence, "postBuild");
    });
});

gulp.task("build", ["build:copy-externals"], function () {

    // build Visuals projects and tests together
    return runBuild().then(function () {
        // run post build task
        return Q.nfcall(runSequence, "postBuild");
    });
});

function runBuild(withoutTests) {

    var deferred = Q.defer();

    // disable building tests during gulp build task.
    // TODO: consider using other way to disable build of tests
    options.buildWithoutTests = withoutTests !== undefined ? !!withoutTests : options.buildWithoutTests;

    webpack(getWebPackConfig(), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);

        traceBuildStats(stats, false /* isWatch*/);

        if (stats.compilation.errors.length) {
            deferred.reject("Build task failure [err count: " + stats.compilation.errors.length + "]");
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

gulp.task("postBuild", function (cb) {

    var uglifyTask = "postBuild:uglify",
        nonminTask = "postBuild:nonmin",
        cssMinTask = "postBuild:css-min",
        createSymlinkTask = "postBuild:create-symlink";

    var tasks = [uglifyTask, cssMinTask, createSymlinkTask];

    if (options.nonminJs) {
        tasks.push(nonminTask);
        gulp.task(nonminTask, getMinTask(nonminOptions, ".nonmin.js", options.uglifyJs));
    }

    gulp.task(uglifyTask, getMinTask(uglifyOptions, ".min.js", options.uglifyJs));

    gulp.task(cssMinTask, processCss);

    return runSequence(tasks, cb);

    function getMinTask(options, ext, enabled) {

        return function () {
            // TODO: consider using `changed` module
            return gulp.src(["./lib/*.js", "!./lib/*.min.js", "!./lib/*.nonmin.js"])
                .pipe(enabled ? uglify(options) : gutil.noop())
                .pipe(rename({ extname: ext }))
                .pipe(gulp.dest("./lib/"));
        }
    }
});

/**
 * Produce rtl css and minify all css files in lib folder; 
 */
function processCss() {

    var dest = "./lib/";

    // pick up all css files except min and rtl 
    var cssStream = gulp.src(["./lib/*.css", "!./lib/*.rtl.css", "!./lib/*.min.css"])
        // workaround to produce pausable stream (new mode)
        .pipe(gutil.noop());

    // produce rtl files from plain css
    var cssjanusResult = cssStream
        .pipe(clone())
        .pipe(cssjanus({ swapLtrRtlInUrl: true }))
        .pipe(rename({ extname: ".rtl.css" }))
        .pipe(gulp.dest(dest));

    // TODO: consider using `changed` module
    // minify and save all css
    return merge([cssStream, cssjanusResult])
        .pipe(options.minifyCss ? gulpMinifyCSS() : gutil.noop())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest(dest));
}

gulp.task("watch", ["build:copy-externals"], function (callback) {
    webpack(getWebPackConfig(true), webPackWatcherCallback);
});

gulp.task("watch:projects", ["build:copy-externals"], function (callback) {

    //disable watching tests during gulp watch task.
    options.buildWithoutTests = true;

    webpack(getWebPackConfig(true), webPackWatcherCallback);
});

gulp.task("test", function (done) {
    runSequence("build", "run:tests", done);
});

gulp.task("run:tests", function (done) {

    var spec = options.spec;
    var watch = options.watch;

    var karmaConfig = {
        configFile: path.join(__dirname, "./src/Clients/PowerBIVisualsTests/karma.conf.js")
    };

    if (options.debug) {
        // run in browser
        karmaConfig.browsers = ["Chrome"];
        // don"t close browser at the end so that you can do F12
        karmaConfig.singleRun = false;
    }

    if (spec) {
        karmaConfig.client = {
            args: ["--grep", spec],
        }
    }
    
    if (watch) {
        karmaConfig.autoWatch = true;
        karmaConfig.singleRun = false;
        karmaConfig.autoWatchBatchDelay = 1000; // delay to batch multiple changes into a single run
    }
    
    new karma.Server(karmaConfig, function (karmaExitCode) {
        console.log("Karma exited with code ", karmaExitCode);
        done(karmaExitCode ? new Error("Karma exited with code " + karmaExitCode) : null);

        //https://github.com/karma-runner/karma/issues/1035
        process.exit(karmaExitCode);
    }).start();
});

gulp.task("build:tests", function (callback) {
    var webpackConfig = getWebPackConfig(false, "./src/Clients/PowerBIVisualsTests/webpack.config.js");

    webpack(webpackConfig, function (err, stats) {

        if (err) throw new gutil.PluginError("webpack", err);

        traceBuildStats(stats, false /* isWatch*/);

        callback(stats.compilation.errors.length ? "Failure in 'build:tests' task." : undefined);
    });
});

gulp.task("watch:tests", function (callback) {
    webpack(getWebPackConfig(true, "./src/Clients/PowerBIVisualsTests/webpack.config.js"), webPackWatcherCallback);
});

gulp.task("playground", ["build:copy-externals"], function (callback) {

    //disable building tests
    options.buildWithoutTests = true;

    var webpackConfig = getWebPackConfig();

    webpackConfig.debug = true;
    webpackConfig.stats = false;
    webpackConfig.output.publicPath = "/assets/";

    webpackConfig.entry.CustomVisuals.unshift("webpack-dev-server/client?http://localhost:3333/");
    webpackConfig.entry.Visuals.unshift("webpack-dev-server/client?http://localhost:3333/");
    webpackConfig.entry.PowerBIVisualsPlayground.unshift("webpack-dev-server/client?http://localhost:3333/");

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig, function (err, stats) {
        if (err)
            throw new gutil.PluginError("webpack", err);

        var url = "http://localhost:3333/src/Clients/PowerBIVisualsPlayground/";

        // open Playground in default browser
        gutil.log(gutil.colors.green("Open Playground URL: "), gutil.colors.white(url));
        opn(url);
    }), {
            inline: true,
            publicPath: webpackConfig.output.publicPath,
            // hot: true,
            stats: false
        }).listen("3333", "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            gutil.log("[webpack-dev-server]", "http://localhost:3333/");
        });
});

function webPackWatcherCallback(err, stats) {

    if (err) throw new gutil.PluginError("webpack", err);

    traceBuildStats(stats, true /* isWatch */);

    // Check if some css asset is emitted
    var needUpdCss = Object.keys(stats.compilation.assets).some(function (assetkey) {
        return stats.compilation.assets[assetkey].emitted === true && path.extname(assetkey) === ".css";
    });

    // produce css related artifacts - rtl.css, min.css, min.rtl,css  
    // TODO: get rid of such logic when main projects will use only one visual asset/bundle.  
    if (needUpdCss) {
        processCss();
    }

    gutil.log(gutil.colors.magenta("waiting for changes ..."));
}

function traceBuildStats(stats, isWatch) {

    var traceLine = stats.toString(stats.compilation.options.stats || {});

    // trace could be empty if there is no errors/warnings and assets=false
    if (traceLine) {
        // there is new line sign so as to keep webpack message formatting 
        gutil.log("[webpack]\n", traceLine);
    }

    if (isWatch) {
        var jsonStats = stats.toJson();
        var emitted = Object.keys(stats.compilation.assets).filter(function(asset){
            return stats.compilation.assets[asset].emitted;
        }).length;
        var emittedMsg = emitted ? gutil.colors.white(" Assets emitted: ") + gutil.colors.cyan(emitted) : gutil.colors.white(" No assets emitted");

        gutil.log("Build took " + gutil.colors["cyan"]((parseInt(jsonStats.time) / 1000) + "s") + emittedMsg);
    }
}

gulp.task("package", function (callback) {

    gulp.task("package:all", function (callback) {
        packageBuilder.buildAllPackages(callback);
    });

    gulp.task("package:all:addToDrop", function (callback) {
        packageBuilder.copyPackagesToDrop(callback);
    });

    var packageName = options.visual,
        addToDrop = options.addToDrop;

    if (packageName) {
        var pb = new packageBuilder(packageName);
        pb.build(callback);
    } else if (addToDrop) {
        runSequence("package:all", "package:all:addToDrop", callback);
    } else {
        runSequence("package:all", callback);
    }
});
