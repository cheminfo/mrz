'use strict';

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
    });
    expect(result.details[result.details.length - 1]).toStrictEqual({
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
  it('Use autocorrect', () => {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'MARCHAND<<FABIENNE<<<<<<<<<<<<',
    ];
    const falseMRZ = [
      'AAAOOID<<',
      'FACHE30514Z1ZB097<<B001Z6<<<<<',
      'MARCHAND<<FA81ENNE<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(correctedResult.autocorrect).toStrictEqual([
      { line: 0, column: 3, original: 'O', corrected: '0' },
      { line: 0, column: 4, original: 'O', corrected: '0' },
      { line: 0, column: 5, original: 'I', corrected: '1' },
      { line: 1, column: 10, original: 'Z', corrected: '2' },
      { line: 1, column: 12, original: 'Z', corrected: '2' },
      { line: 1, column: 13, original: 'B', corrected: '8' },
      { line: 1, column: 19, original: 'B', corrected: '8' },
      { line: 1, column: 23, original: 'Z', corrected: '2' },
      { line: 2, column: 12, original: '8', corrected: 'B' },
      { line: 2, column: 13, original: '1', corrected: 'I' },
    ]);
  });
});
