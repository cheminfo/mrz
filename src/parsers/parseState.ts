'use strict';

import STATES from '../generated/states';

import { cleanText } from './cleanText';

export default function parseState(source: string) {
  source = cleanText(source);
  const state = STATES[source];
  if (!state) {
    throw new Error(`invalid state code: ${source}`);
  }
  return {
    value: source,
    start: 0,
    end: source.length,
  };
}
