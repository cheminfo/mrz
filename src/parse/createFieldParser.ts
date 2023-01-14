'use strict';

import { Autocorrect, autoCorrection } from './autoCorrection';

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
  ALPHABETIC: 'ALPHABETIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
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

export interface CreateFieldParserResult {
  parser: (lines: string[], autocorrect?: Autocorrect[]) => Details;
  autocorrector: (lines: string[]) => {
    correctedLines: string[];
    autocorrect: Autocorrect[];
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
  const parser = (lines: string[], autocorrect: Autocorrect[] = []) => {
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
  const autocorrector = (lines: string[]) => {
    let corrected = lines;
    let source = getText(lines, fieldOptions);
    let autocorrect: Autocorrect[] = [];
    const type = fieldOptions.type || fieldTypes.ALPHANUMERIC;
    if (type !== fieldTypes.ALPHANUMERIC) {
      const result = autoCorrection(source, fieldOptions);
      source = result.correctedLine;
      autocorrect = result.autocorrect;
    }
    corrected = changeText(lines, fieldOptions, source);
    return { correctedLines: corrected, autocorrect };
  };
  return { parser, autocorrector };
}

function getText(
  lines: string | string[],
  options: Pick<FieldOptions, 'line' | 'end' | 'start'>,
) {
  const line = lines[options.line];
  return line.substring(options.start, options.end);
}

function changeText(
  lines: string[],
  options: Pick<FieldOptions, 'line' | 'end' | 'start'>,
  text: string,
) {
  const line = lines[options.line];
  const newText =
    line.substring(0, options.start) + text + line.substring(options.end);
  lines[options.line] = newText;
  return lines;
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
