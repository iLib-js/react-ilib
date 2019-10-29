/*
 * testLocaleDataProvider.jsx - test the LocaleDataProvider component.
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

import LocaleDataProvider from '../../src/components/LocaleDataProvider';
import Translate from '../../src/components/Translate';
import Plural from '../../src/components/Plural';
import LocaleContext, { withLocale } from '../../src/components/LocaleContext';
import ilib from 'ilib-es6';
import ResBundle from "ilib-es6/lib/ResBundle";

require("../assertExtras");

enzyme.configure({ adapter: new Adapter() });

// set up mock data
ilib.data.localecontext_ru_RU = {
    "This is a test": "Это тест"
};
ilib.data.localecontext_fr = {
    "This is a test": "Ceci est un test"
};

class Span extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <span x-locale={this.props.locale}>{this.props.children}</span>;
    }
}

const Lspan = withLocale(Span);

// just pretend we loaded everything
ilib._load.ensureLocale = function mockEnsure(locale, dir, callback) {
    callback(ilib.data);
};

export let testLocaleDataProvider = {
    testLocaleContextSimple: test => {
        test.expect(2);

        const app = <Translate>This is a test</Translate>;

        const wrapper = mount(
            <LocaleDataProvider app={app} />
        );

        setTimeout(() => {
            wrapper.update();

            let span = wrapper.find('span');
            test.equal(span.prop('x-locale'), 'en-US');
            test.equal(span.prop('children'), 'This is a test');
            test.done();
        });
    },

    testLocaleContextWithTranslations: test => {
        test.expect(2);

        const app = <Translate>This is a test</Translate>;

        const wrapper = mount(
            <LocaleDataProvider translationsDir="./res" bundleName="resources" locale="de-DE" app={app}/>
        );

        setTimeout(() => {
            wrapper.update();

            let span = wrapper.find('span');
            test.equal(span.prop('x-locale'), 'de-DE');
            test.equal(span.prop('children'), 'Dies ist eine Teste.');
            test.done();
        });
    }
};