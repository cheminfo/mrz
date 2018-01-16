'use strict';

var cleanText = require('./cleanText');

module.exports = function parseText(label, source, regexp = /^[0-9A-Z<]+$/) {
  var result = {
    source,
    label,
    value: cleanText(source),
    error: []
  };
  if (!source.match(regexp)) {
    result.error.push(`It must match the following regexp: ${regexp}`);
  }
  return result;
};
