
const users = require('../testData/users');

exports.seed = (knex, Promise) => {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(() => {
            // Inserts seed entries
            return knex('users').insert(users);
        });
};
