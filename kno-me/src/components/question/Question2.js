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

  componentDidMount() {
    const socket = io(':3001/chat');
    let currentPlayer;

    socket.on('Guest', res => {
      questionData = parseInt(res);

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
      currentPlayer = res.player.name;
      console.log(currentPlayer);
    });
    socket.on('answer', res => {
      console.log(res.host.answer);
      console.log(res.guest.answer);
    });

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

    socket.on('chatbox', res => {
      console.log(res, 'para tony');
    });
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
