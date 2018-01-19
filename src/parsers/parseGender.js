'use strict';

module.exports = function parseSex(source) {
  switch (source) {
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    case '<':
      return 'unknown';
    default:
      throw new Error(`invalid gender: ${source}. Must be M, F or <.`);
  }
};
