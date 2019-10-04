import React from 'react';

// Routes
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';
// home page css
import './Homepage.css';

// import QuestionPage from '../question/QuestionPage';
// const buttonStyle = {
//   padding: '5px',
//   margin: '10px 100px',
// };

export default function Homepage(props) {
  return (
    <div className="container">
      <div className="logo" />
      <div className="one-line-header">
        <p>The Game That Shows How Well You Know Your Partner!!! </p>
      </div>
      <div className="mission-statement">
        <p>
          Go to  Guidelines for a step by step of the game or continue to NEW GAME to get started!
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="buttonClass"
        component={Link}
        to="/quiz"
      >
        New Game
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="buttonClass"
        component={Link}
        to={{
          pathname: '/question2',
          state: {
            data: props.data,
            index: 22,
          },
        }}
      >
        Join
      </Button>
    </div>
  );
}
