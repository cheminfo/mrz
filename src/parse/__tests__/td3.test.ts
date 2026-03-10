import { describe, expect, it } from 'vitest';

import parse from '../parse.ts';

describe('parse TD3', () => {
  it('Utopia example', () => {
    const MRZ = [
      'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO7408122F1204159ZE184226B<<<<<10',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: false,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'P',
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      documentNumber: 'L898902C3',
      documentNumberCheckDigit: '6',
      nationality: null,
      sex: 'female',
      expirationDate: '120415',
      expirationDateCheckDigit: '9',
      personalNumber: 'ZE184226B',
      personalNumberCheckDigit: '1',
      birthDate: '740812',
      birthDateCheckDigit: '2',
      issuingState: null,
      compositeCheckDigit: '0',
    });

    const errors = result.details.filter((a) => !a.valid);

    // Issuing state and nationality
    expect(errors).toHaveLength(2);

    const personalNumberDetails = result.details.find(
      (d) => d.field === 'personalNumber',
    );

    expect(personalNumberDetails).toStrictEqual({
      label: 'Personal number',
      field: 'personalNumber',
      value: 'ZE184226B',
      valid: true,
      ranges: [{ line: 1, start: 28, end: 42, raw: 'ZE184226B<<<<<' }],
      line: 1,
      start: 28,
      end: 37,
      autocorrect: [],
    });

    expect(errors[0]).toStrictEqual({
      label: 'Issuing state',
      field: 'issuingState',
      value: null,
      valid: false,
      ranges: [{ line: 0, start: 2, end: 5, raw: 'UTO' }],
      line: 0,
      start: 2,
      end: 5,
      error: 'invalid state code: UTO',
      autocorrect: [],
    });
  });

  it('Utopia example - wrong personal number check digit', () => {
    // The same example as the previous one, but the 2nd character from the end was changed from a '1' to a '2'.
    const MRZ = [
      'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO7408122F1204159ZE184226B<<<<<20',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: false,
      documentNumber: result.fields.documentNumber,
    });

    const wrongDetails = result.details.filter((item) => !item.valid);
    // Issuing state, nationality, personal number check digit and composite check digit
    expect(wrongDetails).toHaveLength(4);
    expect(
      wrongDetails.find((item) => item.field === 'personalNumberCheckDigit'),
    ).toMatchObject({
      start: 42,
      end: 43,
      value: '2',
      error: 'invalid check digit: 2. Must be 1',
    });

    expect(
      wrongDetails.find((item) => item.field === 'compositeCheckDigit'),
    ).toMatchObject({
      start: 43,
      end: 44,
      value: '0',
      error: 'invalid check digit: 0. Must be 1',
    });
  });

  it('German example', () => {
    const MRZ = [
      'P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<',
      'C01X0006H1D<<6408125F1710319<<<<<<<<<<<<<<<0',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'P',
      issuingState: 'D',
      lastName: 'MUSTERMANN',
      firstName: 'ERIKA',
      documentNumber: 'C01X0006H',
      documentNumberCheckDigit: '1',
      nationality: 'D',
      birthDate: '640812',
      birthDateCheckDigit: '5',
      sex: 'female',
      expirationDate: '171031',
      expirationDateCheckDigit: '9',
      personalNumber: '',
      personalNumberCheckDigit: '<',
      compositeCheckDigit: '0',
    });
  });

  it('No last name', () => {
    const MRZ = [
      'P<IND<<FIRST<NAME<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      'C01X0006H1D<<6408125F1710319<<<<<<<<<<<<<<<0',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'P',
      issuingState: 'IND',
      lastName: '',
      firstName: 'FIRST NAME',
      documentNumber: 'C01X0006H',
      documentNumberCheckDigit: '1',
      nationality: 'D',
      birthDate: '640812',
      birthDateCheckDigit: '5',
      sex: 'female',
      expirationDate: '171031',
      expirationDateCheckDigit: '9',
      personalNumber: '',
      personalNumberCheckDigit: '<',
      compositeCheckDigit: '0',
    });
  });

  it('CHN PO', () => {
    // found on https://www.rfa.org/english/news/uyghur/return-09252019172016.html/uyghur-ablikim-abla-passport-crop.jpg/@@images/image
    const MRZ = [
      'POCHNABULIKEMU<<ABULA<<<<<<<<<<<<<<<<<<<<<<<',
      'E596593216CHN9701078M2510077LAKCLCLMMBKGG932',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'PO',
      issuingState: 'CHN',
      lastName: 'ABULIKEMU',
      firstName: 'ABULA',
      documentNumber: 'E59659321',
      documentNumberCheckDigit: '6',
      nationality: 'CHN',
      birthDate: '970107',
      birthDateCheckDigit: '8',
      sex: 'male',
      expirationDate: '251007',
      expirationDateCheckDigit: '7',
      personalNumber: 'LAKCLCLMMBKGG9',
      personalNumberCheckDigit: '3',
      compositeCheckDigit: '2',
    });
  });

  it('CHN PT', () => {
    // found on https://upload.wikimedia.org/wikipedia/commons/a/a6/People%27s_Republic_of_China_Passport_%2897-2_version_for_Single_Exit_and_Entry%29.png
    const MRZ = [
      'PTCHNCESHI<<YANGBEN<<<<<<<<<<<<<<<<<<<<<<<<<',
      'G622925996CHN8310291F1904220LCOCMKNENBPJB984',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD3',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'PT',
      issuingState: 'CHN',
      lastName: 'CESHI',
      firstName: 'YANGBEN',
      documentNumber: 'G62292599',
      documentNumberCheckDigit: '6',
      nationality: 'CHN',
      birthDate: '831029',
      birthDateCheckDigit: '1',
      sex: 'female',
      expirationDate: '190422',
      expirationDateCheckDigit: '0',
      personalNumber: 'LCOCMKNENBPJB9',
      personalNumberCheckDigit: '8',
      compositeCheckDigit: '4',
    });
  });

  it('Use autocorrection', () => {
    const MRZ = [
      'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO7408122F1204159ZE184226B<<<<<10',
    ];

    const reference = parse(MRZ);

    const falseMRZ = [
      'P<UT0ERIK55ON<<ANNA<MAR1A<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO740BIZZF12041S9ZE184226B<<<<<1O',
    ];

    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(correctedResult.fields).toStrictEqual(reference.fields);

    expect(
      correctedResult.details.map(({ autocorrect }) => autocorrect),
    ).toStrictEqual([
      [],
      [{ line: 0, column: 4, original: '0', corrected: 'O' }],
      [
        { line: 0, column: 9, original: '5', corrected: 'S' },
        { line: 0, column: 10, original: '5', corrected: 'S' },
      ],
      [{ line: 0, column: 23, original: '1', corrected: 'I' }],
      [],
      [],
      [],
      [
        { line: 1, column: 16, original: 'B', corrected: '8' },
        { line: 1, column: 17, original: 'I', corrected: '1' },
        { line: 1, column: 18, original: 'Z', corrected: '2' },
      ],
      [{ line: 1, column: 19, original: 'Z', corrected: '2' }],
      [],
      [{ line: 1, column: 26, original: 'S', corrected: '5' }],
      [],
      [],
      [],
      [{ line: 1, column: 43, original: 'O', corrected: '0' }],
    ]);
  });
});
