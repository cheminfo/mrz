'use strict';

export type FormatType = keyof typeof formats;

export const formats = {
  TD1: 'TD1',
  TD2: 'TD2',
  TD3: 'TD3',
  SWISS_DRIVING_LICENSE: 'SWISS_DRIVING_LICENSE',
  FRENCH_NATIONAL_ID: 'FRENCH_NATIONAL_ID',
} as const;
