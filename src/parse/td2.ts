import { formats } from '../formats.ts';

import { getResult } from './getResult.ts';
import type { ParseMRZOptions } from './parse.ts';
import TD2Fields from './td2Fields.ts';

const TD2 = formats.TD2;
export default function parseTD2(
  lines: readonly string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD2}`,
    );
  }
  for (const [index, line] of lines.entries()) {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for TD2`,
      );
    }
  }
  return getResult(TD2, lines, TD2Fields, options);
}
