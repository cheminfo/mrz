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
    logs.push('Parsing TD2 format');
    var first = lines[0];
    if (first.length !== 36) {
        result.isValid = false;
        logs.push('First line does not have 36 symbols');
    }
    var second = lines[1];
    if (second.length !== 36) {
        result.isValid = false;
        logs.push('Second line does not have 36 symbols');
    }
    result.format = 'TD2';
    result.documentType = parseDocumentType(first.substring(0, 2));
    result.issuingCountry = parseCountry(parseText(first, 2, 5));
    result.lastname = parseText(first, 5, 36).replace(/ {2}.*/, '');
    result.firstname = parseText(first, 5, 36).replace(/.* {2}/, '');
    result.documentNumber = parseDocumentNumber(parseText(second, 0, 9), second.substr(9, 1), second.substr(28, 35));
    result.nationality = parseCountry(parseText(second, 10, 13));
    result.birthDate = parseDate(parseText(second, 13, 19), second.substr(19, 1));

    result.sex = parseSex(parseText(second, 20, 21));

    result.expirationDate = parseDate(parseText(second, 21, 27), second.substr(27, 1));

    if (result.isValid) result.isValid = check(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 35), second.substr(35, 1));

    logs.push('TD2 parse completed');

    result.logs = logs;
    return result;
};
