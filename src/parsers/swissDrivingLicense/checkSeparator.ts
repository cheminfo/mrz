'use strict';

export function checkSeparator(source: string) {
  if (!source.match(/^<*$/)) {
    throw new Error(
      `invalid separator: ${source}. Must be composed only of "<"`,
    );
  }
  return source;
}
