/*
 * testTranslate.jsx - test the Translate component.
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

import Translate from '../../src/components/Translate';
import Plural from '../../src/components/Plural';
import LocaleContext from '../../src/components/LocaleContext';

enzyme.configure({ adapter: new Adapter() });

var ilib = require("ilib");
const ResBundle = require("ilib/lib/ResBundle");

require("../assertExtras");

function LinkButton(props) {
    return (
        <a className="btn" href={props.to}>
            {props.children}
        </a>
    );
}

LinkButton.propTypes = {
    to: PropTypes.string,
    children: PropTypes.any,
};

//set up mock data
ilib.data.translate_ru_RU = {
    "this.is.a.test": "Это тест",
    "plural.test": "one#Это единственное.|few#Это несколько множественных числа.|many#Это многочисленные множественных чисел.|#Это другие множественных чисел."
};
ilib.data.translate_fr = {
    "this.is.a.test": "Ceci est un test"
};

export let testTranslate = {
    testTranslateWithChildren: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.equal(span.prop('children'), 'some text');
        test.done();
    },

    testTranslateWithHTML: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some <b>bold</b> text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some ');
        test.done();
    },

    testTranslateWithSubcomponents: test => {
        test.expect(6);
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some <LinkButton to="foo">link</LinkButton> text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some ');
        test.contains(span.prop('children'), ' text');

        test.ok(wrapper.find('a').hasClass('btn'));
        test.equal(wrapper.find('a').prop('children'), 'link');
        test.equal(wrapper.find('a').prop('href'), 'foo');
        test.done();
    },

    testTranslateWithStringReplacementParameters: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: 'substituted' }}
            >
                some [[name]] text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some substituted text');
        test.done();
    },

    testTranslateWithMultipleStringReplacementParameters: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{
                    name: 'substituted',
                    text: 'text',
                    user: 'James Earl Jones',
                }}
            >
                some [[name]] [[text]] from user [[user]]
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'),
            'some substituted text from user James Earl Jones',
        );
        test.done();
    },

    testTranslateWithEmptyStringReplacementParameters: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ name: '' }}>
                some [[name]] text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some  text');
        test.done();
    },

    testTranslateWithNoValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some [[name]] text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some [[name]] text');
        test.done();
    },

    testTranslateWithValuesButNoStringReplacementParameters: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: 'substituted' }}
            >
                some sorta text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some sorta text');
        test.done();
    },

    testTranslateWithinCorrectSyntaxForStringReplacementParameters: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{
                    name: 'substituted',
                    text: 'asdf',
                }}
            >
                some [name] [ [text]]
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'some [name] [ [text]]');
        test.done();
    },

    testTranslateWithReplacementParametersWSubcomponents: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: 'substituted' }}
            >
                some <LinkButton url="https://foo.com/a/b">[[name]]</LinkButton>
                text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('a');
        test.contains(a.prop('children'), 'substituted');
        test.done();
    },

    testTranslateWithMissingReplacementParameterValues : test => {
        test.expect(3);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: 'substituted' }}
            >
                some
                <b>[[george]]</b>
                text [[gertrude]]
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');
        test.contains(span.prop('children'), 'text [[gertrude]]');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), '[[george]]');
        test.done();
    },

    testTranslateWithHTMLJSXReplacementParameterValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: <b>bold!</b> }}
            >
                some <i>[[name]]</i>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), 'bold!');
        test.done();
    },

    testTranslateWithComponentJSXReplacementParameterValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ name: <LinkButton url="foo">bold!</LinkButton> }}
            >
                some <i>[[name]]</i>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('a');
        test.contains(a.prop('children'), 'bold!');
        test.done();
    },

    testTranslateWithFunctionalReplacementParameterValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{
                    area: function() {
                        let x = 2;
                        return x * x * Math.PI;
                    },
                }}
            >
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), '12.566370614359172');
        test.done();
    },

    testTranslateWithNumericReplacementParameterValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ area: 5.34 }}>
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), '5.34');
        test.done();
    },

    testTranslateWithNumericReplacementParameterWithValueZero: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ area: 0 }}>
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), '0');
        test.done();
    },

    testTranslateWithBooleanReplacementParameterValuesTrue: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ area: true }}>
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), 'true');
        test.done();
    },

    testTranslateWithBooleanReplacementParameterValuesFalse: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ area: false }}>
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        let a = wrapper.find('b');
        test.contains(a.prop('children'), 'false');
        test.done();
    },

    testTranslateWithNullReplacementParameterValues : test => {
        test.expect(2);
        const wrapper = mount(
            <Translate id="test" description="asdf" values={{ area: null }}>
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // should not replace the parameters with anything
        let a = wrapper.find('b');
        test.contains(a.prop('children'), '[[area]]');
        test.done();
    },

    testTranslateWithUndefinedReplacementParameterValues: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate
                id="test"
                description="asdf"
                values={{ area: undefined }}
            >
                some <b>[[area]]</b>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // should not replace the parameters with anything
        let a = wrapper.find('b');
        test.contains(a.prop('children'), '[[area]]');
        test.done();
    },

    testTranslateWithSimplePluralsInEnglishSingular: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate count={1}>
                <Plural category="one">This is the singular.</Plural>
                <Plural category="other">These are the plurals.</Plural>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'r355131985');
        test.equal(span.prop('children'), 'This is the singular.');
        test.done();
    },

    testTranslateWithSimplePluralsInEnglishPlural: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate count={21}>
                <Plural category="one">This is the singular.</Plural>
                <Plural category="other">These are the plurals.</Plural>
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'r355131985');
        test.equal(span.prop('children'), 'These are the plurals.');
        test.done();
    },

    testTranslateWithSimplePluralsInRussianSingular: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate count={1}>
                            <Plural category="one">This is the singular.</Plural>
                            <Plural category="other">These are the plurals.</Plural>
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-resource-id'), 'r355131985');
                test.equal(span.prop('children'), 'This is the singular.');
                test.done();
            }
        });
    },

    testTranslateWithSimplePluralsInRussianOne: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate count={21}>
                            <Plural category="one">This is the singular.</Plural>
                            <Plural category="few">These are the few plurals.</Plural>
                            <Plural category="many">These are the many plurals.</Plural>
                            <Plural category="other">These are the other plurals.</Plural>
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-resource-id'), 'r74165631');

                // 21 is singular in Russian!
                test.equal(span.prop('children'), 'This is the singular.');
                test.done();
            }
        });
    },

    testTranslateWithSimplePluralsInRussianFew: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate count={24}>
                            <Plural category="one">This is the singular.</Plural>
                            <Plural category="few">These are the few plurals.</Plural>
                            <Plural category="many">These are the many plurals.</Plural>
                            <Plural category="other">These are the other plurals.</Plural>
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-resource-id'), 'r74165631');

                // 24 is few in Russian!
                test.equal(span.prop('children'), 'These are the few plurals.');
                test.done();
            }
        });
    },

    testTranslateWithSimplePluralsInRussianMany: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate count={27}>
                            <Plural category="one">This is the singular.</Plural>
                            <Plural category="few">These are the few plurals.</Plural>
                            <Plural category="many">These are the many plurals.</Plural>
                            <Plural category="other">These are the other plurals.</Plural>
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-resource-id'), 'r74165631');

                // 27 is many in Russian!
                test.equal(span.prop('children'), 'These are the many plurals.');
                test.done();
            }
        });
    },

    testTranslateWithTranslationsRU: test => {
        test.expect(1);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate id="this.is.a.test">
                            This is a test
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.contains(span.prop('children'), 'Это тест');
                test.done();
            }
        });
    },

    testTranslateWithTranslationsFR: test => {
        test.expect(1);
        new ResBundle({
            locale: "fr",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "fr", rb: rb}}>
                        <Translate id="this.is.a.test">
                            This is a test
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.contains(span.prop('children'), 'Ceci est un test');
                test.done();
            }
        });
    },

    testTranslateWithTranslationsWithFallbacks: test => {
        test.expect(1);
        new ResBundle({
            locale: "fr-FR",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "fr", rb: rb}}>
                        <Translate id="this.is.a.test">
                            This is a test
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.contains(span.prop('children'), 'Ceci est un test');
                test.done();
            }
        });
    },

    testTranslateWithPluralsInRussianWithTranslations: test => {
        test.expect(2);
        new ResBundle({
            locale: "ru-RU",
            name: "translate",
            sync: false,
            onLoad: rb => {
                const wrapper = mount(
                    <LocaleContext.Provider value={{locale: "ru-RU", rb: rb}}>
                        <Translate id="plural.test" count={27}>
                            <Plural category="one">This is the singular.</Plural>
                            <Plural category="few">These are the few plurals.</Plural>
                            <Plural category="many">These are the many plurals.</Plural>
                            <Plural category="other">These are the other plurals.</Plural>
                        </Translate>
                    </LocaleContext.Provider>
                );

                let span = wrapper.find('span');
                test.equal(span.prop('x-resource-id'), 'plural.test');

                // 27 is many in Russian!
                test.equal(span.prop('children'), 'Это многочисленные множественных чисел.');
                test.done();
            }
        });
    },

    testTranslateGenerateId: test => {
        test.expect(1);
        const wrapper = mount(
            <Translate description="asdf">
            some <b>bold</b> text
            </Translate>
        );

        let span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'r425815508');
        test.done();
    },

    testTranslateDoNotThrowWhenMissingDescription: test => {
        test.expect(1);
        function testDescription() {
            const wrapper = mount(
                <Translate id="asdf">
                some <b>bold</b> text
                </Translate>
            );
        }
        test.doesNotThrow(testDescription);
        test.done();
    }
};
