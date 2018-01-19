'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');

const TD1Fields = require('./td1Fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line, index) => {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}. Must be 30 for TD1`
      );
    }
  });
  const result = {
    format: 'TD1',
    annotations: getAnnotations(lines, TD1Fields)
  };

  completeResult(result);
  return result;
};
