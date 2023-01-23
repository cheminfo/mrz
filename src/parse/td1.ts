'use strict';

import { formats } from '../formats';

import { getResult } from './getResult';
import { ParseMRZOptions } from './parse';
import TD1Fields from './td1Fields';

const TD1 = formats.TD1;
export default function parseTD1(lines: string[], options: ParseMRZOptions) {
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${TD1}`,
    );
  }
  lines.forEach((line: string, index) => {
    if (line.length !== 30) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 30 for ${TD1}`,
      );
    }
  });
  return getResult(TD1, lines, TD1Fields, options);
}
