/*
 * testPhoneFmt.jsx - test the PhoneFmt component.
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
import PhoneFmt from '../../src/components/PhoneFmt';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testPhoneFmt = {
    testPhoneFmtSimple: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '(650) 555-1212');
        test.done();
    },
    
    testPhoneFmtLocale: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt locale="de-DE" number="020133232323"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '0201 33 23 23 23');
        test.done();
    },

    testPhoneFmtStyle: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt style="dots" number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '650.555.1212');
        test.done();
    },

    testPhoneFmtMcc: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt mcc="208" number="0142218442"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '01 42 21 84 42');
        test.done();
    },

    testPhoneFmtWrapperString: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt wrapper="span" number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="6505551212">(650) 555-1212</span>');
        test.done();
    },

    testPhoneFmtWrapperObject: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt wrapper={<span/>} number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="6505551212">(650) 555-1212</span>');
        test.done();
    },

    testPhoneFmtWrapperWithId: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt wrapper="span" id="foobarfoo" number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="foorbarfoo">(650) 555-1212</span>');
        test.done();
    },

    testPhoneFmtWrapperWithClass: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <PhoneFmt wrapper="span" className="phone" number="6505551212"/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="6505551212" class="phone">(650) 555-1212</span>');
        test.done();
    },

};
