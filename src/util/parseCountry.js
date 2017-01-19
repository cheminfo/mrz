'use strict';

const COUNTRIES = require('../generated/countries');

module.exports = function parseCountry(source) {
    var country = COUNTRIES[source];
    var result = {
        source,
        description: country,
        label: 'Country',
        error: []
    };
    if (!country) {
        result.error.push('The country code "' + source + '" is unknown');
    }
    return result;
};
