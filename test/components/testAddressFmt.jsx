/*
 * testAddressFmt.jsx - test the AddressFmt component.
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
import AddressFmt from '../../src/components/AddressFmt';
import ilib from 'ilib-es6';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testAddressFmt = {
    testAddressFmtSimple: test => {
        test.expect(2);
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
                <span>
                    <AddressFmt address={address} separator={<br/>} />
                </span>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.text(), '123 Any St.<br/>Anytown, CA 94065<br/>United States of America');
        test.done();
    },
};
