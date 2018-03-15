const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

// pool instance for queries to db
const pool = require('./db');

const app = express();
const PORT = 5555;

// Get Request all users
app.get('/users', (request, response, next) => {
  pool.query('SELECT * FROM foo ORDER by id ASC', (err, res) => {
    // pass error to error middleware
    if (err) return next(err);
    response.json(res.rows);
  });
});

// Get request grab single user
app.get('/users/:id', (request, response, next) => {
  const { id } = request.params;

  // id = $1, represents a one index array containing the id variables we want to be inserted into the string
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, res ) => {
    if (err) return next (err);
    response.json(res.rows);
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  res.json(err);
});


module.exports = app;

