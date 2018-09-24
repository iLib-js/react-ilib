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

        let sourceElements = children;
        this.composition = new Composition(sourceElements);
        this.str = this.composition.compose();

        let resId;

        if (!description) {
            throw new Error(`Translate component found without the required description prop. Id: ${id} Approximate string: ${this.str}`);
        }

        if (sourceElements) {
            const text = this.composition.compose();
            resId = id || hash(text);
            this.translation = text;
        } else {
            throw new Error("Translate component with no child elements. Can't translate 'nothing!'");
        }

        this.state = {
            id: resId,
            count: this.props.count,
            values: this.props.values
        };
    }

    render() {
        // always wrap the translated string in a span tag to contain everything and to give us a spot to put the id
        return React.createElement("span", {
            key: this.state.id, 
            "x-resource-id": this.state.id
        }, this.composition.decompose(this.translation));
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
