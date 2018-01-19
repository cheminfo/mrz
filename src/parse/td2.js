'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');
const { TD2: TD2Fields } = require('./fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line) => {
    if (line.length !== 36) {
      throw new Error('each line should have a length of 36 in TD2');
    }
  });
  const result = {
    format: 'TD2',
    annotations: getAnnotations(lines, TD2Fields)
  };

  completeResult(result);
  return result;
};
