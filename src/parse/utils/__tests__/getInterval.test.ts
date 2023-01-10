'use strict';

import { getInterval } from '../getInterval';

test('check getInterval', () => {
  const interval = getInterval(2, 6);
  expect(interval).toEqual([2, 3, 4, 5, 6]);
});
