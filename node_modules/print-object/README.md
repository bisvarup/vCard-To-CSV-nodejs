# print-object [![Build Status](https://travis-ci.org/radiovisual/print-object.svg)](https://travis-ci.org/radiovisual/print-object)

> Pretty-print an object's keys and values to a string or HTML.

Supports the printing of embedded objects and arrays. 


## Installation
```
$ npm install --save print-object
```

## Usage

### Print to plain-text
```js
var printObject = require('print-object');

var myObj = { "one": 1, "two": 2, "three": 3, "four": {a:1, b:2}, five: ["six", "seven"]  };

printObject(myObj);
```

Output:
```
one: 1
two: 2
three: 3
four: 
    a: 1
    b: 2
five: six,seven
```

### Print to HTML

```js
var printObject = require('print-object');

var myObj = { "one": 1, "two": 2, "three": 3, "four": {a:1, b:2}, five: ["six", "seven"]  };

printObject(myObj, {html:true});
```

Output *(Formatting added for readability)*:
```
<table>
  <tr>
    <td>one</td>
    <td>1</td>
  </tr>
  <tr>
    <td>two</td>
    <td>2</td>
  </tr>
  <tr>
    <td>three</td>
    <td>3</td>
  </tr>
  <tr>
    <td>four</td>
    <td>a: 1<br>b: 2<br></td>
  </tr>
  <tr>
    <td>five</td>
    <td>six,seven</td>
  </tr>
</table>
```

## API

### printObject(object, [options])

#### object

- Type: `object`
- The object you want to print
- required

#### options

- Type: `object`
- Pass options to the print function

##### `html`
  - Type: `Boolean`
  - Prints to HTML
  - default: `false`
    
##### `attr`
- Type: `String`
- The attribute string you want to assign to the html
- Use this to pass your own id, class, style, data-, etc.
    
##### `class`
- Type: `String`
- Shortcut for adding your own class name to the top-level HTML element
    
    




## License 

MIT @ [Michael Wuergler](http://numetriclabs.com)


 
 