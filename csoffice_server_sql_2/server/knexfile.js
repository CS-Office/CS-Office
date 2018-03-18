// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/cs_office_db',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-cs_office_db',
  },
};
