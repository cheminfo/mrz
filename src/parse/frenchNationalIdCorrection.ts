'use strict';

import { getInterval } from './utils/getInterval';

// based on https://en.wikipedia.org/wiki/National_identity_card_(France)
// TODO: this ressource must be confirmed

const lettersOnly = [[...getInterval(1, 30)], [...getInterval(14, 27), 35]];
const numbersOnly = [
  [],
  [...getInterval(1, 4), ...getInterval(8, 13), ...getInterval(28, 34), 36],
];

export const frenchNationalIdCorrection = {
  lettersOnly,
  numbersOnly,
};
