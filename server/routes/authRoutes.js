'use strict';

const loginHandler = require('../handlers/loginHandler');
const authSchema = require('../schemas/authSchema');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        options:{
            auth: false,
            validate: {
                payload: authSchema
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