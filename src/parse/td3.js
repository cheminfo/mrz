'use strict';

var {
    check,
    parseText,
    parseCountry,
    parseDate,
    parseSex,
    parseDocumentNumber,
    parseDocumentType
} = require('./utils');

module.exports = function parseTD3(lines) {
    var result = {isValid: true};
    var logs = [];
    logs.push('Parsing TD3 format');
    var first = lines[0];
    if (first.length !== 44) {
        result.isValid = false;
        logs.push('First line does not have 44 symbols');
    }
    var second = lines[1];
    if (second.length !== 44) {
        result.isValid = false;
        logs.push('Second line does not have 44 symbols');
    }
    result.format = 'TD3';
    result.documentType = parseDocumentType(first.substring(0, 2));
    result.issuingCountry = parseCountry(parseText(first, 2, 5));
    result.lastname = parseText(first, 5, 50).replace(/ {2}.*/, '');
    result.firstname = parseText(first, 5, 50).replace(/.* {2}/, '');
    result.documentNumber = parseDocumentNumber(parseText(second, 0, 9), second.substr(9, 1));
    result.nationality = parseCountry(parseText(second, 10, 13));
    result.birthDate = parseDate(parseText(second, 13, 19), second.substr(19, 1));

    result.sex = parseSex(parseText(second, 20, 21));

    result.expirationDate = parseDate(parseText(second, 21, 27), second.substr(27, 1));

    result.personalNumber = {
        value: parseText(second, 28, 42)
    };
    result.personalNumber.isValid = check(second.substring(28, 42), second.substr(42, 1));
    if (result.isValid) result.isValid = check(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 43), second.substr(43, 1));

    logs.push('TD3 parse completed');
    return {
        logs,
        value: result
    };
};
