import type { Autocorrect } from '../types.ts';

import type { FieldOptions } from './createFieldParser.ts';
import { fieldTypes } from './createFieldParser.ts';

const numberToLetterMismatches: Record<string, string> = {
  '8': 'B',
  '6': 'G',
  '0': 'O',
  '1': 'I',
  '5': 'S',
  '2': 'Z',
};
const letterToNumberMismatches: Record<string, string> = {
  B: '8',
  G: '6',
  O: '0',
  I: '1',
  S: '5',
  Z: '2',
};
export function letterToNumber(char: string): string {
  if (letterToNumberMismatches[char]) {
    return letterToNumberMismatches[char];
  }
  return char;
}

export function numberToLetter(char: string): string {
  if (numberToLetterMismatches[char]) {
    return numberToLetterMismatches[char];
  }
  return char;
}

export function autoCorrection(
  source: string,
  fieldOptions: Pick<FieldOptions, 'line' | 'type' | 'start'>,
) {
  let correctedText = '';
  const autocorrect: Autocorrect[] = [];
  const chars = source.split('');
  for (const [i, char] of chars.entries()) {
    if (fieldOptions.type === fieldTypes.ALPHABETIC) {
      const correctedChar = numberToLetter(char);
      if (correctedChar !== char) {
        autocorrect.push({
          line: fieldOptions.line,
          column: fieldOptions.start + i,
          original: char,
          corrected: correctedChar,
        });
      }
      correctedText += correctedChar;
    } else if (fieldOptions.type === fieldTypes.NUMERIC) {
      const correctedChar = letterToNumber(char);
      if (correctedChar !== char) {
        autocorrect.push({
          line: fieldOptions.line,
          column: fieldOptions.start + i,
          original: char,
          corrected: correctedChar,
        });
      }
      correctedText += correctedChar;
    } else {
      correctedText += char;
    }
  }
  return { correctedText, autocorrect };
}
