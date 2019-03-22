/*
 * testComposition.js - test the composition and decomposition functions.
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

import Composition from "../../src/utils/Composition.js";
import React from "react";

module.exports.composition = {
    testComposeString: function(test) {
        test.expect(1);

        var c = new Composition("this is a test");
        test.equal(c.compose(), "this is a test");

        test.done();
    },

    testComposeNull: function(test) {
        test.expect(1);

        var c = new Composition(null);
        test.equal(c.compose(), "");

        test.done();
    },

    testComposeUndefined: function(test) {
        test.expect(1);

        var c = new Composition();
        test.equal(c.compose(), "");

        test.done();
    },

    testComposeNumeric: function(test) {
        test.expect(1);

        var c = new Composition(5.4);
        test.equal(c.compose(), '5.4');

        test.done();
    },

    testComposeNoChildren: function(test) {
        const el = React.createElement('span', { key: 'a' });
        const c = new Composition(el);

        // nothing to translate, so no composed string
        test.equal(c.compose(), '');

        test.done();
    },

    testComposeOneChild: function(test) {
        const el = React.createElement('span', { key: 'a' }, 'foo');
        const c = new Composition(el);
        test.equal(c.compose(), 'foo');

        test.done();
    },

    testComposeTwoChildren: function(test) {
        const el = React.createElement('span', { key: 'a' }, ['foo', ' bar']);
        const c = new Composition(el);
        
        test.equal(c.compose(), 'foo bar');

        test.done();
    },

    testComposeElementTwoChildren: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "foo",
            " bar"
        ]);
        var c = new Composition(el);

        test.equal(c.compose(), "foo bar");

        test.done();
    },

    testComposeElementSubchildrenSimple: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "This is a test of the ",
            React.createElement("b", {key: "b"}, "emergency broadcast system"),
            ". This is only a test."
        ]);
        var c = new Composition(el);
        test.equal(c.compose(), "This is a test of the <c0>emergency broadcast system</c0>. This is only a test.");

        test.done();
    },

    testComposeElementMultipleSubchildren: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "This is a test of the ",
            React.createElement("b", {key: "b"}, "emergency broadcast system"),
            ". This is ",
            React.createElement("b", {key: "c"}, "only"),
            " a test.",
        ]);
        var c = new Composition(el);
        test.equal(c.compose(), "This is a test of the <c0>emergency broadcast system</c0>. This is <c1>only</c1> a test.");

        test.done();
    },

    testComposeElementSubchildrenComplex: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "x"}, [
            "This is a test of the ",
            React.createElement("b", {key: "y"}, [
                "emergency ",
                React.createElement("i", {key: "z"}, "broadcast"),
                " system",
            ]),
            ". This is only a test."
        ]);

        var c = new Composition(el);
        test.equal(c.compose(), "This is a test of the <c0>emergency <c1>broadcast</c1> system</c0>. This is only a test.");

        test.done();
    },

    testComposeElementWithParam: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "x"}, [
            "User ",
            React.createElement("Param", {  // Param components are special
                key: "y",
                value: "username"
            }),
            " deleted the file."
        ]);

        var c = new Composition(el);
        test.equal(c.compose(), "User <p0/> deleted the file.");

        test.done();
    },

    testDecomposeElementString: function(test) {
        test.expect(1);

        var c = new Composition("simple string");
        test.equal(c.decompose("einfache Zeichenfolge"), "einfache Zeichenfolge");

        test.done();
    },

    testDecomposeOneChild: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, "simple string");

        let expected = React.createElement("span", {key: "a"}, "einfache Zeichenfolge");

        var c = new Composition(el);
        test.deepEqual(c.decompose("einfache Zeichenfolge"), expected);

        test.done();
    },

    testDecomposeSubchildren: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "This is a test of the ",
            React.createElement("b", {key: "b"}, "emergency broadcast system"),
            ". This is only a test."
        ]);

        let expected = React.createElement("span", {key: "a"}, [
            "Dies ist ein Test des ",
            React.createElement("b", {key: "b"}, "Notfall-Broadcast-Systems"),
            ". Dies ist nur ein Test."
        ]);

        var c = new Composition(el);
        test.deepEqual(c.decompose("Dies ist ein Test des <c0>Notfall-Broadcast-Systems</c0>. Dies ist nur ein Test."), expected);

        test.done();
    },

    testDecomposeComplex: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "This is a test of the ",
            React.createElement("b", {key: "b"}, [
                "emergency ",
                React.createElement("i", {key: "c"}, "broadcast"),
                " system"
            ]),
            ". This is only a test."
        ]);

        let expected = React.createElement("span", {key: "a"}, [
            "Dies ist ein Test des ",
            React.createElement("b", {key: "b"}, [
                "Notfall-",
                React.createElement("i", {key: "c"}, "Broadcast"),
                "-Systems"
            ]),
            ". Dies ist nur ein Test."
        ]);

        var c = new Composition(el);
        test.deepEqual(c.decompose("Dies ist ein Test des <c0>Notfall-<c1>Broadcast</c1>-Systems</c0>. Dies ist nur ein Test."), expected);

        test.done();
    },

    testDecomposeComplexPreservingOtherProperties: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a", "foo": "bar"}, [
            "This is a test of the ",
            React.createElement("b", {key: "b"}, [
                "emergency ",
                React.createElement("i", {key: "c", "asdf": "fdsa"}, "broadcast"),
                " system"
            ]),
            ". This is only a test."
        ]);

        let expected = React.createElement("span", {key: "a", "foo": "bar"}, [
            "Dies ist ein Test des ",
            React.createElement("b", {key: "b"}, [
                "Notfall-",
                React.createElement("i", {key: "c", "asdf": "fdsa"}, "Broadcast"),
                "-Systems"
            ]),
            ". Dies ist nur ein Test."
        ]);

        var c = new Composition(el);
        test.deepEqual(c.decompose("Dies ist ein Test des <c0>Notfall-<c1>Broadcast</c1>-Systems</c0>. Dies ist nur ein Test."), expected);

        test.done();
    },

    testDecomposeRearrangedComponents: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a", "foo": "bar"}, [
            "This is ",
            React.createElement("b", {key: "b"}, "bold"),
            " and this text is ",
            React.createElement("i", {key: "c"}, "italic"),
            "."
        ]);

        let expected = React.createElement("span", {key: "a", "foo": "bar"}, [
            "Dieser Text ist ",
            React.createElement("i", {key: "c"}, "kursiv"),
            " und dieser Text ist ",
            React.createElement("b", {key: "b"}, "fett"),
            "."
        ]);

        var c = new Composition(el);
        test.deepEqual(c.decompose("Dieser Text ist <c1>kursiv</c1> und dieser Text ist <c0>fett</c0>."), expected);

        test.done();
    },

    testDecomposeWithParamComponent: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "User ",
            React.createElement("Param", {key: "username", value: "username", description: "descriptive text"}),
            " deleted the file."
        ]);

        let expected = React.createElement("span", {key: "a"}, [
            "Benutzer ",
            React.createElement("Param", {key: "username", value: "username", description: "descriptive text"}),
            " hat die Datei gelöscht."
        ]);

        var c = new Composition(el);
        test.deepEqual(c.decompose("Benutzer <p0/> hat die Datei gelöscht."), expected);

        test.done();
    }
};
