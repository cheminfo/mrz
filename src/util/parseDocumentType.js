'use strict';


module.exports = function parseDocumentType(source) {
  var code = source.substring(0, 1);
  var type = source.substring(1, 2).replace('<', '');

  var result = {
    source,
    label: 'Document type',
    error: []
  };

  switch (code) {
    case 'P':
      result.value = 'Passport';
      break;
    case 'I':
      result.value = 'Identity card';
      break;
    case 'A':
      result.value = '';
      break;
    case 'C':
      result.value = '';
      break;
    default:
      result.error.push('Document type must be either P, I, A or C');
  }
  if (type === 'V') {
    result.error.push('Document type (second symbol) may not be V');
  }
  return result;
};
