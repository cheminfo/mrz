import { cleanText } from './cleanText.ts';

export function parseText(
  source: string,
  initialStart: number,
  regexp = /^[0-9A-Z<]+$/,
) {
  const cleaned = cleanText(source);
  if (!regexp.test(source)) {
    throw new ParseTextError(
      `invalid text: ${source}. Must match the following regular expression: ${regexp.toString()}`,
      cleaned,
      initialStart,
      initialStart + cleaned.length,
    );
  }
  return cleaned;
}

export class ParseTextError extends Error {
  readonly value: string;
  readonly start: number;
  readonly end: number;

  constructor(message: string, value: string, start: number, end: number) {
    super(message);
    this.value = value;
    this.start = start;
    this.end = end;
  }
}
