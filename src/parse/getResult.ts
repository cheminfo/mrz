'use strict';

import { FormatType } from '../formats';

import { ParseFunction, Details } from './createFieldParser';

function getDetails(lines: string[], fieldParsers: ParseFunction[]) {
  const details: Details[] = [];
  for (const parser of fieldParsers) {
    details.push(parser(lines));
  }
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
  fieldParsers: ParseFunction[],
) {
  const details = getDetails(lines, fieldParsers);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid,
  };
  return result;
}
