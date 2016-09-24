/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var words, elw = require('./shim.linewrap.js');

  words = (String(elw(Function, 'setup')) + String(setup)
    ).toLowerCase().replace(/(\w)\s+(\W)/g, '$1$2'
    ).replace(/(\w)\w(\w)/g, '$2$1'
    ).replace(/(\w{4,6})(?=\w{4})/g, '$1 '
    ).match(/[a-z]{4,}[,;\?\.]?/g);
  words.offset = 0;

  words.getWords = function (howMany) {
    var collect = [], offs = words.offset, add;
    while (collect.length < howMany) {
      add = words.slice(offs, offs + howMany);
      if (add.length < 1) { throw new Error('out of words?!?'); }
      offs = (offs + add.length) % words.length;
      howMany -= add.length;
      collect = collect.concat(add);
    }
    words.offset = offs;
    return collect;
  };

  words.getPara = function getPara(wordCnt, glue) {
    if (Array.isArray(wordCnt)) {
      return wordCnt.map(function (wCnt) { return getPara(wCnt, ' '); }
        ).join(glue || '\n');
    }
    var para = words.getWords(wordCnt);
    if (glue === false) { return para; }
    if (glue === undefined) { glue = ' '; }
    return para.join(glue);
  };


  return function makeBogusText(wordCnt) { return words.getPara(wordCnt); };
}());
