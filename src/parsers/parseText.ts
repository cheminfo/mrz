import { cleanText } from './cleanText';

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
  constructor(
    message: string,
    public readonly value: string,
    public readonly start: number,
    public readonly end: number,
  ) {
    super(message);
  }
}
