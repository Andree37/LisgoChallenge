'use strict';

const Users = require('../models/usersModel');
const hash = require('../utils/hash');


const create = async (request, h) => {
    // payload, json with name, surname and password
    let strPassword = request.payload['password'].toString();
    let hash = await hash.make(strPassword);

    let data = {
        name: request.payload['name'],
        surname: request.payload['surname'],
        password: hash
    }

    let inserted = await Users.query()
        .insert(data)
        .returning('*');
    return h.response(inserted).code(201);
}

const get = async (request, h) => {
    let result = await Users.query()
            .withGraphFetched('role')
            .orderBy('name');
    return h.response(result);
}

module.exports = {
    create,
    get,
}