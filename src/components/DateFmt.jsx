/*
 * DateFmt.jsx - component to format a list number
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

import DateFmt from 'ilib-es6/lib/DateFmt';

import hashKey from '../utils/hash';

class DateFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        id: PropTypes.string,
        wrapper: PropTypes["object"],
        date: PropTypes.any.isRequired,
        calendar: PropTypes.string,
        timezone: PropTypes.string,
        type: PropTypes.string,
        length: PropTypes.string,
        dateComponents: PropTypes.string,
        timeComponents: PropTypes.string,
        clock: PropTypes.string,
        template: PropTypes.string,
        useNative: PropTypes.boolean,
        meridiems: PropTypes.string,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style,
            length
        } = props;
        
        this.state = {
            formatter: new DateFmt({
                locale: locale,
                style: style,
                length: length
            })
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.length !== this.props.length || prevProps.style !== this.props.style) {
            return DateFmt.create({
                locale: this.props.locale,
                style: this.props.style,
                length: this.props.length
            }).then(fmt => {
                this.setState({
                    formatter: fmt
                });
            });
        }
    }
    
    render() {
        let {
            list,
            id,
            wrapper,
            className
        } = this.props;

        wrapper = wrapper || (<span/>);
        
        let ret = this.state.formatter.format(list);

        id = id || hashKey(list.join(" "));
        let attrs = { key: id, id: id };
        className && (attrs["className"] = className);
        return React.cloneElement(wrapper, attrs, ret);
    }
}

export default DateFmt;
