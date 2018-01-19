'use strict';

module.exports = function (language) {
  switch (language) {
    case 'D':
      return 'german';
    case 'F':
      return 'french';
    case 'I':
      return 'italian';
    case 'R':
      return 'romansh';
    default:
      throw new Error(`language ${language} unknown.`);
  }
};
