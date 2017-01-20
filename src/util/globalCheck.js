'use strict';

var check = require('./check');

module.exports = function globalCheck(source, value) {
    var checkResult = check(source, value);
    var error = [];
    if (!checkResult) {
        error.push('Check digit error.');
    }
    return {
        ifValid: checkResult,
        source,
        value: (checkResult) ? 'valid' : 'non valid',
        label: 'Global check digit',
        error
    };
};
