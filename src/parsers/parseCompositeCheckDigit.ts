import { check } from './check.ts';

export default function parseCompositeCheckDigit(
  checkDigit: string,
  ...sources: string[]
) {
  const source = sources.join('');
  const checkResult = check(source, checkDigit);
  return {
    value: checkDigit,
    ...checkResult,
  };
}
