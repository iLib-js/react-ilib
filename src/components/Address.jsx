/*
 * Address.jsx - input component for mailing addresses
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

import IlibAddress from 'ilib-es6/lib/Address';
import AddressFormatter from 'ilib-es6/lib/AddressFmt';

import hashKey from '../utils/hash';

class Address extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        style: PropTypes.string,
        id: PropTypes.string,
        wrapper: PropTypes["object"],
        address: PropTypes["object"].isRequired,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style,
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
            return AddressFormatter.create({
                locale: this.props.locale,
                style: this.props.style
            }).then(fmt => {
                this.setState({
                    formatter: fmt
                });
            });
        }
    }

    render() {
        let {
            separator,
            locale,
            address,
            id,
            wrapper,
            className
        } = this.props;

        separator = separator || (<br/>);
        wrapper = wrapper || (<span/>);
        let add = typeof(address) === "string" ?
            new IlibAddress(this.props.address, {locale: locale}) :
            address;
        let ret = this.state.formatter.format(add).split(/\n/).filter(line => {
            return line && line.trim() !== "";
        });

        if (ret.length > 1) {
            var tmp = [], index = 0;
            ret.slice(0, ret.length-1).forEach(line => {
                tmp.push(line);
                tmp.push(React.cloneElement(separator, { key: index++ }));
            });
            tmp.push(ret[ret.length-1]);
            ret = tmp;
        }
        
        id = id || hashKey(ret.join(" "));
        let attrs = { key: id, id: id };
        className && (attrs["className"] = className);
        return React.cloneElement(wrapper, attrs, ret);
    }
}

export default Address;
