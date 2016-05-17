var _ = require('lodash');

module.exports = {

    send: function(errorParams) {
        var messageObject = {};
        if (typeof errorParams == "string")
            messageObject.message = errorParams;
        if (typeof errorParams == "object") {
            var isErrorsArrayExist = (_.isArray(errorParams.errors) && errorParams.errors[0].message) ? (true) : (false);
            var isUniqueVoilation = (isErrorsArrayExist && _.indexOf(errorParams.errors[0].type.split(' '), 'unique') >= 0) ? (true) : (false);
            var messageError;
            if (isErrorsArrayExist && isUniqueVoilation) {
                var attribute = Object.keys(errorParams.fields)[0];
                (attribute == 'phone') ? (attribute = "Mobile number") : (attribute);
                messageError = attribute + " already exist";
            }
            if (isErrorsArrayExist && !isUniqueVoilation)
                messageError = (_.pick(errorParams.errors[0], 'message').message);
            if (!isErrorsArrayExist)
                messageError = (_.pick(errorParams, 'message').message);
            var exceptionError = (_.pick(errorParams, 'exception'));
            var contextError = (_.pick(errorParams, 'error@context'));
            var sqlError = "Unable to perform operation";
            messageObject.message = messageError || exceptionError || contextError || sqlError;
        }
        var array = [];
        array.push(messageObject);
        var errorObject = {};
        errorObject.errors = array;
        return errorObject;
    }

}
