'use strict';

module.exports = function parseBapConfiguration(bapConfig) {
    switch (bapConfig) {
        case '1':
        case 'P':
        case 'N':
        case '<':
            return bapConfig;
        default:
            throw new Error(
                `invalid BAP configuration code: ${bapConfig}. Must be 1, P, N or <`
            );
    }
};
