/*
 * testAddress.jsx - test the Address input component.
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
import Address from '../../src/components/Address';
import ilib from 'ilib-es6';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

const expected = {
    streetAddress: "123 Any St.",
    locality: "Anytown",
    region: "CA",
    postalCode: "94065",
    country: "United States of America",
    countryCode: "US"
};

export let testAddress = {
    testAddressSimple: test => {
        test.expect(1);
        
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <Address locale="en-US"/>
            </LocaleContext.Provider>
        );

        const expected =
            '<span>' +
                '<label for="sa1" name="Street Address"><input id="sa1" class="address-street-address-1" placeholder="Enter street address"/><br>' +
                '<label for="sa2" name="Street Address 2"><input id="sa2" class="address-street-address-2" placeholder="Additional street address"/><br>' +
                '<label for="locality" name="City"><input id="locality" class="address-locality" placeholder="Enter City"/>, ' +
                '<label for="state" name="State"><input id="state" class="address-state" placeholder="Enter State"/><br>' +
                '<label for="postalCode" name="Zip Code"><input id="postalCode" class="address-postalCode" placeholder="Enter the Zip Code"/>' +
            '</span>';
        test.equal(span.html(), expected);
        test.done();
    },

    testAddressWithLocale: test => {
        test.expect(1);
        const address = {
            streetAddress: "Achterberglaan 19",
            locality: "Uithoorn",
            region: "Nord Holland",
            postalCode: "1234NH",
            country: "Nederland",
            countryCode: "NL"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address locale="nl-NL" address={address} separator={<br/>} />
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r229690728">Achterberglaan 19<br>1234NH Uithoorn<br>Nederland</span>');
        test.done();
    },

    testAddressSimpleWithId: test => {
        test.expect(1);
        const address = {
            streetAddress: "123 Any St.",
            locality: "Anytown",
            region: "CA",
            postalCode: "94065",
            country: "United States of America",
            countryCode: "US"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address address={address} separator={<br/>} id="foo.bar.asdf"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="foo.bar.asdf">123 Any St.<br>Anytown CA 94065<br>United States of America</span>');
        test.done();
    },

    testAddressSimpleWithWrapper: test => {
        test.expect(1);
        const address = {
            streetAddress: "123 Any St.",
            locality: "Anytown",
            region: "CA",
            postalCode: "94065",
            country: "United States of America",
            countryCode: "US"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address address={address} separator={<br/>} wrapper={<div/>}/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="r337532118">123 Any St.<br>Anytown CA 94065<br>United States of America</div>');
        test.done();
    },

    testAddressSimpleWithWrapperAndId: test => {
        test.expect(1);
        const address = {
            streetAddress: "123 Any St.",
            locality: "Anytown",
            region: "CA",
            postalCode: "94065",
            country: "United States of America",
            countryCode: "US"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address address={address} separator={<br/>} wrapper={<div/>} id="asdf.asdf.asdf"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf">123 Any St.<br>Anytown CA 94065<br>United States of America</div>');
        test.done();
    },

    testAddressSimpleWithClass: test => {
        test.expect(1);
        const address = {
            streetAddress: "123 Any St.",
            locality: "Anytown",
            region: "CA",
            postalCode: "94065",
            country: "United States of America",
            countryCode: "US"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address address={address} separator={<br/>} className="foobar"/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r337532118" class="foobar">123 Any St.<br>Anytown CA 94065<br>United States of America</span>');
        test.done();
    },

    testAddressSimpleWithWrapperAndIdAndClass: test => {
        test.expect(1);
        const address = {
            streetAddress: "123 Any St.",
            locality: "Anytown",
            region: "CA",
            postalCode: "94065",
            country: "United States of America",
            countryCode: "US"
        };
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                The address is: <br/>
                <Address address={address} separator={<br/>} wrapper={<div/>} id="asdf.asdf.asdf" className="foobar"/>
            </LocaleContext.Provider>
        );

        let div = wrapper.find('div');
        test.equal(div.html(), '<div id="asdf.asdf.asdf" class="foobar">123 Any St.<br>Anytown CA 94065<br>United States of America</div>');
        test.done();
    },


};
