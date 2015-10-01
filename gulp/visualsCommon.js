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

module.exports = {
    runHttpServer : runHttpServer
};

function runHttpServer(settings, callback) {
    var expressServer = express(); 
    
    var server = null,
        path = settings.path,
        port = settings.port || 3000,
        host = settings.host || "localhost",
        index = settings.index || "index.html";
    
    expressServer.use(express.static(
        path, {
            index: index
        }));

    server = expressServer.listen(port, host, function () {
        var uri =
            "http://" +
            server.address().address +
            ":" +
            server.address().port;
        
        console.log("Server started on %s", uri);
        
        gulp.src(path).pipe(open({
            uri: uri
        }));
    });
    
    process.on("SIGINT", function () {
        if (server && server.close) {
            server.close();
        }
        
        callback();
        
        process.exit();
    });
}
