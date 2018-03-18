const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const PORT = 5555;
const app = express();

const users = require('./api/users');
const auth = require('./auth/index');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set a secret for our cookie, env.sample cookie secret
app.use(cookieParser('process.env.COOKIE_SECRET'));

// Requests that start with /auth
app.use('/auth', auth);
app.use('/api/users', users);


// error handling middleware

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  // render the error page if in production hide the stack trace
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

app.listen(PORT, () => {
  console.log('Server started listening on port 5555');
});

module.exports = app;
