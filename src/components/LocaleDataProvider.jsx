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
import LocaleContext from './LocaleContext';

import ilib from 'ilib-es6';
import ResBundle from 'ilib-es6/lib/ResBundle';

class LocaleDataProvider extends React.Component {
    static propTypes = {
        locale: PropTypes.string,
        translationsDir: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            locale: ilib.getLocale(),
            rb: null,
            mainApp: null
        };
    }

    loadMainApp() {
        //  eslint-disable-next-line
        System.import("../App.jsx").then(function(module) {
            console.log(`Main App loaded.`);
            this.setState({
                mainApp:
                    <LocaleContext.Provider value={{locale: this.state.locale, rb: this.state.rb}}>
                        {React.createElement(module.default, {})}
                    </LocaleContext.Provider>
            });
        }.bind(this));
    }

    loadDataAndApp() {
        let locale = this.props.locale || ilib.getLocale();
        if (ilib.isDynData()) {
            // under dynamic data, we have to ensure the data is loaded first before
            // we load the main app
            let webpackLoader = ilib._load;
            webpackLoader.ensureLocale(locale, "./locale", function(results) {
                if (results) {
                    console.log(`Locale data for locale ${this.props.locale} loaded.`);
                    this.loadMainApp(locale);
                } else {
                    console.log(`Locale data for locale ${locale} were NOT loaded`);
                }
            }.bind(this));
        } else {
            // data is already assembled and loaded, so just load the main app directly
            this.setState({
                locale: locale,
                rb: new ResBundle({
                    locale: this.props.locale,
                    name: this.props.name,
                    type: "html"
                })
            });
            this.loadMainApp(locale);
        }
    }

    componentDidMount() {
        this.loadDataAndApp()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.translationsDir !== this.props.translationsDir) {
            this.loadDataAndApp();
        }
    }

    render() {
        return this.state.mainApp || <div>Loading...</div>;
    }
}

export default LocaleDataProvider;
