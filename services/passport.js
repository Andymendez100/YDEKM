const passport = require('passport');
let User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne(
      {
        username: username
      },
      (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }

        if (user) {
          let passwordCheck = bcrypt.compareSync(password, user.password);
          if (passwordCheck) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Invalid password'
            });
          }
        }
      }
    );
  })
);
