'use strict';


module.exports = function parseDocumentNumber(value) { // swiss driving license number
    var first = value.substring(0,3);
    var second = value.substring(3,6);
    var language=value.charAt(6);
    var end = value.substring(7);

    var result = {
        value: value,
        language: language,
        isValid: true
    };
    if (! first.match(/^[A-Z]{3}$/)) {
        result.isValid = false;
        result.error = `The document number "${value}" is incorrect. Need to start by 3 uppercase letters.`;
        return;
    }
    if (! second.match(/^[0-9]{3}$/)) {
        result.isValid = false;
        result.error = `The document number "${value}" is incorrect. Need to have 3 digits in position 3, 4 and 5.`;
        return;
    }
    if (end !== '<<') {
        result.isValid = false;
        result.error = `The document number "${value}" is incorrect. Need to end with <<.`;
        return;
    }
    switch (language) {
        case 'D':
            result.languageDescription='German';
            break;
        case 'F':
            result.languageDescription='French';
            break;
        case 'I':
            result.languageDescription='Italian';
            break;
        case 'R':
            result.languageDescription='Romansh';
            break;
        default:
            result.isValid = false;
            result.error = `The document number "${value}" is incorrect. Language ${language} unknown.`;
            return;
    }
    return result;
}