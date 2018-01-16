'use strict';

var parseText = require('.//parseText');

module.exports = function parseFirstname(label, source) {
  var result = parseText('Lastname', source.replace(/.*?<{2}/, ''), /^[A-Z<]+<*$/);
  return result;
};
