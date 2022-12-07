'use strict';

const formats = require('../formats');

function getDetails(lines, fieldParsers) {
  const details = [];
  for (const parser of fieldParsers) {
    details.push(parser(lines));
  }
  return details;
}

function getFields(details) {
  const fields = {};
  let valid = true;
  for (const detail of details) {
    if (!detail.valid) valid = false;
    if (detail.field) {
      fields[detail.field] = detail.value;
    }
  }
  return { fields, valid };
}

function getResult(format, lines, fieldParsers) {
  lines = cleanInvalidCharactersInName(format, lines);
  const details = getDetails(lines, fieldParsers);
  const fields = getFields(details);
  const result = {
    format,
    details,
    fields: fields.fields,
    valid: fields.valid,
  };
  return result;
}

function cleanInvalidCharactersInName(format, lines) {
  const commonNumberToLetterMismatches = {
    '8':'B', '6':'G', '0':'O', '3':'E', '1':'I', '5':'S', '2':'Z'
  }

  const keys = Object.keys(commonNumberToLetterMismatches);

  switch (format) {
    case formats.TD3:
      let topLine = lines[0].split("");
      lines[0] = topLine.map(v => {
        if (keys.includes(v)) {
          v = commonNumberToLetterMismatches[v] === undefined ? v : commonNumberToLetterMismatches[v];
        }
        return v;
      }).join(',').replaceAll(',','');
      break;
  }
  return lines;
}

module.exports = getResult;
