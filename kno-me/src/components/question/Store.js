import React, { useState } from 'react';
import io from 'socket.io-client';

export default function Store(props) {
  //   const [userInput, setUserInput] = useState('');
  // console.log(props.Jwt);

  const socket = io(':3001/chat');
  // console.log(socket.io);
  let currentPlayer;

  // const test = document.getElementById('text');
  function sendToServer(input) {
    socket.emit('chatbox', {
      test: input,
    });
    // playerOneInput = input;
    // socket.send(input);
    // console.log(playerOneInput);
  }

  socket.on('test', res => {
    console.log(res);
    currentPlayer = res.player.name;
    console.log(currentPlayer);
    // socket.emit('test2', {
    //   player: currentPlayer,
    //   msg: "This is me. This is real. This is exactly who i'm suppose to be ",
    // });
  });

  // socket.emit('test2', {
  //   player: currentPlayer,
  //   msg: "This is me. This is real. This is exactly who i'm suppose to be ",
  // });
  socket.on('chatbox', event => {
    console.log(event.input);
    // playerTwoInput = event.test;
  });
  // socket.on('done', res => {
  //   // display modal
  //   console.log(`right${res}`);
  // });
  // socket.on('wrong', data => {
  //   console.log(`wrong${data}`);
  // });
  // socket.on('chatbox', {
  //   test: input
  // });
  // const testBtn = document.getElementById('testBtn');
  // testBtn.addEventListener('click', () => {
  //   console.log('Player1 answer:', playerOneInput);
  //   console.log('Player2 answer:', playerTwoInput);
  //   if (playerOneInput == playerTwoInput.test) {
  //     console.log(true);
  //     socket.emit('correct', {
  //       gainPoint: true,
  //     });
  //   } else {
  //     console.log(false);
  //     socket.emit('false', {
  //       getPoint: false,
  //     });
  //   }
  // });
  socket.on('answer', res => {
    console.log(res);

    console.log(res.host.answer);
    console.log(res.guest.answer);
  });
  function handleChange(event) {
    sendToServer(event.target.value);
    // console.log(event.target.value);
    // setUserInput(event.target.value);
  }

  function submitAnswer(event) {
    event.preventDefault();
    const answer = event.target.answer.value;
    console.log(event.target.answer.value);

    socket.emit('questionDone', {
      currentPlayer,
      answer,
    });
    console.log('question submitted');
  }
  return (
    <div>
      <form onSubmit={submitAnswer}>
        <input id="text" onChange={handleChange} name="answer" type="text" />
        <button type="submit" id="sendAnswer">
          Hello world
        </button>
      </form>
    </div>
  );
}
