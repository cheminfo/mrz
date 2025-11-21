<h3 align="center">
  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>
  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
</h3>

# mrz

[![NPM version](https://img.shields.io/npm/v/mrz.svg)](https://www.npmjs.com/package/mrz)
[![npm download](https://img.shields.io/npm/dm/mrz.svg)](https://www.npmjs.com/package/mrz)
[![test coverage](https://img.shields.io/codecov/c/github/cheminfo/mrz.svg)](https://codecov.io/gh/cheminfo/mrz)
[![license](https://img.shields.io/npm/l/mrz.svg)](https://github.com/cheminfo/mrz/blob/main/LICENSE)

Parse MRZ (Machine Readable Zone) from identity documents.

## Installation

```console
npm install mrz
```

## Example

```js
const parse = require('mrz').parse;

const mrz = [
  'I<UTOD23145890<1233<<<<<<<<<<<',
  '7408122F1204159UTO<<<<<<<<<<<6',
  'ERIKSSON<<ANNA<MARIA<<<<<<<<<<',
];

var result = parse(mrz);
console.log(result);
```

## API

### `parse(mrz, [options])`

Parses the provided MRZ. The argument can be an array of lines or a single string
including line breaks. This function throws an error if the input is in an
unsupported format. It will never throw an error when there are invalid fields
in the MRZ. Instead, the `result.valid` value will be `false` and
details about the invalid fields can be found in `result.details`.

#### Options

##### `options.autocorrect`

If set to `true`, some ambiguous characters will be automatically corrected by the parser if the field is supposed to
only contain numeric or alphabetic characters.
For example, in a date field, the letter "O" will be converted to the number "0".

Information about autocorrected characters will be added to the result details.

Default: `false`.

#### Shape of the parse result

##### result.format

String identifying the format of the parsed MRZ. Supported formats are:

- TD1 (identity card with three MRZ lines)
- TD2 (identity card with two MRZ lines)
- TD3 (passport)
- SWISS_DRIVING_LICENSE
- FRENCH_NATIONAL_ID

##### result.valid

`true` if all fields are valid. `false` otherwise.

##### result.fields

Object mapping field names to their respective value. The value is set to `null`
if it is invalid. The value may be different from the raw value. For example,
`result.fields.sex` will be "male" when the raw value was "M".

##### result.documentNumber

The document number, as can be found in the visual elements of the document, outside the MRZ. For some documents, it may
be composed of multiple parsed fields. It may also not include the MRZ field named `documentNumber`. If any of the used
fields is invalid, this field will be set to `null`.

##### result.details

Array of objects describing all parsed fields. Its structure is:

- label {string} - Full english term for the field.
- field {string|null} - Name of the field in `result.fields`. Null for some fields such as separators that don't contain a value.
- value {string} - Value of the field (if it's valid) or `null`.
- valid {boolean} - Whether the field is valid.
- ranges {Array} - Array of ranges that are necessary to compute this field.
  Ranges are objects with `line`, `start`, `end` and `raw`.
- line {number} - Index of the line where the field's value is located.
- start {number} - Index of the start of the field's value in `line`.
- end {number} - Index of the end of the field's value in `line`.
- error {undefined|string} - Contains a message describing the error if the field is invalid.
- autocorrect {array} - Contains indices of characters that were autocorrected and their original value.

### `formats`

Static mapping of supported formats.

### `states`

Static mapping of state code to state name.

## Specifications

### TD1, TD2 and TD3

https://www.icao.int/publications/pages/publication.aspx?docnum=9303

### Swiss driving license

https://www.astra.admin.ch/dam/astra/fr/dokumente/dokumente-strassenverkehr/kreisschreiben/ch-fak.pdf.download.pdf/Le%20permis%20de%20conduire%20suisse%20format%20carte%20de%20cr%C3%A9dit%20(PCC).pdf

### French national id

https://fr.wikipedia.org/wiki/Carte_nationale_d%27identit%C3%A9_en_France#Codage_bande_%C3%A0_lecture_optique

## License

[MIT](./LICENSE)
