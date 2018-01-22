'use strict';

const { getResult } = require('./fieldHelper');
const TD3Fields = require('./td3Fields');

module.exports = function parseTD1(lines) {
  lines.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}. Must be 44 for TD3`
      );
    }
  });
  return getResult('TD3', lines, TD3Fields);
};
