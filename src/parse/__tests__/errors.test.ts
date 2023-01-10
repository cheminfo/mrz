'use strict';

import parse from '../parse';

describe('Bad MRZ', () => {
  it('More then 3 lines', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
    ];
    expect(() => parse(MRZ)).toThrow(
      'unrecognized document format. Input must have two or three lines, found 4',
    );
  });
  it('Wrong format', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2<<<<<<<<0CHE02',
    ];
    expect(() => parse(MRZ)).toThrow(
      'unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters',
    );
  });
});
