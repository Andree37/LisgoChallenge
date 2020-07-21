'use strict';

const usersHandler = require('../handlers/usersHandler')

module.exports = [
    {
        method: 'PUT',
        path: '/users',
        options:{
            auth: false
        },
        handler: usersHandler.create
    },
    {
        method: 'GET',
        path: '/users',
        options:{
            auth: false
        },
        handler: usersHandler.get
    }
]