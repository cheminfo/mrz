'use strict';

/**
 * Returns an array of numbers from min to max
 * @param min minimum number
 * @param max maximum number
 * @returns array of numbers
 */
export function getInterval(min: number, max: number) {
  return Array.from({ length: max - min + 1 }, (_, i) => i + min);
}
