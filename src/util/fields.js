'use strict';

const createFieldParser = require('../parse/createFieldParser');

module.exports = {
  completeResult(result) {
    if (!result.fields) {
      result.fields = {};
    }
    let valid = true;
    for (let i = 0; i < result.annotations.length; i++) {
      const annotation = result.annotations[i];
      if (!annotation.valid) valid = false;
      result.fields[annotation.field] = annotation.parsed;
    }
    result.valid = valid;
  },

  getAnnotations(lines, fields) {
    const annotations = [];
    for (let i = 0; i < fields.length; i++) {
      const parser = createFieldParser(fields[i]);
      annotations.push(parser(lines));
    }
    return annotations;
  }
};
