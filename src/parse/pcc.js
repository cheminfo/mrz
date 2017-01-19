'use strict';

var {
    parseText,
    parseCountry,
    parseDate,
    parsePCCDocumentNumber,
    parsePCCDocumentType,
    checkSeparator,
    parseNumber
} = require('./utils');


module.exports = function parseTD1(lines) {
    var result = {isValid: true};
    var logs = [];
    logs.push('Parsing PCC format');
    var first = lines[0];
    if (first.length !== 9) {
        result.isValid = false;
        logs.push('First line does not have 9 symbols');
    }
    var second = lines[1];
    if (second.length !== 30) {
        result.isValid = false;
        logs.push('Second line does not have 30 symbols');
    }
    var third = lines[2];
    if (third.length !== 30) {
        result.isValid = false;
        logs.push('Third line does not have 30 symbols');
    }

    result.documentNumber = parsePCCDocumentNumber(first);


    result.format = 'PCC';
    result.documentType = parsePCCDocumentType(second.substring(0, 2));
    result.issuingCountry = parseCountry(parseText(second, 2, 5));
    result.nipCode = parseNumber(second.substring(5, 14));
    result.version = parseNumber(second.substring(14, 17));
    checkSeparator(second, 17, 19);
    result.birthDate = parseDate(parseText(second, 19, 25), false);
    checkSeparator(second, 25, 30);
    

    result.lastname = parseText(third, 0, 30).replace(/ {2}.*/, '');
    result.firstname = parseText(third, 0, 30).replace(/.* {2}/, '');

    logs.push('PCC parse completed');

    result.logs = logs;
    return result;
};
