'use strict';

import { formats } from '../formats';

import { getResult } from './getResult';
import { ParseMRZOptions } from './parse';
import swissDrivingLicenseFields from './swissDrivingLicenseFields';

const SWISS_DRIVING_LICENSE = formats.SWISS_DRIVING_LICENSE;
export default function parseSwissDrivingLicense(
  lines: string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 3) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 3 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (lines[0].length !== 9) {
    throw new Error(
      `invalid number of characters for line 1: ${lines[0].length}. Must be 9 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  if (lines[1].length !== 30) {
    throw new Error(
      `invalid number of characters for line 2: ${lines[1].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }

  if (lines[2].length !== 30) {
    throw new Error(
      `invalid number of characters for line 3: ${lines[2].length}. Must be 30 for ${SWISS_DRIVING_LICENSE}`,
    );
  }
  return getResult(
    SWISS_DRIVING_LICENSE,
    lines,
    swissDrivingLicenseFields,
    options,
  );
}
