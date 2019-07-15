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
import DateFactory from 'ilib-es6/lib/DateFactory';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

const startDate = DateFactory({
    year: 2019,
    month: 6,
    day: 27,
    hour: 21,
    minute: 54,
    second: 33,
    timezone: 'America/Los_Angeles'
});

const endDate = DateFactory({
    year: 2019,
    month: 7,
    day: 2,
    hour: 11,
    minute: 21,
    second: 6,
    timezone: 'America/Los_Angeles'
});

export let testDateRngFmt = {
    testDateRngFmtSimple: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '6/27/19 – 7/2/19');
        test.done();
    },
    
    testDateRngFmtLocale: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt locale="de-DE" length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '27.06 – 02.07.19');
        test.done();
    },

    testDateRngFmtTimeZone: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt timezone="Europe/London" length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '6/28/19 – 7/2/19');
        test.done();
    },

    testDateRngFmtCalendar: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt calendar="hebrew" length="short" timezone="America/Los_Angeles" start={DateFactory({type: "hebrew", julianday: startDate.getJulianDay(), timezone: "America/Los_Angeles"})} end={DateFactory({type: "hebrew", julianday: endDate.getJulianDay(), timezone: "America/Los_Angeles"})}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), '3/25/79 – 3/29/79');
        test.done();
    },

    testDateRngFmtLength: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt length="full" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), 'June 27 – July 2, 2019');
        test.done();
    },

    testDateRngFmtWrapper: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper={<span/>} length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r190271918">6/27/19 – 7/2/19</span>');
        test.done();
    },

    testDateRngFmtWrapperAsString: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper="span" length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="r190271918">6/27/19 – 7/2/19</span>');
        test.done();
    },

    testDateRngFmtWrapperWithId: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper={<span/>} id="asdfasdf" length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="asdfasdf">6/27/19 – 7/2/19</span>');
        test.done();
    },


    testDateRngFmtWrapperWithClass: test => {
        test.expect(1);
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <DateRngFmt wrapper={<span/>} id="asdfasdf" className="asdfasdf" length="short" start={startDate} end={endDate}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.html(), '<span id="asdfasdf" class="asdfasdf">6/27/19 – 7/2/19</span>');
        test.done();
    }
};
