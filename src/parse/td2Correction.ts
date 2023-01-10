'use strict';

import { getInterval } from './utils/getInterval';

// based on https://www.icao.int/publications/Documents/9303_p6_cons_en.pdf

const lettersOnly = [getInterval(3, 36), [...getInterval(11, 13), 21]];
const numbersOnly = [
  [],
  [10, ...getInterval(14, 20), ...getInterval(22, 28), 36],
];

export const td2Correction = {
  lettersOnly,
  numbersOnly,
};
