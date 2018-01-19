'use strict';

const COUNTRIES = require('../generated/countries');

module.exports = function parseCountry(source) {
  var country = COUNTRIES[source];
  if (!country) {
    throw new Error('the country does not exist');
  }
  return country;
};
