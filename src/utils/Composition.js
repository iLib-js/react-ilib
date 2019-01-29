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
export default class Composition {
    constructor(element) {
        this.element = element;
        this.isComposed = false;
        this.mapping = {};
    }

    recompose(element) {
        let value;

        if (typeof element === 'object') {
            if (Array.isArray(element)) {
                value = element
                    .map(subelement => this.recompose(subelement))
                    .join('');
            } else if (element === null || !element.type) {
                value = '';
            } else {
                // "c" is for "component", that's good enough for me
                const name = `c${this.index++}`;
                let { children } = element.props;
                if (children) {
                    children =
                        typeof children === 'string' ? [children] : children;
                    children = children.map(child => this.recompose(child));
                } else {
                    children = '';
                }
                value = [`<${name}>`, ...children, `</${name}>`].join('');
                this.mapping[name] = element;
            }
        } else {
            value = (typeof element !== 'undefined' && String(element)) || '';
        }
        return value;
    }

    /**
     * Compose a tree of react elements to a string that can be translated.
     *
     * @return {string} a string representing the tree of react elements
     */
    compose() {
        this.index = 0;
        const ret = this.recompose(this.element);
        this.isComposed = true;
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

    parse(string) {
        let match,
            re = /(<([cef]\d+)>.*<\/\2>)/g,
            first = /^<([cef]\d+)>/;

        const parts = string.split(re);
        let children = [];

        for (var i = 0; i < parts.length; i++) {
            first.lastIndex = 0;
            if ((match = first.exec(parts[i])) !== null) {
                const name = match[1];
                const len = match[0].length;
                // strip off the outer tags before processing the stuff in the middle
                const substr = parts[i].substring(len, parts[i].length - len - 1);
                const subchildren = this.parse(substr);
                const el = this.mapping[name];
                switch (typeof el) {
                    case 'string':
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
                        // ignore null or undefined elements
                        break;
                }
                i++; // skip the number in the next iteration
            } else if (parts[i] && parts[i].length) {
                // take care of replacement parameters
                var paramRE = /(\{\w+\})/g;
                var subparts = parts[i].split(paramRE);
                for (var j = 0; j < subparts.length; j++) {
                    if (subparts[j][0] === '{') {
                        var name = subparts[j].substring(1, subparts[j].length-1);
                        children.push(React.createElement("Param", { key: name, name }));
                    } else {
                        children.push(subparts[j]);
                    }
                }
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
        if (!this.isComposed) {
            // need to create the mapping first from names to react elements
            this.compose();
        }
        return this.parse(string);
    }
}
