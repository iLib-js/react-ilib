/*
 * Param.jsx - component to wrap replacement parameter values inside
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
 * @class A placeholder for a replacement parameter in the body of a Translate
 * component.
 *
 * This component renders into the value of the named parameter to the Translate
 * component. Children are not allowed in this component and typically, it is used with
 * the self-closing syntax.
 *
 * @example
 * <pre>
 *   <Translate id="x" description="y">
 *     The file <Param value={filelist[i].path} description="Name of the file that was deleted."/> has been deleted.
 *   </Translate>
 * </pre>
 */
export default function Param(props) {
    const { value, name, wrapper, className } = props || {};
    let ret;
    switch (typeof value) {
        default:
        case 'undefined':
            ret = '';
            break;

        case 'boolean':
        case 'number':
            ret = String(value);
            break;

        case 'function':
            ret = value();
            break;

        case 'string':
            ret = value;
            break;

        case 'object':
            if (value === null) {
                ret = '';
            } else if (React.isValidElement(value)) {
                ret = value;
            } else {
                ret = value.toString();
            }
            break;
    }

    if (wrapper) {
        const wrapperName = name || wrapper;
        return React.createElement(wrapper, {
            key: wrapperName,
            name: wrapperName,
            className: className
        }, ret);
    } else {
        return ret;
    }
};

Param.propTypes = {
    /** The name of this parameter */
    "name": PropTypes.string.isRequired,

    /** The value of this parameter */
    "value": PropTypes.any,

    /** Optional: A description of this parameter to help the translators understand what it is */
    "description": PropTypes.string,

    /** Optional: wrap the output in this html tag */
    "wrapper": PropTypes.string,

    /** Optional: if the output is wrapped in an html tag, use this as the CSS class name */
    "className": PropTypes.string
};
