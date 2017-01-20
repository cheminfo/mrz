'use strict';

var check = require('./check');

module.exports = function parseDate(value, checkDigit) {
    var result = {
        error: []
    };
    result.year = value.substring(0, 2);
    result.month = value.substring(2, 4);
    result.day = value.substring(4, 6);
    result.value = result.day + '.' + result.month + '.' + result.year;
    if (checkDigit !== false && !check(value, checkDigit)) {
        result.error.push('Check digit "' + checkDigit + '" not valid');
    }
    if (result.month < 1 || result.month > 12) {
        result.error.push('Month "' + result.month + '" not valid');
    }
    if (result.day < 1 || result.day > 31) {
        result.error.push('Day "' + result.day + '" not valid');
    }
    return result;
};
