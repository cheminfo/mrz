'use strict';

import { formats, FormatType } from '../formats';

import { swissDrivingLicenseCorrection } from './swissDrivingLicenseCorrection';
import { td1Correction } from './td1Correction';
import { td2Correction } from './td2Correction';
import { td3Correction } from './td3Correction';
import { innerCorrection } from './utils/innerCorrection';

export interface Autocorrect {
  line: number;
  column: number;
  original: string;
  corrected: string;
}
export function autoCorrection(format: FormatType, lines: string[]) {
  switch (format) {
    case formats.TD1:
      return innerCorrection(lines, td1Correction);
    case formats.TD2:
      return innerCorrection(lines, td2Correction);
    case formats.TD3:
      return innerCorrection(lines, td3Correction);
    case formats.SWISS_DRIVING_LICENSE:
      return innerCorrection(lines, swissDrivingLicenseCorrection);
    default:
      return { correctedLines: lines, autocorrect: [] };
  }
}
