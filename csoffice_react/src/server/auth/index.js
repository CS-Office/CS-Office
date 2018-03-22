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

// Middleware test for valid id
function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

// ValidateUser Function
const validateUser = (user) => {
  const validEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const validPassword =
    typeof user.password === 'string' &&
    user.password.trim() !== '' &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
};

// find the user by e,ail address
// hash password
// compare that to the hashed password to db
// set cookie

router.post('/login/email', (req, res, next) => {
  console.log(req.body);
  if (validateUser(req.body)) {
    // check if they are in DB
    User.getOneByEmail(req.body.email)
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then((result) => {
            // res == true
              // compare passowrd with hashed
              res.json({
                result,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin,
              });
            });
        } else {
          next(new Error('Invalid Login'));
        }
      });
  } else {
    next(new Error('Invalid login'));
  }
});

router.post('/signup', (req, res, next) => {
  console.log("This is inside the server");
  // if (validateUser(req.body)) {
  // check if there is a user in db
  User.getOneByEmail(req.body.email).then((user) => {
    // if user not found
    if (!user) {
      // this is a unique email
      bcrypt
        .hash(req.body.password, 10)
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
          User.create(user).then((newUser) => {
            const userInfo = newUser;
            delete userInfo[0]["password"];
            // return id when success
            res.json(userInfo[0]);
          });
        });
    } else {
      next(new Error('Email is in Use'));
    }
  });
  // } else {
  //   next(new Error('Invalid'));
  // }
});

// GOOGLE LOGIN

router.post('/login/google', (req, res, next) => {
  console.log('Hit the server', req.body);
   
  const user = {
    firstName: req.body.givenName,
    lastName: req.body.familyName,
    email: req.body.email,
    password: req.body.password,
  };
  console.log("Request Body: ", req.body);
  console.log("Server USer Object: :", user);
  
  if (!user) {
    User.create(user).then((id) => {
      // return id when success
      res.json({
        id,
        message: 'signed up',
      });
    });
  }
});

 
// Email Login
router.post('/login/email', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then((user) => {
      // console.log('user', user);

      if (user) {
        // compare password with hashed password
        bcrypt.compare(req.body.password, user.password).then((result) => {
          // if the passwords match
          if (result) {
            // setting the set-cookie header
            const isSecure = req.app.get('env') !== 'development';
            res.cookie('user_id', user.id, {
              // Cookies are http only
              httpOnly: true,
              // cookie signed
              signed: true,
              // make more secure, secured when in production
              secured: isSecure,
            });
            res.json({
              message: 'Logged In',
            });
          }
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
