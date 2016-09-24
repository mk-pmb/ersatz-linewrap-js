
<!--#echo json="package.json" key="name" underline="=" -->
ersatz-linewrap
===============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
It somehow wraps lines at about some width.
<!--/#echo -->


Usage
-----

<!--#include file="usage.js" start="//+" stop="//-" code="javascript" -->
<!--#verbatim lncnt="19" -->
```javascript
var lineWrap = require('ersatz-linewrap'), wrapOpts, text,
  bogusWords = require('ersatz-linewrap/makebogustext');

text = bogusWords(30) +
  '\n    ' + bogusWords(20) +
  '\n' + bogusWords(20);
console.log(lineWrap(text));

console.log('__________\n');

wrapOpts = {
  width: 60,
  hyphen: '<',
  indent: '  >',
  afterWrapped: '¶\n',
};
console.log(lineWrap(text, wrapOpts));
```
<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
