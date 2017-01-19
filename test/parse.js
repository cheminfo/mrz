'use strict';

const parse = require('../src/parse/parse.js');


describe('check TD1 parse', function () {

    const MRZ = `I<UTOD231458907<<<<<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

    var result = parse(MRZ);
    it('Check result', function () {
        result.logs.length.should.equal(2);
        result.firstname.should.equal('ANNA MARIA');
        result.nationality.code.should.equal('UTO');
        (result.isValid).should.be.equal(true);
    });
});

describe('check TD1 parse extended document number', function () {
    const MRZ = `I<UTOD23145890<1233<<<<<<<<<<<
    7408122F1204159UTO<<<<<<<<<<<6
    ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

    var result = parse(MRZ);
    it('Check result', function () {
        result.documentNumber.value.should.equal('D23145890123');
        (result.documentNumber.isValid).should.be.equal(true);
    });
});

describe('check TD2 parse', function () {

    const MRZ = `I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<
D231458907UTO7408122F1204159<<<<<<<6`;

    var result = parse(MRZ);

    it('Check result', function () {
        result.logs.length.should.equal(2);
        result.firstname.should.equal('ANNA MARIA');
        result.nationality.code.should.equal('UTO');
        result.documentNumber.value.should.equal('D23145890');
        (result.isValid).should.be.equal(true);
    });
});


describe.only('check PCC parse', function () {

    const MRZ = `AAA001D<<
FACHE305142128097<<800126<<<<<
MARCHAND<<FABIENNE<<<<<<<<<<<<`;

    var result = parse(MRZ);
    console.log(result);
    it('Check result', function () {
        result.logs.length.should.equal(2);
        result.firstname.should.equal('FABIENNE');
        result.issuingCountry.code.should.equal('CHE');
        result.documentNumber.value.should.equal('AAA001D');
        
    });
});