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
  const autocorrectArray: Autocorrect[][] = [];

  if (autocorrect) {
    fieldParsers.forEach(({ autocorrector }) => {
      autocorrectArray.push(autocorrector(lines));
    });
  }
  // Apply autocorrect on the whole MRZ
  const corrected = lines.slice();
  for (let autocorrect of autocorrectArray) {
    for (let correction of autocorrect) {
      corrected[correction.line] = setCharAt(
        corrected[correction.line],
        correction.column,
        correction.corrected,
      );
    }
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

function setCharAt(source: string, index: number, replaceWith: string) {
  if (index > source.length - 1) return source;
  return source.substring(0, index) + replaceWith + source.substring(index + 1);
}
