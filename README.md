# mrz

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

Parse MRZ (Machine Readable Zone) in TD1, TD2, TD3 or CH driving licence format

## Installation

`$ npm install mrz`

## Example

```js
const parse = require('mrz').parse;

let mrz = `I<UTOD23145890<1233<<<<<<<<<<<
7408122F1204159UTO<<<<<<<<<<<6
ERIKSSON<<ANNA<MARIA<<<<<<<<<<`;

var result = parse(mrz);
console.log(result);
```

Or test it in [Runkit](https://runkit.com/npm/mrz)

## Specifications

## TD1, TD2 and TD3

https://www.icao.int/publications/pages/publication.aspx?docnum=9303

## Swiss driving license

<!-- TODO add link -->

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/mrz.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mrz
[travis-image]: https://img.shields.io/travis/cheminfo-js/mrz/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/mrz
[coveralls-image]: https://img.shields.io/coveralls/cheminfo-js/mrz.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/cheminfo-js/mrz
[david-image]: https://img.shields.io/david/cheminfo-js/mrz.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/mrz
[download-image]: https://img.shields.io/npm/dm/mrz.svg?style=flat-square
[download-url]: https://npmjs.org/package/mrz
