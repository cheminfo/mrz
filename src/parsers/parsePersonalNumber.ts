import { parseText } from './parseText.ts';

export function parsePersonalNumber(source: string) {
  const value = parseText(source, 0, /^[A-Z0-9<]+<*$/);
  return {
    value,
    start: 0,
    end: value.length,
  };
}
