'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');
const TD2Fields = require('./td2Fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}. Must be 36 for TD2`
      );
    }
  });
  const result = {
    format: 'TD2',
    annotations: getAnnotations(lines, TD2Fields)
  };

  completeResult(result);
  return result;
};
