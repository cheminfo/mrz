import { check } from './check.ts';

export default function parseCheckDigit(checkDigit: string, value: string) {
  check(value, checkDigit);
  return checkDigit;
}
