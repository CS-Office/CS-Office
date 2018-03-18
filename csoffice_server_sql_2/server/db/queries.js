// the connection!
const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('users');
  },
};
