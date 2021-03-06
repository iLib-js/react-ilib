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

const MessageAccumulator = require('message-accumulator').default; // ES5 CommonJS module
const Node = require('ilib-tree-node').default; // ES5 CommonJS module

/**
 * @class Compose a tree of React elements into a single string.
 *
 * @param {React.Element} element the element to compose
 */
export default class Composition {
    constructor(element) {
        this.element = element;
        this.isComposed = false;

        this.ma = new MessageAccumulator();
    }

    recompose(element) {
        switch (typeof element) {
            case 'object':
                if (Array.isArray(element)) {
                    element.forEach(subelement => this.recompose(subelement));
                } else if (element) {
                    if (element.type === 'Param') {
                        this.ma.addParam(element);
                    } else {
                        this.ma.push(element);
                        React.Children.forEach(element.props.children, child => this.recompose(child));
                        this.ma.pop();
                    }
                }
                break;

            case 'number':
            case 'boolean':
                this.ma.addText(String(element));
                break;

            case 'string':
                this.ma.addText(element);
                break;

            default:
                break;
        }
    }

    /**
     * Compose a tree of react elements to a string that can be translated.
     *
     * @return {string} a string representing the tree of react elements
     */
    compose() {
        this.index = 0;
        if (!this.isComposed) {
            this.recompose(this.element);
        }
        this.isComposed = true;
        return this.ma.getMinimalString();
    }

    /**
     * @private
     */
    mapToReactElements(node) {
        if (!node) return '';

        let children = [];
        for (let i = 0; i < node.children.length; i += 1) {
            children.push(this.mapToReactElements(node.children[i]));
        }

        const el = node.extra;
        if (children.length === 0 && el && el.props) {
            children = el.props.children;
        }

        if (children && children.length === 1 && typeof children[0] === 'string') {
            children = children[0];
        }

        if (el) {
            return children && children.length ?
                React.cloneElement(el, { key: el.key }, children) :
                React.cloneElement(el, { key: el.key });
        }
        if (children.length) {
            return children;
        }

        return node.value || '';
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
        const translation = MessageAccumulator.create(string, this.ma);
        const nodeArray = this.ma
            .getPrefix()
            .concat(translation.root.toArray().slice(1, -1))
            .concat(this.ma.getSuffix());
        // convert to a tree again
        return this.mapToReactElements(Node.fromArray(nodeArray));
    }
};
