/*
 * testDateFmt.jsx - test the DateFmt component.
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
import DateFmt from '../../src/components/DateFmt';
import ilib from 'ilib-es6';
import DateFactory from 'ilib-es6/lib/DateFactory';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

let testDate = DateFactory({
    locale: "en-US",
    year: 2019,
    month: 6,
    day: 24,
    hour: 21,
    minute: 25,
    second: 34,
    timezone: "America/Los_Angeles"
});

export let testDateFmt = {
    testDateFmtSimple: test => {
        test.expect(1);
        ilib.setTimeZone("America/Los_Angeles");
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="short" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '6/24/19');
        test.done();
    },

    testDateFmtWithLocale: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="de-DE" type="date" length="short" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '24.06.19');
        test.done();
    },

    testDateFmtMedium: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="medium" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'Jun 24, 2019');
        test.done();
    },

    testDateFmtLong: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="long" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'June 24, 2019');
        test.done();
    },

    testDateFmtFull: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'June 24, 2019');
        test.done();
    },

    testDateFmtDateTime: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="datetime" length="long" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'June 24, 2019 at 9:25 PM');
        test.done();
    },

    testDateFmtDateComponents: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" dateComponents="dmw" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'Monday, June 24');
        test.done();
    },

    testDateFmtTimeComponents: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="time" length="full" timeComponents="hmaz" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '9:25 PM PDT');
        test.done();
    },

    testDateFmtClock: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="time" length="full" timeComponents="hma" clock="24" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '21:25');
        test.done();
    },

    testDateFmtTemplate: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="datetime" length="long" template="dd-MM-yyyy'T'HH:mm" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '24-06-2019T21:25');
        test.done();
    },

    testDateFmtUseNative: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt useNative={true} locale="bn-IN" type="date" length="full" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '২৪ জুন, ২০১৯');
        test.done();
    },

    testDateFmtMeridiems: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="zh-Hans-CN" type="time" length="full" timeComponents="hma" meridiems="chinese" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '晚上9:25');
        test.done();
    },

    testDateFmtCalendar: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" calendar="hebrew" timezone="America/Los_Angeles" type="date" length="full" date={testDate}/>
            </LocaleContext.Provider>
        );

        // the hebrew day starts at sundown, so this is Sivan 22 instead of 21
        test.equal(wrapper.text(), 'Sivan 22, 5779');
        test.done();
    },

    testDateFmtTimeZone: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" timezone="America/New_York" type="time" length="full" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '12:25 AM');
        test.done();
    },

    testDateFmtWrapperComponent: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" wrapper={<span/>} date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r916831373">June 24, 2019</span>');
        test.done();
    },

    testDateFmtWrapperString: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" wrapper="span" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r916831373">June 24, 2019</span>');
        test.done();
    },

    testDateFmtId: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" wrapper={<span/>} id="boogy-date" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="boogy-date">June 24, 2019</span>');
        test.done();
    },

    testDateFmtClass: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateFmt locale="en-US" type="date" length="full" wrapper={<span/>} className="boogy-night" date={testDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r916831373" class="boogy-night">June 24, 2019</span>');
        test.done();
    }
};
