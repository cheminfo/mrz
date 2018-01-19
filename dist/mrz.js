/**
 * mrz - Create and parse MRZ (Machine Readable Zone) in TD1 and TD3 format
 * @version v2.0.0
 * @link https://github.com/cheminfo-js/mrz#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mrz"] = factory();
	else
		root["mrz"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createFieldParser = __webpack_require__(15);

module.exports = {
  completeResult(result) {
    if (!result.fields) {
      result.fields = {};
    }
    var valid = true;
    for (var i = 0; i < result.annotations.length; i++) {
      var annotation = result.annotations[i];
      if (!annotation.valid) valid = false;
      result.fields[annotation.field] = annotation.parsed;
    }
    result.valid = valid;
  },

  getAnnotations(lines, fields) {
    var annotations = [];
    for (var i = 0; i < fields.length; i++) {
      var parser = createFieldParser(fields[i]);
      annotations.push(parser(lines));
    }
    return annotations;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var documentNumberTemplate = {
  label: 'Document number',
  field: 'documentNumber',
  parser: __webpack_require__(16)
};

var documentNumberCheckDigitTemplate = {
  label: 'Document number check digit',
  field: 'documentNumberCheckDigit',
  parser: __webpack_require__(17)
};

var documentTypeTemplate = {
  label: 'Document type',
  field: 'documentType',
  parser: __webpack_require__(18)
};

var nationalityTemplate = {
  label: 'Nationality',
  field: 'nationality',
  parser: __webpack_require__(6)
};

var genderTemplate = {
  label: 'Gender',
  field: 'gender',
  parser: __webpack_require__(19)
};

var expirationDateTemplate = {
  label: 'Expiration date',
  field: 'expirationDate',
  parser: __webpack_require__(7)
};

var expirationDateCheckDigitTemplate = {
  label: 'Expiration date check digit',
  field: 'expirationDateCheckDigit',
  parser: __webpack_require__(8)
};

var globalCheckTemplate = {
  label: 'Global check digit',
  field: 'globalCheckDigit',
  parser: __webpack_require__(20)
};

var birthDateCheckDigitTemplate = {
  label: 'Birth date check digit',
  field: 'birthDateCheckDigit',
  parser: __webpack_require__(8)
};

var birthDateTemplate = {
  label: 'Birth date',
  field: 'birthDate',
  parser: __webpack_require__(7)
};

var firstnameTemplate = {
  label: 'First name',
  field: 'firstname',
  parser: __webpack_require__(21)
};

var lastnameTemplate = {
  label: 'Last name',
  field: 'lastname',
  parser: __webpack_require__(22)
};

var issuingCountryTemplate = {
  label: 'Issuing country',
  field: 'issuingCountry',
  parser: __webpack_require__(6)
};

module.exports = {
  TD1: [Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 8,
    end: 14
  }), Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 14,
    end: 15,
    related: [{
      start: 8,
      end: 14,
      line: 1
    }]
  }), Object.assign({}, genderTemplate, {
    line: 1,
    start: 7,
    end: 8
  }), Object.assign({}, birthDateTemplate, {
    start: 0,
    end: 6,
    line: 1
  }), Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 6,
    end: 7,
    related: [{
      start: 0,
      end: 6,
      line: 1
    }]
  }), Object.assign({}, documentTypeTemplate, {
    line: 0,
    start: 0,
    end: 2
  }), Object.assign({}, issuingCountryTemplate, {
    start: 2,
    end: 5,
    line: 0
  }), Object.assign({}, firstnameTemplate, {
    start: 0,
    end: 30,
    line: 2
  }), Object.assign({}, lastnameTemplate, {
    start: 0,
    end: 30,
    line: 2
  }), Object.assign({}, nationalityTemplate, {
    start: 15,
    end: 18,
    line: 1
  }), Object.assign({}, documentNumberTemplate, {
    start: 5,
    end: 14,
    line: 0,
    related: [{
      line: 0,
      start: 14,
      end: 15
    }, {
      line: 0,
      start: 15,
      end: 30
    }]
  }), Object.assign(documentNumberCheckDigitTemplate, {
    start: 14,
    end: 15,
    line: 0,
    related: [{
      line: 0,
      start: 5,
      end: 14
    }, {
      line: 0,
      start: 15,
      end: 30
    }]
  }), {
    label: 'Optional field 2',
    field: 'optional2',
    line: 1,
    start: 18,
    end: 29,
    parser: __webpack_require__(2)
  }, Object.assign({}, globalCheckTemplate, {
    line: 1,
    start: 29,
    end: 30,
    related: [{
      line: 0,
      start: 5,
      end: 30
    }, {
      line: 1,
      start: 0,
      end: 7
    }, {
      line: 1,
      start: 8,
      end: 15
    }, {
      line: 1,
      start: 18,
      end: 29
    }]
  })],
  TD2: [Object.assign({}, firstnameTemplate, {
    start: 5,
    end: 36,
    line: 0
  }), Object.assign({}, lastnameTemplate, {
    start: 5,
    end: 36,
    line: 0
  }), Object.assign({}, nationalityTemplate, {
    start: 10,
    end: 13,
    line: 1
  }), Object.assign({}, documentNumberTemplate, {
    start: 0,
    end: 9,
    line: 1,
    related: [{
      line: 1,
      start: 9,
      end: 10
    }, {
      line: 1,
      start: 28,
      end: 35
    }]
  }), Object.assign({}, documentNumberCheckDigitTemplate, {
    start: 9,
    end: 10,
    line: 1,
    related: [{
      start: 0,
      end: 9,
      line: 1
    }, {
      line: 1,
      start: 28,
      end: 35
    }]
  }), Object.assign({}, genderTemplate, {
    line: 1,
    start: 20,
    end: 21
  }), Object.assign({}, documentTypeTemplate, {
    line: 0,
    start: 0,
    end: 2
  }), Object.assign({}, issuingCountryTemplate, {
    start: 2,
    end: 5,
    line: 0
  }), Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 13,
    end: 19
  }), Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 19,
    end: 20,
    related: [{
      line: 1,
      start: 13,
      end: 19
    }]
  }), Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 21,
    end: 27
  }), Object.assign({}, expirationDateCheckDigitTemplate, {
    line: 1,
    start: 27,
    end: 28,
    related: [{
      start: 21,
      end: 27,
      line: 1
    }]
  }), Object.assign({}, globalCheckTemplate, {
    line: 1,
    start: 35,
    end: 36,
    related: [{
      line: 1,
      start: 0,
      end: 10
    }, {
      line: 1,
      start: 13,
      end: 20
    }, {
      line: 1,
      start: 21,
      end: 35
    }]
  })],
  TD3: [Object.assign({}, documentTypeTemplate, {
    line: 0,
    start: 0,
    end: 2
  }), Object.assign({}, firstnameTemplate, {
    start: 5,
    end: 50,
    line: 0
  }), Object.assign({}, lastnameTemplate, {
    start: 5,
    end: 50,
    line: 0
  }), Object.assign({}, documentNumberTemplate, {
    line: 1,
    start: 0,
    end: 9
  }), Object.assign({}, documentNumberCheckDigitTemplate, {
    line: 1,
    start: 9,
    end: 10,
    related: [{
      line: 1,
      start: 0,
      end: 9
    }]
  }), Object.assign({}, nationalityTemplate, {
    line: 1,
    start: 10,
    end: 13
  }), Object.assign({}, genderTemplate, {
    line: 1,
    start: 20,
    end: 21
  }), Object.assign({}, expirationDateTemplate, {
    line: 1,
    start: 21,
    end: 27
  }), {
    label: 'Personal number',
    field: 'personalNumber',
    start: 28,
    end: 42,
    line: 1,
    parser: __webpack_require__(23)
  }, Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 13,
    end: 19
  }), Object.assign({}, birthDateCheckDigitTemplate, {
    line: 1,
    start: 19,
    end: 20,
    related: [{
      line: 1,
      start: 13,
      end: 19
    }]
  }), Object.assign({}, issuingCountryTemplate, {
    line: 0,
    start: 2,
    end: 5
  }), Object.assign({}, globalCheckTemplate, {
    start: 43,
    end: 44,
    line: 1,
    related: [{
      line: 1,
      start: 0,
      end: 10
    }, {
      line: 1,
      start: 13,
      end: 20
    }, {
      line: 1,
      start: 21,
      end: 43
    }]
  })],
  PCC: [Object.assign({}, firstnameTemplate, {
    line: 2,
    start: 0,
    end: 30
  }), Object.assign({}, lastnameTemplate, {
    line: 2,
    start: 0,
    end: 30
  }), Object.assign({}, issuingCountryTemplate, {
    line: 1,
    start: 2,
    end: 5
  }), Object.assign({}, documentTypeTemplate, {
    parser: __webpack_require__(24),
    line: 1,
    start: 0,
    end: 2
  }), {
    label: 'Language',
    field: 'language',
    line: 0,
    start: 6,
    end: 7,
    parser: __webpack_require__(9)
  }, Object.assign({}, documentNumberTemplate, {
    parser: __webpack_require__(25),
    line: 0,
    start: 0,
    end: 10
  }), {
    label: 'separator 1',
    field: 'separator1',
    parser: __webpack_require__(10),
    line: 1,
    start: 17,
    end: 19
  }, {
    label: 'separator 2',
    field: 'separator2',
    parser: __webpack_require__(10),
    line: 1,
    start: 25,
    end: 30
  }, {
    label: 'NIP Code',
    field: 'nipCode',
    parser: __webpack_require__(11),
    line: 1,
    start: 5,
    end: 14
  }, {
    label: 'Version',
    field: 'version',
    parser: __webpack_require__(11),
    line: 1,
    start: 14,
    end: 17
  }, Object.assign({}, birthDateTemplate, {
    line: 1,
    start: 19,
    end: 25
  })]
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cleanText = __webpack_require__(3);

module.exports = function parseText(source, regexp = /^[0-9A-Z<]+$/) {
  if (!source.match(regexp)) {
    throw new Error(`it must match the following regexp: ${regexp}`);
  }
  return cleanText(source);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function cleanText(string) {
  return string.replace(/<+$/g, '').replace(/</g, ' ');
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function check(string, value) {
  var code = 0;
  var factors = [7, 3, 1];
  for (var i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    if (charCode === 60) charCode = 0;
    if (charCode >= 65) charCode -= 55;
    if (charCode >= 48) charCode -= 48;
    charCode *= factors[i % 3];
    code += charCode;
  }
  return code % 10 === Number(value);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = { "ABW": "Aruba", "AFG": "Afghanistan", "AGO": "Angola", "AIA": "Anguilla", "ALA": "Åland Islands", "ALB": "Albania", "AND": "Andorra", "ARE": "United Arab Emirates", "ARG": "Argentina", "ARM": "Armenia", "ASM": "American Samoa", "ATA": "Antarctica", "ATF": "French Southern Territories", "ATG": "Antigua and Barbuda", "AUS": "Australia", "AUT": "Austria", "AZE": "Azerbaijan", "BDI": "Burundi", "BEL": "Belgium", "BEN": "Benin", "BES": "Bonaire, Sint Eustatius and Saba", "BFA": "Burkina Faso", "BGD": "Bangladesh", "BGR": "Bulgaria", "BHR": "Bahrain", "BHS": "Bahamas", "BIH": "Bosnia and Herzegovina", "BLM": "Saint Barthélemy", "BLR": "Belarus", "BLZ": "Belize", "BMU": "Bermuda", "BOL": "Bolivia, Plurinational State of", "BRA": "Brazil", "BRB": "Barbados", "BRN": "Brunei Darussalam", "BTN": "Bhutan", "BVT": "Bouvet Island", "BWA": "Botswana", "CAF": "Central African Republic", "CAN": "Canada", "CCK": "Cocos (Keeling) Islands", "CHE": "Switzerland", "CHL": "Chile", "CHN": "China", "CIV": "Côte d'Ivoire", "CMR": "Cameroon", "COD": "Congo, the Democratic Republic of the", "COG": "Congo", "COK": "Cook Islands", "COL": "Colombia", "COM": "Comoros", "CPV": "Cabo Verde", "CRI": "Costa Rica", "CUB": "Cuba", "CUW": "Curaçao", "CXR": "Christmas Island", "CYM": "Cayman Islands", "CYP": "Cyprus", "CZE": "Czechia", "D": "Germany", "DEU": "Germany", "DJI": "Djibouti", "DMA": "Dominica", "DNK": "Denmark", "DOM": "Dominican Republic", "DZA": "Algeria", "ECU": "Ecuador", "EGY": "Egypt", "ERI": "Eritrea", "ESH": "Western Sahara", "ESP": "Spain", "EST": "Estonia", "ETH": "Ethiopia", "FIN": "Finland", "FJI": "Fiji", "FLK": "Falkland Islands (Malvinas)", "FRA": "France", "FRO": "Faroe Islands", "FSM": "Micronesia, Federated States of", "GAB": "Gabon", "GBD": "British Overseas Territories Citizen (BOTC)", "GBN": "British National (Overseas)", "GBO": "British Overseas Citizen", "GBP": "British Protected Person", "GBR": "United Kingdom", "GBS": "British Subject", "GEO": "Georgia", "GGY": "Guernsey", "GHA": "Ghana", "GIB": "Gibraltar", "GIN": "Guinea", "GLP": "Guadeloupe", "GMB": "Gambia", "GNB": "Guinea-Bissau", "GNQ": "Equatorial Guinea", "GRC": "Greece", "GRD": "Grenada", "GRL": "Greenland", "GTM": "Guatemala", "GUF": "French Guiana", "GUM": "Guam", "GUY": "Guyana", "HKG": "Hong Kong", "HMD": "Heard Island and McDonald Islands", "HND": "Honduras", "HRV": "Croatia", "HTI": "Haiti", "HUN": "Hungary", "IDN": "Indonesia", "IMN": "Isle of Man", "IND": "India", "IOT": "British Indian Ocean Territory", "IRL": "Ireland", "IRN": "Iran, Islamic Republic of", "IRQ": "Iraq", "ISL": "Iceland", "ISR": "Israel", "ITA": "Italy", "JAM": "Jamaica", "JEY": "Jersey", "JOR": "Jordan", "JPN": "Japan", "KAZ": "Kazakhstan", "KEN": "Kenya", "KGZ": "Kyrgyzstan", "KHM": "Cambodia", "KIR": "Kiribati", "KNA": "Saint Kitts and Nevis", "KOR": "Korea, Republic of", "KWT": "Kuwait", "LAO": "Lao People's Democratic Republic", "LBN": "Lebanon", "LBR": "Liberia", "LBY": "Libya", "LCA": "Saint Lucia", "LIE": "Liechtenstein", "LKA": "Sri Lanka", "LSO": "Lesotho", "LTU": "Lithuania", "LUX": "Luxembourg", "LVA": "Latvia", "MAC": "Macao", "MAF": "Saint Martin (French part)", "MAR": "Morocco", "MCO": "Monaco", "MDA": "Moldova, Republic of", "MDG": "Madagascar", "MDV": "Maldives", "MEX": "Mexico", "MHL": "Marshall Islands", "MKD": "Macedonia, the former Yugoslav Republic of", "MLI": "Mali", "MLT": "Malta", "MMR": "Myanmar", "MNE": "Montenegro", "MNG": "Mongolia", "MNP": "Northern Mariana Islands", "MOZ": "Mozambique", "MRT": "Mauritania", "MSR": "Montserrat", "MTQ": "Martinique", "MUS": "Mauritius", "MWI": "Malawi", "MYS": "Malaysia", "MYT": "Mayotte", "NAM": "Namibia", "NCL": "New Caledonia", "NER": "Niger", "NFK": "Norfolk Island", "NGA": "Nigeria", "NIC": "Nicaragua", "NIU": "Niue", "NLD": "Netherlands", "NOR": "Norway", "NPL": "Nepal", "NRU": "Nauru", "NZL": "New Zealand", "OMN": "Oman", "PAK": "Pakistan", "PAN": "Panama", "PCN": "Pitcairn", "PER": "Peru", "PHL": "Philippines", "PLW": "Palau", "PNG": "Papua New Guinea", "POL": "Poland", "PRI": "Puerto Rico", "PRK": "Korea, Democratic People's Republic of", "PRT": "Portugal", "PRY": "Paraguay", "PSE": "Palestine, State of", "PYF": "French Polynesia", "QAT": "Qatar", "REU": "Réunion", "ROU": "Romania", "RUS": "Russian Federation", "RWA": "Rwanda", "SAU": "Saudi Arabia", "SDN": "Sudan", "SEN": "Senegal", "SGP": "Singapore", "SGS": "South Georgia and the South Sandwich Islands", "SHN": "Saint Helena, Ascension and Tristan da Cunha", "SJM": "Svalbard and Jan Mayen", "SLB": "Solomon Islands", "SLE": "Sierra Leone", "SLV": "El Salvador", "SMR": "San Marino", "SOM": "Somalia", "SPM": "Saint Pierre and Miquelon", "SRB": "Serbia", "SSD": "South Sudan", "STP": "Sao Tome and Principe", "SUR": "Suriname", "SVK": "Slovakia", "SVN": "Slovenia", "SWE": "Sweden", "SWZ": "Swaziland", "SXM": "Sint Maarten (Dutch part)", "SYC": "Seychelles", "SYR": "Syrian Arab Republic", "TCA": "Turks and Caicos Islands", "TCD": "Chad", "TGO": "Togo", "THA": "Thailand", "TJK": "Tajikistan", "TKL": "Tokelau", "TKM": "Turkmenistan", "TLS": "Timor-Leste", "TON": "Tonga", "TTO": "Trinidad and Tobago", "TUN": "Tunisia", "TUR": "Turkey", "TUV": "Tuvalu", "TWN": "Taiwan, Province of China", "TZA": "Tanzania, United Republic of", "UGA": "Uganda", "UKR": "Ukraine", "UMI": "United States Minor Outlying Islands", "UNA": "specialized agency of the United Nations", "UNK": "Resident of Kosovo issued byUNMIK", "UNO": "United Nations organization", "URY": "Uruguay", "USA": "United States of America", "UZB": "Uzbekistan", "VAT": "Holy See (Vatican City State)", "VCT": "Saint Vincent and the Grenadines", "VEN": "Venezuela, Bolivarian Republic of", "VGB": "Virgin Islands, British", "VIR": "Virgin Islands, U.S.", "VNM": "Viet Nam", "VUT": "Vanuatu", "WLF": "Wallis and Futuna", "WSA": "World Service Authority World Passport", "WSM": "Samoa", "XOM": "Sovereign Military Order of Malta", "XXA": "Stateless person", "XXB": "Refugee, as per the 1951 Convention", "XXC": "Refugee, other than defined above", "XXX": "Unspecified nationality", "YEM": "Yemen", "ZAF": "South Africa", "ZMB": "Zambia", "ZWE": "Zimbabwe" };
module.exports = COUNTRIES;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = __webpack_require__(5);

module.exports = function parseCountry(source) {
  var country = COUNTRIES[source];
  if (!country) {
    throw new Error('the country does not exist');
  }
  return country;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDate(value) {
  var year = value.substring(0, 2);
  var month = value.substring(2, 4);
  var day = value.substring(4, 6);

  if (month < 1 || month > 12) {
    throw new Error(`Month "${month}" not valid`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Day "${day}" not valid`);
  }

  return `${day}.${month}.${year}`;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(4);

module.exports = function (checkDigit, value) {
  if (checkDigit !== false && !check(value, checkDigit)) {
    throw new Error(`Check digit "${checkDigit}" not valid`);
  }
  return checkDigit;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (language) {
  switch (language) {
    case 'D':
      return 'german';
    case 'F':
      return 'french';
    case 'I':
      return 'italian';
    case 'R':
      return 'romansh';
    default:
      throw new Error(`language ${language} unknown.`);
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function checkSeparator(source) {
  if (!source.match(/^<*$/)) {
    throw new Error('The separator must be composed only by "<"');
  }
  return source;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseNumber(source) {
  if (!source.match(/^[0-9]+$/)) {
    throw new Error('It may only be composed of numbers');
  }

  return source;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = __webpack_require__(5);
var parse = __webpack_require__(13);

module.exports = {
  COUNTRIES,
  parse
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseTD1 = __webpack_require__(14);
var parseTD2 = __webpack_require__(26);
var parseTD3 = __webpack_require__(27);
var parsePCC = __webpack_require__(28);

module.exports = function parse(lines) {
  var result = {};
  if (typeof lines === 'string') {
    lines = lines.split(/[\r\n]+/);
  }
  switch (lines.length) {
    case 2:
      if (lines[0].length < 41) {
        result = parseTD2(lines);
      } else {
        result = parseTD3(lines);
      }
      break;
    case 3:
      if (lines[0].length < 15) {
        // in fact it should be 9
        result = parsePCC(lines);
      } else {
        result = parseTD1(lines);
      }

      break;
    default:
      throw new Error('input must be an array of 2 or 3 elements');
  }

  return result;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getAnnotations = _require.getAnnotations,
    completeResult = _require.completeResult;

var _require2 = __webpack_require__(1),
    TD1Fields = _require2.TD1;

module.exports = function parseTD1(lines) {
  lines.forEach(line => {
    if (line.length !== 30) {
      throw new Error('each line should have a length of 30 in TD1');
    }
  });
  var result = {
    format: 'TD1',
    annotations: getAnnotations(lines, TD1Fields)
  };

  completeResult(result);
  return result;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fieldOptions) {
  var result = Object.assign({}, fieldOptions, { parser: undefined });
  var parser = fieldOptions.parser;
  if (!fieldOptions.line === undefined || !fieldOptions.start === undefined || !fieldOptions.end === undefined || !fieldOptions.parser) {
    throw new Error('field must have a line, start, stop and parser');
  }
  return function (lines) {
    var source = getText(lines, fieldOptions);
    var related = fieldOptions.related || [];
    related = related.map(r => getText(lines, r));

    try {
      var parsed = parser(source, ...related);
      result.parsed = parsed;
      result.valid = true;
    } catch (e) {
      result.parsed = null;
      result.valid = false;
      result.message = e.message;
    }
    return result;
  };
};

function getText(lines, options) {
  var line = lines[options.line];
  return line.substring(options.start, options.end);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cleanText = __webpack_require__(3);

module.exports = function parseDocumentNumber(source, checkDigit, optional) {
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    source += optional.substring(0, optional.length - 1);
  }
  return source.replace(/</g);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(4);
var cleanText = __webpack_require__(3);

module.exports = function (checkDigit, source, optional) {
  if (checkDigit === '<' && optional) {
    optional = cleanText(optional);
    source = `${source}<${optional.substring(0, optional.length - 1)}`;
    checkDigit = optional.charAt(optional.length - 1);
  }

  if (!check(source, checkDigit)) {
    throw new Error(`document number check digit "${checkDigit}" not valid`);
  }
  return checkDigit;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDocumentType(source) {
  var code = source.substring(0, 1);
  var type = source.substring(1, 2).replace('<', '');

  if (type === 'V') {
    throw new Error('Document type (second symbol) may not be V');
  }

  switch (code) {
    case 'P':
      return 'passport';
    case 'I':
      return 'identity card';
    case 'A':
      return '';
    case 'C':
      return '';
    default:
      throw new Error('Document type must be either P, I, A or C');
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseSex(source) {
  switch (source) {
    case '<':
      return 'unknown';
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    default:
      throw new Error(`The sex "${source}" is incorrect. Allowed values: M, F or <.`);
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(4);

module.exports = function globalCheck(checkDigit, ...sources) {
  var source = sources.join('');
  if (!check(source, checkDigit)) {
    throw new Error('global check digit');
  }
  return checkDigit;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(2);

module.exports = function parseFirstname(source) {
  return parseText(source.replace(/.*?<{2}/, ''), /^[A-Z<]+<*$/);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(2);

module.exports = function parseFirstname(source) {
  return parseText(source.replace(/<{2}.*/, ''), /^[A-Z<]+<*$/);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(2);

