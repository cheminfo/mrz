'use strict';

const { MRVA } = require('../formats');

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const mrvaFields = require('./mrvaFields');

module.exports = function parseMRVA(lines) {
  lines = checkLines(lines);
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${MRVA}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 44 for MRVA`,
      );
    }
  });
  return getResult(MRVA, lines, mrvaFields);
};
