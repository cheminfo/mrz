'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');
const { TD1: TD1Fields } = require('./fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line) => {
    if (line.length !== 30) {
      throw new Error('each line should have a length of 30 in TD1');
    }
  });
  const result = {
    format: 'TD1',
    annotations: getAnnotations(lines, TD1Fields)
  };

  completeResult(result);
  return result;
};
