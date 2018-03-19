const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../server.js');

// to ensure our test data is correct
const fixtures = require('./fixtures.js');

describe('CRUD Users', () => {
  before((done) => {
    // run migrations
    knex.migrate
      .latest()
      .then(() =>
        // run seeds
        knex.seed.run())
      .then(() => done());
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
  it('Show one record by id', (done) => {
    request(app)
      .get('/api/users/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        // console.log(response.body);
        expect(response.body).to.deep.equal(fixtures.users[2]);
        done();
      })
      .catch(done);
  });
  it('Creates a record', (done) => {
    // make the request against the app
    request(app)
      // post to route
      .post('/api/users')
      // send some data from fixture
      .send(fixtures.users)
      // then set headers want json back
      .set('Accept', 'application/json')
      // expect that the content type is json
      .expect('Content-Type', /json/)
      // make sure it has 200 status code
      .expect(200)
      // then we are gonna do something response
      .then((response) => {
        // expect response.body to be an object
        expect(response.body).to.be.a('object');
        // expect response.body to be the exact thing we created
        // as long as fixture has same id, it should be response.body.id, we know it's an object then grab it's id property
        fixtures.users.id = response.body.id;
        // then what we got exactly from the response should be exactly equal to what we sent in fixtures
        expect(response.body).to.deep.equal(fixtures.users);
        done();
      })
      .catch(done);
  });

  it('Updates a record', (done) => {
    fixtures.users.admin = false;
    request(app)
      .put('/api/users/6')
      .send(fixtures.users)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      // .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.users);
        done();
      })
      .catch(done);
  });

  it('Deletes a record', (done) => {
    request(app)
      .delete('/api/users/6')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true,
        });
        done();
      })
      .catch(done);
  });
});
