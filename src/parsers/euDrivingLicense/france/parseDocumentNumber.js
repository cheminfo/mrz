'use strict';

module.exports = function parseDocumentCode(source) {
    // french driving license number
    if (!source.match(/^[0-9]{2}[A-Z]{2}[0-9]{5}$/)) {
        throw new Error(
            `invalid document number: ${source}.`
        );
    }
    return source;
};
