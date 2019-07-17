/*
 * testDurationFmt.jsx - test the DurationFmt component.
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
import DurationFmt from '../../src/components/DurationFmt';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testDurationFmt = {
    testDurationFmtSimple: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '3 hours, 3 minutes, 3 seconds');
        test.done();
    },
    
    testDurationFmtLocale: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt locale="de-DE" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '3 Stunden, 3 Minuten und 3 Sekunden');
        test.done();
    },

    testDurationFmtLength: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt length="short" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '3h 3m 3s');
        test.done();
    },

    testDurationFmtStyle: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt style="clock" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '3:03:03');
        test.done();
    },

    testDurationFmtUseNative: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt useNative="true" locale="bn-IN" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '৩ ঘন্টা, ৩ মিনিট, ৩ সেকেন্ড');
        test.done();
    },

    testDurationFmtWrapperString: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt wrapper="span" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r580831455">3 hours, 3 minutes, 3 seconds</span>');
        test.done();
    },

    testDurationFmtWrapperComponent: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt wrapper={<span/>} length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r580831455">3 hours, 3 minutes, 3 seconds</span>');
        test.done();
    },

    testDurationFmtWrapperWithId: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt wrapper="span" id="fooasdf" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="fooasdf">3 hours, 3 minutes, 3 seconds</span>');
        test.done();
    },

    testDurationFmtWrapperWithClass: test => {
        test.expect(1);
        const duration = {hour: 3, minute: 3, second:3};
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DurationFmt wrapper="span" className="duration" length="full" duration={duration}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r580831455" class="duration">3 hours, 3 minutes, 3 seconds</span>');
        test.done();
    }
};
