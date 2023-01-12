'use strict';

import { formats } from '../formats';

import { getResult } from './getResult';
import { ParseMRZOptions } from './parse';
import TD3Fields from './td3Fields';

const TD3 = formats.TD3;
export default function parseTD3(lines: string[], options: ParseMRZOptions) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD3}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 44) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 44 for TD3`,
      );
    }
  });
  return getResult(TD3, lines, TD3Fields, options);
}
