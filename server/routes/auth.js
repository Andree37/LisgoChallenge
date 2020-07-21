'use strict';

const loginHandler = require('../handlers/loginHandler')

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: loginHandler.login
    }
]