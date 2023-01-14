'use strict';

import { FormatType } from '../formats';

import { Autocorrect } from './autoCorrection';
import { Details, CreateFieldParserResult } from './createFieldParser';
import { ParseMRZOptions } from './parse';

function getDetails(
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  options: ParseMRZOptions,
) {
  const { autocorrect: autocorrectOption = false } = options;
  let corrected = lines;
  const details: Details[] = [];
  const detailsAutocorrect: Autocorrect[][] = [];
  if (autocorrectOption) {
    fieldParsers.forEach(({ autocorrector }) => {
      const result = autocorrector(corrected);
      detailsAutocorrect.push(result.autocorrect);
      corrected = result.correctedLines;
    });
  }
  fieldParsers.forEach(({ parser }, i) => {
    details.push(parser(corrected, detailsAutocorrect[i]));
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

export function getResult(
  format: FormatType,
  lines: string[],
  fieldParsers: CreateFieldParserResult[],
  options: ParseMRZOptions,
) {
  const details = getDetails(lines, fieldParsers, options);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid,
  };
  return result;
}
