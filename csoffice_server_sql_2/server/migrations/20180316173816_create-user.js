
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    // table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
