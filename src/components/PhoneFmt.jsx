/*
 * PhoneFmt.jsx - component to format a phone number
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

const Phone = require('ilib/lib/Phone');
const PhoneFormatter = require('ilib/lib/PhoneFmt');

class PhoneFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        style: PropTypes.string,
        phone: PropTypes["object"].isRequired,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style
        } = props;
        
        this.state = {
            formatter: new PhoneFormatter({
                locale: locale,
                style: style
            })
        };
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.style !== this.props.style) {
            new PhoneFormatter({
                locale: this.props.locale,
                style: this.props.style,
                sync: false,
                onLoad: function(fmt) {
                    this.setState({
                        formatter: fmt
                    });
                }.bind(this)
            });
        }
    }
    
    render() {
        var phone = typeof(this.props.phone) === "string" ?
            new Phone(this.props.phone, {locale: this.props.locale}) :
            this.props.phone;
        return this.state.formatter.format(phone);
    }
}

export default PhoneFmt;
