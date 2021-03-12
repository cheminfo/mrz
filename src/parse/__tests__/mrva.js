'use strict';

const parse = require('../parse');

describe('parse MRV-A', () => {
  it('Utopia example', function () {
    const MRZ = [
      'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C<3UTO6908061F9406236ZE184226B<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result).toMatchObject({
      valid: false,
      format: 'MRVA',
    });
    expect(result.valid).toBe(false);
    const errors = result.details.filter((a) => !a.valid);
    expect(errors).toHaveLength(2);
    expect(result.fields).toStrictEqual({
      documentCode: 'V',
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      documentNumber: 'L898902C',
      documentNumberCheckDigit: '3',
      nationality: null,
      sex: 'female',
      expirationDate: '940623',
      expirationDateCheckDigit: '6',
      birthDate: '690806',
      birthDateCheckDigit: '1',
      issuingState: null,
      optionalData: 'ZE184226B',
    });

    const optionalDataDetails = result.details.find(
      (d) => d.field === 'optionalData',
    );
    expect(optionalDataDetails).toStrictEqual({
      label: 'Optional data',
      field: 'optionalData',
      value: 'ZE184226B',
      valid: true,
      ranges: [{ line: 1, start: 28, end: 44, raw: 'ZE184226B<<<<<<<' }],
      line: 1,
      start: 28,
      end: 37,
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
    });
  });

  it('GBR Example', () => {
    const MRZ = [
      'VBGBROCONNOR<<ENYA<SIOBHAN<<<<<<<<<<<<<<<<<<',
      '5114278475DOM7510223M150611808<<<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);
    expect(result.valid).toBe(true);
    expect(result.fields).toStrictEqual({
      documentCode: 'VB',
      issuingState: 'GBR',
      lastName: 'OCONNOR',
      firstName: 'ENYA SIOBHAN',
      documentNumber: '511427847',
      documentNumberCheckDigit: '5',
      nationality: 'DOM',
      birthDate: '751022',
      birthDateCheckDigit: '3',
      sex: 'male',
      expirationDate: '150611',
      expirationDateCheckDigit: '8',
      optionalData: '08',
    });

    const optionalDataDetails = result.details.find(
      (d) => d.field === 'optionalData',
    );
    expect(optionalDataDetails).toStrictEqual({
      label: 'Optional data',
      field: 'optionalData',
      value: '08',
      valid: true,
      ranges: [{ line: 1, start: 28, end: 44, raw: '08<<<<<<<<<<<<<<' }],
      line: 1,
      start: 28,
      end: 30,
    });
  });
});
