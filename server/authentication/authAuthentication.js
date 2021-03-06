'use strict'

const Users = require('../models/usersModel');
const ExpiredTokens = require('../models/authTokenModel');

const Token = require('./tokenAuthentication');
const hash = require('../utils/hash');
const env = require('../envVariables.json');

const login = async (name, surname, password) => {
    const user = await Users.query().withGraphFetched('role').findOne({name:name, surname:surname});

    if(!user) {
        throw new Error("User not found");
    }

    let passwordOK = await hash.compare(password, user.password);

    if(!passwordOK) {
        throw new Error("Passwords do not match");
    }

    const JWTData = {
        iss:'api',
        sub: user.id,
        exp: Math.floor(Date.now() / 1000) + env.LOGIN_EXPIRATION_TIME,
        data: {
            user_id: user.id,
            type: user.role.type
        }
    }

    return Token.generate(JWTData);
};

const logout = async (token) => {
    const expiredToken = await ExpiredTokens.query().insert({token: token});
}

module.exports = {
    login,
    logout,
}