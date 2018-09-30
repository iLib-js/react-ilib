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

import hash from '../utils/hash';
import Composition from '../utils/Composition';

class Translate extends React.Component {
    constructor(props) {
        super(props);

        // these parameters echo the ones in react-intl's FormattedMessage component, plus a few extra
        const {
            id,             // the unique id of the string
            description,    // a note for translators to describe to them the context of this string
            values,         // object containing values to substitute into the translated string
            //eslint-disable-next-line
            children        // the components within the body 
        } = this.props;

        const sourceElements = children;
        const composition = new Composition(sourceElements);
        const str = composition.compose();

        if (!children) {
            throw new Error("Translate component with no child elements. Can't translate 'nothing!'");
        }

        this.state = {
            id: id,
            translation: str,
            composition: composition,
        };
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
        const { values, tagName } = this.props;
        const { composition, id, translation } = this.state;
        const translated = this.substitute(translation, values);

        // always wrap the translated string in a span tag to contain everything and to give us a spot to put the id
        return React.createElement(tagName || 'span', {
            key: id,
            'x-resource-id': id,
        }, composition.decompose(translated));
    }
}

/* make sure eslint is happy with accessing the children property above */
Translate.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    values: PropTypes["object"]
};

export default Translate;
