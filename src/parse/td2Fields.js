'use strict';

const parseText = require('../parsers/parseText');
const {
  documentTypeTemplate,
  issuingCountryTemplate,
  firstnameTemplate,
  lastnameTemplate,
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
    end: 36
  }),
  Object.assign({}, firstnameTemplate, {
    line: 0,
    start: 5,
    end: 36
  }),
  Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 0,
    end: 9,
    related: [
      {
        line: 1,
        start: 9,
        end: 10
      },
      {
        line: 1,
        start: 28,
        end: 35
      }
    ]
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
      },
      {
        line: 1,
        start: 28,
        end: 35
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
    label: 'Optional field',
    field: 'optional',
    line: 1,
    start: 28,
    end: 35,
    parser: parseText
  },
  Object.assign({}, globalCheckTemplate, {
    line: 1,
    start: 35,
    end: 36,
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
        end: 35
      }
    ]
  })
].map(createFieldParser);
