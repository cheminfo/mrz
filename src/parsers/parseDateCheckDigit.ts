'use strict';

import { check } from './check';

export default function parseCheckDigit(checkDigit: string, value: string) {
  check(value, checkDigit);
  return checkDigit;
}
