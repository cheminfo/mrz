'use strict';

var check = require('./check');
const cleanText = require('./cleanText');

module.exports = function parseDocumentNumberCheckDigit(
  checkDigit,
  source,
  optional
) {
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    source = `${source}<${optional.substring(0, optional.length - 1)}`;
    checkDigit = optional.charAt(optional.length - 1);
    check(source, checkDigit);
    return {
      value: checkDigit,
      start: optional.length,
      end: optional.length + 1
    };
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
};
