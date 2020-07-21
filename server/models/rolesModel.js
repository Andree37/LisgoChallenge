'use strict';

const { Model } = require('objection');

class RolesModel extends Model {
    static get tableName() {
        return 'roles';
    }
}

module.exports = RolesModel;