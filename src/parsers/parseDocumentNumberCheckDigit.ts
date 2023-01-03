'use strict';

import { check } from './check';

export default function parseDocumentNumberCheckDigit(
  checkDigit: string,
  source: string,
  optional: string,
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    source = `${source}<${tail}`;
    checkDigit = optional.charAt(firstFiller - 1);
    check(source, checkDigit);
    return {
      value: checkDigit,
      start: firstFiller,
      end: firstFiller + 1,
    };
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
}
