'use strict'


const error400 = (message) => {
    let statusCode = 400;
    let error = 'Bad Request';

    return defaultError(statusCode, error, message);
}

const error401 = (message) => {
    let statusCode = 401;
    let error = 'Unauthorized';

    return defaultError(statusCode, error, message);
}

const error404 = (message) => {
    let statusCode = 404;
    let error = 'Not Found';

    return defaultError(statusCode, error, message);
}

const defaultError = (statusCode, error, message) => {
    return {
        statusCode: statusCode,
        error: error,
        message: message,
        attributes: {
            error: message
        }
    }
}

module.exports = {
    error400,
    error401,
    error404,
}