'use strict';

const { MRVB } = require('../formats');

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const mrvbFields = require('./mrvbFields');

module.exports = function parseMRVA(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${MRVB}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for MRVB`,
      );
    }
  });
  return getResult(MRVB, lines, mrvbFields);
};
