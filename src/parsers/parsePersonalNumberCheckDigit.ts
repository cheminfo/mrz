import { check } from './check.ts';
import { cleanText } from './cleanText.ts';

export function parsePersonalNumberCheckDigit(
  checkDigit: string,
  personalNumber: string,
) {
  const cleanNumber = cleanText(personalNumber);
  if (cleanNumber === '') {
    if (checkDigit !== '<' && checkDigit !== '0') {
      return {
        value: checkDigit,
        valid: false,
        error: `invalid check digit ${checkDigit}: must be 0 or <`,
      };
    } else {
      return checkDigit;
    }
  }
  return {
    value: checkDigit,
    ...check(personalNumber, checkDigit),
  };
}
