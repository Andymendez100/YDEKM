import React from 'react';
import io from 'socket.io-client';

export default function Store() {
  const socket = io(':3001/chat');
  const test = document.getElementById('text');
  let playerOneInput = '';
  let playerTwoInput = '';
  function sendToServer(input) {
    socket.emit('chatbox', {
      test: input,
    });
    playerOneInput = input;
    // socket.send(input);
    // console.log(playerOneInput);
  }
  socket.on('test2', event => {
    console.log(event);
  });
  socket.on('chatbox', event => {
    console.log(event.test);
    playerTwoInput = event.test;
  });
  socket.on('done', res => {
    // display modal
    console.log(`right${res}`);
  });
  socket.on('wrong', data => {
    console.log(`wrong${data}`);
  });
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
  function handleChange(event) {
    sendToServer(event.target.value);
    // console.log(event.target.value);
  }
  return (
    <div>
      <input id="text" onChange={handleChange} type="text" />
    </div>
  );
}
