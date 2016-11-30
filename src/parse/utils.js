'use strict';

const COUNTRIES = require('../generated/countries');

function parseDocumentNumber(value, checkDigit) {
    return {
        value,
        isValid: check(value, checkDigit)
    };
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
    parseDocumentNumber
};
