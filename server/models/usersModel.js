'use strict';

const { Model } = require('objection');

class UsersModel extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Roles = require('./rolesModel');

        return {
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: Roles,
                join: {
                    from: 'users.role_id',
                    to: 'roles.id'
                }
            }
        };
    }
}

module.exports = UsersModel;