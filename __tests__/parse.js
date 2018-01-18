'use strict';
require('should');
const parse = require('../src/parse/parse.js');

describe('check TD1 parse', function () {
  const MRZ = [
    'I<UTOD231458907<<<<<<<<<<<<<<<',
    '7408122F1204159UTO<<<<<<<<<<<6',
    'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
  ];

  it('Check result', function () {
    const result = parse(MRZ);
    expect(result.annotations.filter((a) => !a.valid)).toHaveLength(2);
    expect(result.fields.firstname).toEqual('ANNA MARIA');
    expect(result.fields.lastname).toEqual('ERIKSSON');
    expect(result.fields.nationality).toBeNull();
    expect(result.fields.issuingCountry).toBeNull();
    expect(result.fields.documentType).toEqual('identity card');
    expect(result.fields.documentNumber).toEqual('D23145890');
    expect(result.fields.documentNumberCheckDigit).toEqual('7');
    expect(result.fields.birthDate).toEqual('12.08.74');
    expect(result.fields.birthDateCheckDigit).toEqual('2');
    expect(result.fields.expirationDate).toEqual('15.04.12');
    expect(result.fields.expirationDateCheckDigit).toEqual('9');
    expect(result.fields.gender).toEqual('female');
    expect(result.fields.optional2).toEqual('');
    expect(result.fields.globalCheckDigit).toEqual('6');
    expect(result.valid).toEqual(false);
    expect(
      result.annotations.find((a) => a.field === 'issuingCountry').valid
    ).toEqual(false);
  });
});

describe('check TD1 parse extended document number', function () {
  const MRZ = [
    'I<UTOD23145890<1233<<<<<<<<<<<',
    '7408122F1204159UTO<<<<<<<<<<<6',
    'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
  ];

  it('Check result', function () {
    const result = parse(MRZ);
    expect(result.fields.documentNumber).toEqual('D23145890123');
    expect(result.fields.documentNumberCheckDigit).toEqual('3');
  });
});

describe('check TD2 parse', function () {
  const MRZ = [
    'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<',
    'D231458907UTO7408122F1204159<<<<<<<6'
  ];

  it('Check result', function () {
    const result = parse(MRZ);
    const failed = result.annotations.filter((a) => !a.valid);
    expect(failed).toHaveLength(2);
    expect(result.fields.firstname).toEqual('ANNA MARIA');
    expect(result.fields.nationality).toBeNull();
    expect(result.fields.issuingCountry).toBeNull();
    expect(result.fields.documentNumber).toEqual('D23145890');
    expect(result.fields.documentNumberCheckDigit).toEqual('7');
    expect(result.fields.gender).toEqual('female');
    expect(result.fields.documentType).toEqual('identity card');
    expect(result.fields.birthDate).toEqual('12.08.74');
    expect(result.fields.birthDateCheckDigit).toEqual('2');
    expect(result.fields.expirationDate).toEqual('15.04.12');
    expect(result.fields.expirationDateCheckDigit).toEqual('9');
    expect(result.fields.globalCheckDigit).toEqual('6');
    expect(result.valid).toEqual(false);
  });
});

describe('check TD3 parse', function () {
  const MRZ =
    'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<\n' +
    'L898902C36UTO7408122F1204159ZE184226B<<<<<10';

  const expectedFirstname = 'ANNA MARIA';
  const expecteLastname = 'ERIKSSON';
  const expectedDocumentNumber = 'L898902C3';

  it('check result', function () {
    const result = parse(MRZ);
    const errors = result.annotations.filter((a) => !a.valid);
    expect(result.fields.documentType).toEqual('passport');
    expect(result.fields.firstname).toEqual(expectedFirstname);
    expect(result.fields.lastname).toEqual(expecteLastname);
    expect(result.fields.nationality).toBeNull();
    expect(result.fields.documentNumber).toEqual(expectedDocumentNumber);
    expect(result.fields.documentNumberCheckDigit).toEqual('6');
    expect(result.fields.nationality).toBeNull();
    expect(result.fields.gender).toEqual('female');
    expect(result.fields.expirationDate).toEqual('15.04.12');
    expect(result.fields.personalNumber).toEqual('ZE184226B');
    expect(result.fields.birthDate).toEqual('12.08.74');
    expect(result.fields.issuingCountry).toBeNull();
    expect(result.fields.globalCheckDigit).toEqual('0');
    // expect(errors).toHaveLength(2);
    // expect(result.valid).toEqual(false);
  });
});

describe.skip('check PCC parse', function () {
  const MRZ = `AAA001D<<
FACHE305142128097<<800126<<<<<
MARCHAND<<FABIENNE<<<<<<<<<<<<`;

  var result = parse(MRZ, { debug: true });
  it('Check result', function () {
    result.error.length.should.equal(0);
    result.firstname.value.should.equal('FABIENNE');
    result.issuingCountry.source.should.equal('CHE');
    result.issuingCountry.value.should.equal('Switzerland');
    result.documentNumber.source.should.equal('AAA001D<<');
  });
});
