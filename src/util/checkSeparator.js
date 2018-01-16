'use strict';

module.exports = function checkSeparator(label, source) {
  var result = {
    source,
    error: [],
    label
  };
  if (!source.match(/^<*$/)) {
    result.error.push('The separator must be composed only by "<"');
  }
  return result;
};
