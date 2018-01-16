'use strict';

var parseCountry = require('./parseCountry');

module.exports = function parseIssuingCountry(value) {
  var result = parseCountry(value);
  result.label = 'Nationality';
  return result;
};
