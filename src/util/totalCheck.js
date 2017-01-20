'use strict';

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
                    result.error.push(result[key].label + ': ' + err);
                }
            } else {
                result[key].isValid = true;
            }
            result.logs.push(
                Object.assign({}, result[key], {field: key})
            );
        }
    }

    // we will also create the result as a table call 'logs'


};
