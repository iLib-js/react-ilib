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
import Param from '../../src/components/Param';
import LocaleContext from '../../src/components/LocaleContext';
import ilib from 'ilib-es6';
import ResBundle from "ilib-es6/lib/ResBundle";
require("../assertExtras");

enzyme.configure({ adapter: new Adapter() });

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
    testTranslateWithSimplePluralsInEnglishPluralsSingular: test => {
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

    testTranslateWithSimplePluralsInEnglishPluralsPlural: test => {
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

    testTranslateWithParamSubcomponent: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value="asdf" description="asdf" />.
            </Translate>
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        test.equal(span.text(), 'The string is asdf.');
        test.done();
    },

    testTranslateWithMultipleParamSubcomponents: test => {
        test.expect(2);
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value="asdf" description="foo" /> and the number is{' '}
                <Param value={3} description="bar" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        test.equal(span.text(), 'The string is asdf and the number is 3.');
        test.done();
    },

    testTranslateWithParamSubcomponentOwnValue: test => {
        test.expect(2);
        const str = 'a string';
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        test.equal(span.text(), 'The string is a string.');
        test.done();
    },

    testTranslateWithUndefinedParamValue: test => {
        test.expect(2);
        const str = undefined;
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // Should put an empty string and not "undefined" in the output.
        test.equal(span.text(), 'The string is .');
        test.done();
    },

    testTransalteWithNullParamValue: test => {
        test.expect(2);
        const str = null;
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // Should put an empty string and not "null" in the output.
        test.equal(span.text(), 'The string is .');
        test.done();
    },

    testTranlateWithBooleanParamValue: test => {
        test.expect(2);
        const str = true;
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // Should put an empty string and not "null" in the output.
        test.equal(span.text(), 'The string is true.');
        test.done();
    },

    testTranslateWithNumericParamValue: test => {
        test.expect(2);
        const str = 123.456;
        const wrapper = mount(
            <Translate locale="ru-RU" id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // Should put an empty string and not "null" in the output.
        test.equal(span.text(), 'The string is 123.456.');
        test.done();
    },

    testTranslateWithFunctionalParamValue: test => {
        test.expect(2);
        const str = function str() {
            return 'Hello!';
        };
        const wrapper = mount(
            <Translate id="test" description="asdf">
                The string is <Param value={str} description="foo" />.
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        // Should put an empty string and not "null" in the output.
        test.equal(span.text(), 'The string is Hello!.');
        test.done();
    },

    testTranslateWithReplacementParametersWithinSubcomponents: test => {
        test.expect(2);
        const name = 'substituted';
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some{' '}
                <LinkButton url="https://foo.com/a/b">
                    <Param value={name} description="foo" />
                </LinkButton>
                text
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        const a = wrapper.find('a');
        test.contains(a.text(), 'substituted');
        test.done();
    },

    testTranslateWithHTMLJsxReplacementParameterValues: test => {
        test.expect(2);
        const name = <b>bold!</b>;
        const wrapper = mount(
            <Translate id="test" description="asdf">
                some{' '}
                <i>
                    <Param value={name} description="foo" />
                </i>
            </Translate>,
        );

        const span = wrapper.find('span');
        test.equal(span.prop('x-resource-id'), 'test');

        const a = wrapper.find('b');
        test.contains(a.text(), 'bold!');
        test.done();
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
    },

    testTranslateThrowWhenCountButNoOnePlural: test => {
        test.expect(1);
        function testPlural() {
            mount(
                <Translate id="asdf" description="asdf" count="23">
                    <Plural category="other">
                        some <b>bold</b> text
                    </Plural>
                </Translate>,
            );
        }

        test.throws(testPlural);
        
        test.done();
    },

    testTranslateThrowWhenCountButNoOtherPlural: test => {
        test.expect(1);
        function testPlural() {
            mount(
                <Translate id="asdf" description="asdf" count="23">
                    <Plural category="one">
                        some <b>bold</b> text
                    </Plural>
                </Translate>,
            );
        }

        test.throws(testPlural);
        test.done();
    }
};
