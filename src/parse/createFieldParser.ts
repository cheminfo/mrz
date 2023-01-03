'use strict';

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
}

interface ParseResult {
  value: string;
  start: number;
  end: number;
}

type Parser = (source: string, ...related: string[]) => ParseResult | string;

type FieldOptions = {
  label: string;
  field: string | null;
  line: number;
  start: number;
  end: number;
  parser: Parser;
  related?: Range[];
};
interface Range {
  line: number;
  start: number;
  end: number;
}
export type ParseFunction = (lines: string | string[]) => Details;
export function createFieldParser(fieldOptions: FieldOptions): ParseFunction {
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

  return function parseField(lines: string | string[]) {
    const source = getText(lines, fieldOptions);
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

function getText(lines: string | string[], options) {
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
