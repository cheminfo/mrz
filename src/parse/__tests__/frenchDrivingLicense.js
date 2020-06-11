'use strict';

const parse = require('../parse');

describe('parse French Driving License', () => {
  it('valid MRZ', function () {
     const MRZ = [ 'D1FRA13BB148959280920BETTOLO<7' ];
    var result = parse(MRZ);
    expect(result.format).toBe('FRENCH_DRIVING_LICENSE');
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.fields).toEqual({
      documentCode: 'D',
      bapConfiguration: '1',
      issuingState: 'FRA',
      documentNumber: '13BB14895',
      documentNumberCheckDigit: '9',
      expirationDate: '280920',
      lastName: 'BETTOLO',
      compositeCheckDigit: '7'
    });
  });
});
