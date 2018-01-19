'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');
const { TD3: TD3Fields } = require('./fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line) => {
    if (line.length !== 44) {
      throw new Error('each line should have a length of 30 in TD1');
    }
  });
  const result = {
    format: 'TD3',
    annotations: getAnnotations(lines, TD3Fields)
  };

  completeResult(result);
  return result;
};
