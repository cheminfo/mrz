'use strict';

import formats from '../formats';

import checkLines from './checkLines';
import getResult from './getResult';
import TD2Fields from './td2Fields';

const TD2 = formats.TD2;
export default function parseTD2(lines: string | string[]) {
  const result = checkLines(lines);
  if (result.length !== 2) {
    throw new Error(
      `invalid number of lines: ${result.length}: Must be 2 for ${TD2}`,
    );
  }
  result.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for TD2`,
      );
    }
  });
  return getResult(TD2, lines, TD2Fields);
}
