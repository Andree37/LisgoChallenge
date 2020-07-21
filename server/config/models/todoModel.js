'use strict';

const { Model } = require('objection');

class TodoModel extends Model {
    static get tableName() {
        return 'todo';
    }

    async $afterUpdate(opt, queryContext) {
        await super.$afterUpdate(opt, queryContext);
        let dateNow = new Date().toUTCString();
        this.$query()
            .update({updated_at: dateNow})
            .where('id', this.$id());
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
