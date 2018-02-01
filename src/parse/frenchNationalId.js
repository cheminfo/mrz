'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { FRENCH_NATIONAL_ID } = require('../formats');
const frenchNationalIdFields = require('./frenchNationalIdFields');

module.exports = function parseFrenchNationalId(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${
        lines.length
      }: Must be 2 for ${FRENCH_NATIONAL_ID}`
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for ${FRENCH_NATIONAL_ID}`
      );
    }
  });
  return getResult(FRENCH_NATIONAL_ID, lines, frenchNationalIdFields);
};
