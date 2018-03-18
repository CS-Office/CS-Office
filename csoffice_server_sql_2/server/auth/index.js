const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/queries');

// Routes are prepended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'Get Route Here We Are',
  });
});

// ValidateUser Function
const validateUser = ((user) => {
  const validEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const validPassowrd = typeof user.password === 'string' &&
                          user.password.trim() !== '' &&
                          user.password.trim().length >= 6;
  return validEmail && validPassowrd;
});

router.post('/sign-up', (req, res, next) => {
  if (validateUser(req.body)) {
    // check if there is a user in db
    User.getOneByEmail(req.body.email).then((user) => {
      // if user not found
      if (!user) {
        // this is a unique email
        bcrypt.hash(req.body.password, 10)
        // then hashed the password
          .then((hash) => {
            // create user based off that hash password
            const user = {
              firstName: req.body.email,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            };
            // Insert the user into the db from queries.js methods
            User
              .create(user)
              .then((id) => {
                // return id when success
                res.json({
                  id,
                  message: 'signed up',
                });
              });
          });
      } else {
        next(new Error('Email is in Use'));
      }
    });
  } else {
    next(new Error('Invalid'));
  }
});


router.post('/login', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then((user) => {
      console.log('user', user);

      if (user) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          res.json({
            result,
            message: 'Logging in...',
          });
        });
      } else {
        next(new Error('Invalid Login'));
      }
    });
  } else {
    next(new Error('Invalid Login'));
  }
});

module.exports = router;
