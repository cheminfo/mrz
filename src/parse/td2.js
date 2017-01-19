'use strict';

var globalCheck=require('../util/globalCheck');
var parseText=require('../util/parseText');
var parseSex=require('../util/parseSex');
var parseDocumentNumber=require('../util/parseDocumentNumber');
var parseDocumentType=require('../util/parseDocumentType');
var parseNationality=require('../util/parseNationality');
var parseIssuingCountry=require('../util/parseIssuingCountry');
var parseBirthdayDate=require('../util/parseBirthdayDate');
var parseExpirationDate=require('../util/parseExpirationDate');
var totalCheck=require('../util/totalCheck');

module.exports = function parseTD3(lines) {
    var result = {
        error: [],
        format: 'TD2'
    };

    var first = lines[0];
    if (first.length !== 36) {
        result.error.push('First line does not have 36 symbols');
    }
    var second = lines[1];
    if (second.length !== 36) {
        result.error.push('Second line does not have 36 symbols');
    }

    result.documentType = parseDocumentType(first.substring(0, 2));
    result.issuingCountry = parseIssuingCountry(parseText(first, 2, 5));
    result.lastname = parseText(first, 5, 36).replace(/ {2}.*/, '');
    result.firstname = parseText(first, 5, 36).replace(/.* {2}/, '');
    result.documentNumber = parseDocumentNumber(parseText(second, 0, 9), second.substr(9, 1), second.substr(28, 35));
    result.nationality = parseNationality(parseText(second, 10, 13));
    result.birthDate = parseBirthdayDate(parseText(second, 13, 19), second.substr(19, 1));

    result.sex = parseSex(parseText(second, 20, 21));

    result.expirationDate = parseExpirationDate(parseText(second, 21, 27), second.substr(27, 1));

    result.globalCheck = globalCheck(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 35), second.substr(35, 1));
    totalCheck(result);
    
    return result;
};
