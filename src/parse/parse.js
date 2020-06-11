'use strict';

const checkLines = require('./checkLines');
const formats = require('../formats');
const parsers = require('./parsers');

function parseMRZ(lines) {
  lines = checkLines(lines);
  switch (lines.length) {
    case 1:{
      if (lines[0].match(/^D[1PN<]FRA/)) {
        return parsers.FRENCH_DRIVING_LICENSE(lines);
      }
      throw new Error(
        'unrecognized document format. Input must match pattern /^D[1PN<]FRA/ (French Driving License)'
      );
    }
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parsers.TD1(lines);
        case 36: {
          if (lines[0].match(/^I.FRA/)) {
            return parsers.FRENCH_NATIONAL_ID(lines);
          } else {
            return parsers.TD2(lines);
          }
        }
        case 44:
          return parsers.TD3(lines);
        case 9:
          return parsers.SWISS_DRIVING_LICENSE(lines);
        default:
          throw new Error(
            'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters'
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document format. Input must have two or three lines, found${
          lines.length
        }`
      );
  }
}

for (const format in formats) {
  parseMRZ[format] = parsers[format];
}

module.exports = parseMRZ;
