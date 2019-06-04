/*
 * testUnitFmt.jsx - test the UnitFmt component.
 *
 * Copyright © 2019, Box, Inc.
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
import UnitFmt from '../../src/components/UnitFmt';
import ilib from 'ilib-es6';
import MeasurementFactory from 'ilib-es6/lib/MeasurementFactory';

enzyme.configure({ adapter: new Adapter() });
require("../assertExtras");

export let testUnitFmt = {
    testUnitFormat1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 10,
            unit: "micrometer"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "10 micrometers");
        test.done();
    },

    testUnitFormatWithScale1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "3 kilometers");
        test.done();
    },

    testUnitFormatWithoutScale1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "3,000 meters");
        test.done();
    },

    testUnitFormatWithScale2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "bit",
            amount: 1024
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 kilobit");
        test.done();
    },

    testUnitFormatWithoutScale2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "bit",
            amount: 1048576000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,048,576,000 bits");
        test.done();
    },

    testUnitFormatWithScale3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mcg",
            amount: 10000000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "10 grams");
        test.done();
    },

    testUnitFormatWithoutScale3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mcg",
            amount: 10000000
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "10,000,000 micrograms");
        test.done();
    },

    testUnitFormatWithMeasurementSystem3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mcg",
            amount: 10000000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={true} measurementSystem="metric" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "10 grams");
        test.done();
    },

    testUnitFormatWithScale4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 square kilometer");
        test.done();
    },

    testUnitFormatWithoutScale4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100 hectares");
        test.done();
    },

    testUnitFormatWithMeasurementSystem4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square meter",
            amount: 10000
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={true}
                    autoConvert={false}
                    measurementSystem="metric"
                    measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 hectare");
        test.done();
    },

    testUnitFormatWithScale5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "watt hour",
            amount: 10000
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "10 kilowatt-hours");
        test.done();
    },

    testUnitFormatWithoutScale5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 1233453
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,233,453 kilowatt-hours");
        test.done();
    },

    testUnitFormatWithMeasurementSystem5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 1233453
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={true}
                    autoConvert={false}
                    measurementSystem="metric"
                    measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.233453 gigawatt hours");
        test.done();
    },

    testUnitFormatWithScale6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/h",
            amount: 6000
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.666668 kilometers per second");
        test.done();
    },

    testUnitFormatWithoutScale6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/h",
            amount: 36
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "36 kilometers per hour");
        test.done();
    },

    testUnitFormatWithMeasurementSystem6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet/sec",
            amount: 10
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={true}
                    autoConvert={false}
                    measurementSystem="imperial"
                    measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "5.92484 knots");
        test.done();
    },

    testUnitFormatWithScale7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "ms",
            amount: 12000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "12 seconds");
        test.done();
    },

    testUnitFormatWithoutScale7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "ms",
            amount: 12000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "12,000 milliseconds");
        test.done();
    },

    testUnitFormatWithScale8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "Milliliter",
            amount: 1500
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.5 liters");
        test.done();
    },

    testUnitFormatWithoutScale8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "Milliliter",
            amount: 1500
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,500 milliliters");
        test.done();
    },

    testUnitFormatWithMeasurementSystem8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "ounce",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={true}
                    autoConvert={false}
                    measurementSystem="imperial"
                    measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "6.25 pounds");
        test.done();
    },

    testUnitFormatWithScale9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/liter",
            amount:5000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "5,000 kilometers per liter");
        test.done();
    },

    testUnitFormatWithScale10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "285.3 kelvins");
        test.done();
    },

    testUnitFormatWithScale11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "krunghoonfoop",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 krunghoonfoop");
        test.done();
    },
    // Area

    testUnitFormatArea1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 square centimeters");
        test.done();
    },

    testUnitFormatArea2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 квадратных сантиметра");
        test.done();
    },

    testUnitFormatArea3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 квадратных сантиметров");
        test.done();
    },

    testUnitFormatArea4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000제곱센티미터");
        test.done();
    },

    testUnitFormatArea5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 centimètres carrés");
        test.done();
    },

    testUnitFormatArea5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.000 Quadratzentimeter");
        test.done();
    },

    testUnitFormatArea6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "acre",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 acres");
        test.done();
    },

    testUnitFormatArea7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 квадратных сантиметра");
        test.done();
    },

    testUnitFormatArea8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 гектар");
        test.done();
    },

    testUnitFormatArea9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square yard",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000제곱야드");
        test.done();
    },

    testUnitFormatArea10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square yard",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 yards carrés");
        test.done();
    },

    // DigitalStorage
    testUnitFormatDigitalStorage1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 kilobytes");
        test.done();
    },

    testUnitFormatDigitalStorage2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 килобайта");
        test.done();
    },

    testUnitFormatDigitalStorage4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000킬로바이트");
        test.done();
    },

    testUnitFormatDigitalStorage5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 kilooctets");
        test.done();
    },

    testUnitFormatDigitalStorage5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoScale={false} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.000 Kilobytes");
        test.done();
    },

    testUnitFormatDigitalStorage6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gigabit",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 gigabits");
        test.done();
    },

    testUnitFormatDigitalStorage7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gigabit",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 гигабита");
        test.done();
    },

    testUnitFormatDigitalStorage8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "bit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 бит");
        test.done();
    },

    testUnitFormatDigitalStorage9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gigabit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000기가비트");
        test.done();
    },

    testUnitFormatDigitalStorage10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gigabit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 gigabits");;
        test.done();
    },


    testUnitFormatEnergy1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 joules");
        test.done();
    },

    testUnitFormatEnergy2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 джоуля");
        test.done();
    },

    testUnitFormatEnergy3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 килоджоуль");
        test.done();
    },

    testUnitFormatEnergy4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1킬로줄");
        test.done();
    },

    testUnitFormatEnergy5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 joules");
        test.done();
    },

    testUnitFormatEnergy6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 kWh");
        test.done();
    },

    testUnitFormatEnergy7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 киловатт-часа");
        test.done();
    },

    testUnitFormatEnergy8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "calorie",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 калорий");
        test.done();
    },

    testUnitFormatEnergy9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gigabit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000기가비트");
        test.done();
    },

    testUnitFormatEnergy10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "joule",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 kilojoules");;
        test.done();
    },


    testUnitFormatFuelConsumption1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/liter",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 kilometers per liter");
        test.done();
    },

    testUnitFormatFuelConsumption2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mpg",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 мили на галлон");
        test.done();
    },

    testUnitFormatFuelConsumption3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mpg",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "0,235215 л/100 км");
        test.done();
    },

    testUnitFormatFuelConsumption4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/liter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "리터당 1,000킬로미터");
        test.done();
    },

    testUnitFormatFuelConsumption5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mpg",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 miles par gallon");
        test.done();
    },

    testUnitFormatFuelConsumption5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mpg",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.000 Meilen pro Gallone");
        test.done();
    },

    testUnitFormatLength1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "inch",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 inches");
        test.done();
    },

    testUnitFormatLength2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "inch",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 дюйма");
        test.done();
    },

    testUnitFormatLength3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 км");
        test.done();
    },

    testUnitFormatLength4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1킬로미터");
        test.done();
    },

    testUnitFormatLength5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 mètres");
        test.done();
    },

    testUnitFormatLength5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1234.45
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.234,45 Meter");
        test.done();
    },

    testUnitFormatLength6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mile",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "3,21868 Mm");
        test.done();
    },

    testUnitFormatLength7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "mile",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 мили");
        test.done();
    },

    testUnitFormatLength8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 сантиметров");
        test.done();
    },

    testUnitFormatLength9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000센티미터");
        test.done();
    },

    testUnitFormatLength10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 centimètres");
        test.done();
    },

    testUnitFormatMass1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 micrograms");
        test.done();
    },

    testUnitFormatMass2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 микрограмма");
        test.done();
    },

    testUnitFormatMass3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 мг");
        test.done();
    },

    testUnitFormatMass4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1밀리그램");
        test.done();
    },

    testUnitFormatMass5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 microgrammes");
        test.done();
    },

    testUnitFormatMass6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "pound",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 000 lb");
        test.done();
    },

    testUnitFormatMass5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "microgram",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.000 Mikrogramm");
        test.done();
    },

    testUnitFormatMass6DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "pound",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2.000 lb");
        test.done();
    },

    testUnitFormatMass7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "stone",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 st");
        test.done();
    },

    testUnitFormatMass8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "metric ton",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 тонн");
        test.done();
    },

    testUnitFormatMass9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "metric ton",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000메트릭 톤");
        test.done();
    },

    testUnitFormatMass10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gram",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 kilogramme");
        test.done();
    },


    testUnitFormatSpeed1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilometer/hour",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 kilometers per hour");
        test.done();
    },

    testUnitFormatSpeed2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilometer/hour",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 километра в час");
        test.done();
    },

    testUnitFormatSpeed3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilometer/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "277,778 м/с");
        test.done();
    },

    testUnitFormatSpeed4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet/second",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "초당 1,000피트");
        test.done();
    },

    testUnitFormatSpeed5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 miles par heure");
        test.done();
    },

    testUnitFormatSpeed5DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.000 Meilen pro Stunde");
        test.done();
    },

    testUnitFormatSpeed6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meters/second",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 km/s");
        test.done();
    },

    testUnitFormatSpeed7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 мили в час");
        test.done();
    },

    testUnitFormatSpeed8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "knot",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 kn");
        test.done();
    },

    testUnitFormatSpeed9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "시속 1,000마일");
        test.done();
    },

    testUnitFormatSpeed10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "447,03924652 m/s");
        test.done();
    },

    testUnitFormatSpeed10DE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "miles/hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt locale="de-DE" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "447,03924652 m/s");
        test.done();
    },

    testUnitFormatTemperature1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "celsius",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 degrees Celsius");
        test.done();
    },

    testUnitFormatTemperature1a: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "celsius",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-AU"}}>
                <UnitFmt locale="en-AU" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 degrees Celsius");
        test.done();
    },

    testUnitFormatTemperature2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "Celsius",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2°C");
        test.done();
    },

    testUnitFormatTemperature3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "Celsius",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000градусов Цельсия");
        test.done();
    },

    testUnitFormatTemperature4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000켈빈");
        test.done();
    },

    testUnitFormatTemperature5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt locale="en-US" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kelvins");
        test.done();
    },

    testUnitFormatTemperature6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fahrenheit",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" maxFractionDigits={9} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 093,333333333 °C");
        test.done();
    },

    testUnitFormatTemperature7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fahrenheit",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2°F");
        test.done();
    },

    testUnitFormatTemperature8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 K");
        test.done();
    },

    testUnitFormatTemperature9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fahrenheit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "화씨 1,000도");
        test.done();
    },

    testUnitFormatTemperature10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "celsius",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 degrés Celsius");
        test.done();
    },

    testUnitFormatTime1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "nanosecond",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 nanoseconds");
        test.done();
    },

    testUnitFormatTime2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "nanoseconds",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 ns");
        test.done();
    },

    testUnitFormatTime3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "nanoseconds",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 мкс");
        test.done();
    },

    testUnitFormatTime4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "millisecond",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000밀리초");
        test.done();
    },

    testUnitFormatTime5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "millisecond",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 millisecondes");
        test.done();
    },

    testUnitFormatTime6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "week",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "3,83308 decades");
        test.done();
    },

    testUnitFormatTime7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "year",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 г.");
        test.done();
    },

    testUnitFormatTime8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "minute",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 мин");
        test.done();
    },

    testUnitFormatTime9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "minute",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000분");
        test.done();
    },

    testUnitFormatTime10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "month",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" length="long" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 mois");
        test.done();
    },

    testUnitFormatVolume1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "tsp",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 teaspoons");
        test.done();
    },

    testUnitFormatVolume2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "tsp",
            amount: 2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 tsp");
        test.done();
    },

    testUnitFormatVolume3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "ounce",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 унц.");
        test.done();
    },

    testUnitFormatVolume4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "millisecond",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000밀리초");
        test.done();
    },

    testUnitFormatVolume5: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "liter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 litres");
        test.done();
    },

    testUnitFormatVolume6: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "liter",
            amount: 2000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" autoConvert={true} autoScale={true} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "2 m³");
        test.done();
    },

    testUnitFormatVolume7: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gallon",
            amount: 1
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 галлон");
        test.done();
    },

    testUnitFormatVolume8: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "gallon",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ru-RU"}}>
                <UnitFmt locale="ru-RU" autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 гал.");
        test.done();
    },

    testUnitFormatVolume9: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cubic foot",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "ko-KR"}}>
                <UnitFmt locale="ko-KR" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000세제곱피트");
        test.done();
    },

    testUnitFormatVolume10: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cubic foot",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "28,3168 mètres cubes");
        test.done();
    },

    testUnitFormatVolume11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cubic foot",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 cubic feet");
        test.done();
    },

    testUnitFormatVolume12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cubic foot",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 ft³");
        test.done();
    },

    testUnitFormatArea11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 square centimeters");
        test.done();
    },

    testUnitFormatArea12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 cm²");
        test.done();
    },

    testUnitFormatDigitalStorage11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kilobytes");
        test.done();
    },

    testUnitFormatDigitalStorage12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kB");
        test.done();
    },

    testUnitFormatDigitalSpeed1: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte/h",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kilobytes per hour");
        test.done();
    },

    testUnitFormatDigitalSpeed2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilobyte/h",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kB/h");
        test.done();
    },

    testUnitFormatDigitalSpeed3: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "megabyte/s",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" length="long" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 mégaoctets par seconde");
        test.done();
    },

    testUnitFormatDigitalSpeed3short: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "megabyte/s",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "fr-FR"}}>
                <UnitFmt locale="fr-FR" length="short" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 000 Mo/s");
        test.done();
    },

    testUnitFormatDigitalSpeed4: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "megabyte/s",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-CN"}}>
                <UnitFmt locale="zh-Hans-CN" length="long" autoConvert={false} autoScale={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000兆字节/秒");
        test.done();
    },

    testUnitFormatEnergy11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kilowatt-hours");
        test.done();
    },

    testUnitFormatEnergy12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kWh");
        test.done();
    },

    testUnitFormatFuelConsumption11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/liter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kilometers per liter");
        test.done();
    },

    testUnitFormatFuelConsumption12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km/liter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 km/L");
        test.done();
    },
    testUnitFormatLength11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "decimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 decimeters");
        test.done();
    },

    testUnitFormatLength12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "decimeter",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 dm");
        test.done();
    },
    testUnitFormatSpeed11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilometer/second",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 kilometers per second");
        test.done();
    },

    testUnitFormatSpeed12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kilometer/second",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 km/s");
        test.done();
    },
    testUnitFormatTemperature11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fahrenheit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 degrees Fahrenheit");
        test.done();
    },

    testUnitFormatTemperature12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fahrenheit",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000°F");
        test.done();
    },
    testUnitFormatTime11: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "millisecond",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="long" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 milliseconds");
        test.done();
    },

    testUnitFormatTime12: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "millisecond",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt autoConvert={false} autoScale={false} length="short" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 ms");
        test.done();
    },

    testUnitFormatLength13: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km",
            amount: 12345000000000000000000000000.0
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    length="short"
                    autoConvert={false}
                    autoScale={false}
                    maxFractionDigits={3}
                    roundingMode="halfdown"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.2345e+28 km");
        test.done();
    },

    testUnitFormatLength14: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "km",
            amount: 1.7453
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    length="short"
                    autoConvert={false}
                    autoScale={false}
                    maxFractionDigits={2}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.75 km");
        test.done();
    },

    testUnitFormatLength15: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "m",
            amount: 1.74475
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoConvert={false}
                    autoScale={false}
                    maxFractionDigits={2}
                    roundingMode="up"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.75 meters");
        test.done();
    },

    testUnitFormatLength16: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "m",
            amount: 1.74475
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoConvert={false}
                    autoScale={false}
                    maxFractionDigits={2}
                    roundingMode="down"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.74 meters");
        test.done();
    },

    testUnitFormatLength17: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "m",
            amount: 1.74475
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoConvert={false}
                    autoScale={false}
                    minFractionDigits={3}
                    maxFractionDigits={3}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1.745 meters");
        test.done();
    },

    testUnitFormatUseNativeFalse: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "bn-IN"}}>
                <UnitFmt autoScale={false} locale="bn-IN" useNative={false} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 সেন্টিমিটার");
        test.done();
    },

    testUnitFormatUseNativeTrue: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "bn-IN"}}>
                <UnitFmt autoScale={false} locale="bn-IN" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "১,০০০ সেন্টিমিটার");
        test.done();
    },

    testUnitFormatUseNativeDefault: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "bn-IN"}}>
                <UnitFmt autoScale={false} locale="bn-IN" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "১,০০০ সেন্টিমিটার");
        test.done();
    },

    // Zh units


    testUnitFormatzhHansCN: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-CN"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-CN" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一,〇〇〇厘米");
        test.done();
    },

    testUnitFormatUseNativezhHansHK: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-HK" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000厘米");
        test.done();
    },


    testUnitFormatzhHansSG: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-SG"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-SG" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一,〇〇〇厘米");
        test.done();
    },

    testUnitFormatUseNativezhHansMO: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000厘米");
        test.done();
    },



    testUnitFormatzhHantHK: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-HK" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一,〇〇〇 厘米");
        test.done();
    },

    testUnitFormatUseNativezhHantMO: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 厘米");
        test.done();
    },


    testUnitFormatzhHantMY: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MY"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MY" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一,〇〇〇 公分");
        test.done();
    },

    testUnitFormatUseNativezhHantTW: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-TW"}}>
                <UnitFmt
                    autoScale={false}
                    locale="zh-Hant-TW"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 公分");
        test.done();
    },

    testUnitFormatUseNativezhHantUS: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "cm",
            amount: 1000
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-US"}}>
                <UnitFmt
                    autoScale={false}
                    autoConvert={false}
                    locale="zh-Hant-US"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,000 公分");
        test.done();
    },

    // Kelvin


    testUnitFormatzhHansCNKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
               unit: "kelvin",
               amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-CN"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-CN" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "二八五.三开尔文");
        test.done();
    },

    testUnitFormatUseNativezhHansHKKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-HK" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "285.3开氏度");
        test.done();
    },


    testUnitFormatzhHansSGKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-SG"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-SG" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "二八五.三开氏度");
        test.done();
    },

    testUnitFormatUseNativezhHansMOKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "285.3开氏度");
        test.done();
    },

    testUnitFormatzhHantHKKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-HK" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "二八五.三 開爾文");
        test.done();
    },

    testUnitFormatUseNativezhHantMOKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "285.3 開爾文");
        test.done();
    },


    testUnitFormatzhHantMYKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MY"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MY" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "二八五.三 克耳文");
        test.done();
    },

    testUnitFormatUseNativezhHantTWKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-TW"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-TW" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "285.3 克耳文");
        test.done();
    },

    testUnitFormatUseNativezhHantUSKelvin: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "kelvin",
            amount: 285.3
        });

        // should convert to fahrenheit because it's in the US
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    locale="zh-Hant-US"
                    maxFractionDigits={4}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "華氏 53.87 度");
        test.done();
    },

    // hectare

    testUnitFormatzhHansCNHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-CN"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-CN" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一〇〇公顷");
        test.done();
    },

    testUnitFormatzhHansHKHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-HK" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100公顷");
        test.done();
    },


    testUnitFormatzhHansSGHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-SG"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-SG" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一〇〇公顷");
        test.done();
    },

    testUnitFormatUseNativezhHansMOHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hans-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hans-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100公顷");
        test.done();
    },

    testUnitFormatzhHantHKHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-HK"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-HK" useNative={true} measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "一〇〇 公頃");
        test.done();
    },

    testUnitFormatUsezhHantMOHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MO"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MO" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100 公頃");
        test.done();
    },


    testUnitFormatUsezhHantMOHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-MY"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-MY" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100 公頃");
        test.done();
    },

    testUnitFormatUseNativezhHantTWHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "zh-Hant-TW"}}>
                <UnitFmt autoScale={false} locale="zh-Hant-TW" measure={m}/>
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100 公頃");
        test.done();
    },

    testUnitFormatUseNativezhHantUSHectare: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "hectare",
            amount: 100
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    autoConvert={false}
                    locale="zh-Hant-US"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "100 公頃");
        test.done();
    },

    testUnitFormatWithNumericStyleUS: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet",
            amount: 6.2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    style="numeric"
                    length="long"
                    locale="en-US"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "6.2 feet");
        test.done();
    },

    testUnitFormatWithListStyleUS: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet",
            amount: 6.2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    style="list"
                    length="long"
                    locale="en-US"
                    maxFractionDigits={4}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "6 feet 2.4 inches");
        test.done();
    },

    testUnitFormatWithNumericStyleUSshort: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet",
            amount: 6.2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    style="numeric"
                    length="short"
                    locale="en-US"
                    maxFractionDigits={4}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "6.2 ft");
        test.done();
    },

    testUnitFormatWithListStyleUSshort: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "feet",
            amount: 6.2
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={false}
                    style="list"
                    length="short"
                    locale="en-US"
                    maxFractionDigits={4}
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "6 ft 2.4 in");
        test.done();
    },

    testUnitFormatWithListStyleUS2: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "fluid ounces",
            amount: 143
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt
                    autoScale={true}
                    style="list"
                    length="long"
                    locale="en-US"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 gallon 1 cup 7 fluid ounces");
        test.done();
    },

    testUnitFormatWithNumericStyleDE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1.865
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt
                    autoScale={false}
                    style="numeric"
                    length="long"
                    locale="de-DE"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,865 Meter");
        test.done();
    },

    testUnitFormatWithListStyleDE: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1.865
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt
                    autoScale={false}
                    style="list"
                    length="long"
                    locale="de-DE"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 Meter, 8 Dezimeter, 6 Zentimeter und 5 Millimeter");
        test.done();
    },

    testUnitFormatWithNumericStyleDEshort: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1.865
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt
                    autoScale={false}
                    style="numeric"
                    length="short"
                    locale="de-DE"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1,865 m");
        test.done();
    },

    testUnitFormatWithListStyleDEshort: test => {
        test.expect(1);
        var m = MeasurementFactory({
            unit: "meter",
            amount: 1.865
        });

        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "de-DE"}}>
                <UnitFmt
                    autoScale={false}
                    style="list"
                    length="short"
                    locale="de-DE"
                    measure={m}
                />
            </LocaleContext.Provider>
        );

        test.equal(wrapper.text(), "1 m, 8 dm, 6 cm und 5 mm");
        test.done();
    },

    testUnitFormatWithWrapperTag: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt wrapper={<span/>} autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r277768735">3 kilometers</span>');
        test.done();
    },

    testUnitFormatWithWrapperTagAndId: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt wrapper={<span/>} id="foobar" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="foobar">3 kilometers</span>');
        test.done();
    },

    testUnitFormatWithWrapperTagAndClass: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt wrapper={<span/>} className="distance" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="r277768735" class="distance">3 kilometers</span>');
        test.done();
    },

    testUnitFormatWithWrapperTagAndIdAndClass: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <UnitFmt wrapper={<span/>} id="asdf" className="distance" autoConvert={false} measure={m}/>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span id="asdf" class="distance">3 kilometers</span>');
        test.done();
    },

    testUnitFormatWithWrapperNoTagAndClass: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <span><UnitFmt className="distance" autoConvert={false} measure={m}/></span>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span>3 kilometers</span>');
        test.done();
    },

    testUnitFormatWithWrapperNoTagAndId: test => {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        const wrapper = mount(
            <LocaleContext.Provider value={{locale: "en-US"}}>
                <span><UnitFmt id="asdf" className="distance" autoConvert={false} measure={m}/></span>
            </LocaleContext.Provider>
        );

        let span = wrapper.find('span');
        test.equal(span.html(), '<span>3 kilometers</span>');
        test.done();
    }
};
