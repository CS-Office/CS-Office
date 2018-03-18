const express = require('express');
// endpoint ('/api/users')
const router = express.Router();

const queries = require('../db/queries');

// middleware test for valid id
function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

// Get all rows from db
router.get('/', (req, res) => {
  queries.getAll().then((users) => {
    res.json(users);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then((user) => {
    if (user) res.json(user);
    next();
  });
});


module.exports = router;
