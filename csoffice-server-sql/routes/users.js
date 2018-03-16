const { Router } = require('express');
// pool instance for queries to db
const pool = require('../db');
const router = Router();

// Get Request all users
router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM users ORDER by id ASC', (err, res) => {
    // pass error to error middleware
    if (err) return next(err);
    response.json(res.rows);
  });
});

// Get request grab single user
router.get('/:id', (request, response, next) => {
  const { id } = request.params;

  // id = $1, represents a one index array containing the id variables we want to be inserted into the string
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, res ) => {
    if (err) return next (err);
    response.json(res.rows);
  });
});

// CREATE A USER
router.post('/', (request, response, next) => {
  const { firstName, lastName, password, email, isAdmin } = request.body;

  pool.query(
    'INSERT INTO users(firstName, lastName, password, email, isAdmin) VALUES($1, $2, $3, $4, $5)', 
    [firstName, lastName, password, email, isAdmin],
    (err, res) => {
      if (err) return next(err);
      response.redirect('/users');
    }
  );
});

// UPDATE A USER
router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const keys = ['firstName', 'lastName', 'password', 'email', 'isAdmin'];
  const fields = [];

  keys.forEach(key => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE users SET ${field}=($1) WHERE id=($2)`, 
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);  
        if (index === fields.length - 1) response.send('updated');
      }
    );
  });
});

// DELETE A USER
router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM users WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err);
    response.redirect('/users');
  });
})

module.exports = router;