'use strict';

const { Model } = require('objection');

class TodoModel extends Model {
    static get tableName() {
        return 'todos';
    }

    async $beforeUpdate(options, context) {
        // update the time of update on task
        this.updated_at = new Date().toUTCString();
    }

    static get relationMappings() {
        const UsersModel = require('./usersModel');

        return {
            creator: {
                relation: Model.BelongsToOneRelation,
                modelClass: UsersModel,
                join: {
                    from: 'todo.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = TodoModel;
