const keys = require('../config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const helmet = require('helmet');

module.exports = app => {
  app.use(
    session({
      secret: keys.COOKIE_SECRET_KEY,
      resave: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
      },
      saveUninitialized: false
    })
  );

  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(passport.initialize());
  app.use(passport.session());

  mongoose.connect(keys.mongo_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};
