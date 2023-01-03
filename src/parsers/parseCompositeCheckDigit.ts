'use strict';

import { check } from './check';

export default function parseCompositeCheckDigit(
  checkDigit: string,
  ...sources: string[]
) {
  const source = sources.join('');
  check(source, checkDigit);
  return checkDigit;
}
