import { parseText } from './parseText.ts';

export function parseDocumentNumberOptional(optional: string) {
  const value = parseText(optional, 0);
  return {
    value,
    start: 0,
    end: value.length,
  };
}
