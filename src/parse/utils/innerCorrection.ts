'use strict';

import { Autocorrect } from '../autoCorrection';

const numberToLetterMismatches = {
  '8': 'B',
  '6': 'G',
  '0': 'O',
  '1': 'I',
  '5': 'S',
  '2': 'Z',
};
const letterToNumberMismatches = {
  B: '8',
  G: '6',
  O: '0',
  I: '1',
  S: '5',
  Z: '2',
};

export function letterToNumber(char: string) {
  if (letterToNumberMismatches[char]) {
    return letterToNumberMismatches[char];
  }
  return char;
}

export function numberToLetter(char: string) {
  if (numberToLetterMismatches[char]) {
    return numberToLetterMismatches[char];
  }
  return char;
}

export function innerCorrection(
  lines: string[],
  {
    lettersOnly,
    numbersOnly,
  }: {
    lettersOnly: number[][];
    numbersOnly: number[][];
  },
) {
  const correctedLines: string[] = [];
  const autocorrect: Autocorrect[] = [];
  lines.forEach((line, lineNumber) => {
    let correctedLine = '';
    const chars = line.split('');
    chars.forEach((char, charNumber) => {
      if (lettersOnly[lineNumber].includes(charNumber + 1)) {
        const correctedChar = numberToLetter(char);
        if (correctedChar !== char) {
          autocorrect.push({
            line: lineNumber,
            column: charNumber,
            original: char,
            corrected: correctedChar,
          });
        }
        correctedLine += correctedChar;
      } else if (numbersOnly[lineNumber].includes(charNumber + 1)) {
        const correctedChar = letterToNumber(char);
        if (correctedChar !== char) {
          autocorrect.push({
            line: lineNumber,
            column: charNumber,
            original: char,
            corrected: correctedChar,
          });
        }
        correctedLine += correctedChar;
      } else {
        correctedLine += char;
      }
    });
    correctedLines.push(correctedLine);
  });
  return { correctedLines, autocorrect };
}
