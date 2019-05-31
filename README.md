# React-ilib - iLib Wrapper Components

React-ilib is a library of React components that wrap ilib classes to make it easy to use iLib within React apps.

There are two types of components in this library:

1. Formatter components. These use the ilib formatter classes to format various things locale-sensitively.

1. Input components. Components that implement various locale-sensitive widgets that allow users to input
locale-sensitive information. These use the ilib formatter classes to glean information about the fields required
to create a set of HTML form input elements.

This library will eventually cover all of the ilib formatter classes, but currently it is in development, and
it does not cover them all yet.

# Formatter Components

## Address Formatter

The address formatter component is called `AddressFmt`.

```
import AddressFmt from 'react-ilib/src/AddressFmt';

<AddressFmt
    address={Address}
    separator={<br/>}
    locale="string"
    wrapper={<span/>}
    className="string"
    id="string"
    style="string">
```

Format an iLib Address as a string. Props can contain:

* <i>address</i> - an iLib Address instance (or something that has the same fields)
* <i>separator</i> - the HTML tag to use to separate lines of the formatted address. Default: a &lt;br&gt; tag
* <i>locale</i> - the locale to use for this formatter in BCP-47 format
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>id</i> - the unique id to put on the HTML wrapper tag
* <i>style</i> - The value of the style argument passed to the iLib AddressFmt constructor. This
  gives the style of the formatter: "default" for the default style, and "nocountry" for
  domestic addresses.

## List Formatter

The list formatting component is called `ListFmt`.

```
import ListFmt from 'react-ilib/src/ListFmt';

<ListFmt
    list={Array.<string>}
    locale="string"
    wrapper={<span/>}
    className="string"
    id="string"
    length="string"
    style="string">
```

Format an array of strings as a list. Props can contain:

* <i>list</i> - an array of string to format as a list
* <i>locale</i> - the locale to use for this formatter in BCP-47 format
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>id</i> - the unique id to put on the HTML wrapper tag
* <i>length</i> - the length parameter to pass to the iLib list formatter constructor. This can be one of
  "short", "medium", "long", or "full"
* <i>style</i> - The value of the style argument passed to the iLib ListFmt constructor. The style
  parameter can be "standard" for regular, grammatical text, and "units" for a list of measurements.
  eg. "1 foot 3 inches"

## Unit Formatter

The unit formatting component is called `UnitFmt`. This formats that sizes of various measurements such as length,
mass, digital storage size, etc.

```
import UnitFmt from 'react-ilib/src/UnitFmt';

<UnitFmt
    measure={Measurement}
    locale="string"
    wrapper={<span/>}
    className="string"
    id="string"
    length="string"
    style="string"
    autoScale={boolean}
    autoConvert={boolean}
    usage="string"
    maxFractionDigits={number}
    minFractionDigits={number}
    significantDigits={number}
    roundingMode="string"
```

Format an ilib Measurement as a string. Props can contain:

* <i>measure</i> - an instance of an ilib Measurement class. Use the ilib MeasurementFactory factory method to create a new one.
* <i>locale</i> - the locale to use for this formatter in BCP-47 format
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>id</i> - the unique id to put on the HTML wrapper tag
* <i>length</i> - the length parameter to pass to the iLib unit formatter constructor. This can be one of
  "short", "medium", "long", or "full"
* <i>style</i> - The value of the style argument passed to the iLib ListFmt constructor. The style
  parameter can be "numeric" for a measure with decimals (eg. 5.25 lbs), or "list" for a list of measurements successively
  smaller units. (eg. 5 lbs 4 oz)
* <i>autoScale</i> - Automatically scale to the largest whole unit that contains the measure. (eg. 1000g => 1kg)
* <i>autoConvert</i> - Automatically convert the measure to the appropriate measurement system for the locale. (eg. 10kg -> 22 lbs)
* <i>usage</i> - Tell the formatter what type of item it is being used to format. This will automatically pick the appropriate settings
  and units that are customarily used to measure that type of item, even if they are not the most efficient ones. For example, height of
  a person in the US is typically given at "feet and inches" instead of the more efficient yards. In Europe, the height of a person is
  often given in centimeters instead of the more appropriate meters. Likewise, there are many other types of items that are commonly
  formatted with units that are not optimal.
* <i>maxFractionDigits</i> - the maximum number of digits that should appear in the
  formatted output after the decimal. A value of -1 means unlimited, and 0 means only print
  the integral part of the number.
* <i>minFractionDigits</i> - the minimum number of fractional digits that should
  appear in the formatted output. If the number does not have enough fractional digits
  to reach this minimum, the number will be zero-padded at the end to get to the limit.
* <i>significantDigits</i> - the number of significant digits that should appear
  in the formatted output. If the given number is less than 1, this option will be ignored.
* <i>roundingMode</i> - When the maxFractionDigits or maxIntegerDigits is specified,
  this property governs how the least significant digits are rounded to conform to that
  maximum. The value of this property is a string with one of the following values:
    * <i>up</i> - round away from zero
    * <i>down</i> - round towards zero. This has the effect of truncating the number
    * <i>ceiling</i> - round towards positive infinity
    * <i>floor</i> - round towards negative infinity
    * <i>halfup</i> - round towards nearest neighbour. If equidistant, round up.
    * <i>halfdown</i> - round towards nearest neighbour. If equidistant, round down.
    * <i>halfeven</i> - round towards nearest neighbour. If equidistant, round towards the even neighbour
    * <i>halfodd</i> - round towards nearest neighbour. If equidistant, round towards the odd neighbour
  Default if this is not specified is "halfup".

An example of using this component to format a measurement:

```
import MeasurementFactory from 'ilib-es6/src/MeasurementFactory';
import UnitFmt from 'react-ilib/src/UnitFmt';

let m = MeasurementFactory({
    measure: 24,
    unit: "mph"
});

// this will convert to metric for Germany and format as a vehicle speed
let str = (<span>Die Geschwindigkeit des Autos ist <UnitFmt locale="de-DE" measure={m} autoScale={true} autoConvert={true} usage="vehicleSpeed"/>.</span>);

// str is now "<span>Die Geschwindigkeit des Autos ist 39 Kilometer pro Stunde.</span>"
```

# Input Components

TBD

# Copyright and License

Copyright &copy; 2018-2019, JEDLSoft

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.
