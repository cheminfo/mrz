'use strict';

module.exports = function parseDocumentCode(source) {
    if (source !== 'D') {
        throw new Error(`invalid document code: ${source}. Must be D`);
    }
    return source;
};
