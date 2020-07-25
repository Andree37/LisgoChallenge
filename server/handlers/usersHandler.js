'use strict';

const Users = require('../models/usersModel');
const Roles = require('../models/rolesModel');
const hash = require('../utils/hash');

const create = async (request, h) => {
    // payload, json with name, surname and password
    let strPassword = request.payload['password'].toString();
    let hashedPw = await hash.make(strPassword);

    //check type of user (admin, normal)
    let selectedType = request.payload['role'];

    if (!selectedType) {
        return h.response("Bad Request, missing role attribute name").code(400);
    }
    let role = await Roles.query().findOne({type: selectedType.toString()});

    let data = {
        name: request.payload['name'],
        surname: request.payload['surname'],
        password: hashedPw,
        role_id: role.id
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