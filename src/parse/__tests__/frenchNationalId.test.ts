import parse from '../parse';

describe('parse French National Id', () => {
  it('valid MRZ', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'FRENCH_NATIONAL_ID',
      valid: true,
      documentNumber: '1710GVA12345',
    });

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

    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
  });

  it('valid MRZ with no administrative code', () => {
    const MRZ = [
      'IDFRABERTHIER<<<<<<<<<<<<<<<<<<<<<<<',
      '9409923102854CORINNE<<<<<<<6512068F4',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'FRENCH_NATIONAL_ID',
      valid: true,
      documentNumber: '940992310285',
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'ID',
      issuingState: 'FRA',
      lastName: 'BERTHIER',
      administrativeCode: '',
      issueDate: '9409',
      administrativeCode2: '923',
      documentNumber: '10285',
      documentNumberCheckDigit: '4',
      firstName: 'CORINNE',
      birthDate: '651206',
      birthDateCheckDigit: '8',
      sex: 'female',
      compositeCheckDigit: '4',
    });

    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
  });

  it('invalid MRZ', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GV?123451ROBERTA<<<<<<<9112311F2',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'FRENCH_NATIONAL_ID',
      valid: false,
      documentNumber: null,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'ID',
      issuingState: 'FRA',
      lastName: 'TEST NAME',
      administrativeCode: '0CHE02',
      issueDate: '1710',
      administrativeCode2: null,
      documentNumber: '12345',
      documentNumberCheckDigit: null,
      firstName: 'ROBERTA',
      birthDate: '911231',
      birthDateCheckDigit: '1',
      sex: 'female',
      compositeCheckDigit: null,
    });

    expect(result.details.filter((a) => !a.valid)).toHaveLength(3);
  });

  it('Use autocorrect', () => {
    const MRZ = [
      'IDFRATEST<NAME<<<<<<<<<<<<<<<<0CHE02',
      '1710GVA123451ROBERTA<<<<<<<9112311F2',
    ];

    const reference = parse(MRZ);

    const falseMRZ = [
      '1DFRATE5T<NAME<<<<<<<<<<<<<<<<0CHE02',
      'I7I0GVA123451RO8ERTA<<<<<<<9IIZ3IIF2',
    ];

    const correctedResult = parse(falseMRZ, { autocorrect: true });
    expect(correctedResult.fields).toStrictEqual(reference.fields);

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
