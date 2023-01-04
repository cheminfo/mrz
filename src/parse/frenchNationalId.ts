'use strict';

import formats from '../formats';

import checkLines from './checkLines';
import frenchNationalIdFields from './frenchNationalIdFields';
import getResult from './getResult';

const FRENCH_NATIONAL_ID = formats.FRENCH_NATIONAL_ID;
export default function parseFrenchNationalId(lines: string | string[]) {
  const result = checkLines(lines);
  if (result.length !== 2) {
    throw new Error(
      `invalid number of lines: ${result.length}: Must be 2 for ${FRENCH_NATIONAL_ID}`,
    );
  }
  result.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for ${FRENCH_NATIONAL_ID}`,
      );
    }
  });
  return getResult(FRENCH_NATIONAL_ID, lines, frenchNationalIdFields);
}
