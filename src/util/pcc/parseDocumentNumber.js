'use strict';


module.exports = function parseDocumentNumber(source) { // swiss driving license number
    var first = source.substring(0,3);
    var second = source.substring(3,6);
    var language=source.charAt(6);
    var end = source.substring(7);

    var result = {
        label: 'Document number',
        source,
        error: []
    };
    if (! first.match(/^[A-Z]{3}$/)) {
        result.error.push(`The document number "${source}" is incorrect. Need to start by 3 uppercase letters.`);
        return;
    }
    if (! second.match(/^[0-9]{3}$/)) {
        result.error.push(`The document number "${source}" is incorrect. Need to have 3 digits in position 3, 4 and 5.`);
        return;
    }
    if (end !== '<<') {
        result.error.push(`The document number "${source}" is incorrect. Need to end with <<.`);
        return;
    }
    switch (language) {
        case 'D':
            var languageDescription='German';
            break;
        case 'F':
            var languageDescription='French';
            break;
        case 'I':
            var languageDescription='Italian';
            break;
        case 'R':
            var languageDescription='Romansh';
            break;
        default:
            result.error.push(`The document number "${source}" is incorrect. Language ${language} unknown.`);
            return;
    }
    result.value=first+second+' - language: '+languageDescription;
    return result;
}