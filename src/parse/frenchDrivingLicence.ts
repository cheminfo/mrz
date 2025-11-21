import { formats } from '../formats.ts';

import frenchDrivingLicenceFields from './frenchDrivingLicenceFields.ts';
import { getResult } from './getResult.ts';
import type { ParseMRZOptions } from './parse.ts';

const FRENCH_DRIVING_LICENSE = formats.FRENCH_DRIVING_LICENSE;
export default function parseFrenchDrivingLicense(
  lines: readonly string[],
  options: ParseMRZOptions,
) {
  if (lines.length !== 1) {
    throw new Error(
      `invalid number of lines: ${lines.length}: Must be 1 for ${FRENCH_DRIVING_LICENSE}`,
    );
  }
  if (lines[0].length !== 30) {
    throw new Error(
      `invalid number of characters for line 1: ${lines[0].length}. Must be 30 for ${FRENCH_DRIVING_LICENSE}`,
    );
  }

  return getResult(
    FRENCH_DRIVING_LICENSE,
    lines,
    frenchDrivingLicenceFields,
    options,
  );
}
