'use strict';

import { cleanText } from './cleanText';

export function parseAlpha(source: string) {
  if (!source.match(/^[A-Z<]+$/)) {
    throw new Error(
      `invalid text: ${source}. Must be only alphabetical with <`,
    );
  }
  return cleanText(source);
}
