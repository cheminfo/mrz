'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { TD2 } = require('../formats');
const TD2Fields = require('./td2Fields');

module.exports = function parseTD2(lines) {
  lines = checkLines(lines);
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}. Must be 36 for TD2`
      );
    }
  });
  return getResult(TD2, lines, TD2Fields);
};
