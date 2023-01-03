'use strict';

import { check } from './check';
import { cleanText } from './cleanText';

export function parsePersonalNumberCheckDigit(
  checkDigit: string,
  personalNumber: string,
) {
  const cleanNumber = cleanText(personalNumber);
  if (cleanNumber === '') {
    if (checkDigit !== '<' && checkDigit !== '0') {
      throw new Error(`invalid check digit ${checkDigit}: must be 0 or <`);
    } else {
      return checkDigit;
    }
  }
  check(personalNumber, checkDigit);
  return checkDigit;
}
