'use strict';

var parseText = require('./parseText');
var check = require('./check');

module.exports = function parseExpirationDate(value, checkDigit) {
    var result = parseText('Personal number', value, /^[A-Z<]+<*$/);
    if (!check(value, checkDigit)) {
        result.error.push('Check digit "' + checkDigit + '" not valid');
    }
    return result;
};
