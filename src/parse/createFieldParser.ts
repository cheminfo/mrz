import { ParseTextError } from '../parsers/parseText.ts';
import type { Autocorrect, Details, FieldName, Range } from '../types.ts';

import { autoCorrection } from './autoCorrection.ts';

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
  parser: (
    lines: readonly string[],
    autocorrect: readonly Autocorrect[],
  ) => Details;
  autocorrector: (lines: readonly string[]) => {
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
    lines: readonly string[],
    autocorrect: readonly Autocorrect[],
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
    } catch (error) {
      result.error = error.message;
      if (error instanceof ParseTextError) {
        result.value = error.value;
        result.start = range.start + error.start;
        result.end = range.start + error.end;
      }
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
    lines: readonly string[],
  ) => {
    const originalText = getText(lines, fieldOptions);
    return {
      ...autoCorrection(originalText, fieldOptions),
      range: mainRange,
    };
  };

  return { parser, autocorrector };
}

function getText(lines: readonly string[], options: Range) {
  const line = lines[options.line];
  return line.slice(options.start, options.end);
}

function checkType<T extends object>(
  options: T,
  name: keyof T,
  type: 'string' | 'number' | 'function',
) {
  if (typeof options[name] !== type) {
    throw new TypeError(`${String(name)} must be a ${type}`);
  }
}
