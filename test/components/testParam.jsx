/*
 * testParam.jsx - test the Param component.
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
import Translate from '../../src/components/Translate';
import Param from '../../src/components/Param';

enzyme.configure({ adapter: new Adapter() });

function Link (props) {
    return <a href={props.to}>{props.children}</a>;
}

export let testParam = {
    testParamString: test => {
        test.expect(1);
        const wrapper = render(
            <span>
                <Param value="asdf"/>
            </span>,
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

    testParamStringWithVariables: test => {
        test.expect(1);
        const name = 'asdf';
        const wrapper = render(
            <span>
                <Param value={name}/>
            </span>,
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

    testParamNumeric: test => {
        test.expect(1);
        const wrapper = render(
            <span>
                <Param value={3}/>
            </span>,
        );

        test.equal(wrapper.text(), '3');
        test.done();
    },

    testParamUndefined: test => {
        test.expect(1);
        const wrapper = render(
            <span>
                <Param value={undefined}/>
            </span>,
        );

        test.equal(wrapper.text(), '');
        test.done();
    },

    testParamNull: test => {
        test.expect(1);
        const wrapper = render(
            <span>
                <Param value={null}/>
            </span>,
        );

        test.equal(wrapper.text(), '');
        test.done();
    },

    testParamJsx: test => {
        test.expect(1);
        const tmp = <b>foo!</b>;
        const wrapper = render(
            <span>
                <Param value={tmp}/>
            </span>,
        );

        test.equal(wrapper.html(), '<b>foo!</b>');
        test.done();
    },

    testParamFunction: test => {
        test.expect(1);
        const f = function f() {
            return 'asdf';
        };
        const wrapper = render(
            <span>
                <Param value={f}/>
            </span>,
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

    testParamStringWithDescription: test => {
        test.expect(1);
        const wrapper = render(
            <span>
                <Param value="asdf" description="foo"/>
            </span>,
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

    testParamWithWrapper: test => {
        test.expect(1);
        const wrapper = render(
            <Param wrapper="span" name="foo" value="asdf"/>
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

    testParamWithWrapperAndClass: test => {
        test.expect(1);
        const wrapper = render(
            <Param wrapper="span" name="foo" className="myclass" value="asdf"/>
        );

        test.equal(wrapper.text(), 'asdf');
        test.done();
    },

};
