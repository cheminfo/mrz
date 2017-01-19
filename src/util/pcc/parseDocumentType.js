'use strict';

module.exports = function parseDocumentType(code) {
    var result = {
        label: '',
        type: code,
        isValid: true
    };
    switch (result.code) {
        case 'FA':
            result.label = 'Swiss driving license';
            break;
        default:
            result.isValid = false;
            result.error = 'Swiss driving license must have a document type "FA"';
    }
    return result;
}