module.exports = function (value) {
  return parseText(value, /^[A-Z0-9<]+<*$/);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDocumentType(source) {
  if (source !== 'FA') {
    throw new Error('document type must be FA');
  }
  return source;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseLanguage = __webpack_require__(9);

module.exports = function parseDocumentNumber(source) {
  // swiss driving license number
  var first = source.substring(0, 3);
  var second = source.substring(3, 6);
  var language = source.charAt(6);
  var end = source.substring(7);

  if (!first.match(/^[A-Z]{3}$/)) {
    throw new Error(`The document number "${source}" is incorrect. Need to start by 3 uppercase letters.`);
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(`The document number "${source}" is incorrect. Need to have 3 digits in position 3, 4 and 5.`);
  }
  if (end !== '<<') {
    throw new Error(`The document number "${source}" is incorrect. Need to end with <<.`);
  }

  // calling this method to throw if language invalid
  parseLanguage(language);
  return source.substring(0, 7);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getAnnotations = _require.getAnnotations,
    completeResult = _require.completeResult;

var _require2 = __webpack_require__(1),
    TD2Fields = _require2.TD2;

module.exports = function parseTD1(lines) {
  lines.forEach(line => {
    if (line.length !== 36) {
      throw new Error('each line should have a length of 36 in TD2');
    }
  });
  var result = {
    format: 'TD2',
    annotations: getAnnotations(lines, TD2Fields)
  };

  completeResult(result);
  return result;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getAnnotations = _require.getAnnotations,
    completeResult = _require.completeResult;

var _require2 = __webpack_require__(1),
    TD3Fields = _require2.TD3;

module.exports = function parseTD1(lines) {
  lines.forEach(line => {
    if (line.length !== 44) {
      throw new Error('each line should have a length of 30 in TD1');
    }
  });
  var result = {
    format: 'TD3',
    annotations: getAnnotations(lines, TD3Fields)
  };

  completeResult(result);
  return result;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    getAnnotations = _require.getAnnotations,
    completeResult = _require.completeResult;

var _require2 = __webpack_require__(1),
    PCCFields = _require2.PCC;

module.exports = function (lines) {
  if (lines[0].length !== 9) {
    throw new Error('First line must have 9 symbols');
  }
  if (lines[1].length !== 30) {
    throw new Error('Second line must have 30 symbols');
  }

  if (lines[2].length !== 30) {
    throw new Error('Third line must have 30 symbols');
  }
  var result = {
    format: 'swissDrivingLicence',
    annotations: getAnnotations(lines, PCCFields)
  };

  completeResult(result);
  return result;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=mrz.js.map