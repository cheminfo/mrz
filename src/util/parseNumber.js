'use strict';

module.exports = function parseNumber(label, source) {
    var result = {
        error: [],
        label,
        source
    };
    if (!source.match(/^[0-9]+$/)) {
        result.error.push('It may only be composed of numbers');
    }

    return result;
};
