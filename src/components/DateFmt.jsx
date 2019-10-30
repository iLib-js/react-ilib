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

import ilib, {DateFmt as IlibDateFmt} from 'ilib-es6';

import hashKey from '../utils/hash';
import objectEquals from '../utils/utils';

class DateFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.oneOfType([
             PropTypes.string,
             PropTypes.object
        ]),
        id: PropTypes.string,
        wrapper: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes["object"]
        ]),
        date: PropTypes.any.isRequired,
        calendar: PropTypes.string,
        timezone: PropTypes.string,
        type: PropTypes.string,
        length: PropTypes.string,
        dateComponents: PropTypes.string,
        timeComponents: PropTypes.string,
        clock: PropTypes.string,
        template: PropTypes.string,
        useNative: PropTypes.bool,
        meridiems: PropTypes.string,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style,
            calendar,
            timezone,
            type,
            length,
            dateComponents,
            timeComponents,
            clock,
            template,
            useNative,
            meridiems
        } = props || {};

        this.state = {
            formatter: new IlibDateFmt({
                locale: locale,
                style: style,
                calendar: calendar,
                timezone: timezone || ilib.getTimeZone(),
                type: type,
                length: length,
                date: dateComponents,
                time: timeComponents,
                clock: clock,
                template: template,
                useNative: useNative,
                meridiems: meridiems
            })
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!objectEquals(prevProps, this.props, ["date", "id", "wrapper", "className"])) {
            const {
                locale,
                style,
                calendar,
                timezone,
                type,
                length,
                dateComponents,
                timeComponents,
                clock,
                template,
                useNative,
                meridiems
            } = props;

            return IlibDateFmt.create({
                locale: locale,
                style: style,
                calendar: calendar,
                timeZone: timezone || ilib.getTimeZone(),
                type: type,
                length: length,
                date: dateComponents,
                time: timeComponents,
                clock: clock,
                template: template,
                useNative: useNative,
                meridiems: meridiems
            }).then(fmt => {
                this.setState({
                    formatter: fmt
                });
            });
        }
    }

    render() {
        let {
            date,
            id,
            wrapper,
            className
        } = this.props || {};

        let ret = this.state.formatter.format(date);
        if (wrapper) {
            id = id || hashKey(ret);
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

export default DateFmt;
