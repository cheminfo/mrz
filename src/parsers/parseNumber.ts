'use strict';

export function parseNumber(source: string) {
  if (!source.match(/^[0-9]+$/)) {
    throw new Error(`invalid number: ${source}`);
  }

  return source;
}
