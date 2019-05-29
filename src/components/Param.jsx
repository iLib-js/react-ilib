/*
 * Param.jsx - component to act as a placeholder/replacement
 * parameter inside of a Translate component body
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
import Composition from '../utils/Composition';
import PropTypes from 'prop-types';

/**
 * @class A placeholder for a replacement parameter in the body of a Translate
 * component.
 * 
 * This component renders into the value of the named parameter to the Translate
 * component. Typically, this component is self-closing.
 * 
 * @example
 * <pre>
 *   <Translate values={{filename: filelist[i].path}}>
 *     The file <Param name="filename"/> has been deleted.
 *   </Translate>
 * </pre>
 */
class Param extends React.Component {
    // mostly for unit testing
    getValue() {
        return this.props.value;
    }

    render() {
        return <span name={this.props.name}>{this.props.value || ""}</span>;
    }
}

Param.propTypes = {
    "name": PropTypes.string.isRequired,
    "value": PropTypes.any
};

export default Param;
