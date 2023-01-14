'use strict';

import { FormatType } from '../formats';

import { Autocorrect } from './autoCorrection';
import { Details, CreateFieldParserResult } from './createFieldParser';
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
  const fields: Record<string, string | null> = {};
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
  let corrected = lines;
  const autocorrectArray: Autocorrect[][] = [];

  if (autocorrect) {
    fieldParsers.forEach(({ autocorrector }) => {
      const result = autocorrector(corrected);
      autocorrectArray.push(result.autocorrect);
      corrected = result.correctedLines;
    });
  }
  return { corrected, autocorrectArray };
}
export function getResult(
  format: FormatType,
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  options: ParseMRZOptions,
) {
  const { autocorrect = false } = options;

  const { corrected, autocorrectArray } = getCorrection(
    lines,
    fieldParsers,
    autocorrect,
  );
  const details = getDetails(corrected, fieldParsers, autocorrectArray);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid,
  };
  return result;
}
