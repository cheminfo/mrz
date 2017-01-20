'use strict';

var globalCheck=require('../util/globalCheck');
var parseSex=require('../util/parseSex');
var parseDocumentNumber=require('../util/parseDocumentNumber');
var parseDocumentType=require('../util/parseDocumentType');
var parseCountry=require('../util/parseCountry');
var parseBirthdayDate=require('../util/parseBirthdayDate');
var parseExpirationDate=require('../util/parseExpirationDate');
var finalAnalysis=require('../util/totalCheck');
var parseFirstname=require('../util/parseFirstname');
var parseLastname=require('../util/parseLastname');
var parsePersonalNumber=require('../util/parsePersonalNumber');

module.exports = function parseTD3(lines) {
    var result = {
        error: [],
        format: 'TD3'
    };

    var first = lines[0];
    var second = lines[1];

    if (first.length !== 44) {
        result.error.push('First line does not have 44 symbols');
    }
    result.documentType = parseDocumentType(first.substring(0, 2));
    result.issuingCountry = parseCountry(first.substring(2, 5));
    result.lastname = parseFirstname('Lastname', first.substring(5, 50));
    result.firstname = parseLastname('Firstname', first.substring(5, 50));
    result.documentNumber = parseDocumentNumber(second.substring(0, 9), second.substr(9, 1));
    result.nationality = parseCountry(second.substring(10, 13));
    result.birthDate = parseDate(second.substring(13, 19), second.substr(19, 1));

    if (second.length !== 44) {
        result.error.push('Second line does not have 44 symbols');
    }
    result.sex = parseSex(second.substring(20, 21));
    result.expirationDate = parseDate(second.substring(21, 27), second.substr(27, 1));
    result.personalNumber = parsePersonalNumber( second.substring(28, 42));
    result.globalCheck = globalCheck(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 43), second.substr(43, 1));
    finalAnalysis(result);

    return result;
};
