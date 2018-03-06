const passport = require('passport');
const path = require('path');
//exports into index.js
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/landing.html'));
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};
