/*
 * LocaleDataProvider.jsx - provider to load ilib data asynchronously before
 * loading the rest of the app
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

const ilib = require('ilib/lib/ilib-getdata');

class LocaleDataProvider extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        translationsDir: PropTypes.string,
        children: PropTypes.element.isRequired
    };
    
    constructor(props) {
        super(props);

        this.state = {
            rb: null,
            mainApp: null
        };
    }

    componentDidMount() {
        let webpackLoader = ilib._load;
        let locale = this.props.locale || ilib.getLocale();
        
        webpackLoader.ensureLocale(locale, "./locale", function(results) {
            if (results) {
                //  eslint-disable-next-line
                System.import(this.props.mainApp, () => {
                    console.log(`Locale data for locale ${locale} and main App both loaded asynchronously.`);
                    this.setState({
                        mainApp: React.createElement(this.props.mainApp, {})
                    });
                });
            } else {
                console.log(`Locale date for locale ${locale} were NOT loaded`);
            }
        }.bind(this));
    }
    
    render() {
        return this.state.mainApp || <div>Loading...</div>;
    }
}

export default LocaleDataProvider;
