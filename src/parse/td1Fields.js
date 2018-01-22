'use strict';

const parseText = require('../parsers/parseText');
const {
  documentTypeTemplate,
  issuingCountryTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  genderTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  nationalityTemplate,
  globalCheckTemplate,
  lastnameTemplate,
  firstnameTemplate
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
  Object.assign({}, documentNumberTemplate, {
    line: 0,
    start: 5,
    end: 14,
    related: [
      {
        line: 0,
        start: 14,
        end: 15
      },
      {
        line: 0,
        start: 15,
        end: 30
      }
    ]
  }),
  Object.assign(documentNumberCheckDigitTemplate, {
    line: 0,
    start: 14,
    end: 15,
    related: [
      {
        line: 0,
        start: 5,
        end: 14
      },
      {
        line: 0,
        start: 15,
        end: 30
      }
    ]
  }),
  {
    label: 'Optional field 1',
    field: 'optional1',
    line: 0,
    start: 15,
    end: 30,
    parser: parseText
  },
  Object.assign({}, birthDateTemplate, {
    start: 0,
    end: 6,
    line: 1
  }),
  Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 6,
    end: 7,
    related: [
      {
        line: 1,
        start: 0,
        end: 6
      }
    ]
  }),
  Object.assign({}, genderTemplate, {
    line: 1,
    start: 7,
    end: 8
  }),
  Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 8,
    end: 14
  }),
  Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 14,
    end: 15,
    related: [
      {
        line: 1,
        start: 8,
        end: 14
      }
    ]
  }),
  Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 15,
    end: 18
  }),
  {
    label: 'Optional field 2',
    field: 'optional2',
    line: 1,
    start: 18,
    end: 29,
    parser: parseText
  },
  Object.assign({}, globalCheckTemplate, {
    line: 1,
    start: 29,
    end: 30,
    related: [
      {
        line: 0,
        start: 5,
        end: 30
      },
      {
        line: 1,
        start: 0,
        end: 7
      },
      {
        line: 1,
        start: 8,
        end: 15
      },
      {
        line: 1,
        start: 18,
        end: 29
      }
    ]
  }),
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
