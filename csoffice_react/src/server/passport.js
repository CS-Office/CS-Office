// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
// const keys = require('../config/keys');
// const User = mongoose.model('users');

// //SERIALIZES USER.ID AND ATTACHES IT TO A COOKIE
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy( // 'google'
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleID: profile.id });
//       if (existingUser) {
//         console.log('===EXISTING USER IN DB=== ', existingUser);
//         return done(null, existingUser);
//       }
//       const user = await new User({ googleID: profile.id }).save();
//       done(null, user);
//     }
//   )
// );
