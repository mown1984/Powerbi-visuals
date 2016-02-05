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
    config = require("../../../gulp/config.js"),
    utils = require("../../../gulp/utils.js"),
    concat = require("gulp-concat"),
    merge = require("merge2"),
    replace = require("gulp-replace"),
    gulp = require("gulp");

module.exports = projects.initProject(
    "VisualsContracts", // proj name
    __dirname, // project folder
    {
        drop: [
            {
                source: ["./obj/*.js", "./obj/*.map"],
                dest: [config.paths.VisualsDropScripts]
            },
            {
                source: ["./obj/*.d.ts"],
                dest: [config.paths.VisualsDropScripts],
                transform: utils.transform.rmRefs()
            }
        ],
        tsc: {
            outFileName: 'VisualsContracts'
        },
        watch: {
            includes: ['/**/*.ts']
        },
        afterBuild: function(proj) {

            var  taskName = "combineVisualsContracts.d.ts";

            gulp.task(taskName, function() {
                   return combineVisualsContractsDTS(proj);
            });
            return taskName;
        },
    });

function combineVisualsContractsDTS(proj) {
    var projectPath = proj.projFolder;
    var projectName = proj.projName;
    //Hack: Only remove multiline comments containing "copyright" and single line comments containing "<reference"
    //TODO: ensure all comments are JSDoc style comments and adjust this to remove all non-JSDoc comments
    //      Ideally we could use gulp-decomment for this and trimming whitespace
    //      (maybe we should submit a pull request to add this feature?) 
    var jsCommentRegExp = /(?:\/\*(?:[\s\S]*?)(?:copyright)(?:[\s\S]*?)\*\/)|(?:([\s;]?)+\/\/(?:.*)(?:<reference)(?:.*)$)/igm;

    return merge(
        //copyright notice + external typedefs 
        gulp.src(projectPath + '/typedefs/typedefs.ts'),

        //compiled d.ts - contains definitions from enums.ts
        gulp.src(projectPath + '/obj/' + projectName + '.d.ts')
            //copyright comments and reference tags
            .pipe(replace(jsCommentRegExp,'')),

        //concatenate all other d.ts files directly
        gulp.src(['!' + projectPath + '/obj/*.*', projectPath + '/**/*.d.ts'])
            //copyright comments and reference tags
            .pipe(replace(jsCommentRegExp,''))
    )
    .pipe(concat(projectName + '.d.ts'))
    .pipe(gulp.dest(projectPath + '/obj/'));
}
