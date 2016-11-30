(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mrzTools"] = factory();
	else
		root["mrzTools"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	const COUNTRIES = __webpack_require__(1);
	const parse = __webpack_require__(2);


	function parseMRZ(text) {
	    return parse(text);
	}

	module.exports = {
	    COUNTRIES,
	    parseMRZ
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	const COUNTRIES = {'ABW': 'Aruba', 'AFG': 'Afghanistan', 'AGO': 'Angola', 'AIA': 'Anguilla', 'ALA': 'Åland Islands', 'ALB': 'Albania', 'AND': 'Andorra', 'ARE': 'United Arab Emirates', 'ARG': 'Argentina', 'ARM': 'Armenia', 'ASM': 'American Samoa', 'ATA': 'Antarctica', 'ATF': 'French Southern Territories', 'ATG': 'Antigua and Barbuda', 'AUS': 'Australia', 'AUT': 'Austria', 'AZE': 'Azerbaijan', 'BDI': 'Burundi', 'BEL': 'Belgium', 'BEN': 'Benin', 'BES': 'Bonaire, Sint Eustatius and Saba', 'BFA': 'Burkina Faso', 'BGD': 'Bangladesh', 'BGR': 'Bulgaria', 'BHR': 'Bahrain', 'BHS': 'Bahamas', 'BIH': 'Bosnia and Herzegovina', 'BLM': 'Saint Barthélemy', 'BLR': 'Belarus', 'BLZ': 'Belize', 'BMU': 'Bermuda', 'BOL': 'Bolivia, Plurinational State of', 'BRA': 'Brazil', 'BRB': 'Barbados', 'BRN': 'Brunei Darussalam', 'BTN': 'Bhutan', 'BVT': 'Bouvet Island', 'BWA': 'Botswana', 'CAF': 'Central African Republic', 'CAN': 'Canada', 'CCK': 'Cocos (Keeling) Islands', 'CHE': 'Switzerland', 'CHL': 'Chile', 'CHN': 'China', 'CIV': "Côte d'Ivoire", 'CMR': 'Cameroon', 'COD': 'Congo, the Democratic Republic of the', 'COG': 'Congo', 'COK': 'Cook Islands', 'COL': 'Colombia', 'COM': 'Comoros', 'CPV': 'Cabo Verde', 'CRI': 'Costa Rica', 'CUB': 'Cuba', 'CUW': 'Curaçao', 'CXR': 'Christmas Island', 'CYM': 'Cayman Islands', 'CYP': 'Cyprus', 'CZE': 'Czechia', 'D': 'Germany', 'DEU': 'Germany', 'DJI': 'Djibouti', 'DMA': 'Dominica', 'DNK': 'Denmark', 'DOM': 'Dominican Republic', 'DZA': 'Algeria', 'ECU': 'Ecuador', 'EGY': 'Egypt', 'ERI': 'Eritrea', 'ESH': 'Western Sahara', 'ESP': 'Spain', 'EST': 'Estonia', 'ETH': 'Ethiopia', 'FIN': 'Finland', 'FJI': 'Fiji', 'FLK': 'Falkland Islands (Malvinas)', 'FRA': 'France', 'FRO': 'Faroe Islands', 'FSM': 'Micronesia, Federated States of', 'GAB': 'Gabon', 'GBD': 'British Overseas Territories Citizen (BOTC)', 'GBN': 'British National (Overseas)', 'GBO': 'British Overseas Citizen', 'GBP': 'British Protected Person', 'GBR': 'United Kingdom', 'GBS': 'British Subject', 'GEO': 'Georgia', 'GGY': 'Guernsey', 'GHA': 'Ghana', 'GIB': 'Gibraltar', 'GIN': 'Guinea', 'GLP': 'Guadeloupe', 'GMB': 'Gambia', 'GNB': 'Guinea-Bissau', 'GNQ': 'Equatorial Guinea', 'GRC': 'Greece', 'GRD': 'Grenada', 'GRL': 'Greenland', 'GTM': 'Guatemala', 'GUF': 'French Guiana', 'GUM': 'Guam', 'GUY': 'Guyana', 'HKG': 'Hong Kong', 'HMD': 'Heard Island and McDonald Islands', 'HND': 'Honduras', 'HRV': 'Croatia', 'HTI': 'Haiti', 'HUN': 'Hungary', 'IDN': 'Indonesia', 'IMN': 'Isle of Man', 'IND': 'India', 'IOT': 'British Indian Ocean Territory', 'IRL': 'Ireland', 'IRN': 'Iran, Islamic Republic of', 'IRQ': 'Iraq', 'ISL': 'Iceland', 'ISR': 'Israel', 'ITA': 'Italy', 'JAM': 'Jamaica', 'JEY': 'Jersey', 'JOR': 'Jordan', 'JPN': 'Japan', 'KAZ': 'Kazakhstan', 'KEN': 'Kenya', 'KGZ': 'Kyrgyzstan', 'KHM': 'Cambodia', 'KIR': 'Kiribati', 'KNA': 'Saint Kitts and Nevis', 'KOR': 'Korea, Republic of', 'KWT': 'Kuwait', 'LAO': "Lao People's Democratic Republic", 'LBN': 'Lebanon', 'LBR': 'Liberia', 'LBY': 'Libya', 'LCA': 'Saint Lucia', 'LIE': 'Liechtenstein', 'LKA': 'Sri Lanka', 'LSO': 'Lesotho', 'LTU': 'Lithuania', 'LUX': 'Luxembourg', 'LVA': 'Latvia', 'MAC': 'Macao', 'MAF': 'Saint Martin (French part)', 'MAR': 'Morocco', 'MCO': 'Monaco', 'MDA': 'Moldova, Republic of', 'MDG': 'Madagascar', 'MDV': 'Maldives', 'MEX': 'Mexico', 'MHL': 'Marshall Islands', 'MKD': 'Macedonia, the former Yugoslav Republic of', 'MLI': 'Mali', 'MLT': 'Malta', 'MMR': 'Myanmar', 'MNE': 'Montenegro', 'MNG': 'Mongolia', 'MNP': 'Northern Mariana Islands', 'MOZ': 'Mozambique', 'MRT': 'Mauritania', 'MSR': 'Montserrat', 'MTQ': 'Martinique', 'MUS': 'Mauritius', 'MWI': 'Malawi', 'MYS': 'Malaysia', 'MYT': 'Mayotte', 'NAM': 'Namibia', 'NCL': 'New Caledonia', 'NER': 'Niger', 'NFK': 'Norfolk Island', 'NGA': 'Nigeria', 'NIC': 'Nicaragua', 'NIU': 'Niue', 'NLD': 'Netherlands', 'NOR': 'Norway', 'NPL': 'Nepal', 'NRU': 'Nauru', 'NZL': 'New Zealand', 'OMN': 'Oman', 'PAK': 'Pakistan', 'PAN': 'Panama', 'PCN': 'Pitcairn', 'PER': 'Peru', 'PHL': 'Philippines', 'PLW': 'Palau', 'PNG': 'Papua New Guinea', 'POL': 'Poland', 'PRI': 'Puerto Rico', 'PRK': "Korea, Democratic People's Republic of", 'PRT': 'Portugal', 'PRY': 'Paraguay', 'PSE': 'Palestine, State of', 'PYF': 'French Polynesia', 'QAT': 'Qatar', 'REU': 'Réunion', 'ROU': 'Romania', 'RUS': 'Russian Federation', 'RWA': 'Rwanda', 'SAU': 'Saudi Arabia', 'SDN': 'Sudan', 'SEN': 'Senegal', 'SGP': 'Singapore', 'SGS': 'South Georgia and the South Sandwich Islands', 'SHN': 'Saint Helena, Ascension and Tristan da Cunha', 'SJM': 'Svalbard and Jan Mayen', 'SLB': 'Solomon Islands', 'SLE': 'Sierra Leone', 'SLV': 'El Salvador', 'SMR': 'San Marino', 'SOM': 'Somalia', 'SPM': 'Saint Pierre and Miquelon', 'SRB': 'Serbia', 'SSD': 'South Sudan', 'STP': 'Sao Tome and Principe', 'SUR': 'Suriname', 'SVK': 'Slovakia', 'SVN': 'Slovenia', 'SWE': 'Sweden', 'SWZ': 'Swaziland', 'SXM': 'Sint Maarten (Dutch part)', 'SYC': 'Seychelles', 'SYR': 'Syrian Arab Republic', 'TCA': 'Turks and Caicos Islands', 'TCD': 'Chad', 'TGO': 'Togo', 'THA': 'Thailand', 'TJK': 'Tajikistan', 'TKL': 'Tokelau', 'TKM': 'Turkmenistan', 'TLS': 'Timor-Leste', 'TON': 'Tonga', 'TTO': 'Trinidad and Tobago', 'TUN': 'Tunisia', 'TUR': 'Turkey', 'TUV': 'Tuvalu', 'TWN': 'Taiwan, Province of China', 'TZA': 'Tanzania, United Republic of', 'UGA': 'Uganda', 'UKR': 'Ukraine', 'UMI': 'United States Minor Outlying Islands', 'UNA': 'specialized agency of the United Nations', 'UNK': 'Resident of Kosovo issued byUNMIK', 'UNO': 'United Nations organization', 'URY': 'Uruguay', 'USA': 'United States of America', 'UZB': 'Uzbekistan', 'VAT': 'Holy See (Vatican City State)', 'VCT': 'Saint Vincent and the Grenadines', 'VEN': 'Venezuela, Bolivarian Republic of', 'VGB': 'Virgin Islands, British', 'VIR': 'Virgin Islands, U.S.', 'VNM': 'Viet Nam', 'VUT': 'Vanuatu', 'WLF': 'Wallis and Futuna', 'WSA': 'World Service Authority World Passport', 'WSM': 'Samoa', 'XOM': 'Sovereign Military Order of Malta', 'XXA': 'Stateless person', 'XXB': 'Refugee, as per the 1951 Convention', 'XXC': 'Refugee, other than defined above', 'XXX': 'Unspecified nationality', 'YEM': 'Yemen', 'ZAF': 'South Africa', 'ZMB': 'Zambia', 'ZWE': 'Zimbabwe'};
	module.exports = COUNTRIES;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parseTD1 = __webpack_require__(3);
	var parseTD3 = __webpack_require__(5);

	module.exports = function parse(text) {
	    var logs = [];
	    var lines = text.split(/[\r\n]+/);
	    var result;
	    switch (lines.length) {
	        case 2:
	            result = parseTD3(lines);
	            break;
	        case 3:
	            result = parseTD1(lines);
	            break;
	        default:
	            logs.push('We need 2 or 3 lines');
	    }
	    return result;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var {
	    check,
	    parseText,
	    parseCountry,
	    parseDate,
	    parseSex,
	    parseDocumentNumber
	} = __webpack_require__(4);


	module.exports = function parseTD1(lines) {
	    var logs = [];
	    logs.push('Parsing TD1 format');
	    var first = lines[0];
	    if (first.length !== 30) logs.push('First line does not have 30 symbols');
	    var second = lines[1];
	    if (second.length !== 30) logs.push('Second line does not have 30 symbols');
	    var third = lines[2];
	    if (third.length !== 30) logs.push('Third line does not have 30 symbols');
	    var result = {};
	    result.format = 'TD3';
	    result.documentType = {
	        code: first[0],
	        type: parseText(first[1])
	    };
	    result.issuingCountry = parseCountry(parseText(first, 2, 5));
	    result.documentNumber = parseDocumentNumber(parseText(first, 5, 14), first.substr(14, 1));
	    result.optional1 = parseText(first, 15, 30);

	    result.birthDate = parseDate(parseText(second, 0, 6), second.substr(6, 1));
	    result.sex = parseSex(second.substr(7, 1));
	    result.expirationDate = parseDate(parseText(second, 8, 14), second.substr(14, 1));
	    result.nationality = parseCountry(parseText(second, 15, 18), second.substr(18, 1));
	    result.optional2 = parseText(second, 18, 29);
	    result.isValid = check(first.substring(5, 30) + second.substring(0, 7) + second.substring(8, 15) + second.substring(18, 29), second.substr(29, 1));

	    result.lastname = parseText(third, 0, 30).replace(/ {2}.*/, '');
	    result.firstname = parseText(third, 0, 30).replace(/.* {2}/, '');

	    logs.push('TD1 parse completed');
	    return {
	        logs,
	        value: result
	    };
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const COUNTRIES = __webpack_require__(1);

	function parseDocumentNumber(value, checkDigit) {
	    return {
	        value,
	        isValid: check(value, checkDigit)
	    };
	}


	function parseSex(value) {
	    var label = 'Unknown';
	    if (value === 'M') label = 'Masculin';
	    if (value === 'F') label = 'Féminin';
	    return {
	        code: value,
	        label: label
	    };
	}

	function parseDate(value, checkDigit) {
	    var result = {};
	    result.year = value.substring(0, 2);
	    result.month = value.substring(2, 4);
	    result.day = value.substring(4, 6);
	    result.isValid = check(value, checkDigit);
	    return result;
	}

	function parseCountry(value) {
	    var country = COUNTRIES[value];
	    return {
	        code: value,
	        name: country
	    };
	}

	function check(string, value) {

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
	}

	function parseText(text, from, to) {
	    return text.substring(from, to).replace(/<+$/g, '').replace(/</g, ' ');
	}

	module.exports = {
	    check,
	    parseText,
	    parseCountry,
	    parseDate,
	    parseSex,
	    parseDocumentNumber
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var {
	    check,
	    parseText,
	    parseCountry,
	    parseDate,
	    parseSex,
	    parseDocumentNumber
	} = __webpack_require__(4);

	module.exports = function parseTD3(lines) {
	    var logs = [];
	    logs.push('Parsing TD3 format');
	    var first = lines[0];
	    if (first.length !== 44) logs.push('First line does not have 44 symbols');
	    var second = lines[1];
	    if (second.length !== 44) logs.push('Second line does not have 44 symbols');
	    var result = {};
	    result.format = 'TD3';
	    result.documentType = {
	        code: first[0],
	        type: parseText(first[1])
	    };
	    result.issuingCountry = parseCountry(parseText(first, 2, 5));
	    result.lastname = parseText(first, 5, 50).replace(/ {2}.*/, '');
	    result.firstname = parseText(first, 5, 50).replace(/.* {2}/, '');
	    result.documentNumber = parseDocumentNumber(parseText(second, 0, 9), second.substr(9, 1));
	    result.nationality = parseCountry(parseText(second, 10, 13));
	    result.birthDate = parseDate(parseText(second, 13, 19), second.substr(19, 1));

	    result.sex = parseSex(parseText(second, 20, 21));

	    result.expirationDate = parseDate(parseText(second, 21, 27), second.substr(27, 1));

	    result.personalNumber = {
	        value: parseText(second, 28, 42)
	    };
	    result.personalNumber.isValid = check(second.substring(28, 42), second.substr(42, 1));
	    result.isValid = check(second.substring(0, 10) + second.substring(13, 20) + second.substring(21, 43), second.substr(43, 1));

	    logs.push('TD3 parse completed');
	    return {
	        logs,
	        value: result
	    };
	};


/***/ }
/******/ ])
});
;