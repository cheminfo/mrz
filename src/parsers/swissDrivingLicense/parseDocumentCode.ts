'use strict';

export default function parseDocumentCode(source: string) {
  if (source !== 'FA') {
    throw new Error(`invalid document code: ${source}. Must be FA`);
  }
  return source;
}
