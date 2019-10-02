// Getting the npm packages
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');

const app = express();
// Helmet
app.use(helmet());

const PORT = process.env.PORT || 3001;

//= === Socket.io =========
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

let hostAnswer = '';
let quizid;

io.on('connection', function(socket) {
  const player = {
    name: '',
    sign: '',
  };

  // Deciding who is host and who is the guest of the game
  if (socket.server.engine.clientsCount < 2) {
    player.name = 'Host';
    player.sign = 'H';
    console.log(player);
  } else if (socket.server.engine.clientsCount === 2) {
    player.name = 'Guest';
    player.sign = 'G';
    console.log(player);
  }
  // Disconnecting the user if there are more than 2 users
  if (socket.server.engine.clientsCount > 2) {
    console.log('Lobby full');
    socket.disconnect();
  }
  // Sending the player who they are
  socket.emit('player', {
    player,
  });

  console.log(`The ${player.name} joined`);

  socket.on('chatbox', function(res) {
    socket.broadcast.emit('chatbox', {
      input: res,
    });
  });

  // getting the index of the quiz that the host picked
  socket.on('quiz', index => {
    quizid = index;
  });
  // Sending the index of the quiz that the host picked
  socket.emit('Guest', quizid);

  socket.on('test2', res => {
    console.log(`TESR${res}`);
  });

  socket.on('questionDone', res => {
    // Saving the host's answer on the server until the guest sends the answer
    if (res.player === 'Host') {
      hostAnswer = res.answer;
    }

    if (res.currentPlayer === 'Guest') {
      // We then send both answers to both user
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
      console.log(`answer's sent`);
    }
  });

  // socket.on('disconnect', () => {
  //   socket.server.engine.clientsCount = 1;
  //   console.log(`${player.name} has left`);
  //   console.log(socket.server.engine.clientsCount);
  // });
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
