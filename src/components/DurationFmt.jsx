/*
 * DurationFmt.jsx - component to format a list number
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

import { DurationFmt as DurationFormatter } from 'ilib-es6';

import hashKey from '../utils/hash';

class DurationFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.oneOfType([
             PropTypes.string,
             PropTypes.object
        ]),
        length: PropTypes.string,
        style: PropTypes.string,
        useNative: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        duration: PropTypes.object.isRequired,
        id: PropTypes.string,
        wrapper: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    };

    constructor(props) {
        super(props);
        
        this.state = {
            formatter: new DurationFormatter(props)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!objectEquals(prevProps, this.props, ["duration", "wrapper", "id", "className"])) {
            return DurationFormatter.create(this.props).then(fmt => {
                this.setState({
                    formatter: fmt
                });
            });
        }
    }
    
    render() {
        const {
            className,
            duration
        } = this.props || {};
        let {
            id,
            wrapper
        } = this.props || {};

        const ret = this.state.formatter.format(duration).toString();

        if (wrapper) {
            id = id || hashKey(Object.keys(duration).map(name => duration[name]).join("_"));
            let attrs = { key: id, id: id };
            className && (attrs["className"] = className);
            return typeof(wrapper) === "string" ?
                React.createElement(wrapper, attrs, ret) :
                React.cloneElement(wrapper, attrs, ret);
        } else {
            return ret;
        }
    }
}

export default DurationFmt;
