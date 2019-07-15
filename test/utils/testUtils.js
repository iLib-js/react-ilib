/*
 * testUtils.js - test the utility functions.
 *
 * Copyright © 2019, JEDLSoft
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

import {objectEquals} from "../../src/utils/utils.js";

module.exports.hash = {
    testObjectEqualsSimple: function(test) {
        test.expect(1);

        test.ok(objectEquals({
            a: "b",
            c: 1,
            d: true
        }, {
            d: true,
            a: "b",
            c: 1
        }));

        test.done();
    },

    testObjectEqualsStrings: function(test) {
        test.expect(1);

        test.ok(objectEquals("b", "b"));

        test.done();
    },

    testObjectEqualsBooleans: function(test) {
        test.expect(1);

        test.ok(objectEquals(false, false));

        test.done();
    },

    testObjectEqualsNumbers: function(test) {
        test.expect(1);

        test.ok(objectEquals(7465.4, 7465.4));

        test.done();
    },

    testObjectEqualsArrays: function(test) {
        test.expect(1);

        test.ok(objectEquals([1, 6, 4, 3], [1, 6, 4, 3]));

        test.done();
    },

    testObjectEqualsNotEquals: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, {
            d: true,
            a: "d",
            c: 1
        }));

        test.done();
    },

    testObjectEqualsDifferentType: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, {
            d: true,
            a: null,
            c: 1
        }));

        test.done();
    },

    testObjectEqualsMissing: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, {
            d: true,
            c: 1
        }));

        test.done();
    },

    testObjectEqualsAdditional: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, {
            d: true,
            a: "b",
            c: 1,
            x: "y"
        }));

        test.done();
    },

    testObjectEqualsLeftUndefined: function(test) {
        test.expect(1);

        test.ok(!objectEquals(undefined, {
            d: true,
            a: "d",
            c: 1
        }));

        test.done();
    },

    testObjectEqualsRightUndefined: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, undefined));

        test.done();
    },

    testObjectEqualsLeftNull: function(test) {
        test.expect(1);

        test.ok(!objectEquals(null, {
            d: true,
            a: "d",
            c: 1
        }));

        test.done();
    },

    testObjectEqualsRightNull: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, null));

        test.done();
    },

    testObjectEqualsUndefinedAndNull1: function(test) {
        test.expect(1);

        test.ok(!objectEquals(undefined, null));

        test.done();
    },

    testObjectEqualsUndefinedAndNull2: function(test) {
        test.expect(1);

        test.ok(!objectEquals(null, undefined));

        test.done();
    },

    testObjectEqualsNullNull: function(test) {
        test.expect(1);

        test.ok(objectEquals(null, null));

        test.done();
    },

    testObjectEqualsUndefinedUndefined: function(test) {
        test.expect(1);

        test.ok(objectEquals(undefined, undefined));

        test.done();
    },

    testObjectEqualsObjectBoolean: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, true));

        test.done();
    },

    testObjectEqualsBooleanObject: function(test) {
        test.expect(1);

        test.ok(!objectEquals(true, {
            a: "b",
            c: 1,
            d: true
        }));

        test.done();
    },

    testObjectEqualsObjectString: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, "foo"));

        test.done();
    },

    testObjectEqualsStringObject: function(test) {
        test.expect(1);

        test.ok(!objectEquals("foo", {
            a: "b",
            c: 1,
            d: true
        }));

        test.done();
    },

    testObjectEqualsObjectNumber: function(test) {
        test.expect(1);

        test.ok(!objectEquals({
            a: "b",
            c: 1,
            d: true
        }, 23));

        test.done();
    },

    testObjectEqualsNumberObject: function(test) {
        test.expect(1);

        test.ok(!objectEquals(34, {
            a: "b",
            c: 1,
            d: true
        }));

        test.done();
    },
    
    testObjectEqualsIgnoreProps: function(test) {
        test.expect(1);

        test.ok(objectEquals({
            a: "b",
            c: 1,
            d: false,
            e: 1
        }, {
            d: true,
            a: "b",
            c: 1,
            f: "asdf"
        }, ["d", "e", "f"]));

        test.done();
    },

};