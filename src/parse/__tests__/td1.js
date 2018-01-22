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
      format: 'TD1',
      valid: true
    });
    expect(result.fields).toEqual({
      documentCode: 'ID',
      issuingState: 'Switzerland',
      documentNumber: 'A1234567',
      documentNumberCheckDigit: '6',
      birthDate: '25.10.75',
      birthDateCheckDigit: '6',
      sex: 'male',
      expirationDate: '01.09.20',
      expirationDateCheckDigit: '8',
      nationality: 'Switzerland',
      optional1: '',
      optional2: '',
      compositeCheckDigit: '8',
      lastName: 'SMITH',
      firstName: 'JOHN ALBERT'
    });
  });

  it('Utopia example', () => {
    const MRZ = [
      'I<UTOD231458907<<<<<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<6',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
    ];

    const result = parse(MRZ);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(2);
    expect(result.fields).toEqual({
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      nationality: null,
      issuingState: null,
      documentCode: 'I',
      documentNumber: 'D23145890',
      documentNumberCheckDigit: '7',
      birthDate: '12.08.74',
      birthDateCheckDigit: '2',
      expirationDate: '15.04.12',
      expirationDateCheckDigit: '9',
      sex: 'female',
      optional1: '',
      optional2: '',
      compositeCheckDigit: '6'
    });
    expect(result.valid).toEqual(false);
    expect(
      result.details.find((a) => a.field === 'issuingState').valid
    ).toEqual(false);
  });

  it('parse document number', () => {
    const MRZ = [
      'I<UTOD23145890<1233<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<6',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
    ];
    const result = parse(MRZ);
    const documentNumberDetails = result.details.find(
      (d) => d.field === 'documentNumber'
    );
    expect(documentNumberDetails).toEqual({
      label: 'Document number',
      field: 'documentNumber',
      value: 'D23145890123',
      valid: true,
      ranges: [
        { line: 0, start: 5, end: 14, raw: 'D23145890' },
        { line: 0, start: 14, end: 15, raw: '<' },
        { line: 0, start: 15, end: 30, raw: '1233<<<<<<<<<<<' }
      ],
      line: 0,
      start: 5,
      end: 18
    });
    expect(result.fields.documentNumber).toEqual('D23145890123');
    expect(result.fields.documentNumberCheckDigit).toEqual('3');
  });
});
