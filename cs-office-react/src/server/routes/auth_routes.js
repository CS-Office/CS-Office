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
    console.log('Logged Out', req.user);
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log('Current User === ', req.user);
    res.send(req.user);
  });

  // app.get('/', function(request, response) {
  //   response.sendFile(path.resolve(__dirname, './../../index.html'));
  // });

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('HERE============================', req.user);
    res.redirect('/office');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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
