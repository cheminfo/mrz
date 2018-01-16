'use strict';

var globalCheck = require('../util/globalCheck');
var parseSex = require('../util/parseSex');
var parseDocumentNumber = require('../util/parseDocumentNumber');
var parseDocumentType = require('../util/parseDocumentType');
var parseNationality = require('../util/parseNationality');
var parseIssuingCountry = require('../util/parseIssuingCountry');
var parseBirthdayDate = require('../util/parseBirthdayDate');
var parseExpirationDate = require('../util/parseExpirationDate');
var finalAnalysis = require('../util/totalCheck');
var parseFirstname = require('../util/parseFirstname');
var parseLastname = require('../util/parseLastname');

module.exports = function parseTD3(lines) {
  var result = {
    error: [],
    format: 'TD2'
  };

  var first = lines[0];
  var second = lines[1];

  if (first.length !== 36) {
    result.error.push('First line does not have 36 symbols');
  }
  result.documentType = parseDocumentType(first.substring(0, 2));
  result.issuingCountry = parseIssuingCountry(first.substring(2, 5));
  result.lastname = parseFirstname('Lastname', first.substring(5, 36));
  result.firstname = parseLastname('Firstname', first.substring(5, 36));

  if (second.length !== 36) {
    result.error.push('Second line does not have 36 symbols');
  }
  result.documentNumber = parseDocumentNumber(second.substring(0, 9), second.substr(9, 1), second.substr(28, 35));
  result.nationality = parseNationality(second.substring(10, 13));
  result.birthDate = parseBirthdayDate(second.substring(13, 19), second.substr(19, 1));
  result.sex = parseSex(second.substring(20, 21));
  result.expirationDate = parseExpirationDate(second.substring(21, 27), second.substr(27, 1));

  result.globalCheck = globalCheck(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 35), second.substr(35, 1));
  finalAnalysis(result);

  return result;
};
