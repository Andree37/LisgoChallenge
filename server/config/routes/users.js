'use strict';

const usersHandler = require('../handlers/users.handler')

module.exports = [
    {
        method: 'POST',
        path: '/users',
        options:{
            auth: false
        },
        handler: usersHandler.create()
    }
]