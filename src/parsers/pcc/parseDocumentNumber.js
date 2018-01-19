'use strict';

const parseLanguage = require('./parseLanguage');

module.exports = function parseDocumentNumber(source) {
  // swiss driving license number
  var first = source.substring(0, 3);
  var second = source.substring(3, 6);
  var language = source.charAt(6);
  var end = source.substring(7);

  if (!first.match(/^[A-Z0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${
        source
      }. Must start with three alphanumeric digits`
    );
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${
        source
      }. Must have numeric digits in positions 4, 5 and 6`
    );
  }
  if (end !== '<<') {
    throw new Error(
      `invalid document number: ${source}. Must end with <<`
    );
  }

  // calling this method to throw if language invalid
  parseLanguage(language);
  return source.substring(0, 7);
};
