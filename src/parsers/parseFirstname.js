'use strict';

var parseText = require('./parseText');

module.exports = function parseFirstname(source) {
  return parseText(source.replace(/.*?<{2}/, ''), /^[A-Z<]+<*$/);
};
