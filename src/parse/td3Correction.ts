'use strict';

import { getInterval } from './utils/getInterval';

// based on https://www.icao.int/publications/Documents/9303_p4_cons_en.pdf

const lettersOnly = [getInterval(1, 44), [...getInterval(11, 13), 21]];
const numbersOnly = [
  [],
  [10, ...getInterval(14, 20), ...getInterval(22, 28), 43, 44],
];

export const td3Correction = {
  lettersOnly,
  numbersOnly,
};
