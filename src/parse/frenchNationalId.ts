import { formats } from '../formats.ts';

import frenchNationalIdFields from './frenchNationalIdFields.ts';
import { getResult } from './getResult.ts';
import type { ParseMRZOptions } from './parse.ts';

const FRENCH_NATIONAL_ID = formats.FRENCH_NATIONAL_ID;
export default function parseFrenchNationalId(
  lines: readonly string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${FRENCH_NATIONAL_ID}`,
    );
  }
  for (const [index, line] of lines.entries()) {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for ${FRENCH_NATIONAL_ID}`,
      );
    }
  }
  return getResult(FRENCH_NATIONAL_ID, lines, frenchNationalIdFields, options);
}
