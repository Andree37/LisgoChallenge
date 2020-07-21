'use strict';

const Todo = require('../models/todoModel');

module.exports = [
    {
        method: 'PUT',
        path: '/todos',
        handler: async (request, h) => {
            // payload, json with description as string
            let inserted = await Todo.query()
                .insert(request.payload)
                .returning('*');
            return h.response(inserted).code(201);
        }
    },
    {
        method: 'GET',
        path: '/todos',
        handler: async (request, h) => {
            let filter = request.query.filter && request.query.filter !== 'ALL' ? request.query.filter : null;
            let orderBy = request.query.orderBy ? request.query.orderBy : 'DATE_ADDED';

            if (filter) {
                return Todo.query()
                    .where('state', filter.toLowerCase())
                    .orderBy(orderBy.toLowerCase());
            } else {
                return Todo.query()
                    .orderBy(orderBy.toLowerCase());
            }

        }
    },
    {
        method: 'PATCH',
        path: '/todos/{id}',
        handler: async (request, h) => {
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
            patch['updated_at'] = new Date().toUTCString();
            return Todo.query()
                .findById(id)
                .patch(patch)
                .returning('*');
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: async (request, h) => {
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
    }
];