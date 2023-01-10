'use strict';

export const formats = {
  TD1: 'TD1',
  TD2: 'TD2',
  TD3: 'TD3',
  SWISS_DRIVING_LICENSE: 'SWISS_DRIVING_LICENSE',
  FRENCH_NATIONAL_ID: 'FRENCH_NATIONAL_ID',
};
export type FormatType = typeof formats[keyof typeof formats];
