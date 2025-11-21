import { check } from './check.ts';

export default function parseCompositeCheckDigit(
  checkDigit: string,
  ...sources: string[]
) {
  const source = sources.join('');
  check(source, checkDigit);
  return checkDigit;
}
