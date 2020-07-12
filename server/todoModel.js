const { Model } = require('objection');

class TodoModel extends Model {
    static get tableName() {
        return 'todo';
    }
}

module.exports = TodoModel;
