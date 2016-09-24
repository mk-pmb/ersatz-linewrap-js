/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

//+
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
//-
