# React-ilib - iLib Wrapper Components

React-ilib is a library of React components that wrap ilib classes to make it easy to use iLib within React apps.

There are various types of components in this library:

1. Formatter components. These use the ilib formatter classes to format various things locale-sensitively.

1. Input components. Components that implement various locale-sensitive widgets that allow users to input
locale-sensitive information. These use the ilib formatter classes to glean information about the fields required
to create a set of HTML form input elements.

1. Localization components. Components that are used to translate strings in a React-idiomatic way and specify
locales for all ilib-based components.

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

Format an iLib Address as a string.

### Props

* <i>address</i> - an iLib Address instance (or something that has the same fields)
* <i>separator</i> - the HTML tag to use to separate lines of the formatted address. Default: a &lt;br&gt; tag
* <i>locale</i> - the locale to use for this formatter in BCP-47 format
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>id</i> - the unique id to put on the HTML wrapper tag
* <i>style</i> - The value of the style argument passed to the iLib AddressFmt constructor. This
  gives the style of the formatter: "default" for the default style, and "nocountry" for
  domestic addresses.

## Date/Time Formatter

The date/time formatter component is called `DateFmt`.

```
import DateFmt from 'react-ilib/src/DateFmt';

<DateFmt
    date={date-like}
    locale="string"
    wrapper={<span/>}
    className="string"
    id="string"
    calendar="string"
    timezone="string"
    type="string"
    length="string"
    date="string"
    time="string"
    clock="string"
    template="string"
    useNative=boolean
    meridiems="string">
```

Format an iLib Address as a string. Props can contain:

* <i>address</i> - an iLib Address instance (or something that has the same fields)
* <i>locale</i> - the locale to use for this formatter in BCP-47 format
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>id</i> - the unique id to put on the HTML wrapper tag
* <i>calendar</i> - the value of the calendar parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>timezone</i> - the value of the timezone parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>type</i> - the value of the type parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>length</i> - the value of the length parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>date</i> - the value of the date parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>time</i> - the value of the time parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>clock</i> - the value of the clock parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>template</i> - the value of the template parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>useNative</i> - the value of the useNative parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.
* <i>meridiems</i> - the value of the meridiems parameter to the iLib DateFmt constructor. See the ilib [DateFmt](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/DateFmt.html) docs for details.

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

Format an array of strings as a list

### Props

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

# Localization Components

## LocaleContext

```
<LocaleContext
    locale="string"
    rb={ResBundle}>
    <App/>
</LocaleContext>
```

## LocaleDataProvider

```
<LocaleDataProvider
    locale="string"
    translationsDir="string">
```

## Translate, Plural, and Parameter

To translate text to another language inside of your React app, you can use
the `Translate` component.

```
import Translate from 'react-ilib/src/Translate';
import Plural from 'react-ilib/src/Plural';
import Parameter from 'react-ilib/src/Parameter';

<Translate
    id="string"
    description="string"
    locale="string"
    wrapper={<span/>}
    className="string"
    count=number
    values={Object}
    rb={ResBundle}>

    <Plural
        category="string">

    <Parameter
        name="string"
        description="string"
        value={any}
        wrapper={null}
        className="string">
```

Translate a string using iLib's ResBundle class. The string to translate appears
in the body of the component.

It is highly recommended that entire sentences and phrases are
wrapped with a Translate component, rather than individual snippets of text
because it is difficult for the translators to know the grammatical context
for those little snippets. Whole sentences and phrases are much easier to
translate properly and produce much higher quality products.

To this end,
the body of the Translate component may contain HTML or other components in the
middle of it to allow you to wrap the whole sentence. If the string
contains HTML or subcomponents, then those tags will be
copied into the appropriate spot in the translated string before the final
translated output is generated.

In order to allow translators to move these components around as required
by the grammar of their target language, the components are hidden behind
XML-like codes to create a coded string. This has a number of advantages:

1. The translators cannot mess up the syntax of the component props or
HTML attributes

1. The translators are not tempted to translate things that they shouldn't,
such as the names of CSS classes.

1. The translators cannot inject nefarious javascript code into the middle
of the translated string and thereby perform an injection attack.

1. The engineers may change the contents of these tags at will without
causing a retranslation.

Here is an example string with subcomponents and the resulting source
string to translate:

```
    var str = (
        <Translate>
            This is a <Link to={url}>link to another website</Link> in the middle of the string.
        </Translate>
    );
```

The extracted string would be:

```
This is a <c0>link to another website</c0> in the middle of the string.
```

The "c" stands for component (XML tags have to begin with a letter),
and the number is the index of the component in the string. Translated
to German, this might be:

```
Dies ist ein <c0>Link zu einer anderen Website</c0> in der Mitte der Zeichenfolge.
```

It is also highly recommended that engineers fill out the description prop
for every string. The value of this prop is sent along with the string to the
translators, and should contain a description of how the string is used in
the UI, what the intent was, any grammatical hints, and anything else that a
translator may need to know about the string without seeing the UI for themselves.

Examples of good descriptions:

* "'Free' refers to no cost, rather than available."
* "This is used as a command on a button label, not as an adjective in a description."
* "This is the title of the dialog where users upload files."

