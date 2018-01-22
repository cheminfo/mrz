'use strict';

var check = require('./check');

module.exports = function parseCompositeCheckDigit(checkDigit, ...sources) {
  const source = sources.join('');
  check(source, checkDigit);
  return checkDigit;
};
