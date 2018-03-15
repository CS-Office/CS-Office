const express = require('express');
const pg = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

// pool instance for queries to db
const pool = require('./db');

const app = express();
const PORT = 5555;

app.use(bodyParser.json());
app.use('/users', routes);

// error handling middleware
app.use((err, req, res, next) => {
  res.json(err);
});


module.exports = app;

