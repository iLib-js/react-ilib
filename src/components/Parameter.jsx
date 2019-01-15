/*
 * Parameter.jsx - component to wrap replacement parameter values inside
 * of a Translate component
 *
 * Copyright © 2019, JEDLSoft
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

/**
 * @class A placeholder for a replacement parameter value.
 *
 * This component does not add any functionality beyond its value, and its only
 * purpose is to mark a spot in the JSX to place a value. The value given
 * must be a string or type that can be converted to a string using the
 * toString() method.
 */
class Parameter extends React.Component {
    render(props) {
        let wrapper = props.wrapper || "span";
        let name = props.name;

        if (wrapper !== null) {
            return React.createElement(wrapper || 'span', {
                key: name,
                name: name,
                className: props.className
            }, this.props.value.toString());
        }

        return this.props.value;
    }
}

Parameter.propTypes = {
    "name": PropTypes.string,
    "description": PropTypes.string,
    "value": PropTypes.any,
    "wrapper": PropTypes.string,
    "className": PropTypes.string
};

export default Parameter;
