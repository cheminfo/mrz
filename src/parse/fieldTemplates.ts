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

import { fieldTypes } from './createFieldParser';

const documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: parseDocumentNumber,
  type: fieldTypes.ALPHANUMERIC,
};

const documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: parseDocumentNumberCheckDigit,
  type: fieldTypes.NUMERIC,
};

const documentCodeTemplate = {
  label: 'Document code',
  field: 'documentCode',
  type: fieldTypes.ALPHABETIC,
};

const nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: parseState,
  type: fieldTypes.ALPHABETIC,
};

const sexTemplate = {
  label: 'Sex',
  field: 'sex',
  parser: parseSex,
  type: fieldTypes.ALPHABETIC,
};

const expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: parseDate,
  type: fieldTypes.NUMERIC,
};

const expirationDateCheckDigitTemplate = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: parseDateCheckDigit,
  type: fieldTypes.NUMERIC,
};

const compositeCheckDigitTemplate = {
  label: 'Composite check digit',
  field: 'compositeCheckDigit',
  parser: parseCompositeCheckDigit,
  type: fieldTypes.NUMERIC,
};

const birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: parseDate,
  type: fieldTypes.NUMERIC,
};

const birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: parseDateCheckDigit,
  type: fieldTypes.NUMERIC,
};

const issueDateTemplate = {
  label: 'Issue date',
  field: 'issueDate',
  parser: parseDate,
  type: fieldTypes.NUMERIC,
};

const firstNameTemplate = {
  label: 'First name',
  field: 'firstName',
  parser: parseFirstName,
  type: fieldTypes.ALPHABETIC,
};

const lastNameTemplate = {
  label: 'Last name',
  field: 'lastName',
  parser: parseLastName,
  type: fieldTypes.ALPHABETIC,
};

const issuingStateTemplate = {
  label: 'Issuing state',
  field: 'issuingState',
  parser: parseState,
  type: fieldTypes.ALPHABETIC,
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
