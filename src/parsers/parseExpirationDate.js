'use strict';

var parseDate = require('./parseDate');

module.exports = function parseExpirationDate(value, checkDigit) {
  var result = parseDate(value, checkDigit);
  result.label = 'Expiration date';
  return result;
};
