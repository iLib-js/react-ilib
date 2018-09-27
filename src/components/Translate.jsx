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
            count,          // used with plurals. This is the value to switch upon
            children        // the components within the body 
        } = this.props;

        if (!children) {
            throw new Error("Translate component with no child elements. Can't translate 'nothing!'");
        }
        
        this.composition = new Composition(children);
        const text = this.composition.compose();

       // now do the substitutions in the post-translated string
        let f = 0,
            e = 0;

        for (let p in values) {
            let re = new RegExp(`\\[\\[${p}\\]\\]`, 'g');
            switch (typeof values[p]) {
                case 'function':
                    let value = values[p]();
                    let name = 'f' + f;
                    this.composition.addElement(name, value);
                    translation = translation.replace(
                        re,
                        '<' + name + '></' + name + '>',
                    );
                    f++;
                    break;
                case 'object':
                    if (values[p] === null) {
                        translation = translation.replace(re, '');
                    } else if (
                        values[p].$$typeof === Symbol.for('react.element')
                    ) {
                        let name = 'e' + e;
                        this.composition.addElement(name, values[p]);
                        translation = translation.replace(
                            re,
                            '<' + name + '></' + name + '>',
                        );
                        e++;
                    } else {
                        translation = translation.replace(
                            re,
                            values[p].toString(),
                        );
                    }
                    break;
                case 'string':
                    translation = translation.replace(re, values[p]);
                    break;
                case 'undefined':
                    translation = translation.replace(re, '');
                    break;
                default:
                    translation = translation.replace(re, values[p].toString());
                    break;
            }
        }

        this.state = {
            id: id || hash(text),
            translation: text
        };
    }

    render() {
        // always wrap the translated string in a span tag to contain everything and to give us a spot to put the id
        return React.createElement("span", {
            key: this.state.id,
            "x-resource-id": this.state.id
        }, this.composition.decompose(this.state.translation));
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
