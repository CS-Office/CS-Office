// the connection!
const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('users');
  },
  getOne(id) {
    return knex('users').where('id', id).first();
  },
  getOneByEmail(email) {
    return knex('users').where('email', email).first();
  },
  create(user) {
    return knex('users').insert(user, '*');
  },
  update(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  delete(id) {
    return knex('users').where('id', id).del();
  },
};
