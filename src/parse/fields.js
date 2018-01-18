'use strict';

const documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: require('../util/parseDocumentNumber')
};

const documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: require('../util/parseDocumentNumberCheckDigit')
};

const nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: require('../util/parseCountry')
};

const genderTemplate = {
  label: 'Gender',
  field: 'gender',
  parser: require('../util/parseSex')
};

const expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: require('../util/parseDate')
};

const globalCheckTemplate = {
  label: 'Global check digit',
  field: 'globalCheckDigit',
  parser: require('../util/globalCheck')
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: require('../util/parseDateCheckDigit')
};

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: require('../util/parseDate')
};

const firstnameTemplate = {
  label: 'First name',
  field: 'firstname',
  parser: require('../util/parseFirstname')
};

const lastnameTemplate = {
  label: 'Last name',
  field: 'lastname',
  parser: require('../util/parseLastname')
};

const issuingCountryTemplate = {
  label: 'Issuing country',
  field: 'issuingCountry',
  parser: require('../util/parseCountry')
};

module.exports = {
  // TODO: parse optional field (handle overflowing document number)
  td1: [
    {
      ...expirationDateTemplate,
      line: 1,
      start: 8,
      end: 14
    },
    {
      label: 'Expiration date check digit',
      field: 'expirationDateCheckDigit',
      line: 1,
      start: 14,
      end: 15,
      related: [
        {
          start: 8,
          end: 14,
          line: 1
        }
      ],
      parser: require('../util/parseDateCheckDigit')
    },
    {
      ...genderTemplate,
      line: 1,
      start: 7,
      end: 8
    },
    {
      ...birthDateTemplate,
      start: 0,
      end: 6,
      line: 1
    },
    {
      ...birthDateCheckDigitTemplate,
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
    },
    {
      label: 'Document type',
      field: 'documentType',
      line: 0,
      start: 0,
      end: 2,
      parser: require('../util/parseDocumentType')
    },
    {
      ...issuingCountryTemplate,
      start: 2,
      end: 5,
      line: 0
    },
    {
      ...firstnameTemplate,
      start: 0,
      end: 30,
      line: 2
    },
    {
      ...lastnameTemplate,
      start: 0,
      end: 30,
      line: 2
    },
    {
      ...nationalityTemplate,
      start: 15,
      end: 18,
      line: 1
    },
    {
      ...documentNumberTemplate,
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
    },
    {
      ...documentNumberCheckDigitTemplate,
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
    },
    {
      label: 'Optional field 2',
      field: 'optional2',
      line: 1,
      start: 18,
      end: 29,
      parser: require('../util/parseText')
    },
    {
      ...globalCheckTemplate,
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
    }
  ],
  td2: [
    {
      ...firstnameTemplate,
      start: 5,
      end: 36,
      line: 0
    },
    {
      ...lastnameTemplate,
      start: 5,
      end: 36,
      line: 0
    },
    {
      ...nationalityTemplate,
      start: 10,
      end: 13,
      line: 1
    },
    {
      ...documentNumberTemplate,
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
    },
    {
      ...documentNumberCheckDigitTemplate,
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
    },
    {
      ...genderTemplate,
      line: 1,
      start: 20,
      end: 21
    },
    {
      label: 'Document type',
      field: 'documentType',
      line: 0,
      start: 0,
      end: 2,
      parser: require('../util/parseDocumentType')
    },
    {
      ...issuingCountryTemplate,
      start: 2,
      end: 5,
      line: 0
    },
    {
      ...birthDateTemplate,
      line: 1,
      start: 13,
      end: 19
    },
    {
      ...birthDateCheckDigitTemplate,
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
    },
    {
      ...expirationDateTemplate,
      line: 1,
      start: 21,
      end: 27
    },
    {
      label: 'Expiration date check digit',
      field: 'expirationDateCheckDigit',
      line: 1,
      start: 27,
      end: 28,
      related: [
        {
          start: 21,
          end: 27,
          line: 1
        }
      ],
      parser: require('../util/parseDateCheckDigit')
    },
    {
      label: 'Global check digit',
      field: 'globalCheckDigit',
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
      ],
      parser: require('../util/globalCheck')
    }
  ],
  td3: [
    {
      label: 'Document type',
      field: 'documentType',
      line: 0,
      start: 0,
      end: 2,
      parser: require('../util/parseDocumentType')
    },
    {
      ...firstnameTemplate,
      start: 5,
      end: 50,
      line: 0
    },
    {
      ...lastnameTemplate,
      start: 5,
      end: 50,
      line: 0
    },
    {
      ...documentNumberTemplate,
      line: 1,
      start: 0,
      end: 9
    },
    {
      ...documentNumberCheckDigitTemplate,
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
    },
    {
      ...nationalityTemplate,
      line: 1,
      start: 10,
      end: 13
    },
    {
      ...genderTemplate,
      line: 1,
      start: 20,
      end: 21
    },
    {
      ...expirationDateTemplate,
      line: 1,
      start: 21,
      end: 27
    },
    {
      label: 'Personal number',
      field: 'personalNumber',
      start: 28,
      end: 42,
      line: 1,
      parser: require('../util/parsePersonalNumber')
    },
    {
      ...birthDateTemplate,
      line: 1,
      start: 13,
      end: 19
    },
    {
      ...birthDateCheckDigitTemplate,
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
    },
    {
      ...issuingCountryTemplate,
      line: 0,
      start: 2,
      end: 5
    },
    {
      ...globalCheckTemplate,
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
    }
  ]
};
