'use strict';

import { parseText } from './parseText';

export function parseOptional(source: string) {
  const value = parseText(source, 0);

  return {
    value,
    start: 0,
    end: value.length,
  };
}
