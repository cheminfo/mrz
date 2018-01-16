'use strict';

var globalCheck = require('../util/globalCheck');
var parseText = require('../util/parseText');
var parseSex = require('../util/parseSex');
var parseDocumentNumber = require('../util/parseDocumentNumber');
var parseDocumentType = require('../util/parseDocumentType');
var parseNationality = require('../util/parseNationality');
var parseIssuingCountry = require('../util/parseIssuingCountry');
var parseBirthdayDate = require('../util/parseBirthdayDate');
var finalAnalysis = require('../util/totalCheck');
var parseFirstname = require('../util/parseFirstname');
var parseLastname = require('../util/parseLastname');

module.exports = function parseTD1(lines) {
  var result = {
    format: 'TD1',
    error: []
  };
  var first = lines[0];
  var second = lines[1];
  var third = lines[2];

  if (first.length !== 30) {
    result.error.push('First line does not have 30 symbols');
  }
  result.documentType = parseDocumentType(first.substring(0, 2));
  result.issuingCountry = parseIssuingCountry(first.substring(2, 5));
  result.optional1 = parseText('Optional 1', first.substring(15, 30));
  result.documentNumber = parseDocumentNumber(first.substring(5, 14), first.substr(14, 1), result.optional1.value);

  if (second.length !== 30) {
    result.error.push('Second line does not have 30 symbols');
  }
  result.birthDate = parseBirthdayDate(second.substring(0, 6), second.substr(6, 1));
  result.sex = parseSex(second.substr(7, 1));
  result.expirationDate = parseBirthdayDate(second.substring(8, 14), second.substr(14, 1));
  result.nationality = parseNationality(second.substring(15, 18), second.substr(18, 1));
  result.optional2 = parseText('Optional 2', second.substring(18, 29));

  if (third.length !== 30) {
    result.error.push('Third line does not have 30 symbols');
  }
  result.lastname = parseFirstname('Lastname', third.substring(0, 30));
  result.firstname = parseLastname('Firstname', third.substring(0, 30));
  result.globalCheck = globalCheck(first.substring(5, 30) + second.substring(0, 7) + second.substring(8, 15) + second.substring(18, 29), second.substr(29, 1));

  finalAnalysis(result);
  return result;
};
