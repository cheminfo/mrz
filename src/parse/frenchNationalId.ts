'use strict';

import { formats } from '../formats';

import frenchNationalIdFields from './frenchNationalIdFields';
import { getResult } from './getResult';
import { ParseMRZOptions } from './parse';

const FRENCH_NATIONAL_ID = formats.FRENCH_NATIONAL_ID;
export default function parseFrenchNationalId(
  lines: string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${FRENCH_NATIONAL_ID}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for ${FRENCH_NATIONAL_ID}`,
      );
    }
  });
  return getResult(FRENCH_NATIONAL_ID, lines, frenchNationalIdFields, options);
}
