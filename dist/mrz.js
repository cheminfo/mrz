/**
 * mrz - Create and parse MRZ (Machine Readable Zone) in TD1 and TD3 format
 * @version v1.0.1
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cleanText = __webpack_require__(19);

module.exports = function parseText(label, source, regexp = /^[0-9A-Z<]+$/) {
  var result = {
    source,
    label,
    value: cleanText(source),
    error: []
  };
  if (!source.match(regexp)) {
    result.error.push(`It must match the following regexp: ${regexp}`);
  }
  return result;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = __webpack_require__(11);

module.exports = function parseCountry(source) {
  var country = COUNTRIES[source];
  var result = {
    source,
    value: country || source,
    label: 'Country',
    error: []
  };
  if (!country) {
    result.error.push(`The country code "${source}" is unknown`);
  }
  return result;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseDate = __webpack_require__(14);

module.exports = function parseBirthdayDateDate(value, checkDigit) {
  var result = parseDate(value, checkDigit);
  result.label = 'Birthday date';
  return result;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
We check all the values to find out if it is valid or not
We will also combine all the errors  ...
 */

module.exports = function globalCheck(result) {
  result.isValid = true;
  result.logs = [];
  for (var key of Object.keys(result)) {
    if (result[key] instanceof Object && !Array.isArray(result[key])) {
      if (result[key].error && result[key].error.length > 0) {
        result[key].isValid = false;
        result.isValid = false;
        for (var err of result[key].error) {
          result.error.push(`${result[key].label}: ${err}`);
        }
      } else {
        result[key].isValid = true;
      }
      result.logs.push(Object.assign({}, result[key], { field: key }));
    }
  }

  // we will also create the result as a table call 'logs'

};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(1);

