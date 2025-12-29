import { expect, test } from 'vitest';

import { check } from '../check.ts';

test('check digits', () => {
  expect(() => check('592166117<231', 8)).not.toThrow();
  expect(() => check('592166111<773', 5)).not.toThrow();
  expect(() => check('007666667<ZZ0', 0)).not.toThrow();
  expect(() => check('007666667ZZ0', 0)).not.toThrow();
  expect(() => check('007777779ZZ9', 2)).not.toThrow();
  expect(() => check('600001795015', 2)).not.toThrow();
  expect(() => check('592166111<773', 4)).toThrow(/invalid check digit/);
});
