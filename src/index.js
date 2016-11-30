'use strict';


const COUNTRIES = require('./util/countries');
const parse = require('./parse/parse');


function parseMRZ(text) {
    return parse(text);
}

module.exports = {
    COUNTRIES,
    parseMRZ
};
