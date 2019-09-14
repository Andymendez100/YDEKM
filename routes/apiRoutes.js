const passport = require('passport');
const jwt = require('jwt-simple');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = app => {
  // Register User
  app.post('/register', function(req, res) {
    const { password } = req.body;
    const { password2 } = req.body;

    // eslint-disable-next-line eqeqeq
    if (password == password2) {
      const newUser = new User.User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      User.createUser(newUser, function(err, user) {
        if (err) {
          res.send(409);
        }
        res.send(user).end();
      });
    } else {
      res
        .status(500)
        .send('{erros: "Passwords don\'t match"}')
        .end();
    }
  });

  // Using LocalStrategy with passport
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'Unknown User' });
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: 'Invalid password' });
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  const checkJWT = (req, res, next) => {};

  // Endpoint to login
  app.post('/login', passport.authenticate('local'), function(req, res) {
    const payload = { id: req.user.id, username: req.user.username };
    const secret = Buffer.from(keys.secret, keys.encode);
    const token = jwt.encode(payload, secret);

    res.send(token);
  });

  // Endpoint to logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.send(null);
  });
};
