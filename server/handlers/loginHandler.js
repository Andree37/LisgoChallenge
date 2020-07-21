'use strict';

const Users = require('../models/usersModel');
const hash = require('../utils/hash')

const login = async (req, h) => {
    let data = req.payload;
    const user = await Users.query().findOne({name:data.name, surname:data.surname});

    if(!user) {
        return h.response('404 not found').code(404);
    }

    let passwordOK = await hash.compare(data.password, user.password);

    if(!passwordOK) {
        return h.response('Passwords do not match').code(401);
    }

    return "logged user"
};

module.exports = {
    login,
}