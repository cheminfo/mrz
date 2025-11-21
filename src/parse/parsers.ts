import parseFrenchDrivingLicense from './frenchDrivingLicence.ts';
import parseFrenchNationalId from './frenchNationalId.ts';
import parseSwissDrivingLicense from './swissDrivingLicense.ts';
import parseTD1 from './td1.ts';
import parseTD2 from './td2.ts';
import parseTD3 from './td3.ts';

export const parsers = {
  td1: parseTD1,
  td2: parseTD2,
  td3: parseTD3,
  swissDrivingLicense: parseSwissDrivingLicense,
  frenchNationalId: parseFrenchNationalId,
  frenchDrivingLicense: parseFrenchDrivingLicense,
};
