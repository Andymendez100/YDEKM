// Getting the npm packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
const PORT = 3001;

//= === Socket.io =========
// const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.of('/game').on('connection', function (socket) {
  console.log(`socket.id:  ${socket.id}`);
  console.log(socket.handshake);
  console.log(socket.server.engine.clientsCount);
  // room.push(socket.id);
  // console.log('A user connected!'); // We'll replace this with our own events
  // socket.on('chatbox', function (res) {
  //   console.log('res', res);
  //   socket.broadcast.emit('chatbox', {
  //     test: res,
  //   });
  // });
  socket.on('correct', res => {
    socket.broadcast.emit('done', {
      done: res.gainPoint,
    });
  });
  socket.on('wrong', res => {
    socket.broadcast.emit('wrong', {
      done: res.gainPoint,
    });
  });

  // socket.emit('news', { hello: 'world' });
  socket.on('chat message', function (msg) {
    console.log(`message: ${JSON.stringify(msg)}`);
    console.log('res', res);
    socket.broadcast.emit('chat message', {
      test: res,
    });
    // broadcasting, we use emit to not get duplication
    // we emit on 'chat message' channel and send message
    // io.emit('chat message', msg);
  });
});

//= === Socket.io end =====

require('dotenv').config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Helmet
app.use(helmet());

// Express Session
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Requiring our routes

require('./routes/apiRoutes.js')(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/knowme', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Start the API server
http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
