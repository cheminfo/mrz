'use strict';

import { Autocorrect, Details, FieldName, Range } from '../types';

import { autoCorrection } from './autoCorrection';

interface ParseResult {
  value: string;
  start: number;
  end: number;
}

type Parser = (source: string, ...related: string[]) => ParseResult | string;

type FieldTypes = keyof typeof fieldTypes;
export const fieldTypes = {
  NUMERIC: 'NUMERIC',
  ALPHABETIC: 'ALPHABETIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
} as const;

export interface FieldOptions {
  label: string;
  field: FieldName | null;
  line: number;
  start: number;
  end: number;
  parser: Parser;
  related?: Range[];
  type?: FieldTypes;
}

export interface CreateFieldParserResult {
  parser: (lines: string[], autocorrect: Autocorrect[]) => Details;
  autocorrector: (lines: string[]) => {
    autocorrect: Autocorrect[];
    correctedText: string;
    range: Range;
  };
}

export default function createFieldParser(
  fieldOptions: FieldOptions,
): CreateFieldParserResult {
  checkType(fieldOptions, 'label', 'string');
  if (fieldOptions.field !== null) {
    checkType(fieldOptions, 'field', 'string');
  }
  checkType(fieldOptions, 'line', 'number');
  checkType(fieldOptions, 'start', 'number');
  checkType(fieldOptions, 'end', 'number');
  checkType(fieldOptions, 'parser', 'function');

  const mainRange: Range = {
    line: fieldOptions.line,
    start: fieldOptions.start,
    end: fieldOptions.end,
  };

  const ranges: Range[] = [mainRange];
  if (Array.isArray(fieldOptions.related)) {
    for (const related of fieldOptions.related) {
      checkType(related, 'line', 'number');
      checkType(related, 'start', 'number');
      checkType(related, 'end', 'number');
      ranges.push(related);
    }
  }
  const parser: CreateFieldParserResult['parser'] = (
    lines: string[],
    autocorrect: Autocorrect[],
  ) => {
    const source = getText(lines, fieldOptions);
    const related = fieldOptions.related || [];
    const textRelated = related.map((r) => getText(lines, r));
    const result: Details = {
      label: fieldOptions.label,
      field: fieldOptions.field,
      value: null,
      valid: false,
      ranges: ranges.map((range) => ({
        ...range,
        raw: getText(lines, range),
      })),
      line: 0,
      start: 0,
      end: 0,
      autocorrect: [],
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
    } catch (e) {
      result.error = e.message;
    }

    for (const autocorrectElement of autocorrect) {
      if (
        autocorrectElement.line === result.line &&
        autocorrectElement.column >= result.start &&
        autocorrectElement.column < result.end
      ) {
        result.autocorrect.push(autocorrectElement);
      }
    }

    return result;
  };

  const autocorrector: CreateFieldParserResult['autocorrector'] = (
    lines: string[],
  ) => {
    const originalText = getText(lines, fieldOptions);
    return {
      ...autoCorrection(originalText, fieldOptions),
      range: mainRange,
    };
  };

  return { parser, autocorrector };
}

function getText(lines: string | string[], options: Range) {
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
