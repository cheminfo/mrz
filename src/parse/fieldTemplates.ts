'use strict';

import parseCompositeCheckDigit from '../parsers/parseCompositeCheckDigit';
import parseDate from '../parsers/parseDate';
import parseDateCheckDigit from '../parsers/parseDateCheckDigit';
import parseDocumentNumber from '../parsers/parseDocumentNumber';
import parseDocumentNumberCheckDigit from '../parsers/parseDocumentNumberCheckDigit';
import parseFirstName from '../parsers/parseFirstName';
import parseLastName from '../parsers/parseLastName';
import parseSex from '../parsers/parseSex';
import parseState from '../parsers/parseState';

const documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: parseDocumentNumber,
};

const documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: parseDocumentNumberCheckDigit,
};

const documentCodeTemplate = {
  label: 'Document code',
  field: 'documentCode',
};

const nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: parseState,
};

const sexTemplate = {
  label: 'Sex',
  field: 'sex',
  parser: parseSex,
};

const expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: parseDate,
};

const expirationDateCheckDigitTemplate = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: parseDateCheckDigit,
};

const compositeCheckDigitTemplate = {
  label: 'Composite check digit',
  field: 'compositeCheckDigit',
  parser: parseCompositeCheckDigit,
};

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: parseDate,
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: parseDateCheckDigit,
};

const issueDateTemplate = {
  label: 'Issue date',
  field: 'issueDate',
  parser: parseDate,
};

const firstNameTemplate = {
  label: 'First name',
  field: 'firstName',
  parser: parseFirstName,
};

const lastNameTemplate = {
  label: 'Last name',
  field: 'lastName',
  parser: parseLastName,
};

const issuingStateTemplate = {
  label: 'Issuing state',
  field: 'issuingState',
  parser: parseState,
};

export {
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  documentCodeTemplate,
  nationalityTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  issueDateTemplate,
  compositeCheckDigitTemplate,
  firstNameTemplate,
  lastNameTemplate,
  issuingStateTemplate,
};
