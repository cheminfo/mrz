'use strict';

module.exports = function parseDocumentType(source) {
  var code = source.substring(0, 1);
  var type = source.substring(1, 2).replace('<', '');

  if (type === 'V') {
    throw new Error(
      `invalid document type: ${source}.Second symbol may not be V`
    );
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
      throw new Error(
        `invalid document type: ${
          source
        }.First symbol must be P, I, A or C`
      );
  }
};
