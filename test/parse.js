'use strict';

const parse = require('../src/parse/parse.js');


describe('check TD1 parse', function () {

    const MRZ = `I<UTOD231458907<<<<<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

    var result = parse(MRZ);
    it('Check result', function () {
        result.error.length.should.equal(2);
        result.firstname.value.should.equal('ANNA MARIA');
        result.nationality.source.should.equal('UTO');
        (result.isValid).should.be.equal(false);
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
        result.error.length.should.equal(2);
        result.firstname.value.should.equal('ANNA MARIA');
        result.nationality.source.should.equal('UTO');
        result.documentNumber.value.should.equal('D23145890');
        (result.isValid).should.be.equal(false);
    });
});


describe('check PCC parse', function () {

    const MRZ = `AAA001D<<
FACHE305142128097<<800126<<<<<
MARCHAND<<FABIENNE<<<<<<<<<<<<`;

    var result = parse(MRZ);
    it('Check result', function () {
        result.error.length.should.equal(0);
        result.firstname.value.should.equal('FABIENNE');
        result.issuingCountry.source.should.equal('CHE');
        result.issuingCountry.value.should.equal('Switzerland');
        result.documentNumber.source.should.equal('AAA001D<<');
    });
});
