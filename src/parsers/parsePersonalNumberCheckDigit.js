'use strict';

var check = require('./check');
const cleanText = require('./cleanText');

module.exports = function (checkDigit, personalNumber) {
  const cleanNumber = cleanText(personalNumber);
  if (cleanNumber === '' && checkDigit !== '<' && checkDigit !== '0') {
    throw new Error(`invalid check digit ${checkDigit}: must be 0 or <`);
  }
  check(personalNumber, checkDigit);
  return checkDigit;
};
