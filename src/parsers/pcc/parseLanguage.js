'use strict';

module.exports = function (language) {
  switch (language) {
    case 'D':
    case 'F':
    case 'I':
    case 'R':
      return language;
    default:
      throw new Error(
        `invalid language code: ${language}. Must be D, F, I or R`
      );
  }
};
