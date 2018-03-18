const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

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
    queries.getOneByEmail(req.body.email).then((user) => {
      console.log('user', user);
      // if user not found
      if (!user) {
        //
        res.json({
          user,
          message: '/signup working',
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
