'use strict';

export default function parseIssuingState(source: string) {
  if (source !== 'CHE' && source !== 'LIE') {
    throw new Error(`invalid state code: ${source}. Must be CHE or LIE`);
  }
  return source;
}
