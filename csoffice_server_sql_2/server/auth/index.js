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

router.post('/signup', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then((user) => {
      // if user not found
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            // insert into db
            const user = {
              firstName: req.body.email,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            };

            User
              .create(user)
              .then((id) => {
                res.json({
                  id,
                  message: '/signup working',
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

module.exports = router;
