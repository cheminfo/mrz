'use strict';

var check = require('./check');
const cleanText = require('./cleanText');

module.exports = function (checkDigit, source, optional) {
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    source = `${source}<${optional.substring(0, optional.length - 1)}`;
    checkDigit = optional.charAt(optional.length - 1);
  }

  if (!check(source, checkDigit)) {
    throw new Error(`document number check digit "${checkDigit}" not valid`);
  }
  return checkDigit;
};
