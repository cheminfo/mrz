'use strict';


var check=require('../util/check');
var parseText=require('../util/parseText');
var parseSex=require('../util/parseSex');
var parseDocumentNumber=require('../util/parseDocumentNumber');
var parseDocumentType=require('../util/parseDocumentType');
var parseCountry=require('../util/parseCountry');
var parseBirthdayDate=require('../util/parseBirthdayDate');
var parseExpirationDate=require('../util/parseExpirationDate');


module.exports = function parseTD1(lines) {
    var result = {
        format: 'TD1',
        error:[]
    };
    var first = lines[0];
    if (first.length !== 30) {wstorm .constructor
        result.isValid = false;
        error.push('First line does not have 30 symbols');
    }
    var second = lines[1];
    if (second.length !== 30) {
        result.isValid = false;
        error.push('Second line does not have 30 symbols');
    }
    var third = lines[2];
    if (third.length !== 30) {
        result.isValid = false;
        error.push('Third line does not have 30 symbols');
    }


    result.documentType = parseDocumentType(first.substring(0, 2));
    result.issuingCountry = parseCountry(parseText(first, 2, 5));
    result.optional1 = parseText(first, 15, 30);
    result.documentNumber = parseDocumentNumber(parseText(first, 5, 14), first.substr(14, 1), result.optional1);


    result.birthDate = parseBirthdayDate(parseText(second, 0, 6), second.substr(6, 1));
    result.sex = parseSex(second.substr(7, 1));
    result.expirationDate = parseBirthdayDate(parseText(second, 8, 14), second.substr(14, 1));
    result.nationality = parseCountry(parseText(second, 15, 18), second.substr(18, 1));
    result.optional2 = parseText(second, 18, 29);
    if (result.isValid) result.isValid = check(first.substring(5, 30) + second.substring(0, 7) + second.substring(8, 15) + second.substring(18, 29), second.substr(29, 1));

    result.lastname = parseText(third, 0, 30).replace(/ {2}.*/, '');
    result.firstname = parseText(third, 0, 30).replace(/.* {2}/, '');

    logs.push('TD1 parse completed');

    result.logs = logs;
    return result;
};
