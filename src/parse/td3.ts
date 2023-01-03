'use strict';

import formats from '../formats';

import checkLines from './checkLines';
import getResult from './getResult';
import TD3Fields from './td3Fields';

const TD3 = formats.TD3;
export default function parseTD3(lines: string | string[]) {
  const result = checkLines(lines);
  if (result.length !== 2) {
    throw new Error(
      `invalid number of lines: ${result.length}: Must be 2 for ${TD3}`,
    );
  }
  result.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 44 for TD3`,
      );
    }
  });
  return getResult(TD3, lines, TD3Fields);
}
