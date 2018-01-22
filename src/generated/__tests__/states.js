'use strict';

const states = require('../../index').states;

describe('check countries', function () {
  it('Number of countries', function () {
    const codes = Object.keys(states);
    for (const code of codes) {
      if (code !== 'D') {
        expect(code).toHaveLength(3);
      }
    }
    expect(codes).toHaveLength(269);
    expect(states.CHE).toBe('Switzerland');
  });
});
