import type { FormatType } from '../formats.ts';
import type {
  Autocorrect,
  Details,
  FieldRecords,
  ParseResult,
} from '../types.ts';

import type { CreateFieldParserResult } from './createFieldParser.ts';
import { getDocumentNumber } from './getDocumentNumber.ts';
import type { ParseMRZOptions } from './parse.ts';

function getDetails(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  autocorrectArray: Autocorrect[][],
) {
  const details: Details[] = [];
  for (const [i, { parser }] of fieldParsers.entries()) {
    details.push(parser(lines, autocorrectArray[i]));
  }
  return details;
}

function getFields(details: Details[]) {
  const fields: FieldRecords = {};
  let allValid = true;
  for (const detail of details) {
    if (!detail.valid) {
      allValid = false;
    }
    if (detail.field) {
      fields[detail.field] = detail.valid ? detail.value : null;
    }
  }
  return { fields, allValid };
}

function getCorrection(
  lines: readonly string[],
  fieldParsers: readonly CreateFieldParserResult[],
  autocorrect: boolean,
) {
  const corrected = lines.slice();
  let autocorrectArray: Autocorrect[][] = [];

  if (autocorrect) {
    for (const { autocorrector } of fieldParsers) {
      const { autocorrect, correctedText, range } = autocorrector(lines);
      autocorrectArray.push(autocorrect);
      const line = corrected[range.line];
      corrected[range.line] =
        line.slice(0, range.start) + correctedText + line.slice(range.end);
    }
  } else {
    autocorrectArray = new Array(fieldParsers.length).fill([]);
  }
  return { corrected, autocorrectArray };
}

export function getResult(
  format: FormatType,
  lines: readonly string[],
  fieldParsers: CreateFieldParserResult[],
  options: ParseMRZOptions,
): ParseResult {
  const { autocorrect = false } = options;

  const { corrected, autocorrectArray } = getCorrection(
    lines,
    fieldParsers,
    autocorrect,
  );
  const details = getDetails(corrected, fieldParsers, autocorrectArray);
  const fields = getFields(details);
  return {
    format,
    details,
    fields: fields.fields,
    documentNumber: getDocumentNumber(format, fields.fields),
    valid: fields.allValid,
  };
}
