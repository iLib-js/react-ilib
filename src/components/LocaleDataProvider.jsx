/*
 * LocaleDataProvider.jsx - provider to load ilib data asynchronously before
 * loading the rest of the app
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
import LocaleContext from './LocaleContext';

import ilib, { ResBundle } from 'ilib-es6';

class LocaleDataProvider extends React.Component {
    static propTypes = {
        locale: PropTypes.oneOfType([
             PropTypes.string,
             PropTypes.object
        ]),
        translationsDir: PropTypes.string,
        app: PropTypes.oneOfType([
             PropTypes.func,
             PropTypes.object
        ]).isRequired,
        bundleName: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            locale: null,
            rb: null,
            mainApp: null
        };
    }

    loadResBundle() {
        ResBundle.create({
            locale: this.props.locale,
            name: this.props.bundleName,
            type: "html",
            baseDir: this.props.translationsDir
        }).then(rb => {
            console.log(`Main App loaded. Settings state. Locale: ${this.props.locale} rb: ${rb.locale.getSpec()}`);

            let App;
            const AppType = this.props.app ||
                (this.props.children && React.children.count(this.props.children) === 1 && this.props.children);

            if (typeof(AppType) === "function") {
                App = <AppType/>
            } else {
                App = React.cloneElement(AppType, {key: "mainApp"});
            }

            this.setState({
                locale: this.props.locale,
                rb,
                mainApp:
                    <LocaleContext.Provider value={{locale: this.props.locale, rb: rb}}>
                        {App}
                    </LocaleContext.Provider>
            });
        });
    }

    loadLocaleData() {
        let locale = this.props.locale || ilib.getLocale();
        if (ilib.isDynData()) {
            // under dynamic data, we have to ensure the data is loaded first before
            // we load the main app
            let webpackLoader = ilib._load;
            webpackLoader.ensureLocale(locale, this.props.translationsDir, results => {
                if (results) {
                    console.log(`Locale data for locale ${locale} loaded.`);
                    this.loadResBundle();
                } else {
                    console.log(`Locale data for locale ${locale} were NOT loaded`);
                }
            });
        } else {
            // data is already assembled and loaded, so just load the resources next
            this.loadResBundle();
        }
    }

    componentDidMount() {
        this.loadLocaleData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.locale !== this.props.locale || prevProps.translationsDir !== this.props.translationsDir) {
            if (this.props.locale) ilib.setLocale(this.props.locale);
            this.loadLocaleData();
        }
    }

    render() {
        return this.state.mainApp || <div key="mainApp">Loading...</div>;
    }
}

export default LocaleDataProvider;
