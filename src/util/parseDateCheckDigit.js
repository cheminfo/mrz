'use strict';

const check = require('./check');

module.exports = function (checkDigit, value) {
  if (checkDigit !== false && !check(value, checkDigit)) {
    throw new Error(`Check digit "${checkDigit}" not valid`);
  }
  return checkDigit;
};
