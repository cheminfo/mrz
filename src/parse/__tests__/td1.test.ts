import { describe, expect, it } from 'vitest';

import parse from '../parse.ts';

describe('parse TD1', () => {
  it('swiss ID - valid', () => {
    const MRZ = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7510256M2009018CHE<<<<<<<<<<<8',
      'SMITH<<JOHN<ALBERT<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
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

  it('Portuguese ID - valid', () => {
    // source: https://media.timeout.com/images/106144795/image.jpg
    const MRZ = [
      'I<PRT007777779<ZZ92<<<<<<<<<<<',
      '8303143M3405282PRT<<<<<<<<<<<2',
      'CACADOR<DE<ARAUJO<<ANDRE<ESTEV',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'I',
      issuingState: 'PRT',
      documentNumber: '007777779ZZ9',
      documentNumberCheckDigit: '2',
      birthDate: '830314',
      birthDateCheckDigit: '3',
      sex: 'male',
      expirationDate: '340528',
      expirationDateCheckDigit: '2',
      nationality: 'PRT',
      optional1: 'ZZ92',
      optional2: '',
      compositeCheckDigit: '2',
      lastName: 'CACADOR DE ARAUJO',
      firstName: 'ANDRE ESTEV',
    });

    const optional1Details = result.details.find(
      (f) => f.field === 'optional1',
    );

    expect(optional1Details).toMatchObject({
      value: 'ZZ92',
      line: 0,
      start: 15,
      end: 19,
    });
  });

  it('Portuguese ID PRT-BO-04001 - valid', () => {
    // source: https://www.consilium.europa.eu/prado/en/PRT-BO-04001/index.html
    const MRZ = [
      'I<PRT007666667<ZZ00<<<<<<<<<<<',
      '8303143M3405293PRT<<<<<<<<<<<4',
      'CACADOR<DE<ARAUJO<<ANDRE<ESTEV',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'I',
      issuingState: 'PRT',
      documentNumber: '007666667ZZ0',
      documentNumberCheckDigit: '0',
      birthDate: '830314',
      birthDateCheckDigit: '3',
      sex: 'male',
      expirationDate: '340529',
      expirationDateCheckDigit: '3',
      nationality: 'PRT',
      optional1: 'ZZ00',
      optional2: '',
      compositeCheckDigit: '4',
      lastName: 'CACADOR DE ARAUJO',
      firstName: 'ANDRE ESTEV',
    });

    const optional1Details = result.details.find(
      (f) => f.field === 'optional1',
    );

    expect(optional1Details).toMatchObject({
      value: 'ZZ00',
      line: 0,
      start: 15,
      end: 19,
    });
  });

  it('Belgium ID BEL-BO-11005 - valid', () => {
    // source: https://www.consilium.europa.eu/prado/en/BEL-BO-11005/index.html
    // Changed the country code from UTO to BEL to make it pass the country validation,
    // but that this part does not affect any check digit checks.
    const MRZ = [
      'IDBEL600001795<0152<<<<<<<<<<<',
      '1301014F2311207BEL130101987398',
      'SPECIMEN<<SPECIMEN<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'ID',
      issuingState: 'BEL',
      documentNumber: '600001795015',
      documentNumberCheckDigit: '2',
      birthDate: '130101',
      birthDateCheckDigit: '4',
      sex: 'female',
      expirationDate: '231120',
      expirationDateCheckDigit: '7',
      nationality: 'BEL',
      optional1: '0152',
      optional2: '13010198739',
      compositeCheckDigit: '8',
      lastName: 'SPECIMEN',
      firstName: 'SPECIMEN',
    });

    const optional1Details = result.details.find(
      (f) => f.field === 'optional1',
    );

    expect(optional1Details).toMatchObject({
      value: '0152',
      line: 0,
      start: 15,
      end: 19,
    });
  });

  it('Finland ID FIN-BO-12001 - valid', () => {
    // source: https://www.consilium.europa.eu/prado/en/FIN-BO-12001/index.html
    const MRZ = [
      'I<FINXA10000585010195<112X<<<<',
      '9501016F2803135FIN<<<<<<<<<<<7',
      'SPECIMEN<TRAVEL<<VILMA<SOFIA<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'I',
      issuingState: 'FIN',
      documentNumber: 'XA1000058',
      documentNumberCheckDigit: '5',
      birthDate: '950101',
      birthDateCheckDigit: '6',
      sex: 'female',
      expirationDate: '280313',
      expirationDateCheckDigit: '5',
      nationality: 'FIN',
      optional1: '010195 112X',
      optional2: '',
      compositeCheckDigit: '7',
      lastName: 'SPECIMEN TRAVEL',
      firstName: 'VILMA SOFIA',
    });

    const optional1Details = result.details.find(
      (f) => f.field === 'optional1',
    );

    expect(optional1Details).toMatchObject({
      value: '010195 112X',
      line: 0,
      start: 15,
      end: 26,
    });
  });

  it('Utopia example', () => {
    const MRZ = [
      'I<UTOD231458907ABC<<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<1',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: false,
      documentNumber: result.fields.documentNumber,
    });

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

    expect(result.details.filter((a) => !a.valid)).toHaveLength(2);
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
      'I<UTOD23145890<1233<<<<<<<<<<<',
      '7408122F1204159UTO<<<<<<<<<<<2',
      'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: false,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.details.filter((f) => !f.valid)).toHaveLength(2);

    const documentNumberDetails = result.details.find(
      (d) => d.field === 'documentNumber',
    );

    expect(documentNumberDetails).toStrictEqual({
      label: 'Document number',
      field: 'documentNumber',
      value: 'D23145890123',
      valid: true,
      ranges: [
        { line: 0, start: 5, end: 14, raw: 'D23145890' },
        { line: 0, start: 14, end: 15, raw: '<' },
        { line: 0, start: 15, end: 30, raw: '1233<<<<<<<<<<<' },
      ],
      line: 0,
      start: 5,
      end: 18,
      autocorrect: [],
    });
    expect(result.fields.documentNumber).toBe('D23145890123');
    expect(result.fields.documentNumberCheckDigit).toBe('3');

    const documentNumberCheckDigitDetails = result.details.find(
      (d) => d.field === 'documentNumberCheckDigit',
    );

    expect(documentNumberCheckDigitDetails).toMatchObject({
      line: 0,
      start: 18,
      end: 19,
      value: '3',
    });
  });

  it('parse document number ICAO Doc 9303 Sample', () => {
    // source: https://www.icao.int/sites/default/files/publications/DocSeries/9303_p11_cons_en.pdf
    // page 88, D.2 DERIVATION OF DOCUMENT BASIC ACCESS KEYS
    const MRZ = [
      'I<UTOD23145890<7349<<<<<<<<<<<',
      '3407127M9507122UTO<<<<<<<<<<<2',
      'STEVENSON<<PETER<JOHN<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: false,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.details.filter((f) => !f.valid)).toHaveLength(2);

    const documentNumberDetails = result.details.find(
      (d) => d.field === 'documentNumber',
    );

    expect(documentNumberDetails).toStrictEqual({
      label: 'Document number',
      field: 'documentNumber',
      value: 'D23145890734',
      valid: true,
      ranges: [
        { line: 0, start: 5, end: 14, raw: 'D23145890' },
        { line: 0, start: 14, end: 15, raw: '<' },
        { line: 0, start: 15, end: 30, raw: '7349<<<<<<<<<<<' },
      ],
      line: 0,
      start: 5,
      end: 18,
      autocorrect: [],
    });
    expect(result.fields.documentNumber).toBe('D23145890734');
    expect(result.fields.documentNumberCheckDigit).toBe('9');

    const documentNumberCheckDigitDetails = result.details.find(
      (d) => d.field === 'documentNumberCheckDigit',
    );

    expect(documentNumberCheckDigitDetails).toMatchObject({
      line: 0,
      start: 18,
      end: 19,
      value: '9',
    });
  });

  it('No last name', () => {
    const MRZ = [
      'I<CHED231458907ABC<<<<<<<<<<<<',
      '7408122F1204159CHE<<<<<<<<<<<1',
      '<<ANNA<MARIA<<<<<<<<<<<<<<<<<<',
    ];

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'TD1',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields.lastName).toBe('');
    expect(result.fields.firstName).toBe('ANNA MARIA');
  });

  it('Use autocorrection', () => {
    const MRZ = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7510256M2009018CHE<<<<<<<<<<<8',
      'SMITH<<JOHN<ALBERT<<<<<<<<<<<<',
    ];

    const reference = parse(MRZ);

    const falseMRZ = [
      'IDCHEA1234567<6<<<<<<<<<<<<<<<',
      '7SIOZSGMZOO90IBCHE<<<<<<<<<<<B',
      '5M1TH<<J0HN<AL8ERT<<<<<<<<<<<<',
    ];

    const correctedResult = parse(falseMRZ, { autocorrect: true });

    expect(correctedResult.fields).toStrictEqual(reference.fields);

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
