/*
 * UnitFmt.jsx - component to format measurement units
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

import { MeasurementFactory, UnitFmt as UnitFormatter } from 'ilib-es6';

import hashKey from '../utils/hash';

class UnitFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.oneOfType([
             PropTypes.string,
             PropTypes.object
        ]),
        autoScale: PropTypes.bool,
        autoConvert: PropTypes.bool,
        usage: PropTypes.string,
        style: PropTypes.string,
        length: PropTypes.string,
        id: PropTypes.string,
        wrapper: PropTypes["object"],
        maxFractionDigits: PropTypes.number,
        minFractionDigits: PropTypes.number,
        significantDigits: PropTypes.number,
        roundingMode: PropTypes.string,
        measure: PropTypes["object"].isRequired,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);

        this.state = {
            formatter: new UnitFormatter(props)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let diff = ["locale", "autoScale", "autoConvert", "usage", "style", "length",
                    "maxFractionDigits", "minFractionDigits", "significantDigits", "roundingMode"].some(function(prop) {
            return prevProps[prop] !== this.props[prop];
        });
        if (diff) {
            new UnitFormatter({
                locale: this.props.locale,
                autoScale: this.props.autoScale,
                autoConvert: this.props.autoConvert,
                usage: this.props.usage,
                style: this.props.style,
                length: this.props.length,
                maxFractionDigits: this.props.maxFractionDigits,
                minFractionDigits: this.props.minFractionDigits,
                significantDigits: this.props.significantDigits,
                roundingMode: this.props.roundingMode,
                sync: false,
                onLoad: function(fmt) {
                    this.setState({
                        formatter: fmt
                    });
                }.bind(this)
            });
        }
    }

    measureHash(m) {
        return hashKey([m.getMeasure(), m.getUnit(), m.getAmount().toString()].join('-'));
    }

    render() {
        let {
            measure,
            id,
            wrapper,
            className
        } = this.props;

        let ret = this.state.formatter.format(measure);

        if (wrapper) {
            id = id || this.measureHash(measure);
            let attrs = { key: id, id: id };
            className && (attrs["className"] = className);
            return React.cloneElement(wrapper, attrs, ret);
        } else {
            return ret;
        }
    }
}

export default UnitFmt;
