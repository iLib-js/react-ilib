/*
 * Translate.jsx - component to wrap a string and retrieve its translation
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

import * as React from 'react';
import PropTypes from 'prop-types';

import hash from '../utils/hash';
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
        let {
            id,             // the unique id of the string
        } = this.props;
        const {
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

            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(Number(count))) {
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

            id = id || hash(source);

            this.state = {
                id,
                source,
                composition
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
        const categories = {};
        React.Children.forEach(children, child => {
            if (typeof child === 'object' && React.isValidElement(child) && child.type.name === 'Plural') {
                const childComposition = new Composition(child.props.children);
                categories[child.props.category] = childComposition.compose();
            }
        });
        if (!categories.one || !categories.other) {
            throw new Error('Cannot use count prop on a Translate component without giving both a "one" and "other" Plural component in the children.');
        }
        // add these to the string in a particular order so that
        // we always end up with the same string regardless of
        // the order that the Plural elements were specified in
        // the source code
        const categoriesString = [
            'zero',
            'one',
            'two',
            'few',
            'many',
            'other',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            ].filter(
            category => !!categories[category]
        ).map(
            category => `${category === "other" ? '' : category}#${categories[category]}`
        ).join('|');

        return categoriesString;
    }

    render() {
        const { count, tagName, description, rb } = this.props;
        const { composition, id, source } = this.state;
        let values = {};
        if (typeof count === 'number') {
            // make sure intl.formatMessage switches properly on the count
            values.count = count;
        }

        let translation = rb.getString(source, id);

        translation = (typeof(count) === 'number') ?
            translation.formatChoice(count, values) :
            translation.toString();


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
    count: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default withLocale(Translate);
