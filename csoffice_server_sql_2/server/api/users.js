const express = require('express');
// endpoint ('/api/users')
const router = express.Router();

const queries = require('../db/queries');

// middleware test for valid id
function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

// Check if name is submitted
function validUser(user) {
  const hasFirstName = typeof user.firstName === 'string' && user.firstName.trim() !== '';
  const hasLastName = typeof user.lastName === 'string' && user.lastName.trim() !== '';
  const hasEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const hasPassWord = typeof user.password === 'string' && user.password.trim() !== '';

  return hasFirstName && hasLastName && hasEmail && hasPassWord;
}


// Get all rows from db
router.get('/', (req, res) => {
  queries.getAll().then((users) => {
    res.json(users);
  });
});

// Get one User
router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then((user) => {
    if (user) res.json(user);
    next();
  });
});

// Creates a User

router.post('/', (req, res, next) => {
  if (validUser(req.body)) {
    queries.create(req.body).then((users) => {
      res.json(users[0]);
    });
  } else {
    next(new Error('Invalid'));
  }
});

// Updates a user
router.put('/:id', isValidId, (req, res, next) => {
  if (validUser(req.body)) {
    queries.update(req.params.id, req.body).then((users) => {
      res.json(users[0]);
    });
  } else {
    next(new Error('Invalid yo'));
  }
});

// Deletes a User
router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true,
    });
  });
});

module.exports = router;
