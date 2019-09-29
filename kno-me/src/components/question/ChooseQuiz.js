import React, { Component } from 'react';
import { Box, Paper } from '@material-ui/core';
import QuestionSelector from './QuestionSelector';

// NEED TO DO:
// onclick function to pass in the question[index]
// need to pass down questionlist quiz to go to createlobby
// Switch statement and pass in index in data ex. data[index].quesitons
// Display Quizzes
export default class ChooseQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
    };
  }

  render() {
    console.log(`from App: ${this.props.quizSelect}`);
    const { quiz } = this.props;
    // console.log('Hi tony', this.props);
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
