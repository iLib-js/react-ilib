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

# Input Components

TBD