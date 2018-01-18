'use strict';

module.exports = function parseDate(value) {
  const year = value.substring(0, 2);
  const month = value.substring(2, 4);
  const day = value.substring(4, 6);

  if (month < 1 || month > 12) {
    throw new Error(`Month "${month}" not valid`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Day "${day}" not valid`);
  }

  return `${day}.${month}.${year}`;
};
