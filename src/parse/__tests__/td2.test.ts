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
      'I<UTOERIKSSON<<ANNA<MAR1A<<<<<<<<<<<',
      'D231458907UTO740B1Z2F1204159<<<<<<<6',
    ];

    const result = parse(MRZ);
    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(correctedResult.autocorrect).toStrictEqual([
      { line: 0, column: 23, original: '1', corrected: 'I' },
      { line: 1, column: 16, original: 'B', corrected: '8' },
      { line: 1, column: 18, original: 'Z', corrected: '2' },
    ]);
  });
});
