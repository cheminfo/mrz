'use strict';

var fs = require('fs');

var countries = fs.readFileSync(`${__dirname}/countries.txt`, 'utf8');

var countriesObject = {};
for (var country of countries.split(/[\r\n]+/).sort()) {
  var three = country.replace(/\t.+/, '');
  var name = country.replace(/.*\t/, '');
  if (three && name) {
    countriesObject[three] = name;
  }
}

var result = [];
result.push("'use strict'");
result.push(`const COUNTRIES=${JSON.stringify(countriesObject)};`);
result.push('module.exports=COUNTRIES;');

fs.writeFileSync(
  `${__dirname}/../src/generated/countries.js`,
  result.join('\r\n')
);
