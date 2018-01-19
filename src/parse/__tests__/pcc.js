'use strict';

const parse = require('../parse');

describe('parse Swiss Driving License', () => {
  it('valid MRZ', function () {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'MARCHAND<<FABIENNE<<<<<<<<<<<<'
    ];

    var result = parse(MRZ, { debug: true });
    expect(result.valid).toEqual(true);
    expect(result.annotations.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.fields).toEqual({
      documentNumber: 'AAA001D',
      language: 'D',
      documentType: 'FA',
      issuingCountry: 'Switzerland',
      pinCode: '305142128',
      versionNumber: '097',
      birthDate: '26.01.80',
      firstname: 'FABIENNE',
      lastname: 'MARCHAND'
    });
  });
});
