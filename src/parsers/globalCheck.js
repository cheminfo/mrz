'use strict';

var check = require('./check');

module.exports = function globalCheck(checkDigit, ...sources) {
  const source = sources.join('');
  if (!check(source, checkDigit)) {
    throw new Error('global check digit');
  }
  return checkDigit;
};
