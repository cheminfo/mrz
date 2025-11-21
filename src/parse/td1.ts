import { formats } from '../formats.ts';

import { getResult } from './getResult.ts';
import type { ParseMRZOptions } from './parse.ts';
import TD1Fields from './td1Fields.ts';

const TD1 = formats.TD1;
export default function parseTD1(
  lines: readonly string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${TD1}`,
    );
  }
  for (const [index, line] of lines.entries()) {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 30 for ${TD1}`,
      );
    }
  }
  return getResult(TD1, lines, TD1Fields, options);
}
