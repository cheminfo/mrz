'use strict';

var check = require('./check');

module.exports = function globalCheck(source, value) {
    var checkResult=check(source,value);
    var error=[];
    if (! checkResult) {
        error.push('Check digit error.');
    }
    return {
        ifValid: checkResult,
        source,
        label: 'Global check digit',
        error
    }
}