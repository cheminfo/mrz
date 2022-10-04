'use strict';

const parseFrenchNationalId = require('./frenchNationalId');
const parseSwissDrivingLicense = require('./swissDrivingLicense');
const parseTD1 = require('./td1');
const parseTD2 = require('./td2');
const parseTD3 = require('./td3');

module.exports = {
  td1: parseTD1,
  td2: parseTD2,
  td3: parseTD3,
  swissDrivingLicense: parseSwissDrivingLicense,
  frenchNationalId: parseFrenchNationalId,
};
