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
import enzyme, { mount } from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import Translate from '../../src/components/Translate';
import Param from '../../src/components/Param';

enzyme.configure({ adapter: new Adapter() });

function Link (props) {
    return <a href={props.to}>{props.children}</a>;
}

export let testParam = {
    testParamSimple: test => {
        test.expect(1);

        const wrapper = mount(
            <Translate values={{filename: "asdf"}}>
                The file name is <Param name="filename"/>.
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('children'), 'The file name is asdf.');

        test.done();
    },

    testParamMultiple: test => {
        test.expect(1);

        const wrapper = mount(
            <Translate values={{filename: "asdf", user: "Joe Schmoe"}}>
                The file <Param name="filename"/> was uploaded by user "<Param name="user"/>".
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('children'), 'The file asdf was uploaded by user "Joe Schmoe".');

        test.done();
    },

    testParamDirectValue: test => {
        test.expect(1);

        let fname = "asdf";
        let user = "Joe Schmoe";

        const wrapper = mount(
            <Translate>
                The file <Param name="filename" value={fname}/> was uploaded by user "<Param name="user" value={user}/>".
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('children'), 'The file asdf was uploaded by user "Joe Schmoe".');

        test.done();
    },

    /*
    testComposeSimpleContents: test => {
        test.expect(1);
        const wrapper = mount(
            <Param category="one">This is the singular</Param>,
        );
        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), 'This is the singular');
        test.done();
    },

    testComposeSlightlyMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Param category="one">
                <span className="foo">This is the singular</span>
            </Param>,
        );

        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), '<c0>This is the singular</c0>');
        test.done();
    },

    testComposeMuchMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Param category="one">
                <span className="foo">
                    This <b>is</b> the <Link to="singular.html">singular</Link>.
                </span>
            </Param>,
        );

        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), '<c0>This <c1>is</c1> the <c2>singular</c2>.</c0>');
        test.done();
    }
    */
};
