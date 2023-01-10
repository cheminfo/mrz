'use strict';

import { getInterval } from './utils/getInterval';

// based on https://github.com/cheminfo/mrz/issues/2

const lettersOnly = [[], [...getInterval(1, 5)], getInterval(1, 30)];
const numbersOnly = [
  getInterval(4, 6),
  [...getInterval(6, 17), ...getInterval(20, 25)],
  [],
];

export const swissDrivingLicenseCorrection = {
  lettersOnly,
  numbersOnly,
};
