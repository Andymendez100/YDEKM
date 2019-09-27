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

    socket.on('player', res => {
        console.log(res);
        currentPlayer = res.player.name;
        console.log(currentPlayer);
    });

    socket.on('chatbox', event => {
        console.log(event.input);
    });

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
