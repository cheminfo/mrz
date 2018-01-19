'use strict';

var parseText = require('./parseText');

module.exports = function (value) {
  return parseText(value, /^[A-Z0-9<]+<*$/);
};
