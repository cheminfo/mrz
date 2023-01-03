'use strict';

import { cleanText } from './cleanText';

export function parseText(source: string, regexp = /^[0-9A-Z<]+$/) {
  if (!source.match(regexp)) {
    throw new Error(
      `invalid text: ${source}. Must match the following regular expression: ${regexp.toString()}`,
    );
  }
  return cleanText(source);
}
