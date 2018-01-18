'use strict';

const cleanText = require('./cleanText');

module.exports = function parseDocumentNumber(source, checkDigit, optional) {
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    source += optional.substring(0, optional.length - 1);
  }
  return source.replace(/</g);
};
