'use strict';

var parsePCCDocumentNumber = require('../util/pcc/parseDocumentNumber');
var parsePCCDocumentType = require('../util/pcc/parseDocumentType');
var parseCountry = require('../util/parseCountry');
var parseBirthdayDate = require('../util/parseBirthdayDate');
var parseNumber = require('../util/parseNumber');
var checkSeparator = require('../util/checkSeparator');
var finalAnalysis = require('../util/totalCheck');
var parseFirstname = require('../util/parseFirstname');
var parseLastname = require('../util/parseLastname');

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
  result.issuingCountry = parseCountry(second.substring(2, 5));
  result.nipCode = parseNumber('NIP code', second.substring(5, 14));
  result.version = parseNumber('Version', second.substring(14, 17));
  result.separator1 = checkSeparator('Separator second line 18-19', second.substring(17, 19));
  result.birthDate = parseBirthdayDate(second.substring(19, 25), false);
  result.separator1 = checkSeparator('Separator second line 26-30', second.substring(25, 30));
  result.lastname = parseFirstname('Lastname', third.substring(0, 30));
  result.firstname = parseLastname('Firstname', third.substring(0, 30));
  finalAnalysis(result);

  return result;
};
