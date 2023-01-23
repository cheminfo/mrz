'use strict';

import parse from '../parse';

describe('parse French National Id', () => {
  it('valid MRZ', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
    ];

    const result = parse(MRZ);
    expect(result.format).toBe('FRENCH_NATIONAL_ID');
    // expect(result.valid).toStrictEqual(true);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.fields).toStrictEqual({
      documentCode: 'ID',
      issuingState: 'FRA',
      lastName: 'TEST NAME',
      administrativeCode: '0CHE02',
      issueDate: '1710',
      administrativeCode2: 'GVA',
      documentNumber: '12345',
      documentNumberCheckDigit: '1',
      firstName: 'ROBERTA',
      birthDate: '911231',
      birthDateCheckDigit: '1',
      sex: 'female',
      compositeCheckDigit: '2',
    });
  });
  it('Use autocorrect', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
    ];
    const falseMRZ = [
      '1DFRATE5T<NAME<<<<<<<<<<<<<<<<0CHE02',
      'I7I0GVA123451RO8ERTA<<<<<<<9IIZ3IIF2',
    ];

    const result = parse(MRZ);
    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(
      correctedResult.details.map(({ autocorrect }) => autocorrect),
    ).toStrictEqual([
      [{ line: 0, column: 0, original: '1', corrected: 'I' }],
      [],
      [{ line: 0, column: 7, original: '5', corrected: 'S' }],
      [],
      [
        { line: 1, column: 0, original: 'I', corrected: '1' },
        { line: 1, column: 2, original: 'I', corrected: '1' },
      ],
      [],
      [],
      [],
      [{ line: 1, column: 15, original: '8', corrected: 'B' }],
      [
        { line: 1, column: 28, original: 'I', corrected: '1' },
        { line: 1, column: 29, original: 'I', corrected: '1' },
        { line: 1, column: 30, original: 'Z', corrected: '2' },
        { line: 1, column: 32, original: 'I', corrected: '1' },
      ],
      [{ line: 1, column: 33, original: 'I', corrected: '1' }],
      [],
      [],
    ]);
  });
});
