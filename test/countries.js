'use strict';

const COUNTRIES = require('../src/util/countries.js');

describe('check countries', function () {
    it('Number of countries', function () {
        Object.keys(COUNTRIES).length.should.equal(264);
    });
});
