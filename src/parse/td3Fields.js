'use strict';

const parsePersonalNumber = require('../parsers/parsePersonalNumber');
const parsePersonalNumberCheckDigit = require('../parsers/parsePersonalNumberCheckDigit');
const {
  documentTypeTemplate,
  issuingCountryTemplate,
  lastnameTemplate,
  firstnameTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  nationalityTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  genderTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  globalCheckTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
  Object.assign({}, documentTypeTemplate, {
    line: 0,
    start: 0,
    end: 2
  }),
  Object.assign({}, issuingCountryTemplate, {
    line: 0,
    start: 2,
    end: 5
  }),
  Object.assign({}, lastnameTemplate, {
    line: 0,
    start: 5,
    end: 44
  }),
  Object.assign({}, firstnameTemplate, {
    line: 0,
    start: 5,
    end: 44
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 0,
    end: 9
  }),
  Object.assign({}, documentNumberCheckDigitTemplate, {
    line: 1,
    start: 9,
    end: 10,
    related: [
      {
        line: 1,
        start: 0,
        end: 9
      }
    ]
  }),
  Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 10,
    end: 13
  }),
  Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 13,
    end: 19
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 19,
    end: 20,
    related: [
      {
        line: 1,
        start: 13,
        end: 19
      }
    ]
  }),
  Object.assign({}, genderTemplate, {
    line: 1,
    start: 20,
    end: 21
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 21,
    end: 27
  }),
  Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 27,
    end: 28,
    related: [
      {
        line: 1,
        start: 21,
        end: 27
      }
    ]
  }),
  {
    label: 'Personal number',
    field: 'personalNumber',
    line: 1,
    start: 28,
    end: 42,
    parser: parsePersonalNumber
  },
  {
    label: 'Personal number check digit',
    field: 'personalNumberCheckDigit',
    line: 1,
    start: 42,
    end: 43,
    related: [
      {
        line: 1,
        start: 28,
        end: 42
      }
    ],
    parser: parsePersonalNumberCheckDigit
  },
  Object.assign({}, globalCheckTemplate, {
    line: 1,
    start: 43,
    end: 44,
    related: [
      {
        line: 1,
        start: 0,
        end: 10
      },
      {
        line: 1,
        start: 13,
        end: 20
      },
      {
        line: 1,
        start: 21,
        end: 43
      }
    ]
  })
].map(createFieldParser);
