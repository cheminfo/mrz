'use strict';

import { FormatType } from '../formats';
import { Autocorrect, Details, FieldRecords, ParseResult } from '../types';

import { CreateFieldParserResult } from './createFieldParser';
import { ParseMRZOptions } from './parse';

function getDetails(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  autocorrectArray: Autocorrect[][],
) {
  const details: Details[] = [];
  fieldParsers.forEach(({ parser }, i) => {
    details.push(parser(lines, autocorrectArray[i]));
  });
  return details;
}

function getFields(details: Details[]) {
  const fields: FieldRecords = {};
  let valid = true;
  for (const detail of details) {
    if (!detail.valid) valid = false;
    if (detail.field) {
      fields[detail.field] = detail.value;
    }
  }
  return { fields, valid };
}

function getCorrection(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  autocorrect: boolean,
) {
  const corrected = lines.slice();
  let autocorrectArray: Autocorrect[][] = [];

  if (autocorrect) {
    fieldParsers.forEach(({ autocorrector }) => {
      const { autocorrect, correctedText, range } = autocorrector(lines);
      autocorrectArray.push(autocorrect);
      const line = corrected[range.line];
      corrected[range.line] =
        line.slice(0, range.start) + correctedText + line.slice(range.end);
    });
  } else {
    autocorrectArray = new Array(fieldParsers.length).fill([]);
  }
  return { corrected, autocorrectArray };
}

export function getResult(
  format: FormatType,
  lines: string[],
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
    valid: fields.valid,
  };
}
