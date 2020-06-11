'use strict';

const parse = require('../parse');

describe('parse French National Id', () => {
  it('valid MRZ', function () {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2'
    ];
    var result = parse(MRZ);
    expect(result.format).toBe('FRENCH_NATIONAL_ID');
    // expect(result.valid).toEqual(true);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.fields).toEqual({
      documentCode: 'ID',
      issuingState: 'FRA',
      lastName: 'TEST NAME',
      administrativeCode: '0CHE02',
      issueDate: '1710',
      administrativeCode2: 'GVA',
      documentNumber: '1710GVA12345',
      documentNumberCheckDigit: '1',
      firstName: 'ROBERTA',
      birthDate: '911231',
      birthDateCheckDigit: '1',
      sex: 'female',
      compositeCheckDigit: '2'
    });
  });

  it('valid MRZ of version without administrativeCode', function () {
    const MRZ = [
      'IDFRABERTHIER<<<<<<<<<<<<<<<<<<<<<<<',
      '9409923102854CORINNE<<<<<<<6512068F4'
    ];
    var result = parse(MRZ);
    expect(result.format).toBe('FRENCH_NATIONAL_ID');
    // expect(result.valid).toEqual(true);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.fields).toEqual({
      documentCode: 'ID',
      issuingState: 'FRA',
      lastName: 'BERTHIER',
      administrativeCode: '',
      issueDate: '9409',
      administrativeCode2: '923',
      documentNumber: '940992310285',
      documentNumberCheckDigit: '4',
      firstName: 'CORINNE',
      birthDate: '651206',
      birthDateCheckDigit: '8',
      sex: 'female',
      compositeCheckDigit: '4'
    });
  });
});
