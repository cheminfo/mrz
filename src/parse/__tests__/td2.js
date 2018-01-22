'use strict';

const parse = require('../parse');

describe('parse TD2', () => {
  it('Utopia example', function () {
    const MRZ = [
      'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<',
      'D231458907UTO7408122F1204159<<<<<<<6'
    ];

    const result = parse(MRZ);
    const failed = result.details.filter((a) => !a.valid);
    expect(result).toMatchObject({
      format: 'TD2',
      valid: false
    });
    expect(failed).toHaveLength(2);
    expect(result.fields).toEqual({
      firstname: 'ANNA MARIA',
      lastname: 'ERIKSSON',
      nationality: null,
      issuingCountry: null,
      documentNumber: 'D23145890',
      documentNumberCheckDigit: '7',
      gender: 'female',
      documentType: 'identity card',
      birthDate: '12.08.74',
      birthDateCheckDigit: '2',
      expirationDate: '15.04.12',
      expirationDateCheckDigit: '9',
      globalCheckDigit: '6',
      optional: ''
    });
    expect(result.valid).toEqual(false);
  });
});
