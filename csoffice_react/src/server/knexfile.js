const credentialsDB = require('./credentials').db;
const USER = credentialsDB.user;
const PASS = credentialsDB.password;
const HOST = credentialsDB.host;
const DB = credentialsDB.table;
const localDbUser = require('./credentials').localDbUser;

console.log('DBTable:', DB, 'USERNAME:', USER, 'PASS:', PASS, 'HOST:', HOST, 'localDBUSER:', localDbUser);

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

  testing: {
    client: 'pg',
    connection: {
      user: localDbUser,
      database: 'test-cs_office_19',
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
