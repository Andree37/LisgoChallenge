'use strict';

const todoHandler = require('../handlers/todoHandler')
const todoSchema = require('../schemas/todoSchema');

module.exports = [
    {
        method: 'PUT',
        path: '/todos',
        handler: todoHandler.create,
        options: {
            validate: {
                payload: todoSchema
            }
        }
    },
    {
        method: 'GET',
        path: '/todos',
        handler: todoHandler.get
    },
    {
        method: 'PATCH',
        path: '/todos/{id}',
        handler: todoHandler.edit,
        options: {
            validate: {
                payload: todoSchema
            }
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: todoHandler.remove
    }
];