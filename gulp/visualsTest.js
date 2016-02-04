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

var gulp = require('gulp-help')(require('gulp')),
    glob = require("glob"),
    runSequence = require("run-sequence").use(gulp),
    fs = require("fs"),
    path = require("path"),
    jasmineBrowser = require("gulp-jasmine-browser"),
    common = require("./utils.js"),
    cliParser = require("./cliParser.js"),
    visualsCommon = require("./visualsCommon.js"),
    visualsDownload = require("./visualsDownload.js");

// this loads PowerBIVisualsTests gulp tasks
require("../src/Clients/PowerBIVisualsTests/gulpProject.js");

var openInBrowser = cliParser.openInBrowser,
    filesOption = common.getOptionFromCli(cliParser.files);

function copyExternalDependencies() {
    return gulp.src([
        "../lib/visuals.css",
        "../lib/powerbi-visuals.all.js",

        "../src/Clients/CustomVisuals/styles/customVisuals.css",
        "../src/Clients/CustomVisuals/obj/CustomVisuals.js",

        "../src/Clients/externals/ThirdPartyIP/JasmineJQuery/jasmine-jquery.js",
        "../src/Clients/externals/ThirdPartyIP/MomentJS/moment.min.js",
        "../src/Clients/externals/ThirdPartyIP/Velocity/velocity.min.js",
        "../src/Clients/externals/ThirdPartyIP/Velocity/velocity.ui.min.js",
        "../src/Clients/externals/ThirdPartyIP/QuillJS/quill.min.js",
        "../src/Clients/externals/ThirdPartyIP/JQueryScrollbar/jquery.scrollbar.min.js",
        "../src/Clients/externals/css/jquery.scrollbar.css",
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine.js",
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js",
        "../node_modules/jasmine-core/lib/jasmine-core/boot.js",
        "../node_modules/jasmine-core/lib/jasmine-core/jasmine.css"], {cwd: __dirname})
        .pipe(gulp.dest("../VisualsTests", {cwd: __dirname}));
}

function addLink(link) {
    return '<link rel="stylesheet" type="text/css" href="' + link + '"/>';
}

function addScript(script) {
    return '<script type="text/javascript" src="' + script + '"></script>\r\n';
}

function addPaths(paths) {
    var cssExtension = /.+\.css/,
        jsExtension = /.+\.js/;

    return (paths.map(function (path) {
        if (jsExtension.test(path)) {
            return addScript(path);
        } else if (cssExtension.test(path)) {
            return addLink(path);
        }
    })).join("");
}

function addTestName(testName) {
    if (testName && testName.length > 0) {
        var specName = "?spec=" + encodeURI(testName);

        return "<script>" + "if (window.location.search !=='" + specName + "') {" +
            "window.location.search = '" + specName + "';}</script>";
    } else {
        return "";
    }
}

function createHtmlTestRunner(fileName, paths, testName) {
    var html = "<!DOCTYPE html><html>",
        head =
            "<head>" +
            '<meta charset="utf-8">' +
            "<title>Jasmine Spec Runner</title>" +
            addPaths(paths) +
            addTestName(testName) + "</head>",
        body = "<body></body>";

    html = html + head + body + "</html>";

    fs.writeFileSync(fileName, html);
}

gulp.task("run:test:visuals", function (callback) {
    return runTestVisuals(callback);
});

function runTestVisuals(callback) {
    // TODO read VisualsTests folder location from config
    var testFolder = "VisualsTests",
        specRunnerFileName = "runner.html",
        specRunnerPath = path.resolve(__dirname, "../", testFolder + "/" + specRunnerFileName),
        testsPath = path.resolve(__dirname, "../", testFolder),
        tests = [];

    if (filesOption && filesOption.length > 0) {
        for (var i = 0; i < filesOption.length; i++) {
            tests = tests.concat(glob.sync("./**/" + filesOption[i], {
                cwd: testsPath
            }));
        }
    }
    else {
        tests = tests.concat(glob.sync("./**/*Test*.js", {
            cwd: testsPath
        }));
    }

    var src = [
            "visuals.css",
            "jquery.scrollbar.css",
            "CustomVisuals.css",
            "powerbi-visuals.all.js",
            "CustomVisuals.js",
            "jasmine-jquery.js",
            "velocity.min.js",
            "velocity.ui.min.js",
            "quill.min.js",
            "moment.min.js",
            "mocks.js",
            "common.js",
            "sqFieldDef.js",
            "./helpers/helpers.js",
            "./helpers/kpiHelper.js",
            "./helpers/slicerHelper.js",
            "./helpers/tableDataViewHelper.js",
            "./helpers/tablixHelper.js",
            "./helpers/performanceTestsHelpers.js",
            "./utils/bingSocial/NewsDataFactory.js",
            "./utils/bingSocial/TweetFactory.js",
            "./customVisuals/VisualBuilderBase.js",
            "./customVisuals/helpers/dataViewHelper.js",
            "./customVisuals/sampleDataViews/AreaRangeChartData.js",
            "./customVisuals/sampleDataViews/BulletChartData.js",
            "./customVisuals/sampleDataViews/CarLogosData.js",
            "./customVisuals/sampleDataViews/chordChartData.js",
            "./customVisuals/sampleDataViews/CountriesData.js",
            "./customVisuals/sampleDataViews/DotPlotData.js",
            "./customVisuals/sampleDataViews/forceGraphData.js",
            "./customVisuals/sampleDataViews/GanttData.js",
            "./customVisuals/sampleDataViews/MatrixData.js",
            "./customVisuals/sampleDataViews/MekkoChartData.js",
            "./customVisuals/sampleDataViews/ProductSalesByDateData.js",
            "./customVisuals/sampleDataViews/SalesByCountryData.js",
            "./customVisuals/sampleDataViews/SalesByDayOfWeekData.js",
            "./customVisuals/sampleDataViews/TimelineData.js",
            "./customVisuals/sampleDataViews/valueByAgeData.js",
            "./customVisuals/sampleDataViews/ValuesByCountriesData.js"
        ].concat(tests),
        jasminePaths = [
            "jasmine.css",
            "jasmine.js",
            "jasmine-html.js",
            "boot.js"
        ];

    createHtmlTestRunner(
        specRunnerPath,
        jasminePaths.concat(src),
        common.getOptionFromCli(openInBrowser)[0]
    );

    if (openInBrowser !== undefined && openInBrowser !== null) {
        visualsCommon.runHttpServer({
            path: testFolder,
            port: 3001,
            index: specRunnerFileName
        }, callback);
    } else {
        return gulp.src(src, {
            cwd: testsPath
        })
            .pipe(jasmineBrowser.specRunner({
                console: true
            }))
            .pipe(jasmineBrowser.headless());
    }
}

gulp.task("test:visuals:performance", "Run only performance tests", function (callback) {
    filesOption.push("visuals/performance/performanceTests.js");
    runSequence("test:visuals", callback);
});

gulp.task("test:visuals", ["build:visualsTests"], function (callback) {
    return runTestVisuals(callback);
});

gulp.task("build:visualsTests", ["build:powerBIVisualsTests"], function () {
    return buildVisualsTests();
});

function buildVisualsTests() {
    return visualsCommon.runScriptSequence([
        visualsDownload.installJasmine,
        visualsDownload.installPhantomjs,
        copyExternalDependencies
    ]);
}
