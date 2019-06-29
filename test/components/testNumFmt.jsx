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

    /*
    testNumFmtOne: test => {
        test.expect(1);
        const list = ["Peter"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r907224573">Peter</span>');
        test.done();
    },

    testNumFmtTwo: test => {
        test.expect(1);
        const list = ["Peter", "Paul"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r491155901">Peter and Paul</span>');
        test.done();
    },

    testNumFmtFour: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary", "Joseph"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r858969903">Peter, Paul, Mary, and Joseph</span>');
        test.done();
    },
    testNumFmtWithLocale: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Maria"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt locale="de-DE" list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r1058501694">Peter, Paul und Maria</span>');
        test.done();
    },

    testNumFmtWithId: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} id="foo.bar.asdf"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="foo.bar.asdf">Peter, Paul, and Mary</span>');
        test.done();
    },

    testNumFmtWithWrapper: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} wrapper={<div/>}/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="r321838219">Peter, Paul, and Mary</div>');
        test.done();
    },

    testNumFmtWithWrapperAndId: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} separator={<br/>} wrapper={<div/>} id="asdf.asdf.asdf"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf">Peter, Paul, and Mary</div>');
        test.done();
    },

    testNumFmtWithClass: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} className="foobar"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r321838219" class="foobar">Peter, Paul, and Mary</span>');
        test.done();
    },

    testNumFmtWithWrapperAndIdAndClass: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} wrapper={<div/>} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf" class="foobar">Peter, Paul, and Mary</div>');
        test.done();
    },

    testNumFmtWithWrapperAndIdAndClass: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt list={list} wrapper={<div/>} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf" class="foobar">Peter, Paul, and Mary</div>');
        test.done();
    },

    testNumFmtDEContext: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Maria"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt locale="de-DE" list={list} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('span');
        test.equal(div.html(), '<span id="asdf.asdf.asdf" class="foobar">Peter, Paul und Maria</span>');
        test.done();
    },

    testNumFmtJAContext: test => {
        test.expect(1);
        const list = ["岡田さん", "鈴木さん", "横山さん"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <NumFmt locale="ja-JP" list={list} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('span');
        test.equal(div.html(), '<span id="asdf.asdf.asdf" class="foobar">岡田さん、鈴木さん、横山さん</span>');
        test.done();
    },
    */
};
