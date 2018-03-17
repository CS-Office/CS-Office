const knex = require('../db/knex');

describe('CRUD Users', () => {
    before((done) => {
    // run migrations
        knex.migrate.latest()
            .then(() => {
                // run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    it('Works...', () => {
        console.log('Its working!');
    });
});
