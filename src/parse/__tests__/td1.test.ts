'use strict';

import parse from '../parse';

describe('parse TD1', () => {
  it('swiss ID - valid', () => {
    const data = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7510256M2009018CHE<<<<<<<<<<<8',
      'SMITH<<JOHN<ALBERT<<<<<<<<<<<<',
    ];

    const result = parse(data);
    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
    });
    expect(result.fields).toStrictEqual({
      documentCode: 'ID',
      issuingState: 'CHE',
      documentNumber: 'A1234567',
      documentNumberCheckDigit: '6',
      birthDate: '751025',
      birthDateCheckDigit: '6',
      sex: 'male',
      expirationDate: '200901',
      expirationDateCheckDigit: '8',
      nationality: 'CHE',
      optional1: '',
      optional2: '',
      compositeCheckDigit: '8',
      lastName: 'SMITH',
      firstName: 'JOHN ALBERT',
    });

    const optional1Details = result.details.find(
      (f) => f.field === 'optional1',
    );
    expect(optional1Details).toMatchObject({
      value: '',
      line: 0,
      start: 15,
      end: 15,
    });
  });

  it('Utopia example', () => {
    const MRZ = [
      'I<UTOD231458907ABC<<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<1',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(2);
    expect(result.fields).toStrictEqual({
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      nationality: null,
      issuingState: null,
      documentCode: 'I',
      documentNumber: 'D23145890',
      documentNumberCheckDigit: '7',
      birthDate: '740812',
      birthDateCheckDigit: '2',
      expirationDate: '120415',
      expirationDateCheckDigit: '9',
      sex: 'female',
      optional1: 'ABC',
      optional2: '',
      compositeCheckDigit: '1',
    });
    expect(result.valid).toBe(false);
    expect(result.details.find((a) => a.field === 'issuingState')?.valid).toBe(
      false,
    );

    const optional1 = result.details.find((a) => a.field === 'optional1');
    expect(optional1).toMatchObject({
      value: 'ABC',
      line: 0,
      start: 15,
      end: 18,
    });

    const optional2 = result.details.find((a) => a.field === 'optional2');
    expect(optional2).toMatchObject({
      value: '',
      line: 1,
      start: 18,
      end: 18,
    });
  });

  it('parse document number', () => {
    const MRZ = [
      'I<UTOD23145890<1240<XYZ<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<8',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
    ];
    const result = parse(MRZ);
    expect(result.valid).toBe(false);
    expect(result.details.filter((f) => !f.valid)).toHaveLength(2);
    const documentNumberDetails = result.details.find(
      (d) => d.field === 'documentNumber',
    );
    expect(documentNumberDetails).toStrictEqual({
      label: 'Document number',
      field: 'documentNumber',
      value: 'D23145890124',
      valid: true,
      ranges: [
        { line: 0, start: 5, end: 14, raw: 'D23145890' },
        { line: 0, start: 14, end: 15, raw: '<' },
        { line: 0, start: 15, end: 30, raw: '1240<XYZ<<<<<<<' },
      ],
      line: 0,
      start: 5,
      end: 18,
      autocorrect: [],
    });
    expect(result.fields.documentNumber).toBe('D23145890124');
    expect(result.fields.documentNumberCheckDigit).toBe('0');

    const documentNumberCheckDigitDetails = result.details.find(
      (d) => d.field === 'documentNumberCheckDigit',
    );
    expect(documentNumberCheckDigitDetails).toMatchObject({
      line: 0,
      start: 18,
      end: 19,
      value: '0',
    });
  });

  it('No last name', () => {
    const MRZ = [
      'I<CHED231458907ABC<<<<<<<<<<<<',
      '7408122F1204159CHE<<<<<<<<<<<1',
      '<<ANNA<MARIA<<<<<<<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result.valid).toBe(true);
    expect(result.fields.lastName).toBe('');
    expect(result.fields.firstName).toBe('ANNA MARIA');
  });
  it('Use autocorrection', () => {
    const data = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7510256M2009018CHE<<<<<<<<<<<8',
      'SMITH<<JOHN<ALBERT<<<<<<<<<<<<',
    ];

    const falseData = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7SIOZSGMZOO90IBCHE<<<<<<<<<<<B',
      '5M1TH<<J0HN<AL8ERT<<<<<<<<<<<<',
    ];

    const result = parse(data);
    const correctedResult = parse(falseData, { autocorrect: true });
    expect(result.fields).toStrictEqual(correctedResult.fields);
    expect(
      correctedResult.details.map(({ autocorrect }) => autocorrect),
    ).toStrictEqual([
      [],
      [],
      [],
      [],
      [],
      [
        { line: 1, column: 1, original: 'S', corrected: '5' },
        { line: 1, column: 2, original: 'I', corrected: '1' },
        { line: 1, column: 3, original: 'O', corrected: '0' },
        { line: 1, column: 4, original: 'Z', corrected: '2' },
        { line: 1, column: 5, original: 'S', corrected: '5' },
      ],
      [{ line: 1, column: 6, original: 'G', corrected: '6' }],
      [],
      [
        { line: 1, column: 8, original: 'Z', corrected: '2' },
        { line: 1, column: 9, original: 'O', corrected: '0' },
        { line: 1, column: 10, original: 'O', corrected: '0' },
        { line: 1, column: 13, original: 'I', corrected: '1' },
      ],
      [{ line: 1, column: 14, original: 'B', corrected: '8' }],
      [],
      [],
      [{ line: 1, column: 29, original: 'B', corrected: '8' }],
      [
        { line: 2, column: 0, original: '5', corrected: 'S' },
        { line: 2, column: 2, original: '1', corrected: 'I' },
      ],
      [
        { line: 2, column: 8, original: '0', corrected: 'O' },
        { line: 2, column: 14, original: '8', corrected: 'B' },
      ],
    ]);
  });
});
