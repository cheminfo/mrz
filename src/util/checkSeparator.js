'use strict';

module.exports = function checkSeparator(string) {
    if (string.match(/^<*$/)) {
        return {
            isValid: true
        }
    }
    return {
        isValid: false,
        error: 'The separator must be composed only by "<"'
    }
}