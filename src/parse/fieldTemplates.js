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
  parser: require('../parsers/parseGender')
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

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: require('../parsers/parseDate')
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: require('../parsers/parseDateCheckDigit')
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
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  documentTypeTemplate,
  nationalityTemplate,
  genderTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  globalCheckTemplate,
  firstnameTemplate,
  lastnameTemplate,
  issuingCountryTemplate
};
