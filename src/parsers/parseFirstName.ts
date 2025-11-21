import { parseText } from './parseText.ts';

export default function parseFirstName(source: string) {
  const withoutStart = source.replace(/.*?<{2}/, '');
  const value = parseText(
    withoutStart,
    source.length - withoutStart.length,
    /^[A-Z<]+<*$/,
  );
  const start = source.length - withoutStart.length;
  return {
    value,
    start,
    end: start + value.length,
  };
}
