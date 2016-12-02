'use strict';

const parse = require('../src/parse/parse.js');



describe('check parse', function () {

    const MRZ = `I<UTOD231458907<<<<<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;
    
    var result = parse(MRZ);
    it('Check result', function () {
        result.logs.length.should.equal(2);
        result.firstname.should.equal('ANNA MARIA');
        result.nationality.code = 'UTO';
        (result.isValid).should.be.equal(true);
    });
});

describe('check parse extended document number', function () {
    const MRZ = `I<UTOD23145890<1231<<<<<<<<<<<
    7408122F1204159UTO<<<<<<<<<<<6
    ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;
    
    var result = parse(MRZ);
    
    it('Check result', function () {
        result.documentNumber.value.should.equal('D23145890<123');
        (result.documentNumber.isValid).should.be.equal(true);
    });
});
