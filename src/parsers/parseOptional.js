'use strict';

var parseText = require('./parseText');

module.exports = function parseOptional(source) {
  const value = parseText(source);

  return {
    value,
    start: 0,
    end: 0 + value.length
  };
};
