'use strict';

module.exports = function parseDocumentType(source) {
  if (source !== 'FA') {
    throw new Error('document type must be FA');
  }
  return source;
};
