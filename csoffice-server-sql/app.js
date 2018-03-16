const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/users.js');

const app = express();

app.use(bodyParser.json());
app.use('/users', routes);

// error handling middleware
app.use((err, req, res) => {
  res.json(err);
});

module.exports = app;

