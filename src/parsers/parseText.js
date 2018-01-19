'use strict';

const cleanText = require('./cleanText');

module.exports = function parseText(source, regexp = /^[0-9A-Z<]+$/) {
  if (!source.match(regexp)) {
    throw new Error(`it must match the following regexp: ${regexp}`);
  }
  return cleanText(source);
};
