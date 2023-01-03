'use strict';

import { parseText } from './parseText';

export default function parseLastName(source: string) {
  const parsed = parseText(source.replace(/<{2}.*/, ''), /^[A-Z<]*<*$/);
  return {
    value: parsed,
    start: 0,
    end: parsed.length,
  };
}
