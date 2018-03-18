// the connection!
const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('users');
  },
  getOne(id) {
    return knex('users').where('id', id).first();
  },
};
