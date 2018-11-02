/*
 * AddressFmt.jsx - component to format a mailing address
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

import Address from 'ilib-es6/lib/Address';
import AddressFormatter from 'ilib-es6/lib/AddressFmt';

class AddressFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        style: PropTypes.string,
        address: PropTypes["object"].isRequired,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style
        } = props;
        // data for the current locale should already be loaded, so we can create
        // this formatter synchronously
        this.state = {
            formatter: new AddressFormatter({
                locale: locale,
                style: style
            })
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.style !== this.props.style) {
            // the data for this may not be loaded yet, so we have to create the new
            // formatter asynchronously, just in case, and then set it into the state
            new AddressFormatter({
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
        const {
            separator
        } = this.props;

        let address = typeof(this.props.address) === "string" ?
            new Address(this.props.address, {locale: this.props.locale}) :
            this.props.address;
        let ret = [];
        this.state.formatter.format(address).split(/\n/).forEach(line => {
            ret.push(line);
            ret.push(separator);
        });
        return ret;
    }
}

export default AddressFmt;
