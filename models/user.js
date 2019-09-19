const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const keys = require('../config/keys');

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unqiue: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports.User = User;

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

// Tell JWT token where to find key
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secret,
};

// This is run when a request comes in with a JWT
// payload is decoded JWT, done is called when successful
module.exports.jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if user ID exists in DB
  // If it does, call done with user
  // Otherwsie, call done without user object
  User.findById(payload.sub, (error, user) => {
    if (error) {
      return done(error, false);
    }

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  });
});
// finder the username in DB
module.exports.getUserByUsername = function(username, callback) {
  const query = { username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
