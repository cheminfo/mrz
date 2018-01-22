'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { SWISS_DRIVING_LICENSE } = require('../formats');
const swissDrivingLicenseFields = require('./swissDrivingLicenseFields');

module.exports = function parseSwissDrivingLicense(lines) {
  lines = checkLines(lines);
  if (lines[0].length !== 9) {
    throw new Error(
      `invalid number of characters for line 1. Must be 9 for ${SWISS_DRIVING_LICENSE}`
    );
  }
  if (lines[1].length !== 30) {
    throw new Error(
      `invalid number of characters for line 2. Must be 30 for ${SWISS_DRIVING_LICENSE}`
    );
  }

  if (lines[2].length !== 30) {
    throw new Error(
      `invalid number of characters for line 3. Must be 30 for ${SWISS_DRIVING_LICENSE}`
    );
  }
  return getResult(SWISS_DRIVING_LICENSE, lines, swissDrivingLicenseFields);
};
