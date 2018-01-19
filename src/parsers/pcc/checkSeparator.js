'use strict';

module.exports = function checkSeparator(source) {
  if (!source.match(/^<*$/)) {
    throw new Error('The separator must be composed only by "<"');
  }
  return source;
};
