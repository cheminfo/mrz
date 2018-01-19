'use strict';

const documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: require('../parsers/parseDocumentNumber')
};

const documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: require('../parsers/parseDocumentNumberCheckDigit')
};

const documentTypeTemplate = {
  label: 'Document type',
  field: 'documentType',
  parser: require('../parsers/parseDocumentType')
};

const nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: require('../parsers/parseCountry')
};

const genderTemplate = {
  label: 'Gender',
  field: 'gender',
  parser: require('../parsers/parseSex')
};

const expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: require('../parsers/parseDate')
};

const expirationDateCheckDigitTemplate = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: require('../parsers/parseDateCheckDigit')
};

const globalCheckTemplate = {
  label: 'Global check digit',
  field: 'globalCheckDigit',
  parser: require('../parsers/globalCheck')
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: require('../parsers/parseDateCheckDigit')
};

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: require('../parsers/parseDate')
};

const firstnameTemplate = {
  label: 'First name',
  field: 'firstname',
  parser: require('../parsers/parseFirstname')
};

const lastnameTemplate = {
  label: 'Last name',
  field: 'lastname',
  parser: require('../parsers/parseLastname')
};

const issuingCountryTemplate = {
  label: 'Issuing country',
  field: 'issuingCountry',
  parser: require('../parsers/parseCountry')
};

module.exports = {
  TD1: [
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
          start: 8,
          end: 14,
          line: 1
        }
      ]
    }),
    Object.assign({}, genderTemplate, {
      line: 1,
      start: 7,
      end: 8
    }),
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
          start: 0,
          end: 6,
          line: 1
        }
      ]
    }),
    Object.assign({}, documentTypeTemplate, {
      line: 0,
      start: 0,
      end: 2
    }),
    Object.assign({}, issuingCountryTemplate, {
      start: 2,
      end: 5,
      line: 0
    }),
    Object.assign({}, firstnameTemplate, {
      start: 0,
      end: 30,
      line: 2
    }),
    Object.assign({}, lastnameTemplate, {
      start: 0,
      end: 30,
      line: 2
    }),
    Object.assign({}, nationalityTemplate, {
      start: 15,
      end: 18,
      line: 1
    }),
    Object.assign({}, documentNumberTemplate, {
      start: 5,
      end: 14,
      line: 0,
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
      start: 14,
      end: 15,
      line: 0,
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
      label: 'Optional field 2',
      field: 'optional2',
      line: 1,
      start: 18,
      end: 29,
      parser: require('../parsers/parseText')
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
    })
  ],
  TD2: [
    Object.assign({}, firstnameTemplate, {
      start: 5,
      end: 36,
      line: 0
    }),
    Object.assign({}, lastnameTemplate, {
      start: 5,
      end: 36,
      line: 0
    }),
    Object.assign({}, nationalityTemplate, {
      start: 10,
      end: 13,
      line: 1
    }),
    Object.assign({}, documentNumberTemplate, {
      start: 0,
      end: 9,
      line: 1,
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
      start: 9,
      end: 10,
      line: 1,
      related: [
        {
          start: 0,
          end: 9,
          line: 1
        },
        {
          line: 1,
          start: 28,
          end: 35
        }
      ]
    }),
    Object.assign({}, genderTemplate, {
      line: 1,
      start: 20,
      end: 21
    }),
    Object.assign({}, documentTypeTemplate, {
      line: 0,
      start: 0,
      end: 2
    }),
    Object.assign({}, issuingCountryTemplate, {
      start: 2,
      end: 5,
      line: 0
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
          start: 21,
          end: 27,
          line: 1
        }
      ]
    }),
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
  ],
  TD3: [
    Object.assign({}, documentTypeTemplate, {
      line: 0,
      start: 0,
      end: 2
    }),
    Object.assign({}, firstnameTemplate, {
      start: 5,
      end: 50,
      line: 0
    }),
    Object.assign({}, lastnameTemplate, {
      start: 5,
      end: 50,
      line: 0
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
    {
      label: 'Personal number',
      field: 'personalNumber',
      start: 28,
      end: 42,
      line: 1,
      parser: require('../parsers/parsePersonalNumber')
    },
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
    Object.assign({}, issuingCountryTemplate, {
      line: 0,
      start: 2,
      end: 5
    }),
    Object.assign({}, globalCheckTemplate, {
      start: 43,
      end: 44,
      line: 1,
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
  ],
  PCC: [
    Object.assign({}, firstnameTemplate, {
      line: 2,
      start: 0,
      end: 30
    }),
    Object.assign({}, lastnameTemplate, {
      line: 2,
      start: 0,
      end: 30
    }),
    Object.assign({}, issuingCountryTemplate, {
      line: 1,
      start: 2,
      end: 5
    }),
    Object.assign({}, documentTypeTemplate, {
      parser: require('../parsers/pcc/parseDocumentType'),
      line: 1,
      start: 0,
      end: 2
    }),
    {
      label: 'Language',
      field: 'language',
      line: 0,
      start: 6,
      end: 7,
      parser: require('../parsers/pcc/parseLanguage')
    },
    Object.assign({}, documentNumberTemplate, {
      parser: require('../parsers/pcc/parseDocumentNumber'),
      line: 0,
      start: 0,
      end: 10
    }),
    {
      label: 'separator 1',
      field: 'separator1',
      parser: require('../parsers/pcc/checkSeparator'),
      line: 1,
      start: 17,
      end: 19
    },
    {
      label: 'separator 2',
      field: 'separator2',
      parser: require('../parsers/pcc/checkSeparator'),
      line: 1,
      start: 25,
      end: 30
    },
    {
      label: 'NIP Code',
      field: 'nipCode',
      parser: require('../parsers/parseNumber'),
      line: 1,
      start: 5,
      end: 14
    },
    {
      label: 'Version',
      field: 'version',
      parser: require('../parsers/parseNumber'),
      line: 1,
      start: 14,
      end: 17
    },
    Object.assign({}, birthDateTemplate, {
      line: 1,
      start: 19,
      end: 25
    })
  ]
};
