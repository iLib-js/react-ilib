/*
 * testPlural.jsx - test the plural component.
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
import enzyme, { mount } from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import Plural from '../../src/components/Plural';

enzyme.configure({ adapter: new Adapter() });

function Link (props) {
    return <a href={props.to}>{props.children}</a>;
}

export let testPlural = {
    testSimplePlural: test => {
        test.expect(1);

        const wrapper = mount(
            <Plural category="one">
                <span>This is the singular</span>
            </Plural>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('children'), 'This is the singular');

        test.done();
    },

    testComposeSimpleContents: test => {
        test.expect(1);
        const wrapper = mount(
            <Plural category="one">This is the singular</Plural>,
        );
        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), 'This is the singular');
        test.done();
    },

    testComposeSlightlyMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Plural category="one">
                <span className="foo">This is the singular</span>
            </Plural>,
        );

        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), '<c0>This is the singular</c0>');
        test.done();
    },

    testComposeMuchMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Plural category="one">
                <span className="foo">
                    This <b>is</b> the <Link to="singular.html">singular</Link>.
                </span>
            </Plural>,
        );

        const plural = wrapper.instance();
        test.equal(plural.getSourceString(), '<c0>This <c1>is</c1> the <c2>singular</c2>.</c0>');
        test.done();
    }
};
