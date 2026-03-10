import { expect, test } from 'vitest';

import { check, computeCheckDigit } from '../check.ts';

test('check digits', () => {
  expect(() => check('592166117<231', 8)).not.toThrow();
  expect(() => check('592166111<773', 5)).not.toThrow();
  expect(() => check('007666667<ZZ0', 0)).not.toThrow();
  expect(() => check('007666667ZZ0', 0)).not.toThrow();
  expect(() => check('007777779ZZ9', 2)).not.toThrow();
  expect(() => check('600001795015', 2)).not.toThrow();
  expect(() => check('592166111<773', 4)).toThrow(/invalid check digit/);
});

test('compute embedded TD1 check digit - undetermined', () => {
  // https://www.consilium.europa.eu/prado/en/PRT-BO-04001/index.html
  // I<PRT007666667<ZZ00<<<<<<<<<<<
  expect(computeCheckDigit('007666667<ZZ0')).toBe(0);
  expect(computeCheckDigit('007666667ZZ0')).toBe(0);
});

test('compute embedded TD1 check digit - must include < character', () => {
  // https://www.consilium.europa.eu/prado/en/BEL-BO-03003/index.html
  // IDBEL000590240<6013<<<<<<<<<<<
  expect(computeCheckDigit('000590240<601')).toBe(3);
  expect(computeCheckDigit('000590240601')).not.toBe(3);
});

test('compute embedded TD1 check digit - must not include < character', () => {
  // https://www.consilium.europa.eu/prado/en/BEL-BO-11005/index.html
  // IDBEL600001795<0152<<<<<<<<<<<
  expect(computeCheckDigit('600001795015')).toBe(2);
  expect(computeCheckDigit('600001795<015')).not.toBe(2);
});

test('embedded check digit - ICAO', () => {
  // https://www.icao.int/sites/default/files/publications/DocSeries/9303_p11_cons_en.pdf
  // Page 88
  // I<UTOD23145890<7349<<<<<<<<<<<
  // The ICAO document says it uses the number without the '<' character, but both yield the same result.
  expect(computeCheckDigit('D23145890734')).toBe(9);
  expect(computeCheckDigit('D23145890<734')).toBe(9);
});
