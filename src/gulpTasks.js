"use strict";

var gulp = require("gulp"),
    runSequence = require("run-sequence").use(gulp),
    ts = require("gulp-typescript"),
    pathModule = require("path");

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


gulp.task("package", function(callback) {

    gulp.task("package:all", function(callback) {
        packageBuilder.buildAllPackages(callback);
    });

    gulp.task("package:all:addToDrop", function(callback) {
        packageBuilder.copyPackagesToDrop(callback);
    });

    var packageName = cliParser.visual,
        addToDrop = cliParser.addToDrop;
    if (packageName) {
        var pb = new packageBuilder(packageName);
        pb.build(callback);
    } else if (addToDrop) {
        runSequence("package:all", "package:all:addToDrop", callback);
    } else {
        runSequence("package:all", callback);
    }
});
