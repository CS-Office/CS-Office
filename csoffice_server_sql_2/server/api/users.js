const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

// Get all rows from db
router.get('/', (req, res) => {
  queries.getAll().then((users) => {
    res.json(users);
  });
});

module.exports = router;
