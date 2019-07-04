/*
 * PhoneFmt.jsx - component to format a phone number
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

import PhoneNumber from 'ilib-es6/lib/PhoneNumber';
import PhoneFormatter from 'ilib-es6/lib/PhoneFmt';

class PhoneFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        style: PropTypes.string,
        mcc: PropTypes.string,
        number: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        id: PropTypes.string,
        wrapper: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style
        } = props;
        
        this.state = {
            formatter: new PhoneFormatter(props),
            locale: locale
        };
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.style !== this.props.style) {
            PhoneFormatter.create(this.props).then(fmt => {
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
            wrapper,
            phone
        } = this.props || {};

        phone = typeof(number) === "string" ?
            new PhoneNumber(number, {locale: this.state.locale}) :
            number;
        
        const ret = this.state.formatter.format(phone);

        if (wrapper) {
            id = id || String(number);
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

export default PhoneFmt;
