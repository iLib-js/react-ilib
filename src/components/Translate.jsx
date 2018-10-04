/*
 * Translate.jsx - component to wrap a string and retrieve its translation
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

import * as React from 'react';
import PropTypes from 'prop-types';

//import hash from '../utils/hash';
import Composition from '../utils/Composition';

class Translate extends React.Component {
    constructor(props) {
        super(props);

        // these parameters echo the ones in react-intl's FormattedMessage component, plus a few extra
        const {
            id,             // the unique id of the string
            count,          // the pivot count to choose a plural form
            children        // the components within the body
        } = this.props;

        const sourceElements = children;

        if (!children) {
            throw new Error("Translate component with no child elements. Can't translate 'nothing!'");
        }

        if (sourceElements) {
            const composition = new Composition(sourceElements);
            let source = '';

            if (typeof count === 'number') {
                // Search for any Plural elements in the children, and then construct the English source string in the correct
                // format for react-intl to use for pluralization
                if (children) {
                    let classes = {};
                    React.Children.forEach(children, child => {
                        if (typeof child === 'object' &&
                            React.isValidElement(child) &&
                            child.type.name === 'Plural') {
                            var childComposition = new Composition(child.props.children);
                            classes[child.props.class] = childComposition.compose();
                        }
                    });
                    if (!classes.one && !classes.other) {
                        throw new Error(`Cannot use count prop on a Translate component without giving a "one" and "other" Plural component in the children.`);
                    }
                    source = '{count, plural,';
                    // add these in a particular order so that we always end up with the same string regardless of the order that the Plural
                    // elements were specified in the source code
                    ['zero', 'one', 'two', 'few', 'many', 'other'].forEach(
                        clazz => {
                            if (classes[clazz]) {
                                source += ` ${clazz} {${classes[clazz]}}`;
                            }
                        }
                    );
                    source += '}';
                } else {
                    console.warn(`Cannot use count prop on a Translate component that has no children.`);
                }
            } else {
                source = composition.compose();
            }

            this.state = {
                id: id,
                source: source,
                composition: composition,
            };
        }
    }

    emptyTag(name) {
        return `<${name}></${name}>`;
    }

    /**
     * Substitute the values into a composed translation.
     * @param {string} translation the string to substitute values into
     * @param {Object} values an object containing values to substitute
     * into the string
     * @return {string} the updated string
     */
    substitute(translation, values) {
        // now do the substitutions in the post-translated string
        let functionIndex = 0,
            elementIndex = 0;

        if (values) {
            for (let p in values) {
                let re = new RegExp(`\\[\\[${p}\\]\\]`, 'g');
                switch (typeof values[p]) {
                    case 'function':
                        const value = values[p]();
                        // "f" for "function" result
                        const name = 'f' + functionIndex++;
                        this.state.composition.addElement(name, value);
                        translation = translation.replace(re, this.emptyTag(name));
                        break;
                    case 'object':
                        if (values[p] === null) {
                            translation = translation.replace(re, '');
                        } else if (values[p].$$typeof === Symbol.for('react.element')) {
                            // "e" for react "element"
                            const name = 'e' + elementIndex++;
                            this.state.composition.addElement(name, values[p]);
                            translation = translation.replace(re, this.emptyTag(name));
                        } else {
                            translation = translation.replace(re, values[p].toString());
                        }
                        break;
                    default:
                        translation = translation.replace(re, typeof values[p] !== 'undefined' ? values[p].toString() : '');
                        break;
                }
            }
        }

        return translation;
    }

    render() {
        const { count, tagName, description } = this.props;
        const { composition, id, source } = this.state;
        let { values } = this.props || {};
        if (typeof count === 'number') {
            // make sure we can format in the count as well
            values = { count, ...values };
        }

        let translation = source; // TODO fix this

        // finally, do the substitution of the values into the translated and post-pluralized string
        if (values) {
            translation = this.substitute(translation, values);
        }

        // always wrap the translated string in a tag to contain everything and to give us a spot to put the id
        return React.createElement(tagName || 'span', {
            key: id,
            'x-resource-id': id,
        }, composition.decompose(translation));
    }
}

/* make sure eslint is happy with accessing the children property above */
Translate.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    tagName: PropTypes.string,
    count: PropTypes.number,
    values: PropTypes["object"]
};

export default Translate;
