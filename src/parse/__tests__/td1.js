'use strict';

const parse = require('../parse');

describe('parse TD1', () => {
  it('swiss ID - valid', () => {
    const data = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7510256M2009018CHE<<<<<<<<<<<8',
      'SMITH<<JOHN<ALBERT<<<<<<<<<<<<'
    ];

    const result = parse(data);
    expect(result).toMatchObject({
      valid: true,
      fields: {
        documentType: 'identity card',
        issuingCountry: 'Switzerland',
        documentNumber: 'A1234567',
        documentNumberCheckDigit: '6',
        birthDate: '25.10.75',
        birthDateCheckDigit: '6',
        gender: 'male',
        expirationDate: '01.09.20',
        expirationDateCheckDigit: '8',
        nationality: 'Switzerland',
        optional2: '',
        globalCheckDigit: '8',
        lastname: 'SMITH',
        firstname: 'JOHN ALBERT'
      }
    });
  });

  it('Utopia example', () => {
    const MRZ = [
      'I<UTOD231458907<<<<<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<6',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
    ];

    const result = parse(MRZ);
    expect(result.annotations.filter((a) => !a.valid)).toHaveLength(2);
    expect(result.fields).toEqual({
      firstname: 'ANNA MARIA',
      lastname: 'ERIKSSON',
      nationality: null,
      issuingCountry: null,
      documentType: 'identity card',
      documentNumber: 'D23145890',
      documentNumberCheckDigit: '7',
      birthDate: '12.08.74',
      birthDateCheckDigit: '2',
      expirationDate: '15.04.12',
      expirationDateCheckDigit: '9',
      gender: 'female',
      optional1: '',
      optional2: '',
      globalCheckDigit: '6'
    });
    expect(result.valid).toEqual(false);
    expect(
      result.annotations.find((a) => a.field === 'issuingCountry').valid
    ).toEqual(false);
  });

  it('parse document number', () => {
    const MRZ = [
      'I<UTOD23145890<1233<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<6',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
    ];
    const result = parse(MRZ);
    expect(result.fields.documentNumber).toEqual('D23145890123');
    expect(result.fields.documentNumberCheckDigit).toEqual('3');
  });
});
