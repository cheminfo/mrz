'use strict';

const { getResult } = require('./fieldHelper');
const { SWISS_DRIVING_LICENSE } = require('../formats');
const PCCFields = require('./pccFields');

module.exports = function (lines) {
  if (lines[0].length !== 9) {
    throw new Error(
      'invalid number of characters for line 1. Must be 9 for Swiss Driving License'
    );
  }
  if (lines[1].length !== 30) {
    throw new Error(
      'invalid number of characters for line 2. Must be 30 for Swiss Driving License'
    );
  }

  if (lines[2].length !== 30) {
    throw new Error(
      'invalid number of characters for line 3. Must be 30 for Swiss Driving License'
    );
  }
  return getResult(SWISS_DRIVING_LICENSE, lines, PCCFields);
};
