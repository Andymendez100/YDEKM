import React, { Component } from 'react'
import { Box, Paper } from '@material-ui/core';

// import QuestionList from './QuestionSelector';
import { data } from './seeds';
// import Game from './Game';
import QuestionSelector from './QuestionSelector';

// console.log(data)

//NEED TO DO:
//onclick function to pass in the question[index] 
//need to pass down questionlist quiz to go to createlobby 
//Switch statement and pass in index in data ex. data[index].quesitons
//Display Quizzes
export default class ChooseQuiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quiz: data,
            index: [0, 1, 2]
        }
    }
    render() {

        const { quiz } = this.state
        // console.log(index);
        return (
            <div style={container}>
                <Paper style={paper}>
                    <div>
                        <Box letterSpacing={8} m={1}>
                            SELECT A QUIZ
                        </Box>
                    </div>
                    {quiz.map((q, i) => {
                        console.log(i)
                        return (

                            <QuestionSelector
                                index={i}
                                key={i}
                                data={quiz[i]}
                            >
                                {q.quiz}
                            </QuestionSelector>
                        )
                    })}
                </Paper>
            </div>
        )
    }
}

const container = {
    // padding: '20%',
    width: '100%',
    position: 'fixed'
}
const paper = {
    flexGrow: 1,
    margin: '20% 10%',
    position: '100% 100%',
    boxShadow: '0 5px 10px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '2% 5%',

}