'use strict'

const env = require('../../envVariables.json');

const name = 'jwt';
const schema = 'jwt';
const options = {
    key: env.JWT_KEY,
    validate: function (decoded, req, h) {
        // check if token already in database (token in db = user has logged out)
        return {isValid: true}
    },
    verifyOptions: {
        algorithms: [env.ALGORITHM]
    }
}

module.exports = {
    name,
    schema,
    options,
}