/*
 * Plural.jsx - component to wrap plural cases inside of a Translate
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
import Composition from '../utils/Composition';
import PropTypes from 'prop-types';

/**
 * @class Encloses a plural string for a particular plural category.
 *
 * The categories for English are "one" for singular and "other" for plural. Both are
 * required when writing plurals with the Translate component.<p>
 *
 * This component does not add any functionality beyond its contents, and its only
 * purpose is to enclose some JSX to use for a particular plural category.
 *
 * See the [Unicode CLDR description of plural category
 * rules](http://cldr.unicode.org/index/cldr-spec/plural-rules) for more details.
 */
export default function Plural(props) {
    return props.children;
}

Plural.propTypes = {
    "category": PropTypes.oneOf([
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
        '19'
    ]),

    "className": PropTypes.string
};
