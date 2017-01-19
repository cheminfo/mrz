'use strict';

module.exports = function parseText(text, from, to) {
    return text.substring(from, to).replace(/<+$/g, '').replace(/</g, ' ');
}