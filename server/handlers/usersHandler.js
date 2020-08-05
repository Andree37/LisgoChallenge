'use strict';

const Users = require('../models/usersModel');
const Roles = require('../models/rolesModel');
const hash = require('../utils/hash');
const errorResponse = require('../utils/errorResponse');

const create = async (request, h) => {
    //only admin can access this endpoint
    if (request.auth.credentials.data.type !== "admin") {
        return h.response(errorResponse.error401("Only admin can create a new user")).code(401);
    }

    // payload, json with name, surname and password
    let strPassword = request.payload['password'].toString();
    let hashedPw = await hash.make(strPassword);

    //check type of user (admin, normal)
    let selectedType = request.payload['role'];

    if (!selectedType) {
        return h.response(errorResponse.error400("Bad Request, missing role attribute name")).code(400);
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

    let obj = {
        id: inserted.id,
        s_id: inserted.s_id,
        name: inserted.name,
        surname: inserted.surname,
        role: {
            type: selectedType
        }
    }
    return h.response(obj).code(201);
}

const get = async (request, h) => {
    if (request.auth.credentials.data.type !== "admin") {
        return h.response(errorResponse.error401("User has to be an admin to get all other users")).code(401);
    }
    let result = await Users.query()
        .withGraphFetched('role')
        .orderBy('name');
    console.log(result);
    let objs = result.map(r => {
        return {
            id: r.id,
            s_id: r.s_id,
            name: r.name,
            surname: r.surname,
            role: {
                type: r.role.type
            }
        }
    });

    return h.response(objs).code(200);
}

module.exports = {
    create,
    get,
}