'use strict';

const usersHandler = require('../handlers/usersHandler');
const usersSchema = require('../schemas/usersSchema');

module.exports = [
    {
        method: 'PUT',
        path: '/users',
        handler: usersHandler.create,
        options: {
            validate: {
                payload: usersSchema
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: usersHandler.get
    }
]