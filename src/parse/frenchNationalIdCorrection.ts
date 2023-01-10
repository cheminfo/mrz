'use strict';

import { getInterval } from './utils/getInterval';

// based on https://fr.wikipedia.org/wiki/Carte_nationale_d%27identit%C3%A9_en_France#Codage_Bande_MRZ_(lecture_optique)

const lettersOnly = [[...getInterval(1, 30)], [...getInterval(14, 27), 35]];
const numbersOnly = [
  [],
  [...getInterval(1, 4), ...getInterval(8, 13), ...getInterval(28, 34), 36],
];

export const frenchNationalIdCorrection = {
  lettersOnly,
  numbersOnly,
};
