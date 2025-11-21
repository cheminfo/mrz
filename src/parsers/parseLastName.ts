import { parseText } from './parseText.ts';

export default function parseLastName(source: string) {
  const parsed = parseText(source.replace(/<{2}.*$/, ''), 0, /^[A-Z<]*<*$/);
  return {
    value: parsed,
    start: 0,
    end: parsed.length,
  };
}
