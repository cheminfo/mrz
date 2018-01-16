'use strict';

var parseTD1 = require('./td1');
var parseTD2 = require('./td2');
var parseTD3 = require('./td3');
var parsePCC = require('./pcc');

module.exports = function parse(text, options = {}) {
  const lines = text.split(/[\r\n]+/);
  let result = { logs: [] };
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
      result.logs.push('We need 2 or 3 lines');
  }

  if (options.debug) {
    return result;
  }

  const simpleResult = {
    values: {},
    errors: []
  };

  for (let key in result) {
    if (result[key].error) simpleResult.errors.push(...result[key].error);
    if (result[key].value !== undefined) {
      simpleResult.values[key] = result[key].value;
    }
  }
  simpleResult.isValid = result.isValid;

  return simpleResult;
};
