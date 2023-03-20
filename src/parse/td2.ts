'use strict';

import { formats } from '../formats';
import { ParseMRZOptions } from '../types';
import getResult from './getResult';

import TD2Fields from './td2Fields';

const TD2 = formats.TD2;
/**
 * It takes an array of two strings, each of which is 36 characters long, and returns an object with
 * the parsed data
 * @param {string[]} lines - An array of strings, each string representing a line of the MRZ.
 * @param {ParseMRZOptions} options - ParseMRZOptions
 * @returns the result of the getResult function.
 */
export default function parseTD2(lines: string[], options: ParseMRZOptions) {
  if (lines.length !== 2) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 2 for ${TD2}`,
    );
  }
  lines.forEach((line, index) => {
    if (line.length !== 36) {
      throw new Error(
        `invalid number of characters for line ${index + 1}: ${
          line.length
        }. Must be 36 for TD2`,
      );
    }
  });
  return getResult(TD2, lines, TD2Fields, options);
}
