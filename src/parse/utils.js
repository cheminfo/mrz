'use strict';

const COUNTRIES = require('../generated/countries');


/*
Parsing document number
The number may be splited (TD1 format)
 */

function parseDocumentNumber(value, checkDigit, optional) {
    if (checkDigit==='<' && optional) {
        optional=optional.replace(/<.*/,'');
        value+=optional.substring(0,optional.length-1);
        checkDigit=optional.charAt(optional.length-1);
    }
    var result = {
        value,
        isValid: check(value, checkDigit)
    };
    if (!result.isValid) {
        result.error = 'Check digit "' + checkDigit + '" not valid';
    }

}

function parseDocumentType(code) {
    var result = {
        code: code.substring(0, 1),
        label: '',
        type: parseText(code.substring(1, 2)),
        isValid: true
    };
    switch (result.code) {
        case 'P':
            result.label = 'Passport';
            break;
        case 'I':
            result.label = 'Identity card';
            break;
        case 'A':
            result.label = '';
            break;
        case 'C':
            result.label = '';
            break;
        default:
            result.isValid = false;
            result.error = 'Document type must be either P, I, A or C';
    }
    if (result.type === 'V') {
        result.isValid = false;
        result.error = 'Document type (second symbol) may not be V';
    }
    return result;
}

function parseSex(value) {
    var label = '';
    if (value === '') label = 'Unknown';
    if (value === 'M') label = 'Masculin';
    if (value === 'F') label = 'Féminin';
    var result = {
        code: value,
        label: label,
        isValid: true
    };
    if (!label) {
        result.isValid = false;
        result.error = `The sex "${value}" is incorrect. Allowed values: M, F or <.`;
    }
    return result;
}

function parseDate(value, checkDigit) {
    var result = {};
    result.year = value.substring(0, 2);
    result.month = value.substring(2, 4);
    result.day = value.substring(4, 6);
    result.isValid = check(value, checkDigit);
    if (!result.isValid) {
        result.error = 'Check digit "' + checkDigit + '" not valid';
    }
    if (result.month < 1 || result.month > 12) {
        result.error = 'Month "' + result.month + '" not valid';
    }
    if (result.day < 1 || result.day > 31) {
        result.error = 'Day "' + result.day + '" not valid';
    }
    return result;
}

function parseCountry(value) {
    var country = COUNTRIES[value];
    var result = {
        code: value,
        name: country,
        isValid: true
    };
    if (!country) {
        result.isValid = false;
        result.error = 'The country code "' + value + '" is unknown';
    }
    return result;
}

function check(string, value) {
    var code = 0;
    var factors = [7, 3, 1];
    for (var i = 0; i < string.length; i++) {
        var charCode = string.charCodeAt(i);
        if (charCode === 60) charCode = 0;
        if (charCode >= 65) charCode -= 55;
        if (charCode >= 48) charCode -= 48;
        charCode *= factors[i % 3];
        code += charCode;
    }
    return code % 10 === Number(value);
}

function parseText(text, from, to) {
    return text.substring(from, to).replace(/<+$/g, '').replace(/</g, ' ');
}

module.exports = {
    check,
    parseText,
    parseCountry,
    parseDate,
    parseSex,
    parseDocumentNumber,
    parseDocumentType
};
