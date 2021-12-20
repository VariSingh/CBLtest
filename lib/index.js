/**
 * @param {array} validateParams Array of params which needs to be validated
 * @param {object} input Object of payload
 */
module.exports.validate = (validateParams, input) => {
    let isInvalid = false;
    let errorMessage = {};
    validateParams.forEach(param => {
        if (!input[param] && !isInvalid) {
            errorMessage[param] = (`${param} is required.`);
            isInvalid = true;
        }
    });

    return Object.keys(errorMessage).length === 0 ? false : errorMessage;
}

/**
 * @param {Error} error Error object
 * @param {string} key Key for which validation needs to be checked
 */
module.exports.handleErrors = (error, key) => {
    console.log("error---",error);
    if (error.name == 'ValidationError') {
        const { path, message } = error.errors[key];
        return { errorMessage: { [path]: `${path} ${message}` }, status: 400 };
    } else if(error.name == 'CastError'){
        const { path, message } = error;
        return { errorMessage: { [path]: `${path} ${message}` }, status: 400 };
    }else if(error.name=='MongoError' && error.code === 11000){
        return { errorMessage: { inline_message: `email is already taken` }, status: 400 };
    }
    else {
        return { errorMessage: {message:`Something went wrong.`}, status: 500 };
    }
}