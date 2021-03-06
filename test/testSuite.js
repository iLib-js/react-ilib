/*
 * testSuite.js - test suite for this directory
 * 
 * Copyright © 2018-2019, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var path = require("path");
var fs = require("fs");

//this processes all subsequent requires using babel
process.env.BABEL_ENV = "test";
require("@babel/register");

var nodeunit = require("nodeunit");
var reporter = nodeunit.reporters.minimal;
var modules = {};

//set up the testing environment
require("./setup.jsx");

var files = fs.readdirSync("./test");
files.forEach(function(dir) {
    var sub = path.join(dir, "testSuiteFiles.js");
    var full = path.join("test", sub);
    if (fs.existsSync(full)) {
        var suites = require("./" + sub).files;

        modules[dir] = {};
        suites.forEach(function (file) {
            var test = require("./" + path.join(dir, file));
            for (var suite in test) {
                modules[dir][suite] = test[suite];
            }
        });
    }
});

reporter.run(modules);