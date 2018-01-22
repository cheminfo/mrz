'use strict';

const parseDocumentNumber = require('../parsers/pcc/parseDocumentNumber');
const parseLanguage = require('../parsers/pcc/parseLanguage');
const parseDocumentType = require('../parsers/pcc/parseDocumentType');
const parseIssuingCountry = require('../parsers/pcc/parseIssuingCountry');
const parseNumber = require('../parsers/parseNumber');
const checkSeparator = require('../parsers/pcc/checkSeparator');
const {
  documentNumberTemplate,
  documentTypeTemplate,
  issuingCountryTemplate,
  birthDateTemplate,
  lastnameTemplate,
  firstnameTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentNumberTemplate, {
    line: 0,
    start: 0,
    end: 9,
    parser: parseDocumentNumber
  }),
  {
    label: 'Language code',
    field: 'language',
    line: 0,
    start: 6,
    end: 7,
    parser: parseLanguage
  },
  Object.assign({}, documentTypeTemplate, {
    line: 1,
    start: 0,
    end: 2,
    parser: parseDocumentType
  }),
  Object.assign({}, issuingCountryTemplate, {
    line: 1,
    start: 2,
    end: 5,
    parser: parseIssuingCountry
  }),
  {
    label: 'PIN code',
    field: 'pinCode',
    line: 1,
    start: 5,
    end: 14,
    parser: parseNumber
  },
  {
    label: 'Version number',
    field: 'versionNumber',
    line: 1,
    start: 14,
    end: 17,
    parser: parseNumber
  },
  {
    label: 'Separator 1',
    field: null,
    line: 1,
    start: 17,
    end: 19,
    parser: checkSeparator
  },
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 19,
    end: 25
  }),
  {
    label: 'Separator 2',
    field: null,
    line: 1,
    start: 25,
    end: 30,
    parser: checkSeparator
  },
  Object.assign({}, lastnameTemplate, {
    line: 2,
    start: 0,
    end: 30
  }),
  Object.assign({}, firstnameTemplate, {
    line: 2,
    start: 0,
    end: 30
  })
].map(createFieldParser);
