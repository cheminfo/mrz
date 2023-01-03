'use strict';

export default function parseLanguageCode(languageCode: string) {
  switch (languageCode) {
    case 'D':
    case 'F':
    case 'I':
    case 'R':
      return languageCode;
    default:
      throw new Error(
        `invalid languageCode code: ${languageCode}. Must be D, F, I or R`,
      );
  }
}
