const passport = require('passport');
const path = require('path');
// exports into index.js
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname, './../../index.html'));
  });

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('HERE============================');
    res.redirect('/office');
  });

  // //LANDING PAGE ONCE YOU LOGIN
  // app.get('/auth/google/callback', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../../client/landing.html'));
  // });

  // //LOGIN PAGE
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../../client/index.html'));
  // });

  // //LOGOUT
  // app.get('/api/logout', (req, res) => {
  //   req.logout();
  //   res.sendFile(path.join(__dirname, '../../client/index.html'));
  // });
};
