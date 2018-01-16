'use strict';
require('should');
const parse = require('../src/parse/parse.js');

describe('check TD1 parse', function () {
  const MRZ =
    'I<UTOD231458907<<<<<<<<<<<<<<<\n' +
    '7408122F1204159UTO<<<<<<<<<<<6\n' +
    'ERIKSSON<<ANNA<MARIA<<<<<<<<<<';

  var result = parse(MRZ, { debug: true });
  it('Check result', function () {
    result.error.length.should.equal(2);
    result.firstname.value.should.equal('ANNA MARIA');
    result.nationality.source.should.equal('UTO');
    result.isValid.should.be.equal(false);
  });
});

describe('check TD1 parse extended document number', function () {
  const MRZ = `I<UTOD23145890<1233<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

  it('Check result (debug)', function () {
    const result = parse(MRZ, { debug: true });
    result.documentNumber.value.should.equal('D23145890123');
    result.documentNumber.isValid.should.be.equal(true);
  });

  it('Check result', function () {
    const result = parse(MRZ);
    result.values.documentNumber.should.equal('D23145890123');
  });
});

describe('check TD2 parse', function () {
  const MRZ = `I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<
D231458907UTO7408122F1204159<<<<<<<6`;

  var result = parse(MRZ, { debug: true });
  it('Check result', function () {
    result.error.length.should.equal(2);
    result.firstname.value.should.equal('ANNA MARIA');
    result.nationality.source.should.equal('UTO');
    result.documentNumber.value.should.equal('D23145890');
    result.isValid.should.be.equal(false);
  });
});

describe('check TD3 parse', function () {
  const MRZ =
    'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<\n' +
    'L898902C36UTO7408122F1204159ZE184226B<<<<<10';

  const expectedFirstname = 'ANNA MARIA';
  const expecteLastname = 'ERIKSSON';
  const expectedNationality = 'UTO';
  const expectedDocumentNumber = 'L898902C3';

  it('Check result (debug)', function () {
    const result = parse(MRZ, { debug: true });
    result.error.length.should.equal(2);
    result.firstname.value.should.equal(expectedFirstname);
    result.lastname.value.should.equal(expecteLastname);
    result.nationality.source.should.equal(expectedNationality);
    result.documentNumber.value.should.equal(expectedDocumentNumber);
    result.isValid.should.be.equal(false);
  });

  it('check result', function () {
    const result = parse(MRZ);
    result.values.firstname.should.equal(expectedFirstname);
    result.values.lastname.should.equal(expecteLastname);
    result.values.nationality.should.equal(expectedNationality);
    result.values.documentNumber.should.equal(expectedDocumentNumber);
    result.errors.length.should.equal(2);
    result.isValid.should.equal(false);
  });
});

describe('check PCC parse', function () {
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
