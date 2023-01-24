'use strict';

import { checkLines } from './checkLines';
import { parsers } from './parsers';

export interface ParseMRZOptions {
  autocorrect?: boolean;
}
function parseMRZ(
  inputLines: string | string[],
  options: ParseMRZOptions = {},
) {
  const lines = checkLines(inputLines);
  switch (lines.length) {
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parsers.td1(lines, options);
        case 36: {
          const endLine1 = lines[0].substring(30, 66);
          if (endLine1.match(/[0-9]/)) {
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
        `unrecognized document format. Input must have two or three lines, found ${lines.length}`,
      );
  }
}

export default parseMRZ;
