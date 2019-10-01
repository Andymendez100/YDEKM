import React from 'react';
import io from 'socket.io-client';
import Proptypes from 'prop-types';

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
    const socket = io(':3001');
    let currentPlayer;
    const hostAnswer = [];
    const guestAnswer = [];
    let score = 0;

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
      // Taking out the spaces and capitals
      let host = res.host.answer.toLowerCase();
      let guest = res.guest.answer.toLowerCase();
      host = host.replace(/\s+/g, '');
      guest = guest.replace(/\s+/g, '');
      // If the answer matches both score go up
      if (host == guest) {
        score += 1;
      }
      console.log(score);
      // Saving each answer into an array
      hostAnswer.push(res.host.answer);
      guestAnswer.push(res.guest.answer);
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

Question2.propTypes = {
  location: Proptypes.object,
};
