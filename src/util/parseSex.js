'use strict';

module.exports = function parseSex(source) {
    var result = {
        source,
        label: 'Sex',
        error: []
    };
    switch (source) {
        case '<':
            result.value = 'Unknown';
            break;
        case 'M':
            result.value = 'Male';
            break;
        case 'F':
            result.value = 'Female';
            break;
        default:
            result.error.push(`The sex "${source}" is incorrect. Allowed values: M, F or <.`);
    }

    return result;
};
