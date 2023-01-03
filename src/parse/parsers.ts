'use strict';

import parseFrenchNationalId from './frenchNationalId';
import parseSwissDrivingLicense from './swissDrivingLicense';
import parseTD1 from './td1';
import parseTD2 from './td2';
import parseTD3 from './td3';

export const parsers = {
  td1: parseTD1,
  td2: parseTD2,
  td3: parseTD3,
  swissDrivingLicense: parseSwissDrivingLicense,
  frenchNationalId: parseFrenchNationalId,
};
