'use strict';

import { formats } from '../formats';

import checkLines from './checkLines';
import { parsers } from './parsers';

function parseMRZ(lines: string | string[]) {
  const result = checkLines(lines);
  switch (result.length) {
    case 2:
    case 3: {
      switch (result[0].length) {
        case 30:
          return parsers.td1(lines);
        case 36: {
          const endLine1 = lines[0].substr(30, 36);
          if (endLine1.match(/[0-9]/)) {
            return parsers.frenchNationalId(lines);
          } else {
            return parsers.td2(lines);
          }
        }
        case 44:
          return parsers.td3(lines);
        case 9:
          return parsers.swissDrivingLicense(lines);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters',
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have two or three lines, found${lines.length}`,
      );
  }
}

for (const format in formats) {
  parseMRZ[format] = parsers[format];
}

export default parseMRZ;
