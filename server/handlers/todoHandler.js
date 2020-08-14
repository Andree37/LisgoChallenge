'use strict';

const Todo = require('../models/todoModel');
const errorResponse = require('../utils/errorResponse');

const create = async (request, h) => {
    // payload, json with description as string
    let data = request.payload;
    let token = request.auth.credentials;
    data['user_id'] = token.data.user_id;
    let result = await Todo.query()
        .insert(data)
        .returning('*');
    let obj = {
        id: result.id,
        s_id: result.s_id,
        state: result.state,
        description: result.description,
        date_added: result.date_added
    }
    return h.response(obj).code(201);
}

const get = async (request, h) => {
    let filter = request.query.filter && request.query.filter !== 'ALL' ? request.query.filter : null;
    let orderBy = request.query.orderBy ? request.query.orderBy : 'DATE_ADDED';

    let token = request.auth.credentials;
    let whereQuery = {'user_id': token.data.user_id};

    let result;
    if (filter) {
        whereQuery['state'] = filter.toLowerCase();
        result = await Todo.query()
            .withGraphFetched('creator')
            .where(whereQuery)
            .orderBy(orderBy.toLowerCase());
    } else {
        result = await Todo.query()
            .withGraphFetched('creator')
            .where(whereQuery)
            .orderBy(orderBy.toLowerCase());
    }
    let objs = result.map(r => {
        return {
            id: r.id,
            s_id: r.s_id,
            state: r.state,
            description: r.description,
            date_added: r.date_added,
            creator: {
                id: r.creator.id,
                name: r.creator.name,
                surname: r.creator.surname,
            }
        }
    })
    return h.response(objs).code(200);
}

const getAll = async (request, h) => {
    let token = request.auth.credentials;

    if (token.data.type !== 'admin') {
        return h.response(errorResponse.error401('Only an admin can use this endpoint')).code(401);
    }

    let result = await Todo.query()
        .withGraphFetched('creator')
        .orderBy('date_added');

    let objs = result.map(r => {
        return {
            id: r.id,
            s_id: r.s_id,
            state: r.state,
            description: r.description,
            date_added: r.date_added,
            creator: {
                id: r.creator.id,
                name: r.creator.name,
                surname: r.creator.surname,
            }
        }
    })
    return h.response(objs).code(200);
}


const edit = async (request, h) => {
    let id = request.params.id;
    let item = null;
    let token = request.auth.credentials;

    // get the item, see if exists and is not complete
    try {
        item = await Todo.query()
            .findById(id);
        //if item isn't an user's task
        if (token.data.user_id !== item.user_id) {
            return h.response(errorResponse.error401('No permissions to edit this todo')).code(401);
        }

        // if item doesn't exist
        if (Array.isArray(item) && !item.length) {
            return h.response(errorResponse.error404('Not found')).code(404);
        }
        // if user wants to change description but the task is already complete
        else if (item.state === 'COMPLETE' && request.payload.description) {
            return h.response(errorResponse.error400('Already completed')).code(400);
        }
    } catch {
        // if the id doesnt match uuid format, it throws an error, here we catch it
        return h.response(errorResponse.error400('ID not uuid')).code(400);
    }

    // payload has state and description as json so we add the new date for updated
    let patch = request.payload;
    let result = await Todo.query()
        .findById(id)
        .patch(patch)
        .returning('*');

    let obj = {
        id: result.id,
        s_id: result.s_id,
        state: result.state,
        description: result.description,
        date_added: result.date_added
    }

    return h.response(obj).code(200);
}

const remove = async (request, h) => {
    let id = request.params.id;
    let item = null;
    let token = request.auth.credentials;

    try {
        item = await Todo.query()
            .findById(id);

        //if item isn't an user's task
        if (token.data.user_id !== item.user_id) {
            return h.response(errorResponse.error401('No permissions to remove this todo')).code(401);
        }
    } catch {
        return h.response(errorResponse.error404("ID not existent")).code(404);
    }
    await Todo.query()
        .delete()
        .where({id: id})
        .returning('*');

    return h.response("").code(200);

}

module.exports = {
    create,
    get,
    edit,
    remove,
    getAll,
};