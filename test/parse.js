'use strict';

const parse = require('../src/parse/parse.js');

const MRZ = `I<UTOD231458907<<<<<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

describe('check parse', function () {
    var result = parse(MRZ);
    it('Check result', function () {
        result.logs.length.should.equal(2);
        result.value.firstname.should.equal('ANNA MARIA');
        result.value.nationality.code = 'UTO';
        (result.value.isValid).should.be.equal(true);
    });
});
