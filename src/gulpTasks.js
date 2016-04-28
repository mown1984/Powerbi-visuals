"use strict";

var gulp = require('gulp-help')(require('gulp')),
    runSequence = require("run-sequence").use(gulp),
    ts = require("gulp-typescript"),
    gulpRename = require("gulp-rename"),
    pathModule = require("path"),
    filter = require('gulp-filter'),
    insert = require('gulp-insert');

var projects = require("../gulp/projects.js"),
    cliParser = require("../gulp/cliParser.js"),
    packageBuilder = require("../gulp/packageBuilder.js");

var powerBIVisualslayground = require("./Clients/PowerBIVisualsPlayground/gulpProject");

require("../gulp/visualsTest");
require("../gulp/visualsPlayground");

require("./Clients/VisualsContracts/gulpProject");
require("./Clients/VisualsExtensibility/gulpProject");
require("./Clients/VisualsCommon/gulpProject");
require("./Clients/VisualsData/gulpProject");
require("./Clients/Visuals/gulpProject");

gulp.task("buildAll", ["build", "build:tests"]);

gulp.task("build", "Build the project", function (cb) {
    return runSequence(powerBIVisualslayground.buildWithDepsTask, cb);
});

gulp.task("default", function (cb) {
    return runSequence(powerBIVisualslayground.buildWithDepsTask, cb);
});

// aliases for running tests
gulp.task("test", "Build and run tests", function(cb) {
    return runSequence("test:visuals", cb);
});

gulp.task("build:tests", "Build tests", function(cb) {
    return runSequence("build:visualsTests", cb);
});

gulp.task("run:tests", "Run tests", function(cb) {
    return runSequence("run:test:visuals", cb);
});

gulp.task("init", "Run the build and then start watchers which will build project parts after you save changes to any file", function (cb) {
    return runSequence("build", "watch", cb);
});

gulp.task("watch", function (cb) {
    powerBIVisualslayground.createWatchTask();

    return runSequence("watch:powerBIVisualsPlayground", cb);
});

gulp.task("tslint", "Check the source files for TypeScript Lint errors", function (callback) {

    var tasks = [];

    var allProjects = projects.get();

    for (var projectName in allProjects) {

        var project = allProjects[projectName];

        if (project.params.tsc) {
            project.createTypeScriptLintTask();
            tasks.push(project.lintTask);
        }
    }

    // run tslint tasks in parallel
    runSequence(tasks, callback);
});



gulp.task("build:customVisuals:separate", function(callback) {
    var customVisualsProjectPath = "src/Clients/CustomVisuals",
        packageResourcesPath = "package/resources";
    var customVisualsFilter = filter(['**/visual/**/*.ts',
                                      '**/visual/**/*.js'], {restore: true});
    
    var tsProject = ts.createProject(pathModule.join(customVisualsProjectPath, "tsconfig.json"), {
        typescript: require('typescript'),
        module: "amd",
        sortOutput: false,
        target: "ES5",
        // declarationFiles: me.params.tsc.declarationFiles !== undefined ? me.params.tsc.declarationFiles : true, //TODO: refactor this - use lodash
        noEmitOnError: false,
        //removeComments:true,
        // projectName: me.projName, // custom property
        // outFileName: me.params.tsc.outFileName, // custom property
        // out: me.params.tsc.outFileName ? path.join(me.projFolder, JS_OUT_FOLDER_NAME, me.params.tsc.outFileName + ".js") : undefined
    });

    return tsProject.src()
        .pipe(ts(tsProject, undefined, ts.reporter.longReporter()))
        .pipe(customVisualsFilter)
        .pipe(insert.append(packageBuilder.portalExports))
        .pipe(gulpRename(function (path) {
            path.dirname = pathModule.join(path.dirname, "..", packageResourcesPath);
        }))
        .pipe(gulp.dest(customVisualsProjectPath));
});

gulp.task("package:all", function(callback) {
    return packageBuilder.buildAllPackages(callback);
});

gulp.task("package", function(callback) {
    var packageName = cliParser.visual;
    var isAll = cliParser.all;
    if (packageName) {
        var pb = new packageBuilder(packageName);
        return pb.build();
    } else if (isAll) {
        runSequence("build:customVisuals:separate", "package:all", callback);
    }
});
