'use strict';

module.exports = function(fieldOptions) {
  const { parser, ...result } = fieldOptions;
  return function(lines) {
    const source = getText(lines, fieldOptions);
    let related = fieldOptions.related || [];
    related = related.map(r => getText(lines, r));

    try {
      let parsed = parser(source, ...related);
      result.parsed = parsed;
      result.valid = true;
    } catch (e) {
      result.parsed = null;
      result.valid = false;
      result.message = e.message;
    }
    return result;
  };
};

function getText(lines, options) {
  const line = lines[options.line];
  return line.substring(options.start, options.end);
}
