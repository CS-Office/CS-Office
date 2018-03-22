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
  // checkIfValidUser(email, password) {
  //   .where({email: email} )
  //   .select('password')

  //   return knex('users').where('email', email).where('password', password).first();
  
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
