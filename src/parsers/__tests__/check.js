'use strict';

const check = require('../check');

test('test check digits', () => {
  expect(check('592166117<231', 8)).toBe(true);
  expect(check('592166111<773', 5)).toBe(true);
});

