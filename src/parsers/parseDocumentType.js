'use strict';

module.exports = function parseDocumentType(source) {
  var code = source.substring(0, 1);
  var type = source.substring(1, 2).replace('<', '');

  if (type === 'V') {
    throw new Error('Document type (second symbol) may not be V');
  }

  switch (code) {
    case 'P':
      return 'passport';
    case 'I':
      return 'identity card';
    case 'A':
      return '';
    case 'C':
      return '';
    default:
      throw new Error('Document type must be either P, I, A or C');
  }
};
