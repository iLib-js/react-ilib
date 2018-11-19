/*
 * ListFmt.jsx - component to format a list number
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

import ListFormatter from 'ilib-es6/lib/ListFmt';

class ListFmt extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        length: PropTypes.string,
        style: PropTypes.string,
        list: PropTypes["object"].isRequired,
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
            formatter: new ListFormatter({
                locale: locale,
                style: style,
                length: length
            })
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.length !== this.props.length || prevProps.style !== this.props.style) {
            new ListFormatter({
                locale: this.props.locale,
                style: this.props.style,
                length: this.props.length,
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
        return this.state.formatter.format(this.props.list);
    }
}

export default ListFmt;
