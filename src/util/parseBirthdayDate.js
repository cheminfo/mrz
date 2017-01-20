'use strict';

var parseDate = require('./parseDate');

module.exports = function parseBirthdayDateDate(value, checkDigit) {
    var result = parseDate(value, checkDigit);
    result.label = 'Birthday date';
    return result;
};
