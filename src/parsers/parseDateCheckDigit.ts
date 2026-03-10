import { check } from './check.ts';

export default function parseCheckDigit(checkDigit: string, value: string) {
  return {
    value: checkDigit,
    ...check(value, checkDigit),
  };
}
