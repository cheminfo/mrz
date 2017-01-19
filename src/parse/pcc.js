'use strict';

var check=require('../util/check');
var parseText=require('../util/parseText');
var parseSex=require('../util/parseSex');
var parsePCCDocumentNumber=require('../util/pcc/parseDocumentNumber');
var parsePCCDocumentType=require('../util/pcc/parseDocumentType');
var parseCountry=require('../util/parseCountry');
var parseBirthdayDate=require('../util/parseBirthdayDate');
var parseNumber = require('../util/parseNumber');
var checkSeparator = require('../util/checkSeparator');
var totalCheck=require('../util/totalCheck');

module.exports = function parseTD1(lines) {
    var result = {
        format: 'PCC',
        error: []    
    };
    var first = lines[0];
    if (first.length !== 9) {
        result.error.push('First line does not have 9 symbols');
    }
    var second = lines[1];
    if (second.length !== 30) {
        result.error.push('Second line does not have 30 symbols');
    }
    var third = lines[2];
    if (third.length !== 30) {
        result.error.push('Third line does not have 30 symbols');
    }

    result.documentNumber = parsePCCDocumentNumber(first);
    result.documentType = parsePCCDocumentType(second.substring(0, 2));
    result.issuingCountry = parseCountry(parseText(second, 2, 5));
    result.nipCode = parseNumber(second.substring(5, 14));
    result.version = parseNumber(second.substring(14, 17));
    checkSeparator(second, 17, 19);
    result.birthDate = parseBirthdayDate(parseText(second, 19, 25), false);
    checkSeparator(second, 25, 30);
    
    result.lastname = parseText(third, 0, 30).replace(/ {2}.*/, '');
    result.firstname = parseText(third, 0, 30).replace(/.* {2}/, '');
    totalCheck(result);
    
    return result;
};
