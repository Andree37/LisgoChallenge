'use strict';

const todo = require('./todoRoutes');
const users = require('./usersRoutes');
const auth = require('./authRoutes')

module.exports = [
    ...todo,
    ...users,
    ...auth,
]