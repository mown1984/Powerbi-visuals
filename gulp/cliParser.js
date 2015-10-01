"use strict";

var minimist = require("minimist"),
    cliOptions = {
    string: [
        "files",
        "openInBrowser"
    ],
    boolean: "debug",
    alias: {
        files: "f",
        debug: "d",
        openInBrowser: ["o", "oib"]
    }
};

module.exports.cliOptions = minimist(process.argv.slice(2), cliOptions) || {};