'use strict';

const parseLanguage = require('./parseLanguage');

module.exports = function parseDocumentNumber(source) {
  // swiss driving license number
  var first = source.substring(0, 3);
  var second = source.substring(3, 6);
  var language = source.charAt(6);
  var end = source.substring(7);

  if (!first.match(/^[A-Z]{3}$/)) {
    throw new Error(
      `The document number "${source}" is incorrect. Need to start by 3 uppercase letters.`
    );
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(
      `The document number "${source}" is incorrect. Need to have 3 digits in position 3, 4 and 5.`
    );
  }
  if (end !== '<<') {
    throw new Error(
      `The document number "${source}" is incorrect. Need to end with <<.`
    );
  }

  // calling this method to throw if language invalid
  parseLanguage(language);
  return source.substring(0, 7);
};
