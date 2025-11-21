import { parseText } from './parseText.ts';

export function parseDocumentNumberOptional(
  optional: string,
  checkDigit: string,
) {
  if (checkDigit === '<') {
    const firstFiller = optional.indexOf('<');
    const value = parseText(optional.slice(firstFiller + 1), firstFiller + 1);
    return {
      value,
      start: firstFiller + 1,
      end: firstFiller + 1 + value.length,
    };
  } else {
    const value = parseText(optional, 0);
    return {
      value,
      start: 0,
      end: value.length,
    };
  }
}
