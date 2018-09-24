/*
 * NameFmt.jsx - component to format a person's name
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

const Name = require('ilib/lib/Name');
const NameFormatter = require('ilib/lib/NameFmt');

class NameFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        style: PropTypes.string,
        components: PropTypes.string,
        name: PropTypes["object"].isRequired,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);
        const {
            locale,
            style
        } = props;
        
        this.state = {
            formatter: new NameFormatter({
                locale: locale,
                style: style
            })
        };
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.style !== this.props.style) {
            this.setState({
                formatter: new NameFormatter({
                    locale: this.props.locale,
                    style: this.props.style
                }) 
            });
        }
    }
    
    render() {
        var name = typeof(this.props.name) === "string" ?
            new Name(this.props.name, {locale: this.props.locale}) :
            this.props.name;
        return this.state.formatter.format(name);
    }
}

export default NameFmt;
