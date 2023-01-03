'use strict';

import { parseText } from './parseText';

export function parseOptional(source: string) {
  const value = parseText(source);

  return {
    value,
    start: 0,
    end: 0 + value.length,
  };
}
