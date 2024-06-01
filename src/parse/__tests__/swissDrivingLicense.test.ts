import parse from '../parse';

describe('parse Swiss Driving License', () => {
  it('valid MRZ', () => {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'MARCHAND<<FABIENNE<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result.format).toBe('SWISS_DRIVING_LICENSE');
    expect(result.valid).toBe(true);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.details[0]).toStrictEqual({
      label: 'Document number',
      field: 'documentNumber',
      ranges: [{ line: 0, start: 0, end: 9, raw: 'AAA001D<<' }],
      line: 0,
      start: 0,
      end: 7,
      value: 'AAA001D',
      valid: true,
      autocorrect: [],
    });
    expect(result.details.at(-1)).toStrictEqual({
      label: 'First name',
      field: 'firstName',
      value: 'FABIENNE',
      valid: true,
      ranges: [
        {
          line: 2,
          start: 0,
          end: 30,
          raw: 'MARCHAND<<FABIENNE<<<<<<<<<<<<',
        },
      ],
      line: 2,
      start: 10,
      end: 18,
      autocorrect: [],
    });
    expect(result.fields).toStrictEqual({
      documentNumber: 'AAA001D',
      languageCode: 'D',
      documentCode: 'FA',
      issuingState: 'CHE',
      pinCode: '305142128',
      versionNumber: '097',
      birthDate: '800126',
      firstName: 'FABIENNE',
      lastName: 'MARCHAND',
    });
  });
  it('invalid text', () => {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'M4RCHAND<<FABI3NNE<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result.format).toBe('SWISS_DRIVING_LICENSE');
    expect(result.valid).toBe(false);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(2);
    expect(result.details[0]).toStrictEqual({
      label: 'Document number',
      field: 'documentNumber',
      ranges: [{ line: 0, start: 0, end: 9, raw: 'AAA001D<<' }],
      line: 0,
      start: 0,
      end: 7,
      value: 'AAA001D',
      valid: true,
      autocorrect: [],
    });
    expect(result.details.at(-1)).toStrictEqual({
      label: 'First name',
      field: 'firstName',
      value: 'FABI3NNE',
      valid: false,
      ranges: [
        {
          line: 2,
          start: 0,
          end: 30,
          raw: 'M4RCHAND<<FABI3NNE<<<<<<<<<<<<',
        },
      ],
      line: 2,
      start: 10,
      end: 18,
      error:
        'invalid text: FABI3NNE<<<<<<<<<<<<. Must match the following regular expression: /^[A-Z<]+<*$/',
      autocorrect: [],
    });
    expect(result.details.at(-2)).toMatchObject({
      field: 'lastName',
      value: 'M4RCHAND',
      valid: false,
      line: 2,
      start: 0,
      end: 8,
    });
    expect(result.fields).toStrictEqual({
      documentNumber: 'AAA001D',
      languageCode: 'D',
      documentCode: 'FA',
      issuingState: 'CHE',
      pinCode: '305142128',
      versionNumber: '097',
      birthDate: '800126',
      firstName: null,
      lastName: null,
    });
  });
  it('Use autocorrect', () => {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'MARCHAND<<FABIENNE<<<<<<<<<<<<',
    ];
    const falseMRZ = [
      'AAA001D<<',
      'FACHE30S142IZBO97<<8OO12G<<<<<',
      'MARCHAND<<FA81ENNE<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(
      correctedResult.details.map(({ autocorrect }) => autocorrect),
    ).toStrictEqual([
      [],
      [],
      [],
      [],
      [
        { line: 1, column: 7, original: 'S', corrected: '5' },
        { line: 1, column: 11, original: 'I', corrected: '1' },
        { line: 1, column: 12, original: 'Z', corrected: '2' },
        { line: 1, column: 13, original: 'B', corrected: '8' },
      ],
      [{ line: 1, column: 14, original: 'O', corrected: '0' }],
      [],
      [
        { line: 1, column: 20, original: 'O', corrected: '0' },
        { line: 1, column: 21, original: 'O', corrected: '0' },
        { line: 1, column: 24, original: 'G', corrected: '6' },
      ],
      [],
      [],
      [
        { line: 2, column: 12, original: '8', corrected: 'B' },
        { line: 2, column: 13, original: '1', corrected: 'I' },
      ],
    ]);
  });
});
