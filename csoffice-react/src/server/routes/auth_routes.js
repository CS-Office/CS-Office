// const passport = require('passport');
// // exports into index.js

// module.exports = (app) => {
//   app.get('/auth/google', () => {
//     passport.authenticate('google', {
//       scope: ['profile', 'email'],
//     });
//   });

//   app.get('/api/logout', (req, res) => {
//     // console.log('Logged Out', req.user);
//     req.logout();
//     res.redirect('/');
//   });

//   app.get('/api/current_user', (req, res) => {
//     // console.log('Current User === ', req.user);
//     res.send(req.user);
//   });

//   app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
//     // console.log('HERE========', req.user);
//     res.redirect('/');
//   });
// };
