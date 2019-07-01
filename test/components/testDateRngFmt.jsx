/*
 * testDateRngFmt.jsx - test the DateRngFmt component.
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
import DateRngFmt from '../../src/components/DateRngFmt';
import ilib from 'ilib-es6';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testDateRngFmt = {
    testDateRngFmtSimple: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4');
        test.done();
    },

    testDateRngFmtLocale: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt locale="de-DE" number={453434.453}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '453.434,453');
        test.done();
    },

    testDateRngFmtCurrency: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt locale="nl-NL" type="currency" currency="EUR" style="common" number={12345.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '€ 12.345,40');
        test.done();
    },

    testDateRngFmtPercentage: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt locale="tr-TR" type="percentage" number={45.5}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '%45,5');
        test.done();
    },

    testDateRngFmtScientific: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt style="scientific" number={453242.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '4.532424E+5');
        test.done();
    },

    testDateRngFmtMaxFractionDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt maxFractionDigits="4" number={45.4467534}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4468');
        test.done();
    },

    testDateRngFmtMinFractionDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt minFractionDigits="4" number={45.44}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4400');
        test.done();
    },

    testDateRngFmtSignificantDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt significantDigits="6" number={45.4467534}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4468');
        test.done();
    },

    testDateRngFmtUseNativeDigits: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt locale="bn-IN" number={123.456}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "১২৩.৪৫৬");
        test.done();
    },

    testDateRngFmtRoundingMode: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt roundingMode="halfeven" maxFractionDigits="1" number={45.45}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '45.4');
        test.done();
    },

    testDateRngFmtCurrencyStyle: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt type="currency" style="iso" currency="CAD" number={45.45}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'CAD45.45');
        test.done();
    },

    testDateRngFmtNumberStyle: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt style="nogrouping" number={12345678.45}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '12345678.45');
        test.done();
    },

    testDateRngFmtWrapperString: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper="span" number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="45.4">45.4</span>');
        test.done();
    },

    testDateRngFmtWrapperComponent: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper={<span/>} number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="45.4">45.4</span>');
        test.done();
    },

    testDateRngFmtCustomId: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper="span" id="foobarfoo" number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="foobarfoo">45.4</span>');
        test.done();
    },

    testDateRngFmtClass: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper="span" className="number" id="foobarfoo" number={45.4}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="foobarfoo" class="number">45.4</span>');
        test.done();
    },
};
