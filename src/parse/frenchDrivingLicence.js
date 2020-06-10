'use strict';

const checkLines = require('./checkLines');
const getResult = require('./getResult');
const { FRENCH_DRIVING_LICENCE } = require('../formats');
const frenchDrivingLicenceFields = require('./frenchDrivingLicenceFields');

module.exports = function parseFrenchNationalId(lines) {
    lines = checkLines(lines);
    if (lines.length !== 1) {
        throw new Error(
            `invalid number of lines: ${
                lines.length
            }: Must be 1 for ${FRENCH_DRIVING_LICENCE}`
        );
    }
        if (lines[0].length !== 30) {
            throw new Error(
                `invalid number of characters for line: ${
                    lines[0].length
                }. Must be 30 for ${FRENCH_DRIVING_LICENCE}`
            );
        }
    return getResult(FRENCH_DRIVING_LICENCE, lines, frenchDrivingLicenceFields);
};
