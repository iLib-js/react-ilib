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

# Input Components

TBD

# Localization Components

## LocaleContext

## LocaleDataProvider

## Translate, Plural, and Variable

```
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

    <Variable
        id="string"
        description="string"
        value={any}
        wrapper={null}
        className="string">
```

Translate a string using iLib's ResBundle class. The string to translate appears
in the body of the component, and may contain HTML or other components in the
middle of it. If the string contains HTML or subcomponents, then they will be
replaced into the appropriate spot in the translated string before the final
output is generated.

It is highly recommended that entire sentences and phrases are
wrapped with a Translate component, rather than individual snippets of text
because it is difficult for the translators to know the grammatical context
for those little snippets. Whole sentences and phrases are much easier to
translate properly and produce much higher quality products.

It is also highly recommended that engineers fill out the description prop
for every string. The value of this prop is sent along with the string to the
translators, and should contain a description of how the string is used in
the UI and what the intent was. It should also give grammatical hints.

Examples of good descriptions:

* "'Free' refers to no cost, rather than available."
* "This is used as a command on a button label, not as an adjective in a description."

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

Variable components are placeholders for variables that will be substituted
back into the string after the translated string is retrieved. They render
the value of their value prop into the string.


### Translate Props

* <i>id</i> - the explicit unique id of this string. If not given, an id
is generated based on the string to translate
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

### Variable Props

* <i>id</i> - (req) the explicit unique id of this variable.
* <i>description</i> - a description of this variable to give more context
to the translators so that they can do a better job of translating. This
prop is optional, but highly recommended for all variables
* <i>wrapper</i> - the HTML tag ot use to wrap the output. Use null
for no wrapper. Default: a &lt;span&gt; tag
* <i>className</i> - the CSS classes to put on the HTML wrapper tag
* <i>value</i> - the value to substitute into the translated string
where this variable appears

### Examples

Simple Example:

```
    <div class="mainbody fxcs">
        <Header><Translate>Files to Upload</Translate></Header>
    </div>
```

Example with a placeholder variable:

```
    <div class="mainbody fxcs">
        <Translate values={{num: fileCache.cntReady}}>
            Number of files in cache: <Variable id="num"/>
        </Translate>
    </div>
```

Example with plurals:

```
    <div class="mainbody fxcs">
        <Translate count={fileCache.cntReady}>
            <Plural category="one">There is <Variable id="count"/> file in the cache.</Plural>
            <Plural category="other">There are <Variable id="count"/> files in the cache.</Plural>
        </Translate>
    </div>
```

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
