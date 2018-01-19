'use strict';

const COUNTRIES = require('../countries.js');

describe('check countries', function () {
  it('Number of countries', function () {
    expect(Object.keys(COUNTRIES)).toHaveLength(264);
  });
});
