'use strict';

const parse = require('../parse');

describe('parse Swiss Driving License', () => {
  it('valid MRZ', function () {
    const MRZ = [
      'AAA001D<<',
      'FACHE305142128097<<800126<<<<<',
      'MARCHAND<<FABIENNE<<<<<<<<<<<<'
    ];
    var result = parse(MRZ);
    expect(result.format).toBe('SWISS_DRIVING_LICENSE');
    expect(result.valid).toEqual(true);
    expect(result.details.filter((a) => !a.valid)).toHaveLength(0);
    expect(result.details[0]).toEqual({
      label: 'Document number',
      field: 'documentNumber',
      ranges: [{ line: 0, start: 0, end: 9, raw: 'AAA001D<<' }],
      line: 0,
      start: 0,
      end: 7,
      value: 'AAA001D',
      valid: true
    });
    expect(result.details[result.details.length - 1]).toEqual({
      label: 'First name',
      field: 'firstName',
      value: 'FABIENNE',
      valid: true,
      ranges: [
        {
          line: 2,
          start: 0,
          end: 30,
          raw: 'MARCHAND<<FABIENNE<<<<<<<<<<<<'
        }
      ],
      line: 2,
      start: 10,
      end: 18
    });
    expect(result.fields).toEqual({
      documentNumber: 'AAA001D',
      languageCode: 'D',
      documentCode: 'FA',
      issuingState: 'CHE',
      pinCode: '305142128',
      versionNumber: '097',
      birthDate: '800126',
      firstName: 'FABIENNE',
      lastName: 'MARCHAND'
    });
  });
});
