'use strict';

module.exports = function parseNumber(source) {
  if (!source.match(/^[0-9]+$/)) {
    throw new Error('It may only be composed of numbers');
  }

  return source;
};
