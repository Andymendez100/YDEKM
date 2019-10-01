import React, { Component } from 'react';
import { Box, Paper } from '@material-ui/core';
import Proptypes from 'prop-types';
import QuestionSelector from './QuestionSelector';

const container = {
  width: '100%',
  position: 'fixed',
};
const paper = {
  flexGrow: 1,
  margin: '20% 10%',
  position: '100% 100%',
  boxShadow: '0 5px 10px 0',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: '2% 5%',
};
export default class ChooseQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
    };
  }

  render() {
    const { quiz } = this.props;

    return (
      <div style={container}>
        <Paper style={paper}>
          <div>
            <Box letterSpacing={8} m={1}>
              SELECT A QUIZ
            </Box>
          </div>
          {quiz.map((q, i) => (
            // console.log(i)
            <QuestionSelector
              index={i}
              key={i}
              data={quiz[i]}
              quizSelect={this.props.quizSelect}
            >
              {q.quiz}
            </QuestionSelector>
          ))}
        </Paper>
      </div>
    );
  }
}
ChooseQuiz.propTypes = {
  quiz: Proptypes.array,
  quizSelect: Proptypes.func,
};
