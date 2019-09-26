// Getting the npm packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

// Helmet
app.use(helmet());

//= === Socket.io =========
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

let hostAnswer = '';
// const allowedOrigins = 'http://localhost:3001';
// io(server, { origins: allowedOrigins });
io.of('/chat').on('connection', function(socket) {
  // console.log(socket);
  // var clients = io.sockets.clients(nick.room); // all users from room
  // console.log(clients);
  // console.log(socket.server.engine.clientsCount);
  const player = {
    name: '',
    sign: '',
  };
  if (socket.server.engine.clientsCount < 2) {
    player.name = 'Host';
    player.sign = 'H';
    console.log(player);
  } else if (socket.server.engine.clientsCount === 2) {
    // if (!socket.handshake.headers.host) {
    player.name = 'Guest';
    player.sign = 'G';
    console.log(player);
  }

  socket.emit('player', {
    player,
  });
  // }
  // room.push(socket.id);
  console.log('A user connected!'); // We'll replace this with our own events
  socket.on('chatbox', function(res) {
    console.log('res', res);
    socket.broadcast.emit('chatbox', {
      input: res,
    });
  });
  // socket.on('correct', res => {
  //   socket.broadcast.emit('done', {
  //     done: res.gainPoint,
  //   });
  // });
  socket.on('test2', res => {
    console.log(res);
  });

  socket.on('questionDone', res => {
    if (res.currentPlayer === 'Host') {
      hostAnswer = res.answer;
      console.log(`test${hostAnswer}`);
    }

    if (res.currentPlayer === 'Guest') {
      socket.emit('answer', {
        host: {
          answer: hostAnswer,
        },
        guest: {
          answer: res.answer,
        },
      });
      socket.broadcast.emit('answer', {
        host: {
          answer: hostAnswer,
        },
        guest: {
          answer: res.answer,
        },
      });
    }

    console.log(res);
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
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
