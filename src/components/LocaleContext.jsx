/*
 * LocaleContext.jsx - context for the locale and the resource bundle
 * containing the app's translations
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

import ilib, { ResBundle } from 'ilib-es6';

var locale = ilib.getLocale();

var rb = new ResBundle({
    locale: locale
});

const LocaleContext = React.createContext({
    locale: locale,
    rb: rb
});

export function withLocale(Component) {
    return function LocalizedComponent(props) {
        return (
            <LocaleContext.Consumer>
                {value => <Component {...props} locale={value.locale} rb={value.rb}/>}
            </LocaleContext.Consumer>
        );
    };
};

export default LocaleContext;