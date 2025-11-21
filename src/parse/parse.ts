import type { ParseResult } from '../types.ts';

import { checkLines } from './checkLines.ts';
import { parsers } from './parsers.ts';

export interface ParseMRZOptions {
  autocorrect?: boolean;
}

function parseMRZ(
  inputLines: string | readonly string[],
  options: ParseMRZOptions = {},
): ParseResult {
  const lines = checkLines(inputLines);
  switch (lines.length) {
    case 1: {
      switch (lines[0].length) {
        case 30:
          return parsers.frenchDrivingLicense(lines, options);
        default:
          throw new Error(
            `unrecognized document format. First line of input must have 30 (French Driving License) characters and it has a length of ${lines[0].length}`,
          );
      }
    }
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parsers.td1(lines, options);
        case 36: {
          if (
            lines[0].slice(30, 35).match(/[0-9]/) ||
            lines[0].match(/^IDFRA/)
          ) {
            return parsers.frenchNationalId(lines, options);
          } else {
            return parsers.td2(lines, options);
          }
        }
        case 44:
          return parsers.td3(lines, options);
        case 9:
          return parsers.swissDrivingLicense(lines, options);
        default:
          throw new Error(
            `unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters and it has a length of ${lines[0].length}`,
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have one, two or three lines, found ${lines.length}`,
      );
  }
}

export default parseMRZ;
