

const credentialsDB = {
  
  //   or 'http://localhost:3000' for local development
  baseUrl: 'http://localhost:3000',


  // For testing purposes
  // TODO: Make this something that is set when running the tests
  localDbUser: 'postgres://localhost/cs_office_db',

  // Connection details for the production database
  db: {
    user: 'csoffice19',
    password: 'csoffice19',
    table: 'cs_office_19',
    testTable: 'test_cs_office_19',
    host: 'postgres-cs-office.cdulqhk3fcwx.us-west-1.rds.amazonaws.com',
  },

};


module.exports = credentialsDB;
