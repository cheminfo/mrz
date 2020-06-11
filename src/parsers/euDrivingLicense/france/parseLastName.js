'use strict';

var parseText = require('../../parseText');

module.exports = function parseLastName(source) {
    const parsed = parseText(source, /^[A-Z<]+$/);
    return {
        value: parsed,
        start: 0,
        end: parsed.length
    };
};
