'use strict';

module.exports = function parseSex(source) {
    var value = '';
    if (source === '') value = 'Unknown';
    if (source === 'M') value = 'Male';
    if (source === 'F') value = 'Female';
    var result = {
        source,
        label:'Sex',
        value,
        error: []
    };
    if (!value) {
        result.error.push(`The sex "${source}" is incorrect. Allowed values: M, F or <.`);
    }
    return result;
};
