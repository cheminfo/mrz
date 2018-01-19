'use strict';

const parseCountry = require('../parseCountry');

module.exports = function parseIssuingCountry(source) {
  if (source !== 'CHE' && source !== 'LIE') {
    throw new Error(`invalid country code: ${source}. Must be CHE or LIE`);
  }
  return parseCountry(source);
};
