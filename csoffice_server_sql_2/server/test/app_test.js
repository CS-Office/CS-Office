const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app.js');

// to ensure our test data is correct
const fixtures = require('./fixtures.js');

describe('CRUD Users', () => {
  before((done) => {
    // run migrations
    knex.migrate.latest()
      .then(() => {
      // run seeds
        return knex.seed.run();
      }).then(() => done());
  });

  it('Lists all Records', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        // console.log(response.body);
        expect(response.body).to.deep.equal(fixtures.users);
        done();
      })
      .catch(done);
  });
});
