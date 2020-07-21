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
                relation: Model.ManyToManyRelation,
                modelClass: Roles,
                join: {
                    from: 'users.id',
                    through: {
                        //users_roles is the join table
                        from: 'users_roles.user_id',
                        to: 'users_roles.role_id'
                    },
                    to: 'roles.id'
                }
            }
        };
    }
}

module.exports = UsersModel;