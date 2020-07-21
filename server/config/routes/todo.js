'use strict';

const todoHandler = require('../handlers/todo.handler')

module.exports = [
    {
        method: 'PUT',
        path: '/todos',
        handler: todoHandler.create
    },
    {
        method: 'GET',
        path: '/todos',
        handler: todoHandler.get
    },
    {
        method: 'PATCH',
        path: '/todos/{id}',
        handler: todoHandler.edit
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        handler: todoHandler.remove
    }
];