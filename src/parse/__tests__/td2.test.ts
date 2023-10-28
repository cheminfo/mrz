'use strict';

import parse from '../parse';

describe('parse TD2', () => {
  it('Utopia example', () => {
    const MRZ = [
      'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<',
      'D231458907UTO7408122F1204159<<<<<<<6',
    ];

    const result = parse(MRZ);
    const failed = result.details.filter((a) => !a.valid);
    expect(result).toMatchObject({
      format: 'TD2',
      valid: false,
    });
    expect(failed).toHaveLength(2);
    expect(result.fields).toStrictEqual({
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      nationality: null,
      issuingState: null,
      documentNumber: 'D23145890',
      documentNumberCheckDigit: '7',
      sex: 'female',
      documentCode: 'I',
      birthDate: '740812',
      birthDateCheckDigit: '2',
      expirationDate: '120415',
      expirationDateCheckDigit: '9',
      compositeCheckDigit: '6',
      optional: '',
    });
    expect(result.valid).toBe(false);
  });
  it('Use autocorrect', () => {
    const MRZ = [
      'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<',
      'D231458907UTO7408122F1204159<<<<<<<6',
    ];
    const falseMRZ = [
      'I<UTOERIK55ON<<ANNA<MAR1A<<<<<<<<<<<',
      'D231458907UT0740BIZZF12O4IS9<<<<<<<G',
    ];

    const result = parse(MRZ);
    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(
      correctedResult.details.map(({ autocorrect }) => autocorrect),
    ).toStrictEqual([
      [],
      [],
      [
        { line: 0, column: 9, original: '5', corrected: 'S' },
        { line: 0, column: 10, original: '5', corrected: 'S' },
      ],
      [{ line: 0, column: 23, original: '1', corrected: 'I' }],
      [],
      [],
      [{ line: 1, column: 12, original: '0', corrected: 'O' }],
      [
        { line: 1, column: 16, original: 'B', corrected: '8' },
        { line: 1, column: 17, original: 'I', corrected: '1' },
        { line: 1, column: 18, original: 'Z', corrected: '2' },
      ],
      [{ line: 1, column: 19, original: 'Z', corrected: '2' }],
      [],
      [
        { line: 1, column: 23, original: 'O', corrected: '0' },
        { line: 1, column: 25, original: 'I', corrected: '1' },
        { line: 1, column: 26, original: 'S', corrected: '5' },
      ],
      [],
      [],
      [{ line: 1, column: 35, original: 'G', corrected: '6' }],
    ]);
  });
});
