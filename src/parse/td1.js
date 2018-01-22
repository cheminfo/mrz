'use strict';

const getResult = require('./getResult');
const { TD1 } = require('../formats');
const TD1Fields = require('./td1Fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line, index) => {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}. Must be 30 for TD1`
      );
    }
  });
  return getResult(TD1, lines, TD1Fields);
};
