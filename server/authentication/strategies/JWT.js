'use strict'

const env = require('../../envVariables.json');
const ExpiredTokens = require('../../models/authTokenModel');

const name = 'jwt';
const schema = 'jwt';


const options = {
    key: env.JWT_KEY,
    validate: async function (decoded, req, h) {
        // check if token already in database (token in db = user has logged out)
        const token = await ExpiredTokens.query().findOne({token: req.auth.token});
        return {isValid: !token}
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