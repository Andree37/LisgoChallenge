'use strict';

const todo = require('./todo');
const users = require('./users');

module.exports = [
    ...todo,
    ...users
]