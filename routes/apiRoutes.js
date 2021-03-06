const passport = require('passport');
const jwt = require('jwt-simple');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = app => {
  console.log('server reached api route');

  // Register User
  app.post('/register', function(req, res) {
    const { password } = req.body;
    const { password2 } = req.body;

    // Comparing password to make sure they match
    // eslint-disable-next-line eqeqeq
    if (password == password2) {
      const newUser = new User.User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      User.createUser(newUser, function(err, user) {
        if (err) throw err;
        const payload = { id: user.id, username: user.username };
        const secret = Buffer.from(keys.secret, keys.encode);
        const token = jwt.encode(payload, secret);
        res.send(token).end();
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

  // Endpoint to login
  app.post('/login', passport.authenticate('local'), function(req, res) {
    const payload = { id: req.user.id, username: req.user.username };
    const secret = Buffer.from(keys.secret, keys.encode);
    const token = jwt.encode(payload, secret);
    console.log('got data');

    res.json({ token });
  });

  // Endpoint to get current user
  app.get('/user', function(req, res) {
    res.send(req.user);
  });

  // Endpoint to logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.send(null);
  });

  // Decided to change this into a json file

  // app.get('/quiz/:quiz', (req, res) => {
  //   const quizType = req.params.quiz;
  //   Quiz.Quiz.findOne(
  //     {
  //       quiz: quizType,
  //     },
  //     function(err, data) {
  //       if (err) throw err;
  //       res.send(data);
  //     }
  //   );
  // });
};
