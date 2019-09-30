import React from 'react';
import io from 'socket.io-client';

import Question2Render from './Question2Render';

let questionData;

export default class Question2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            activeStep: 0,
            submitAnswer: null,
            playerInput: null,
        };
    }

    // Creating variable to save whichever user is logged in
    //   let currentPlayer;
    //   //intaniate variables from props
    //   let passedData = props.location.state;
    componentDidMount() {
        const socket = io(':3001/chat');
        let currentPlayer;

        socket.on('Guest', res => {
            console.log(res);

            questionData = parseInt(res);

            // console.log('PROPS', this.props);

            this.setState({
                question: this.props.location.state.data[questionData].questions,
            });
        });

        // Send to socket.io
        function sendToServer(input) {
            socket.emit('chatbox', {
                test: input,
            });
        }

        // Get from socket
        socket.on('player', res => {
            // console.log(res);
            currentPlayer = res.player.name;
            console.log(currentPlayer);
            if (currentPlayer === 'Host') {
                return console.log('waiting for player two');
            }
            return console.log('Guest');
        });
        socket.on('answer', res => {
            console.log(res);

            console.log(res.host.answer);
            console.log(res.guest.answer);
        });

        // const submitAnswer = event => {
        //   event.preventDefault();
        //   const answer = event.target.answer.value;
        //   socket.emit('questionDone', {
        //     currentPlayer,
        //     answer,
        //   });
        //   event.target.answer.value = '';
        // };

        this.setState({
            submitAnswer: event => {
                event.preventDefault();
                const answer = event.target.answer.value;
                socket.emit('questionDone', {
                    currentPlayer,
                    answer,
                });
                event.target.answer.value = '';
            },
            playerInput: e => {
                sendToServer(e.target.value);
            },
        });

        // const playerInput = e => {
        //   sendToServer(e.target.value);
        // };
    }

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    // Handles the active step
    handleStepChange = step => {
        this.setState({
            activeStep: step,
        });
    };

    render() {
        return (
            <Question2Render
                activeStep={this.state.activeStep}
                handleStepChange={this.handleStepChange}
                handleNext={this.handleNext}
                question={this.state.question}
                playerInput={this.state.playerInput}
                submitAnswer={this.state.submitAnswer}
            />
        );
    }
}
