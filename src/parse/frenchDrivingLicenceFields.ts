import parseDocumentCode from '../parsers/frenchDrivingLicence/parseDocumentCode';
import { parseAlpha } from '../parsers/parseAlpha';

import createFieldParser, { FieldOptions } from './createFieldParser';
import {
  compositeCheckDigitTemplate,
  documentCodeAlphaNumTemplate,
  documentNumberCheckDigitTemplate,
  documentNumberTemplate,
  expirationDateTemplate,
  issuingStateTemplate,
  lastNameTemplate,
} from './fieldTemplates';

const fields: FieldOptions[] = [
  {
    ...documentCodeAlphaNumTemplate,
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode,
  },
  { ...issuingStateTemplate, line: 0, start: 2, end: 5 },
  { ...documentNumberTemplate, line: 0, start: 5, end: 14 },
  {
    ...documentNumberCheckDigitTemplate,
    line: 0,
    start: 14,
    end: 15,
    related: [
      {
        line: 0,
        start: 0,
        end: 14,
      },
    ],
  },
  { ...expirationDateTemplate, line: 0, start: 15, end: 21 },
  { ...lastNameTemplate, line: 0, start: 21, end: 29, parser: parseAlpha },
  {
    ...compositeCheckDigitTemplate,
    line: 0,
    start: 29,
    end: 30,
    related: [
      {
        line: 0,
        start: 0,
        end: 29,
      },
    ],
  },
];

export default fields.map(createFieldParser);
