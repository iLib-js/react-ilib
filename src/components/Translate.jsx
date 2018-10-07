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
import {withLocale} from './LocaleContext';

/**
 * Replace the text inside of this component with a translation. This
 * component is built on top of react-intl, so it works along with the
 * regular react-intl components and objects you are used to, and it gets
 * its translations from react intl as well. The Translate component can
 * be used wherever it is valid to put JSX text. In regular Javascript
 * code, you should continue to use the intl.formatMessage() call and
 * extract your strings into a message.js file.
 */
class Translate extends React.Component {
    constructor(props) {
        super(props);

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
                if (children) {
                    source = this.composePluralString(children);
                } else {
                    console.warn(
                        `Cannot use count prop on a Translate component that has no children.`,
                    );
                }
            } else {
                source = composition.compose();
            }

            this.state = {
                id: id,
                source: source,
                composition: composition
            };
        }
    }

    /**
     * Search for any Plural elements in the children, and
     * then construct the English source string in the correct
     * format for ilib to use for pluralization
     * @param {React.Element} children the children of this node
     * @return {string} the composed plural string
     */
    composePluralString(children) {
        let categories = {};
        React.Children.forEach(children, child => {
            if (typeof child === 'object' && React.isValidElement(child) && child.type.name === 'Plural') {
                var childComposition = new Composition(child.props.children);
                categories[child.props.category] = childComposition.compose();
            }
        });
        if (!categories.one && !categories.other) {
            throw new Error('Cannot use count prop on a Translate component without giving both a "one" and "other" Plural component in the children.');
        }
        // add these to the string in a particular order so that
        // we always end up with the same string regardless of
        // the order that the Plural elements were specified in
        // the source code
        return Object.keys(categories).map(
            category => `${category === "other" ? '' : category}#${categories[category]}`
        ).join('|');
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
            Object.keys(values).forEach(property => {
                let re = new RegExp(`\\[\\[${property}\\]\\]`, 'g');
                switch (typeof values[property]) {
                    case 'function':
                        const value = values[property]();
                        // "f" for "function" result
                        const name = `f${functionIndex++}`;
                        this.state.composition.addElement(name, value);
                        translation = translation.replace(re, this.emptyTag(name));
                        break;
                    case 'object':
                        if (values[property] === null) {
                            translation = translation.replace(re, '');
                        } else if (React.isValidElement(values[property])) {
                            // "e" for react "element"
                            const name = `e${elementIndex++}`;
                            this.state.composition.addElement(name, values[property]);
                            translation = translation.replace(re, this.emptyTag(name));
                        } else {
                            translation = translation.replace(re, values[property].toString());
                        }
                        break;
                    default:
                        translation = translation.replace(re, typeof values[property] !== 'undefined' ? values[property].toString() : '');
                        break;
                }
            });
        }

        return translation;
    }

    render() {
        const { count, tagName, description, rb } = this.props;
        const { composition, id, source } = this.state;
        let { values } = this.props || {};
        if (typeof count === 'number') {
            // make sure we can format in the count as well
            values = { count, ...values };
        }

        let translation = rb.getString(source);

        translation = (typeof(count) === 'number') ?
            translation.formatChoice(count, values) :
            translation.toString();

        // finally, do the substitution of the values into the translated
        // and post-pluralized string
        if (values) {
            translation = this.substitute(translation, values);
        }

        // always wrap the translated string in a tag to contain everything
        // and to give us a spot to record the id
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

export default withLocale(Translate);
