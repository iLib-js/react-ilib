/*
 * testComposition.js - test the composition and decomposition functions.
 *
 * Copyright © 2018, JEDLSoft
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

module.exports = {
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

    testComposeBoolean: function(test) {
        test.expect(1);

        var c = new Composition(false);
        test.equal(c.compose(), "false");

        test.done();
    },

    testComposeElementNoChildren: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"});
        var c = new Composition(el);
        
        test.equal(c.compose(), "<c0></c0>");

        test.done();
    },

    testComposeElementOneChild: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, "foo");
        var c = new Composition(el);
        test.equal(c.compose(), "<c0>foo</c0>");

        test.done();
    },
    
    testComposeElementTwoChildren: function(test) {
        test.expect(1);

        let el = React.createElement("span", {key: "a"}, [
            "foo",
            " bar"
        ]);
        var c = new Composition(el);
        
        test.equal(c.compose(), "<c0>foo bar</c0>");

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
        test.equal(c.compose(), "<c0>This is a test of the <c1>emergency broadcast system</c1>. This is only a test.</c0>");

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
        test.equal(c.compose(), "<c0>This is a test of the <c1>emergency broadcast system</c1>. This is <c2>only</c2> a test.</c0>");

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
        test.equal(c.compose(), "<c0>This is a test of the <c1>emergency <c2>broadcast</c2> system</c1>. This is only a test.</c0>");

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
        test.deepEqual(c.decompose("<c0>einfache Zeichenfolge</c0>"), expected);

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
        test.deepEqual(c.decompose("<c0>Dies ist ein Test des <c1>Notfall-Broadcast-Systems</c1>. Dies ist nur ein Test.</c0>"), expected);

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
        test.deepEqual(c.decompose("<c0>Dies ist ein Test des <c1>Notfall-<c2>Broadcast</c2>-Systems</c1>. Dies ist nur ein Test.</c0>"), expected);

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
        test.deepEqual(c.decompose("<c0>Dies ist ein Test des <c1>Notfall-<c2>Broadcast</c2>-Systems</c1>. Dies ist nur ein Test.</c0>"), expected);

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
        test.deepEqual(c.decompose("<c0>Dieser Text ist <c2>kursiv</c2> und dieser Text ist <c1>fett</c1>.</c0>"), expected);

        test.done();
    }
};
