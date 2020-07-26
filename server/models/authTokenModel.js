'use strict';

const { Model } = require('objection');

class UsersModel extends Model {
    static get tableName() {
        return 'auth_tokens';
    }
}

module.exports = UsersModel;