import React from 'react';
import './Homepage.css';

// Routes
import { Link } from 'react-router-dom';

// MUI
import { Button } from '@material-ui/core';

// import QuestionPage from '../question/QuestionPage';
const buttonStyle = {
  padding: '5px',
  margin: '10px 100px',
};

export default function Homepage(props) {
  return (
    <div className="container">
      <div className="logo" />
      <div className="one-line-header">
        <p>Lorem Ipsum is simply dummy text for people</p>
      </div>
      <div className="mission-statement">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's more writing more
          writing
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        component={Link}
        to="/createlobby"
      >
        Create Lobby
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
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
