'use strict';

const usersHandler = require('../handlers/usersHandler')

module.exports = [
    {
        method: 'PUT',
        path: '/users',
        handler: usersHandler.create
    },
    {
        method: 'GET',
        path: '/users',
        handler: usersHandler.get
    }
]