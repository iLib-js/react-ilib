/*
 * testListFmt.jsx - test the ListFmt component.
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
import enzyme, { mount, render } from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';

import LocaleContext from '../../src/components/LocaleContext';
import ListFmt from '../../src/components/ListFmt';
import ilib from 'ilib-es6';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testListFmt = {
    testListFmtSimple: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r321838219">Peter, Paul, and Mary</span>');
        test.done();
    },

    testListFmtWithLocale: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Maria"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt locale="de-DE" list={list}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r1058501694">Peter, Paul und Maria</span>');
        test.done();
    },

    testListFmtSimpleWithId: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list} id="foo.bar.asdf"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="foo.bar.asdf">Peter, Paul, and Mary</span>');
        test.done();
    },

    testListFmtSimpleWithWrapper: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list} wrapper={<div/>}/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="r321838219">Peter, Paul, and Mary</div>');
        test.done();
    },

    testListFmtSimpleWithWrapperAndId: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list} separator={<br/>} wrapper={<div/>} id="asdf.asdf.asdf"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf">Peter, Paul, and Mary</div>');
        test.done();
    },

    testListFmtSimpleWithClass: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list} className="foobar"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r321838219" class="foobar">Peter, Paul, and Mary</span>');
        test.done();
    },

    testListFmtSimpleWithWrapperAndIdAndClass: test => {
        test.expect(1);
        const list = ["Peter", "Paul", "Mary"];
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The list is: <ListFmt list={list} wrapper={<div/>} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf" class="foobar">Peter, Paul, and Mary</div>');
        test.done();
    },


};
