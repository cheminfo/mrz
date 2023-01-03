'use strict';

export function cleanText(string: string) {
  return string.replace(/<+$/g, '').replace(/</g, ' ');
}
