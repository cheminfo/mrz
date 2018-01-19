'use strict';

module.exports = function check(string, value) {
  var code = 0;
  var factors = [7, 3, 1];
  for (var i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    if (charCode === 60) charCode = 0;
    if (charCode >= 65) charCode -= 55;
    if (charCode >= 48) charCode -= 48;
    charCode *= factors[i % 3];
    code += charCode;
  }
  code %= 10;
  if (code !== Number(value)) {
    throw new Error(`invalid check digit: ${value}. Must be ${code}`);
  }
};
