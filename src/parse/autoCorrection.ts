'use strict';

import { formats, FormatType } from '../formats';

import { td1Correction } from './td1Correction';
import { td2Correction } from './td2Correction';
import { innerCorrection } from './utils/innerCorrection';

export interface Autocorrect {
  line: number;
  column: number;
  original: string;
  corrected: string;
}
export function autoCorrection(format: FormatType, lines: string | string[]) {
  const linesArray = Array.isArray(lines) ? lines : [lines];
  switch (format) {
    case formats.TD1:
      return innerCorrection(linesArray, td1Correction);
    case formats.TD2:
      return innerCorrection(linesArray, td2Correction);
    default:
      return linesArray;
  }
}
