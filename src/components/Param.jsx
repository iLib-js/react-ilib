/*
 * Param.jsx - component to wrap a replacement parameter
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
 * @class A placeholder for a replacement parameter in the body of a FormattedCompMessage
 * component.
 *
 * This component renders into the value of the named parameter to the FormattedCompMessage
 * component. Typically, this component is self-closing.
 *
 * @example
 * <pre>
 *   <FormattedCompMessage id="x" description="y">
 *     The file <Param value={filelist[i].path} description="Name of the file that was deleted."/> has been deleted.
 *   </FormattedCompMessage>
 * </pre>
 */
class Param extends React.Component {
    getValue() {
        const { value } = this.props;
        switch (typeof value) {
            default:
            case 'undefined':
                return '';

            case 'boolean':
            case 'number':
                return String(value);

            case 'function':
                return value();

            case 'string':
                return value;

            case 'object':
                if (value === null) {
                    return '';
                }
                if (React.isValidElement(value)) {
                    return value;
                }
                return value.toString();
        }
    }

    render() {
        if (!this.props.description) {
            throw new Error('The description property is required on a Param component.');
        }
        return this.getValue();
    }
}

Param.propTypes = {
    /** A description of this parameter to help the translators understand what it is */
    "description": PropTypes.string,

    /** The value of this parameter */
    "value": PropTypes.any
};

export default Param;
