'use strict'

const JWT = require('jsonwebtoken');
const env = require('../envVariables.json')

const generate = async payload => (
    new Promise(resolve => {
        JWT.sign(payload, env.JWT_KEY, {algorithm: env.ALGORITHM}, (err, token) => {
            if(err) {
                throw new Error("Invalid token");
            }
            resolve(token);
        });
    })
);

module.exports = {
    generate,
};
