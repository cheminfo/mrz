'use strict';

import { getInterval } from './utils/getInterval';

// based on https://www.icao.int/publications/Documents/9303_p5_cons_en.pdf

const lettersOnly = [
  getInterval(3, 5),
  [8, ...getInterval(16, 18)],
  getInterval(1, 30),
];
const numbersOnly = [
  [15],
  [...getInterval(1, 6), 7, ...getInterval(9, 14), 15, 30],
  [],
];

export const td1Correction = {
  lettersOnly,
  numbersOnly,
};
