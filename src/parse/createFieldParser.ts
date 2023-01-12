'use strict';

import { Autocorrect, autoCorrection } from './autoCorrection';
import { ParseMRZOptions } from './parse';

export interface Details {
  label: string;
  field: string | null;
  value: string | null;
  valid: boolean;
  ranges: Range[];
  line: number;
  start: number;
  end: number;
  error?: string;
  autocorrect: Autocorrect[];
}

interface ParseResult {
  value: string;
  start: number;
  end: number;
}

type Parser = (source: string, ...related: string[]) => ParseResult | string;

type FieldTypes = keyof typeof fieldTypes;
export const fieldTypes = {
  NUMERIC: 'NUMERIC',
  CHARACTERS: 'CHARACTERS',
  BOTH: 'BOTH',
} as const;

export type FieldOptions = {
  label: string;
  field: string | null;
  line: number;
  start: number;
  end: number;
  parser: Parser;
  related?: Range[];
  type?: FieldTypes;
};
interface Range {
  line: number;
  start: number;
  end: number;
}
export type ParseFunction = (
  lines: string[],
  options: ParseMRZOptions,
) => Details;
export default function createFieldParser(
  fieldOptions: FieldOptions,
): ParseFunction {
  checkType(fieldOptions, 'label', 'string');
  if (fieldOptions.field !== null) {
    checkType(fieldOptions, 'field', 'string');
  }
  checkType(fieldOptions, 'line', 'number');
  checkType(fieldOptions, 'start', 'number');
  checkType(fieldOptions, 'end', 'number');
  checkType(fieldOptions, 'parser', 'function');

  const ranges: Range[] = [
    {
      line: fieldOptions.line,
      start: fieldOptions.start,
      end: fieldOptions.end,
    },
  ];
  if (Array.isArray(fieldOptions.related)) {
    for (const related of fieldOptions.related) {
      checkType(related, 'line', 'number');
      checkType(related, 'start', 'number');
      checkType(related, 'end', 'number');
      ranges.push(related);
    }
  }
  return function parseField(lines: string[], options: ParseMRZOptions) {
    const { autocorrect: autocorrectOption = false } = options;
    let source = getText(lines, fieldOptions);
    let autocorrect: Autocorrect[] = [];
    const type = fieldOptions.type || fieldTypes.BOTH;

    if (autocorrectOption && type !== fieldTypes.BOTH) {
      const corrected = autoCorrection(source, fieldOptions);
      source = corrected.correctedLine;
      autocorrect = corrected.autocorrect;
    }
    const related = fieldOptions.related || [];
    const textRelated = related.map((r) => getText(lines, r));
    const result: Details = {
      label: fieldOptions.label,
      field: fieldOptions.field,
      value: null,
      valid: false,
      ranges: ranges.map((range) => ({
        line: range.line,
        start: range.start,
        end: range.end,
        raw: getText(lines, range),
      })),
      line: 0,
      start: 0,
      end: 0,
      autocorrect,
    };
    const range = result.ranges[0];
    result.line = range.line;
    result.start = range.start;
    result.end = range.end;
    try {
      const parsed = fieldOptions.parser(source, ...textRelated);
      result.value = typeof parsed === 'object' ? parsed.value : parsed;
      result.valid = true;
      if (typeof parsed === 'object') {
        result.start = range.start + parsed.start;
        result.end = range.start + parsed.end;
      }
    } catch (e: any) {
      result.error = e.message;
    }
    return result;
  };
}

function getText(
  lines: string | string[],
  options: Pick<FieldOptions, 'line' | 'end' | 'start'>,
) {
  const line = lines[options.line];
  return line.substring(options.start, options.end);
}

function checkType(
  options: object,
  name: string,
  type: 'string' | 'number' | 'function',
) {
  if (typeof options[name] !== type) {
    throw new TypeError(`${name} must be a ${type}`);
  }
}
