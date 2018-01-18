'use strict';

var parseTD1 = require('./td1');
var parseTD2 = require('./td2');
var parseTD3 = require('./td3');
var parsePCC = require('./pcc');

module.exports = function parse(lines) {
  let result = {};
  if (typeof lines === 'string') {
    lines = lines.split(/[\r\n]+/);
  }
  switch (lines.length) {
    case 2:
      if (lines[0].length < 41) {
        result = parseTD2(lines);
      } else {
        result = parseTD3(lines);
      }
      break;
    case 3:
      if (lines[0].length < 15) {
        // in fact it should be 9
        result = parsePCC(lines);
      } else {
        result = parseTD1(lines);
      }

      break;
    default:
      throw new Error('input must be an array of 2 or 3 elements');
  }

  return result;
};
