'use strict';

import { parseText } from './parseText';

export function parsePersonalNumber(source: string) {
  const value = parseText(source, /^[A-Z0-9<]+<*$/);
  return {
    value,
    start: 0,
    end: value.length,
  };
}
