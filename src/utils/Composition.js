/*
 * composition.js - compose and decompose a string
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

import React from 'react';

/**
 * @class Compose a tree of React elements into a single string.
 *
 * @param {React.Element} element the element to compose
 */
class Composition {
    constructor(element) {
        this.element = element;
        this.composed = false;
        this.mapping = {};
    }

    _recompose(element) {
        let value;

        switch (typeof(element)) {
            case "string":
                value = element;
                break;

            case "number":
                value = String(element);
                break;

            case 'boolean':
                value = element ? 'true' : 'false';
                break;

            case "object":
                if (element === null) {
                    value = '';
                } else if (Array.isArray(element)) {
                    value = element.map(subelement => this._recompose(subelement)).join('');
                } else if (!element.type) {
                    value = "";
                } else {
                    let num = this.n++;
                    if (element.props && element.props.children) {
                        let children = (typeof(element.props.children) === "string") ? [element.props.children] : element.props.children;
                        var ret = children.map(child => this._recompose(child));
                        value = [`<c${num}>`, ...ret, `</c${num}>`].join('');
                    } else {
                        value = `<c${num}></c${num}>`;
                    }
                    this.mapping['c' + num] = element;
                }
                break;

            default:
                value = '';
                break;
        }
        return value;
    }

    /**
     * Compose a tree of react elements to a string that can be translated.
     *
     * @return {string} a string representing the tree of react elements
     */
    compose() {
        this.n = 0;
        let ret = this._recompose(this.element);
        this.composed = true;
        return ret;
    }

    /**
     * Return the react element with the given name.
     *
     * @param {string} name the name of the element being sought
     * @return {React.Element} the element with the given name
     */
    getElement(name) {
        return this.mapping[name];
    }

    /**
     * Add a mapping from a name to a react element.
     *
     * @param {string} name the name of the element being added
     * @param {React.Element} value the react element being added
     */
    addElement(name, value) {
        this.mapping[name] = value;
    }

    _parse(string) {
        let match,
            re = /(<([cef]\d+)>.*<\/\2>)/g,
            first = /^<([cef]\d+)>/;

        var parts = string.split(re);
        let children = [];

        for (var i = 0; i < parts.length; i++) {
            first.lastIndex = 0;
            if ((match = first.exec(parts[i])) !== null) {
                let name = match[1];
                let len = match[0].length;
                // strip off the outer tags before processing the stuff in the middle
                let substr = parts[i].substring(len, parts[i].length - len - 1);
                let subchildren = this._parse(substr);
                let el = this.mapping[name];
                switch (typeof el) {
                    case 'string':
                        children.push(el);
                        break;

                    case 'number':
                    case 'boolean':
                        children.push(el.toString());
                        break;

                    case 'function':
                    case 'object':
                        children.push(
                            React.cloneElement(el, { key: el.key || name },
                                subchildren || (el.props && el.props.children))
                        );
                        break;

                    default:
                        console.log('oops... element is ' + JSON.stringify(el));
                        break;
                }
                i++; // skip the number in the next iteration
            } else if (parts[i] && parts[i].length) {
                // don't store empty strings
                children.push(parts[i]);
            }
        }

        return children.length === 0  ? null : (children.length === 1 ? children[0] : children);
    }

    /**
     * Convert a composed string back into an array of React elements. The elements are clones of
     * the same ones that this composition was created with, so that they have the same type and
     * props and such as the originals. The elements may be re-ordered from the original, however,
     * if the grammar of the target language requires moving around text, HTML tags, or
     * subcomponents.
     *
     * @param {string} string the string to decompose into a tree of React elements.
     * @return {React.Element} a react element
     */
    decompose(string) {
        if (!this.composed) {
            // need to create the mapping first from names to react elements
            this.compose();
        }
        return this._parse(string);
    }
}

export default Composition;
