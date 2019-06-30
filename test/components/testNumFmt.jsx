/*
 * testNumFmt.jsx - test the NumFmt component.
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

import React from 'react';
import enzyme, { mount, render } from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';

import LocaleContext from '../../src/components/LocaleContext';
import NumFmt from '../../src/components/NumFmt';
import ilib from 'ilib-es6';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testNumFmt = {
    testNumFmtSimple: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4');
        test.done();
    },

    testNumFmtLocale: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt locale="de-DE" number={453434.453}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '453.434,453');
        test.done();
    },

    testNumFmtCurrency: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt locale="nl-NL" type="currency" currency="EUR" style="common" number={12345.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '€ 12.345,40');
        test.done();
    },

    testNumFmtPercentage: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt locale="tr-TR" type="percentage" number={45.5}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '%45,5');
        test.done();
    },

    testNumFmtScientific: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt style="scientific" number={453242.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '4.532424E+5');
        test.done();
    },

    testNumFmtMaxFractionDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt maxFractionDigits="4" number={45.4467534}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4468');
        test.done();
    },

    testNumFmtMinFractionDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt minFractionDigits="4" number={45.44}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4400');
        test.done();
    },

    testNumFmtSignificantDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt significantDigits="6" number={45.4467534}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4468');
        test.done();
    },

    testNumFmtUseNativeDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <NumFmt locale="bn-IN" number={123.456}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "১২৩.৪৫৬");
        test.done();
    },
};
