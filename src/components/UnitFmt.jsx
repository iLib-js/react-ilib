/*
 * UnitFmt.jsx - component to format measurement units
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

const MeasurementFactory = require('ilib/lib/MeasurementFactory');
const UnitFormatter = require('ilib/lib/UnitFmt');

class UnitFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        autoScale: PropTypes.boolean,
        autoConvert: PropTypes.boolean,
        usage: PropTypes.string,
        style: PropTypes.string,
        length: PropTypes.number,
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

    render() {
        var unit = typeof(this.props.unit) === "string" ?
            new Unit(this.props.unit, {locale: this.props.locale}) :
            this.props.unit;
        return this.state.formatter.format(unit);
    }
}

export default UnitFmt;
