'use strict';

const { getAnnotations, completeResult } = require('./fieldHelper');
const { PCC: PCCFields } = require('./fields');

module.exports = function (lines) {
  if (lines[0].length !== 9) {
    throw new Error('First line must have 9 symbols');
  }
  if (lines[1].length !== 30) {
    throw new Error('Second line must have 30 symbols');
  }

  if (lines[2].length !== 30) {
    throw new Error('Third line must have 30 symbols');
  }
  const result = {
    format: 'swissDrivingLicence',
    annotations: getAnnotations(lines, PCCFields)
  };

  completeResult(result);
  return result;
};