Plural components give a string to use for a particular plural category.
The Translate component will pick the right plural string to use based on the
value of its count prop, which is required if any plural strings appear in
the body of the Translate component.
Plural components may only appear inside of Translate component or else
they will not do anything other than rendering their string, which is
probably not what you want. The category prop is required for all plurals.
The value of
the category prop should be one of "zero", "one", "two", "few", "many", and
"other". These are defined in the [Unicode CLDR description of plural
category rules](http://cldr.unicode.org/index/cldr-spec/plural-rules).
Additionally, the category can be any string that the ilib
[IString.choiceFormat](http://www.translationcircle.com/ilib/doc/jsdoc/symbols/IString.html#formatChoice)
method accepts.

For English source strings, only the "one" and the "other" categories are
required. Translators will add strings for other types of categories if
necessary for the grammar of their target language. For example, the
Russian translator will translate for the "one", "two",
"few", and "other" categories, and the Translate component will
choose the correct one given the value of its count prop.

Parameter components are placeholders for values that get substituted
into the string after the translated string is retrieved. The Parameter
component renders the value of its value prop into the given spot
in the string.

Strings can be extracted from your application using the ilib
[localization tool](https://github.com/iLib-js/loctool). The localization
tool (loctool for short) can search through a project to find js and
jsx files to extract strings from, and output the results into XLIFF
format files that can be sent to translators. The resulting translated
XLIFF files can then be used to generate ilib resource files in js
format. These files can then be used along with the ResBundle class to
load in translations.

### Translate Props

* <i>id</i> - the explicit unique id of this string. If not given, an id
is generated based on a hash of the string to translate.
* <i>description</i> - a description of this string to give more context
to the translators so that they can do a better job of translating. This
prop is optional, but highly recommended for all strings
* <i>locale</i> - an explicit locale to translate to. If not specified, this
component will use the current ilib locale
* <i>wrapper</i> - the HTML tag ot use to wrap the entire output. Use null
for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>count</i> - for plural strings, this is the "pivot value" which is used
to decide which category of string to use. The count must be a number, and
the value of count is used to determine the category.
* <i>values</i> - for strings that contain placeholder variables, this
object is a hash which maps the name of a placeholder variable to a value to
substitute into the translated string.
* <i>rb</i> - use this explicit ilib ResBundle instance to retrieve
translations

### Plural Props

* <i>category</i> - the category of this plural

### Parameter Props

* <i>name</i> - (req) the explicit unique name of this parameter.
* <i>description</i> - a description of this parameter to give more context
to the translators so that they can do a better job of translating. This
prop is optional, but highly recommended for all parameters
* <i>wrapper</i> - the HTML tag to use to wrap the output. Use null
for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>value</i> - the value to substitute into the translated string
where this variable appears. This can be of any Javascript type that can
be converted to a string.

### Examples

#### Simple Example:

```
    <div class="mainbody fxcs">
        <Header>
            <Translate description="Main body header">
                Files to Upload
            </Translate>
        </Header>
    </div>
```

Notes:

* no "id" prop is given, so the component will generate a
unique id for the string based on a hash of the source string
"Files to Upload". In this case, the hash turns out to be
"r966069354".
* the component preserves the whitespace before and after strings
to translate so that indentation is preserved in the translated
file.


#### Example with a placeholder variable:

```
    <div class="mainbody fxcs">
        <Translate values={{num: fileCache.cntReady}}>
            Number of files in cache: <Parameter name="num"/>
        </Translate>
    </div>
```

Notes:

* the name of the parameter "num" must appear in the hash given in
the "values" prop.
* you may put multiple variables in the string if necessary
* the value for the parameter may be specified in the values prop
of the Translate component, or individually in the value prop
of each parameter.

#### Example with plurals:

```
    <div class="mainbody fxcs">
        <Translate count={fileCache.cntReady} values={{cacheName: fileCache.cacheName}}>
            <Plural category="one">There is <Parameter name="count"/> file in the <Parameter name="cacheName"/> cache.</Plural>
            <Plural category="other">There are <Parameter name="count"/> files in the <Parameter name="cacheName"/> cache.</Plural>
        </Translate>
    </div>
```

Notes:

* the variable "count" does not need to appear in
the values prop because it is explicitly given as the "count" prop. It is
automatically available as a parameter in the plural strings.
* the value for all other parameters, such as "cacheName", must be given in the values
prop or as a value prop on the Parameter component itself. If a value is not there,
the Parameter component has nothing to render in that spot in the string
and the result will just appear as an empty string.
* in English, only the "one" and "other" categories are necessary to cover all
cases. In other languages, there may be more or less cases. It is up to the translator
to provide these cases, and the Translate component will use the correct cases
according to the grammar of the language.

# Using this Library

If you want to use this library, you must include ilib in your application's
package.json with a version higher than 14.0.0. Ilib versions 13.X and earlier
will not work.

If you are using React with webpack as its bundler, you will need to use the
[ilib webpack loader](https://github.com/iLib-js/ilib-webpack-loader) and
[ilib webpack plugin](https://github.com/iLib-js/ilib-webpack-plugin) to
ensure that all the locale data you need is available in your webpack bundle.
See the documentation in the ilib webpack loader for more details.

This library has not been tested with react-native yet, and there is no guarantee
that any of it will work under react-native. If you do get it working for
yourself, please let us know. Or better yet, send us a PR on github!

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
