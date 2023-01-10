'use strict';

import { checkLines } from './checkLines';
import { parsers } from './parsers';

interface ParseMRZOptions {
  autocorrect?: boolean;
}
function parseMRZ(lines: string | string[], options: ParseMRZOptions = {}) {
  const { autocorrect = false } = options;
  const result = checkLines(lines);
  switch (result.length) {
    case 2:
    case 3: {
      switch (result[0].length) {
        case 30:
          return parsers.td1(result, autocorrect);
        case 36: {
          const endLine1 = result[0].substring(30, 66);
          if (endLine1.match(/[0-9]/)) {
            return parsers.frenchNationalId(result, autocorrect);
          } else {
            return parsers.td2(result, autocorrect);
          }
        }
        case 44:
          return parsers.td3(result, autocorrect);
        case 9:
          return parsers.swissDrivingLicense(result, autocorrect);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters',
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have two or three lines, found ${result.length}`,
      );
  }
}

export default parseMRZ;
