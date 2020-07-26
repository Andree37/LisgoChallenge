'use strict';

const authenticate = require('../authentication/authAuthentication');

const login = async (req, h) => {
    const { name, surname, password } = req.payload;

    try {
        const token = await authenticate.login(name, surname, password);

        return h.response({token});
    }
    catch (e) {
        return h.response(e.message).code(404);
    }

};

const logout = async (req, h) => {
    await authenticate.logout(req.auth.token);

    return h.response("user logged out").code(200);
}

module.exports = {
    login,
    logout,
}