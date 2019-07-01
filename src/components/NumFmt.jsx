/*
 * NumFmt.jsx - component to format a list number
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

import NumberFormatter from 'ilib-es6/lib/NumFmt';

import hashKey from '../utils/hash';

class NumFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        type: PropTypes.string,
        currency: PropTypes.string,
        maxFractionDigits: PropTypes.any,
        minFractionDigits: PropTypes.any,
        significantDigits: PropTypes.any,
        useNative: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.boolean
        ]),
        roundingMode: PropTypes.string,
        style: PropTypes.string,
        number: PropTypes.any.isRequired,
        id: PropTypes.string,
        wrapper: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes["object"]
        ])
    };

    constructor(props) {
        super(props);
        
        this.state = {
            formatter: new NumberFormatter(props)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.length !== this.props.length || prevProps.style !== this.props.style) {
            return NumberFormatter.create(props).then(fmt => {
                this.setState({
                    formatter: fmt
                });
            });
        }
    }
    
    render() {
        const {
            className,
            number
        } = this.props || {};
        let {
            id,
            wrapper
        } = this.props || {};

        const ret = this.state.formatter.format(number);

        if (wrapper) {
            id = id || String(number);
            let attrs = { key: id, id: id };
            className && (attrs["className"] = className);
            return typeof(wrapper) === "string" ? React.createElement(wrapper, attrs, ret) : React.cloneElement(wrapper, attrs, ret);
        } else {
            return ret;
        }
    }
}

export default NumFmt;
