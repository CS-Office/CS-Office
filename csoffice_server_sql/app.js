const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/users.js');
const auth = require('./auth/index.js');

const app = express();

app.use(bodyParser.json());

// middleware - get request to handlers will go to the specified route
app.use('/users', routes);
app.use('/auth', auth);
app.use('/signup', auth);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    // render the error page if in production hide the stack trace
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
    });
});

module.exports = app;

