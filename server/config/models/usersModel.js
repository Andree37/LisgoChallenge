'use strict';

const { Model } = require('objection');

class UsersModel extends Model {
    static get tableName() {
        return 'users';
    }
}

module.exports = UsersModel;