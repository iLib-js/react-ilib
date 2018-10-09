/*
 * testTranslate.jsx - test the Translate component.
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

import React from 'react';
import enzyme, { mount } from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';

import Translate from '../../src/components/Translate';
import Plural from '../../src/components/Plural';
import LocaleContext, { withLocale } from '../../src/components/LocaleContext';

enzyme.configure({ adapter: new Adapter() });

var ilib = require("ilib");
const ResBundle = require("ilib/lib/ResBundle");

require("../assertExtras");

// set up mock data
ilib.data.localecontext_ru_RU = {
    "This is a test": "Это тест"
};
ilib.data.localecontext_fr = {
    "This is a test": "Ceci est un test"
};

class Span extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <span x-locale={this.props.locale}>{this.props.children}</span>;
    }
}

const Lspan = withLocale(Span);

export let testLocaleContext = {
    testLocaleContextWithDefaultLocale: test => {
        test.expect(2);
        new ResBundle({
            name: "localecontext",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "en-US", rb: rb}}>
                        <Lspan>{rb.getStringJS("This is a test")}</Lspan>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-locale'), 'en-US');
                test.equal(span.prop('children'), 'This is a test');
                test.done();
            }
        });
    },

    testLocaleContextExplicitLocale: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "localecontext",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Lspan>{rb.getStringJS("This is a test")}</Lspan>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-locale'), 'ru-RU');
                test.equal(span.prop('children'), 'Это тест');
                test.done();
            }
        });
    }};