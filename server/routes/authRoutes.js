'use strict';

const loginHandler = require('../handlers/loginHandler');
const usersSchema = require('../schemas/usersSchema');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        options:{
            auth: false,
            validate: {
                payload: usersSchema
            }
        },
        handler: loginHandler.login
    },
    {
        method: 'POST',
        path: '/logout',
        handler: loginHandler.logout
    }
]