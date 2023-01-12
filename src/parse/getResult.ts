'use strict';

import { FormatType } from '../formats';

import { ParseFunction, Details } from './createFieldParser';
import { ParseMRZOptions } from './parse';

function getDetails(
  lines: string[],
  fieldParsers: ParseFunction[],
  options: ParseMRZOptions,
) {
  const details: Details[] = [];
  for (const parser of fieldParsers) {
    details.push(parser(lines, options));
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
