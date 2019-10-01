import React from 'react';
// MUI
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';

// START FUNCTIONAL COMPONENT
const QuestionSelector = props => {
  const button = {
    position: '100% 100%',
    padding: '1rem',
    width: '100%',
    margin: '2% 0',
  };
  const handleClick = () => {
    props.quizSelect(props.index);
  };

  return (
    <div>
      <Link
        style={{ textDecoration: 'none' }}
        to={{
          pathname: '/question',
          state: {
            data: props.data.questions,
            index: props.index,
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={button}
          onClick={handleClick}
        >
          {props.children}
        </Button>
      </Link>
    </div>
  );
};

QuestionSelector.propTypes = {
  quizSelect: Proptypes.func,
  index: Proptypes.number,
  data: Proptypes.object,
  children: Proptypes.string,
};

export default QuestionSelector;
