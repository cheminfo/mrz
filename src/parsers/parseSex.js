'use strict';

module.exports = function parseSex(source) {
  switch (source) {
    case '<':
      return 'unknown';
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    default:
      throw new Error(
        `The sex "${source}" is incorrect. Allowed values: M, F or <.`
      );
  }
};
