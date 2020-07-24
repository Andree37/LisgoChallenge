'use strict';

const loginHandler = require('../handlers/loginHandler')

module.exports = [
    {
        method: 'POST',
        path: '/login',
        options:{
            auth: false
        },
        handler: loginHandler.login
    }
]