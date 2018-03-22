const credentialsDB = require('./credentials').db;
const USER = credentialsDB.user;
const PASS = credentialsDB.password;
const HOST = credentialsDB.host;
const DB = credentialsDB.table;
const TESTDB = credentialsDB.testdb.table;
const TESTUSER = credentialsDB.testdb.user;
const TESTPASS = credentialsDB.testdb.password;
const TESTHOST = credentialsDB.testdb.host;
const localDbUser = require('./credentials').localDbUser;

console.log('DBTable:', DB, 'USERNAME:', USER, 'PASS:', PASS, 'HOST:', HOST, 'localDBUSER:', localDbUser, 'TestHost: ', TESTHOST);

// Update with your config settings.

// module.exports = {

//   development: {
//     client: 'pg',
//     // connection: 'postgres://localhost/cs_office_db',
//     connection: 'postgres://localhost/cs_office_db',
//   },
//   test: {
//     client: 'pg',
//     connection: 'postgres://localhost/test-cs_office_db',
//   },
// };


module.exports = {

  test: {
    client: 'pg',
    connection: {
      host: TESTHOST,
      port: '5432',
      database: TESTDB,
      user: TESTUSER,
      password: TESTPASS,
    },

    migrations: {
      directory: __dirname + '/migrations',
    },

    seeds: {
      directory: __dirname + '/seeds',
    },
  },

  // Development and host are now the same, they just reference different Amazong RDS PG instances
  development: {
    client: 'pg',
    connection: {
      host: HOST,
      port: '5432',
      database: DB,
      user: USER,
      password: PASS,
    },

    migrations: {
      directory: __dirname + '/migrations',
    },

    seeds: {
      directory: __dirname + '/seeds',
    },
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     host: HOST,
  //     port: '5432',
  //     database: 'clientcomm',
  //     user: USER,
  //     password: PASS,
  //   },

  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },

  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },


};
