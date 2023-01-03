'use strict';

import formats from '../formats';

import checkLines from './checkLines';
import getResult from './getResult';
import swissDrivingLicenseFields from './swissDrivingLicenseFields';

const SWISS_DRIVING_LICENSE = formats.SWISS_DRIVING_LICENSE;
export default function parseSwissDrivingLicense(lines: string | string[]) {
  const result = checkLines(lines);
  if (result.length !== 3) {
    throw new Error(
      `invalid number of lines: ${result.length}: Must be 3 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (result[0].length !== 9) {
    throw new Error(
      `invalid number of characters for line 1: ${result[0].length}. Must be 9 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (result[1].length !== 30) {
    throw new Error(
      `invalid number of characters for line 2: ${result[1].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }

  if (result[2].length !== 30) {
    throw new Error(
      `invalid number of characters for line 3: ${result[2].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  return getResult(SWISS_DRIVING_LICENSE, lines, swissDrivingLicenseFields);
}
