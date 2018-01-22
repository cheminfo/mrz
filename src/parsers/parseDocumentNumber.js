'use strict';

const cleanText = require('./cleanText');

module.exports = function parseDocumentNumber(source, checkDigit, optional) {
  let end, value;
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    value = source + optional.substring(0, optional.length - 1);
    end = value.length + 1;
  } else {
    value = cleanText(source);
    end = value.length;
  }
  return {
    value,
    start: 0,
    end
  };
};
