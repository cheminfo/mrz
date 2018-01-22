'use strict';

const createFieldParser = require('../parse/createFieldParser');

module.exports = {
  completeResult(result) {
    if (!result.fields) {
      result.fields = {};
    }
    let valid = true;
    for (let i = 0; i < result.details.length; i++) {
      const annotation = result.details[i];
      if (!annotation.valid) valid = false;
      if (annotation.field) {
        result.fields[annotation.field] = annotation.parsed;
      }
    }
    result.valid = valid;
  },

  getDetails(lines, fields) {
    const details = [];
    for (let i = 0; i < fields.length; i++) {
      const parser = createFieldParser(fields[i]);
      details.push(parser(lines));
    }
    return details;
  }
};
