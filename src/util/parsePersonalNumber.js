'use strict';

var parseText = require('./parseText');
var check = require('./check');

module.exports = function parseExpirationDate(value, checkDigit) {
  var result = parseText('Personal number', value, /^[A-Z0-9<]+<*$/);
  if (checkDigit && !check(value, checkDigit)) {
    result.error.push(`Check digit "${checkDigit}" not valid`);
  }
  return result;
};
