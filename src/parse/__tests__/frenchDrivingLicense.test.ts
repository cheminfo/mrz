import parse from '../parse';

describe('parse French Driving License', () => {
  it('valid MRZ', () => {
    const MRZ = 'D1FRA13AA000026181231MARTIN<<9';

    const result = parse(MRZ);

    expect(result).toMatchObject({
      format: 'FRENCH_DRIVING_LICENSE',
      valid: true,
      documentNumber: result.fields.documentNumber,
    });

    expect(result.fields).toStrictEqual({
      documentCode: 'D1',
      issuingState: 'FRA',
      documentNumber: '13AA00002',
      documentNumberCheckDigit: '6',
      expirationDate: '181231',
      lastName: 'MARTIN',
      compositeCheckDigit: '9',
    });

    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
  });

  it('Use autocorrect', () => {
    const MRZok = 'D1FRA13AA000026181231MARTIN<<9';
    const MRZko = 'D1FRA13AA0000261B1231MART1N<<9';

    const result = parse(MRZok);
    const correctedResult = parse(MRZko, { autocorrect: true });
    expect(correctedResult.fields).toStrictEqual(result.fields);
  });
});
