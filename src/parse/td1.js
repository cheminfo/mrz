'use strict';

var {
    check,
    parseText,
    parseCountry,
    parseDate,
    parseSex,
    parseDocumentNumber
} = require('./utils');


module.exports = function parseTD1(lines) {
    var logs = [];
    logs.push('Parsing TD1 format');
    var first = lines[0];
    if (first.length !== 30) logs.push('First line does not have 30 symbols');
    var second = lines[1];
    if (second.length !== 30) logs.push('Second line does not have 30 symbols');
    var third = lines[2];
    if (third.length !== 30) logs.push('Third line does not have 30 symbols');
    var result = {};
    result.format = 'TD3';
    result.documentType = {
        code: first[0],
        type: parseText(first[1])
    };
    result.issuingCountry = parseCountry(parseText(first, 2, 5));
    result.documentNumber = parseDocumentNumber(parseText(first, 5, 14), first.substr(14, 1));
    result.optional1 = parseText(first, 15, 30);

    result.birthDate = parseDate(parseText(second, 0, 6), second.substr(6, 1));
    result.sex = parseSex(second.substr(7, 1));
    result.expirationDate = parseDate(parseText(second, 8, 14), second.substr(14, 1));
    result.nationality = parseCountry(parseText(second, 15, 18), second.substr(18, 1));
    result.optional2 = parseText(second, 18, 29);
    result.isValid = check(first.substring(5, 30) + second.substring(0, 7) + second.substring(8, 15) + second.substring(18, 29), second.substr(29, 1));

    result.lastname = parseText(third, 0, 30).replace(/ {2}.*/, '');
    result.firstname = parseText(third, 0, 30).replace(/.* {2}/, '');

    logs.push('TD1 parse completed');
    return {
        logs,
        value: result
    };
};
