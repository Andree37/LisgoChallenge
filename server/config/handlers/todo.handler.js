'use strict';

const Todo = require('../models/todoModel');

const create = async (request, h) => {
    // payload, json with description as string
    let data = request.payload;
    data['user_id'] = "ff87487a-4026-4096-a603-5509147a8ece";
    let inserted = await Todo.query()
        .insert(data)
        .returning('*');
    return h.response(inserted).code(201);
}

const get = async (request, h) => {
    let filter = request.query.filter && request.query.filter !== 'ALL' ? request.query.filter : null;
    let orderBy = request.query.orderBy ? request.query.orderBy : 'DATE_ADDED';

    let result;
    if (filter) {
        result = await Todo.query()
            .withGraphFetched('creator')
            .where('state', filter.toLowerCase())
            .orderBy(orderBy.toLowerCase());
    } else {
        result = await Todo.query()
            .withGraphFetched('creator')
            .orderBy(orderBy.toLowerCase());
    }
    return h.response(result);
}

const edit = async (request, h) => {
    let id = request.params.id;
    let item = null;

    // get the item, see if exists and is not complete
    try {
        item = await Todo.query()
            .findById(id);
    } catch {
        // if the id doesnt match uuid format, it throws an error, here we catch it
        return h.response('404 not found').code(404);
    }

    // if item doesn't exist or is complete
    if (Array.isArray(item) && !item.length) {
        return h.response('404 not found').code(404);
    }
    // if user wants to change description but the task is already complete
    else if (item.state === 'COMPLETE' && request.payload.description) {
        return h.response('400 already completed').code(400);
    }

    // payload has state and description as json so we add the new date for updated
    let patch = request.payload;
    let result = await Todo.query()
        .findById(id)
        .patch(patch)
        .returning('*');

    return h.response(result);
}

const remove = async (request, h) => {
    let id = request.params.id;
    let item = null;
    try {
        item = await Todo.query()
            .delete()
            .where({id: id})
            .returning('*');
    } catch {
        return h.response("id not uuid").code(404);
    }

    if (Array.isArray(item) && !item.length) {
        return h.response("id not existent").code(404);
    } else {
        return h.response("").code(200);
    }

}

module.exports = {
    create,
    get,
    edit,
    remove,
};