'use strict';

import { cleanText } from './cleanText';

export default function parseDocumentNumber(
  source: string,
  checkDigit: string,
  optional: string,
) {
  let end: number, value: string;
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.substring(0, firstFiller - 1);
    value = source + tail;
    end = value.length + 1;
  } else {
    value = cleanText(source);
    end = value.length;
  }
  return {
    value,
    start: 0,
    end,
  };
}
