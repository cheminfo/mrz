'use strict';

module.exports = function parseDocumentType(source) {
    var result = {
        source,
        label: 'Document type',
        type: parseText(source.substring(1, 2)),
        error: []
    };

    var code = source.substring(0, 1);
    var type = source.substring(1, 2);

    switch (code) {
        case 'P':
            result.description = 'Passport';
            break;
        case 'I':
            result.description = 'Identity card';
            break;
        case 'A':
            result.description = '';
            break;
        case 'C':
            result.description = '';
            break;
        default:
            result.error.push('Document type must be either P, I, A or C');
    }
    if (type=== 'V') {
        result.error.push('Document type (second symbol) may not be V');
    }
    return result;
}