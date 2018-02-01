'use strict';

const parseTD1 = require('./td1');
const parseTD2 = require('./td2');
const parseTD3 = require('./td3');
const parseSwissDrivingLicense = require('./swissDrivingLicense');
const parseFrenchNationalId = require('./frenchNationalId');

module.exports = {
  TD1: parseTD1,
  TD2: parseTD2,
  TD3: parseTD3,
  SWISS_DRIVING_LICENSE: parseSwissDrivingLicense,
  FRENCH_NATIONAL_ID: parseFrenchNationalId
};
