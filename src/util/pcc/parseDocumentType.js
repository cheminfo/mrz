'use strict';

module.exports = function parseDocumentType(source) {
  var result = {
    label: 'Document type',
    source,
    error: []
  };
  switch (result.source) {
    case 'FA':
      result.value = 'Swiss driving license';
      break;
    default:
      result.error.push('Swiss driving license must have a document type "FA"');
  }
  return result;
};
