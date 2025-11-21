import { parseText } from './parseText.ts';

export function parseOptional(source: string) {
  const value = parseText(source, 0);

  return {
    value,
    start: 0,
    end: value.length,
  };
}
