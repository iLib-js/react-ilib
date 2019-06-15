/*
 * testPlural.jsx - test the plural component.
 *
 * Copyright © 2018-2019, JEDLSoft
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
import Composition from '../../src/utils/Composition';

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
            <Plural category="one">This is the singular</Plural>
        );
        const composition = new Composition(wrapper.get(0));
        test.equal(composition.compose(), 'This is the singular');
        test.done();
    },

    testComposeSlightlyMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Plural category="one">
                <span className="foo">This is the singular</span>
            </Plural>
        );

        const composition = new Composition(wrapper.get(0));
        test.equal(composition.compose(), 'This is the singular');
        test.done();
    },

    testComposeMuchMoreComplex: test => {
        test.expect(1);
        const wrapper = mount(
            <Plural category="one">
                <span className="foo">
                    This <b>is</b> the <Link to="singular.html">singular</Link>.
                </span>
            </Plural>
        );

        const composition = new Composition(wrapper.get(0));
        test.equal(composition.compose(), 'This <c0>is</c0> the <c1>singular</c1>.');
        test.done();
    }
};
