'use strict';

/*
We check all the values to find out if it is valid or not
We will also combine all the errors  ...
 */


module.exports = function globalCheck(result) {
    result.isValid=true;
    for (var key of Object.keys(result)) {
        if (result[key] instanceof Object) {
            if (result[key].error && result[key].error.length>0) {
                result[key].isValid=false;
                result.isValid=false;
                result.error=result.error.concat(result[key].error);
            } else {
                result.isValid=true;
            }
        }
    }
};