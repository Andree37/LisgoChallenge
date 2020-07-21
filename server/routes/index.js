'use strict';

const todo = require('./todo');
const users = require('./users');
const auth = require('./auth')

module.exports = [
    ...todo,
    ...users,
    ...auth,
]