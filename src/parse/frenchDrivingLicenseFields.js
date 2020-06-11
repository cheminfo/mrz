'use strict';

const parseDocumentCode = require('../parsers/euDrivingLicense/parseDocumentCode');
const parseBapConfiguration = require('../parsers/euDrivingLicense/parseBapConfiguration');
const parseState = require('../parsers/parseState');
const parseDocumentNumber = require('../parsers/euDrivingLicense/france/parseDocumentNumber');
const parseLastName = require('../parsers/euDrivingLicense/france/parseLastName');

const {
    documentCodeTemplate,
    bapConfigurationTemplate,
    issuingStateTemplate,
    documentNumberTemplate,
    documentNumberCheckDigitTemplate,
    expirationDateTemplate,
    lastNameTemplate,
    compositeCheckDigitTemplate
} = require('./fieldTemplates');
const createFieldParser = require('./createFieldParser');

module.exports = [
    Object.assign({}, documentCodeTemplate, {
        line: 0,
        start: 0,
        end: 1,
        parser: parseDocumentCode
    }),
    Object.assign({}, bapConfigurationTemplate, {
        line: 0,
        start: 1,
        end: 2,
        parser: parseBapConfiguration
    }),
    Object.assign({}, issuingStateTemplate, {
        line: 0,
        start: 2,
        end: 5,
        parser: parseState
    }),
    Object.assign({}, documentNumberTemplate, {
        line: 0,
        start: 5,
        end: 14,
        parser: parseDocumentNumber
    }),
    Object.assign({}, documentNumberCheckDigitTemplate, {
        line: 0,
        start: 14,
        end: 15,
        related: [
            {
                line: 0,
                start: 5,
                end: 14
            }
        ]
    }),
    Object.assign({}, expirationDateTemplate, {
        line: 0,
        start: 15,
        end: 21
    }),
    Object.assign({}, lastNameTemplate, {
        line: 0,
        start: 21,
        end: 29,
        parser: parseLastName
    }),
    Object.assign({}, compositeCheckDigitTemplate, {
        line: 0,
        start: 29,
        end: 30,
        related: [
            {
                line: 0,
                start: 0,
                end: 29
            }
        ]
    })
].map(createFieldParser);
