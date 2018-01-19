'use strict';

module.exports = function parseDocumentType(source) {
  if (source !== 'FA') {
    throw new Error(`invalid document type: ${source}. Must be FA`);
  }
  return source;
};
