'use strict';

var parseTD1 = require('./td1');
var parseTD2 = require('./td2');
var parseTD3 = require('./td3');
var parsePCC = require('./pcc');

module.exports = function parse(lines) {
  if (typeof lines === 'string') {
    lines = lines.split(/[\r\n]+/);
  }
  if (!Array.isArray(lines)) {
    throw new TypeError('input must be an array or string');
  }
  for (const line of lines) {
    if (!line.match(/[A-Z0-9<]+/)) {
      throw new TypeError(
        'lines must be composed of only alphanumerical characters and "<"'
      );
    }
  }
  switch (lines.length) {
    case 2:
    case 3: {
      switch (lines[0].length) {
        case 30:
          return parseTD1(lines);
        case 36:
          return parseTD2(lines);
        case 44:
          return parseTD3(lines);
        case 9:
          return parsePCC(lines);
        default:
          throw new Error(
            'unrecognized document type. First line of input must have 30 (TD1), 36 (TD2), 44 (TD3) or 9 (Swiss Driving License) characters'
          );
      }
    }
    default:
      throw new Error(
        `unrecognized document type. Input must have two or three lines, found${
          lines.length
        }`
      );
  }
};