module.exports = function parseFirstname(label, source) {
  var result = parseText('Firstname', source.replace(/<{2}.*/, ''), /^[A-Z<]+<*$/);
  return result;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(1);

module.exports = function parseFirstname(label, source) {
  var result = parseText('Lastname', source.replace(/.*?<{2}/, ''), /^[A-Z<]+<*$/);
  return result;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(0);

module.exports = function globalCheck(source, value) {
  var checkResult = check(source, value);
  var error = [];
  if (!checkResult) {
    error.push('Check digit error.');
  }
  return {
    ifValid: checkResult,
    source,
    value: checkResult ? 'valid' : 'non valid',
    label: 'Global check digit',
    error
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseSex(source) {
  var result = {
    source,
    label: 'Sex',
    error: []
  };
  switch (source) {
    case '<':
      result.value = 'Unknown';
      break;
    case 'M':
      result.value = 'Male';
      break;
    case 'F':
      result.value = 'Female';
      break;
    default:
      result.error.push(`The sex "${source}" is incorrect. Allowed values: M, F or <.`);
  }

  return result;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(0);

/*
 Parsing document number
 The number may be splited (TD1 format)
 */

module.exports = function parseDocumentNumber(source, checkDigit, optional) {
  if (checkDigit === '<' && optional) {
    optional = optional.replace(/<.*/, '');
    source += checkDigit + optional.substring(0, optional.length - 1);
    checkDigit = optional.charAt(optional.length - 1);
  }
  var result = {
    source,
    label: 'Document number',
    value: source.replace(/</g, ''),
    error: []
  };

  if (!check(source, checkDigit)) {
    result.error.push(`Check digit "${checkDigit}" not valid`);
  }
  return result;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDocumentType(source) {
  var code = source.substring(0, 1);
  var type = source.substring(1, 2).replace('<', '');

  var result = {
    source,
    label: 'Document type',
    error: []
  };

  switch (code) {
    case 'P':
      result.value = 'Passport';
      break;
    case 'I':
      result.value = 'Identity card';
      break;
    case 'A':
      result.value = '';
      break;
    case 'C':
      result.value = '';
      break;
    default:
      result.error.push('Document type must be either P, I, A or C');
  }
  if (type === 'V') {
    result.error.push('Document type (second symbol) may not be V');
  }
  return result;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = { "ABW": "Aruba", "AFG": "Afghanistan", "AGO": "Angola", "AIA": "Anguilla", "ALA": "Åland Islands", "ALB": "Albania", "AND": "Andorra", "ARE": "United Arab Emirates", "ARG": "Argentina", "ARM": "Armenia", "ASM": "American Samoa", "ATA": "Antarctica", "ATF": "French Southern Territories", "ATG": "Antigua and Barbuda", "AUS": "Australia", "AUT": "Austria", "AZE": "Azerbaijan", "BDI": "Burundi", "BEL": "Belgium", "BEN": "Benin", "BES": "Bonaire, Sint Eustatius and Saba", "BFA": "Burkina Faso", "BGD": "Bangladesh", "BGR": "Bulgaria", "BHR": "Bahrain", "BHS": "Bahamas", "BIH": "Bosnia and Herzegovina", "BLM": "Saint Barthélemy", "BLR": "Belarus", "BLZ": "Belize", "BMU": "Bermuda", "BOL": "Bolivia, Plurinational State of", "BRA": "Brazil", "BRB": "Barbados", "BRN": "Brunei Darussalam", "BTN": "Bhutan", "BVT": "Bouvet Island", "BWA": "Botswana", "CAF": "Central African Republic", "CAN": "Canada", "CCK": "Cocos (Keeling) Islands", "CHE": "Switzerland", "CHL": "Chile", "CHN": "China", "CIV": "Côte d'Ivoire", "CMR": "Cameroon", "COD": "Congo, the Democratic Republic of the", "COG": "Congo", "COK": "Cook Islands", "COL": "Colombia", "COM": "Comoros", "CPV": "Cabo Verde", "CRI": "Costa Rica", "CUB": "Cuba", "CUW": "Curaçao", "CXR": "Christmas Island", "CYM": "Cayman Islands", "CYP": "Cyprus", "CZE": "Czechia", "D": "Germany", "DEU": "Germany", "DJI": "Djibouti", "DMA": "Dominica", "DNK": "Denmark", "DOM": "Dominican Republic", "DZA": "Algeria", "ECU": "Ecuador", "EGY": "Egypt", "ERI": "Eritrea", "ESH": "Western Sahara", "ESP": "Spain", "EST": "Estonia", "ETH": "Ethiopia", "FIN": "Finland", "FJI": "Fiji", "FLK": "Falkland Islands (Malvinas)", "FRA": "France", "FRO": "Faroe Islands", "FSM": "Micronesia, Federated States of", "GAB": "Gabon", "GBD": "British Overseas Territories Citizen (BOTC)", "GBN": "British National (Overseas)", "GBO": "British Overseas Citizen", "GBP": "British Protected Person", "GBR": "United Kingdom", "GBS": "British Subject", "GEO": "Georgia", "GGY": "Guernsey", "GHA": "Ghana", "GIB": "Gibraltar", "GIN": "Guinea", "GLP": "Guadeloupe", "GMB": "Gambia", "GNB": "Guinea-Bissau", "GNQ": "Equatorial Guinea", "GRC": "Greece", "GRD": "Grenada", "GRL": "Greenland", "GTM": "Guatemala", "GUF": "French Guiana", "GUM": "Guam", "GUY": "Guyana", "HKG": "Hong Kong", "HMD": "Heard Island and McDonald Islands", "HND": "Honduras", "HRV": "Croatia", "HTI": "Haiti", "HUN": "Hungary", "IDN": "Indonesia", "IMN": "Isle of Man", "IND": "India", "IOT": "British Indian Ocean Territory", "IRL": "Ireland", "IRN": "Iran, Islamic Republic of", "IRQ": "Iraq", "ISL": "Iceland", "ISR": "Israel", "ITA": "Italy", "JAM": "Jamaica", "JEY": "Jersey", "JOR": "Jordan", "JPN": "Japan", "KAZ": "Kazakhstan", "KEN": "Kenya", "KGZ": "Kyrgyzstan", "KHM": "Cambodia", "KIR": "Kiribati", "KNA": "Saint Kitts and Nevis", "KOR": "Korea, Republic of", "KWT": "Kuwait", "LAO": "Lao People's Democratic Republic", "LBN": "Lebanon", "LBR": "Liberia", "LBY": "Libya", "LCA": "Saint Lucia", "LIE": "Liechtenstein", "LKA": "Sri Lanka", "LSO": "Lesotho", "LTU": "Lithuania", "LUX": "Luxembourg", "LVA": "Latvia", "MAC": "Macao", "MAF": "Saint Martin (French part)", "MAR": "Morocco", "MCO": "Monaco", "MDA": "Moldova, Republic of", "MDG": "Madagascar", "MDV": "Maldives", "MEX": "Mexico", "MHL": "Marshall Islands", "MKD": "Macedonia, the former Yugoslav Republic of", "MLI": "Mali", "MLT": "Malta", "MMR": "Myanmar", "MNE": "Montenegro", "MNG": "Mongolia", "MNP": "Northern Mariana Islands", "MOZ": "Mozambique", "MRT": "Mauritania", "MSR": "Montserrat", "MTQ": "Martinique", "MUS": "Mauritius", "MWI": "Malawi", "MYS": "Malaysia", "MYT": "Mayotte", "NAM": "Namibia", "NCL": "New Caledonia", "NER": "Niger", "NFK": "Norfolk Island", "NGA": "Nigeria", "NIC": "Nicaragua", "NIU": "Niue", "NLD": "Netherlands", "NOR": "Norway", "NPL": "Nepal", "NRU": "Nauru", "NZL": "New Zealand", "OMN": "Oman", "PAK": "Pakistan", "PAN": "Panama", "PCN": "Pitcairn", "PER": "Peru", "PHL": "Philippines", "PLW": "Palau", "PNG": "Papua New Guinea", "POL": "Poland", "PRI": "Puerto Rico", "PRK": "Korea, Democratic People's Republic of", "PRT": "Portugal", "PRY": "Paraguay", "PSE": "Palestine, State of", "PYF": "French Polynesia", "QAT": "Qatar", "REU": "Réunion", "ROU": "Romania", "RUS": "Russian Federation", "RWA": "Rwanda", "SAU": "Saudi Arabia", "SDN": "Sudan", "SEN": "Senegal", "SGP": "Singapore", "SGS": "South Georgia and the South Sandwich Islands", "SHN": "Saint Helena, Ascension and Tristan da Cunha", "SJM": "Svalbard and Jan Mayen", "SLB": "Solomon Islands", "SLE": "Sierra Leone", "SLV": "El Salvador", "SMR": "San Marino", "SOM": "Somalia", "SPM": "Saint Pierre and Miquelon", "SRB": "Serbia", "SSD": "South Sudan", "STP": "Sao Tome and Principe", "SUR": "Suriname", "SVK": "Slovakia", "SVN": "Slovenia", "SWE": "Sweden", "SWZ": "Swaziland", "SXM": "Sint Maarten (Dutch part)", "SYC": "Seychelles", "SYR": "Syrian Arab Republic", "TCA": "Turks and Caicos Islands", "TCD": "Chad", "TGO": "Togo", "THA": "Thailand", "TJK": "Tajikistan", "TKL": "Tokelau", "TKM": "Turkmenistan", "TLS": "Timor-Leste", "TON": "Tonga", "TTO": "Trinidad and Tobago", "TUN": "Tunisia", "TUR": "Turkey", "TUV": "Tuvalu", "TWN": "Taiwan, Province of China", "TZA": "Tanzania, United Republic of", "UGA": "Uganda", "UKR": "Ukraine", "UMI": "United States Minor Outlying Islands", "UNA": "specialized agency of the United Nations", "UNK": "Resident of Kosovo issued byUNMIK", "UNO": "United Nations organization", "URY": "Uruguay", "USA": "United States of America", "UZB": "Uzbekistan", "VAT": "Holy See (Vatican City State)", "VCT": "Saint Vincent and the Grenadines", "VEN": "Venezuela, Bolivarian Republic of", "VGB": "Virgin Islands, British", "VIR": "Virgin Islands, U.S.", "VNM": "Viet Nam", "VUT": "Vanuatu", "WLF": "Wallis and Futuna", "WSA": "World Service Authority World Passport", "WSM": "Samoa", "XOM": "Sovereign Military Order of Malta", "XXA": "Stateless person", "XXB": "Refugee, as per the 1951 Convention", "XXC": "Refugee, other than defined above", "XXX": "Unspecified nationality", "YEM": "Yemen", "ZAF": "South Africa", "ZMB": "Zambia", "ZWE": "Zimbabwe" };
module.exports = COUNTRIES;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseCountry = __webpack_require__(2);

module.exports = function parseIssuingCountry(value) {
  var result = parseCountry(value);
  result.label = 'Nationality';
  return result;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseCountry = __webpack_require__(2);

module.exports = function parseIssuingCountry(value) {
  var result = parseCountry(value);
  result.label = 'Issuing country';
  return result;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var check = __webpack_require__(0);

module.exports = function parseDate(value, checkDigit) {
  var result = {
    error: [],
    source: value
  };
  result.year = value.substring(0, 2);
  result.month = value.substring(2, 4);
  result.day = value.substring(4, 6);
  result.value = `${result.day}.${result.month}.${result.year}`;
  if (checkDigit !== false && !check(value, checkDigit)) {
    result.error.push(`Check digit "${checkDigit}" not valid`);
  }
  if (result.month < 1 || result.month > 12) {
    result.error.push(`Month "${result.month}" not valid`);
  }
  if (result.day < 1 || result.day > 31) {
    result.error.push(`Day "${result.day}" not valid`);
  }
  return result;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseDate = __webpack_require__(14);

module.exports = function parseExpirationDate(value, checkDigit) {
  var result = parseDate(value, checkDigit);
  result.label = 'Expiration date';
  return result;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var COUNTRIES = __webpack_require__(11);
var parse = __webpack_require__(17);

module.exports = {
  COUNTRIES,
  parse
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseTD1 = __webpack_require__(18);
var parseTD2 = __webpack_require__(20);
var parseTD3 = __webpack_require__(21);
var parsePCC = __webpack_require__(23);

module.exports = function parse(text, options = {}) {
  var lines = text.split(/[\r\n]+/);
  var result = { logs: [] };
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
      result.logs.push('We need 2 or 3 lines');
  }

  if (options.debug) {
    return result;
  }

  var simpleResult = {
    values: {},
    errors: []
  };

  for (var key in result) {
    if (result[key].error) simpleResult.errors.push(...result[key].error);
    if (result[key].value !== undefined) {
      simpleResult.values[key] = result[key].value;
    }
  }
  simpleResult.isValid = result.isValid;

  return simpleResult;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var globalCheck = __webpack_require__(7);
var parseText = __webpack_require__(1);
var parseSex = __webpack_require__(8);
var parseDocumentNumber = __webpack_require__(9);
var parseDocumentType = __webpack_require__(10);
var parseNationality = __webpack_require__(12);
var parseIssuingCountry = __webpack_require__(13);
var parseBirthdayDate = __webpack_require__(3);
var finalAnalysis = __webpack_require__(4);
var parseFirstname = __webpack_require__(5);
var parseLastname = __webpack_require__(6);

module.exports = function parseTD1(lines) {
  var result = {
    format: 'TD1',
    error: []
  };
  var first = lines[0];
  var second = lines[1];
  var third = lines[2];

  if (first.length !== 30) {
    result.error.push('First line does not have 30 symbols');
  }
  result.documentType = parseDocumentType(first.substring(0, 2));
  result.issuingCountry = parseIssuingCountry(first.substring(2, 5));
  result.optional1 = parseText('Optional 1', first.substring(15, 30));
  result.documentNumber = parseDocumentNumber(first.substring(5, 14), first.substr(14, 1), result.optional1.value);

  if (second.length !== 30) {
    result.error.push('Second line does not have 30 symbols');
  }
  result.birthDate = parseBirthdayDate(second.substring(0, 6), second.substr(6, 1));
  result.sex = parseSex(second.substr(7, 1));
  result.expirationDate = parseBirthdayDate(second.substring(8, 14), second.substr(14, 1));
  result.nationality = parseNationality(second.substring(15, 18), second.substr(18, 1));
  result.optional2 = parseText('Optional 2', second.substring(18, 29));

  if (third.length !== 30) {
    result.error.push('Third line does not have 30 symbols');
  }
  result.lastname = parseFirstname('Lastname', third.substring(0, 30));
  result.firstname = parseLastname('Firstname', third.substring(0, 30));
  result.globalCheck = globalCheck(first.substring(5, 30) + second.substring(0, 7) + second.substring(8, 15) + second.substring(18, 29), second.substr(29, 1));

  finalAnalysis(result);
  return result;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function cleanText(string) {
  return string.replace(/<+$/g, '').replace(/</g, ' ');
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var globalCheck = __webpack_require__(7);
var parseSex = __webpack_require__(8);
var parseDocumentNumber = __webpack_require__(9);
var parseDocumentType = __webpack_require__(10);
var parseNationality = __webpack_require__(12);
var parseIssuingCountry = __webpack_require__(13);
var parseBirthdayDate = __webpack_require__(3);
var parseExpirationDate = __webpack_require__(15);
var finalAnalysis = __webpack_require__(4);
var parseFirstname = __webpack_require__(5);
var parseLastname = __webpack_require__(6);

module.exports = function parseTD3(lines) {
  var result = {
    error: [],
    format: 'TD2'
  };

  var first = lines[0];
  var second = lines[1];

  if (first.length !== 36) {
    result.error.push('First line does not have 36 symbols');
  }
  result.documentType = parseDocumentType(first.substring(0, 2));
  result.issuingCountry = parseIssuingCountry(first.substring(2, 5));
  result.lastname = parseFirstname('Lastname', first.substring(5, 36));
  result.firstname = parseLastname('Firstname', first.substring(5, 36));

  if (second.length !== 36) {
    result.error.push('Second line does not have 36 symbols');
  }
  result.documentNumber = parseDocumentNumber(second.substring(0, 9), second.substr(9, 1), second.substr(28, 35));
  result.nationality = parseNationality(second.substring(10, 13));
  result.birthDate = parseBirthdayDate(second.substring(13, 19), second.substr(19, 1));
  result.sex = parseSex(second.substring(20, 21));
  result.expirationDate = parseExpirationDate(second.substring(21, 27), second.substr(27, 1));

  result.globalCheck = globalCheck(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 35), second.substr(35, 1));
  finalAnalysis(result);

  return result;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var globalCheck = __webpack_require__(7);
var parseSex = __webpack_require__(8);
var parseDocumentNumber = __webpack_require__(9);
var parseDocumentType = __webpack_require__(10);
var parseCountry = __webpack_require__(2);
var parseBirthdayDate = __webpack_require__(3);
var parseExpirationDate = __webpack_require__(15);
var finalAnalysis = __webpack_require__(4);
var parseFirstname = __webpack_require__(5);
var parseLastname = __webpack_require__(6);
var parsePersonalNumber = __webpack_require__(22);

module.exports = function parseTD3(lines) {
  var result = {
    error: [],
    format: 'TD3'
  };

  var first = lines[0];
  var second = lines[1];

  if (first.length !== 44) {
    result.error.push('First line does not have 44 symbols');
  }
  result.documentType = parseDocumentType(first.substring(0, 2));
  result.issuingCountry = parseCountry(first.substring(2, 5));
  result.lastname = parseFirstname('Lastname', first.substring(5, 50));
  result.firstname = parseLastname('Firstname', first.substring(5, 50));
  result.documentNumber = parseDocumentNumber(second.substring(0, 9), second.substr(9, 1));
  result.nationality = parseCountry(second.substring(10, 13));
  result.birthDate = parseBirthdayDate(second.substring(13, 19), second.substr(19, 1));

  if (second.length !== 44) {
    result.error.push('Second line does not have 44 symbols');
  }
  result.sex = parseSex(second.substring(20, 21));
  result.expirationDate = parseExpirationDate(second.substring(21, 27), second.substr(27, 1));
  result.personalNumber = parsePersonalNumber(second.substring(28, 42));
  result.globalCheck = globalCheck(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 43), second.substr(43, 1));
  finalAnalysis(result);

  return result;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseText = __webpack_require__(1);
var check = __webpack_require__(0);

module.exports = function parseExpirationDate(value, checkDigit) {
  var result = parseText('Personal number', value, /^[A-Z0-9<]+<*$/);
  if (checkDigit && !check(value, checkDigit)) {
    result.error.push(`Check digit "${checkDigit}" not valid`);
  }
  return result;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parsePCCDocumentNumber = __webpack_require__(24);
var parsePCCDocumentType = __webpack_require__(25);
var parseCountry = __webpack_require__(2);
var parseBirthdayDate = __webpack_require__(3);
var parseNumber = __webpack_require__(26);
var checkSeparator = __webpack_require__(27);
var finalAnalysis = __webpack_require__(4);
var parseFirstname = __webpack_require__(5);
var parseLastname = __webpack_require__(6);

module.exports = function parseTD1(lines) {
  var result = {
    format: 'PCC',
    error: []
  };
  var first = lines[0];
  if (first.length !== 9) {
    result.error.push('First line does not have 9 symbols');
  }
  var second = lines[1];
  if (second.length !== 30) {
    result.error.push('Second line does not have 30 symbols');
  }
  var third = lines[2];
  if (third.length !== 30) {
    result.error.push('Third line does not have 30 symbols');
  }

  result.documentNumber = parsePCCDocumentNumber(first);
  result.documentType = parsePCCDocumentType(second.substring(0, 2));
  result.issuingCountry = parseCountry(second.substring(2, 5));
  result.nipCode = parseNumber('NIP code', second.substring(5, 14));
  result.version = parseNumber('Version', second.substring(14, 17));
  result.separator1 = checkSeparator('Separator second line 18-19', second.substring(17, 19));
  result.birthDate = parseBirthdayDate(second.substring(19, 25), false);
  result.separator1 = checkSeparator('Separator second line 26-30', second.substring(25, 30));
  result.lastname = parseFirstname('Lastname', third.substring(0, 30));
  result.firstname = parseLastname('Firstname', third.substring(0, 30));
  finalAnalysis(result);

  return result;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDocumentNumber(source) {
  // swiss driving license number
  var first = source.substring(0, 3);
  var second = source.substring(3, 6);
  var language = source.charAt(6);
  var end = source.substring(7);

  var result = {
    label: 'Document number',
    source,
    error: []
  };
  if (!first.match(/^[A-Z]{3}$/)) {
    result.error.push(`The document number "${source}" is incorrect. Need to start by 3 uppercase letters.`);
  }
  if (!second.match(/^[0-9]{3}$/)) {
    result.error.push(`The document number "${source}" is incorrect. Need to have 3 digits in position 3, 4 and 5.`);
  }
  if (end !== '<<') {
    result.error.push(`The document number "${source}" is incorrect. Need to end with <<.`);
  }
  var languageDescription;
  switch (language) {
    case 'D':
      languageDescription = 'German';
      break;
    case 'F':
      languageDescription = 'French';
      break;
    case 'I':
      languageDescription = 'Italian';
      break;
    case 'R':
      languageDescription = 'Romansh';
      break;
    default:
      result.error.push(`The document number "${source}" is incorrect. Language ${language} unknown.`);
  }
  result.value = `${first + second} - language: ${languageDescription}`;
  return result;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseDocumentType(source) {
  var result = {
    label: 'Document type',
    source,
    error: []
  };
  switch (result.source) {
    case 'FA':
      result.value = 'Swiss driving license';
      break;
    default:
      result.error.push('Swiss driving license must have a document type "FA"');
  }
  return result;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseNumber(label, source) {
  var result = {
    error: [],
    label,
    source
  };
  if (!source.match(/^[0-9]+$/)) {
    result.error.push('It may only be composed of numbers');
  }

  return result;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function checkSeparator(label, source) {
  var result = {
    source,
    error: [],
    label
  };
  if (!source.match(/^<*$/)) {
    result.error.push('The separator must be composed only by "<"');
  }
  return result;
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=mrz.js.map