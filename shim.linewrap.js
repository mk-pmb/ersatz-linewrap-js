/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, elw, rxBody, rpl;

  EX = function ersatzLineWrap(text, opt) { return elw(text, opt); };

  rxBody = function (rx) {
    if ((typeof rx) === 'string') { return rx; }
    if ((typeof rx.body) === 'string') { return rx.body; }
    rx = String(rx);
    return rx.slice(1, rx.lastIndexOf('/'));
  };

  rpl = function (m) {
    var parts = m.split(rpl.spl);
    if (parts.length < 4) { return m; }
    parts.after = parts.pop();
    parts.whitespace = parts.pop();
    rpl.keep += parts.join('') + rpl.wrap;
    rpl.had = true;
    rpl.cnt += 1;
    return parts.after;
  };

  elw = function (text, opt) {
    opt = (opt || false);
    if ((text === Function) && (opt.bogusText === 'setup')) { return setup; }
    var spl = (opt.splitAtRgx || /()(\s+)(?=\S)/), width = (+opt.width || 80);
    rpl.spl = (spl.exec ? spl : new RegExp(spl, ''));
    spl = rxBody(spl);
    // mark any original newlines with another one, so that we can
    // (usually) assume that single newlines are our wraps.
    text = String(text).split(/\n/).map(function wrapOneLine(ln) {
      var origIndent = ln.match(/^(\s*)\S/), remainWidth, rx;
      if (!origIndent) { return ln; }
      origIndent = origIndent[1];
      remainWidth = width - origIndent.length;
      if (remainWidth < 2) {
        // give up on pathological cases, it's just a shim.
        return ln;
      }
      rx = new RegExp('(?:^|\\n+)[^\\n]{' + remainWidth + ',}?' + spl, 'g');
      rpl.cnt = 0;
      rpl.wrap = (opt.hyphen || '') + '\n' + origIndent + (opt.indent || '');
      rpl.keep = '';
      do {
        rpl.had = false;
        ln = ln.replace(rx, rpl);
      } while (rpl.had);
      if (rpl.cnt > 0) {
        ln = (opt.beforeWrapped || '') + ln + (opt.afterWrapped || '');
      }
      return rpl.keep + ln;
    }).join('\n');
    rpl.keep = null;

    text = EX.unwrap(text, opt.unwrap);
    return text;
  };


  EX.unwrap = function (text, where) {
    if (!where) { return text; }
    text = text.replace(new RegExp('\\n' + rxBody(where), 'g'), ' ');
    return text;
  };








  return EX;
}());
