import React, { Component } from 'react'
import { Box, Paper } from '@material-ui/core';

// import QuestionList from './QuestionSelector';
import { data } from './seeds';
// import Game from './Game';
import QuestionSelector from './QuestionSelector';

// console.log(data)

//NEED TO DO:
//onclick function to pass in the question[index] 
//need to pass down questionlist title to go to createlobby 
//Switch statement and pass in index in data ex. data[index].quesitons
//Display Quizzes
export default class ChooseQuiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: data,
            index: [0, 1, 2]
        }
    }


    render() {

        const { title } = this.state
        // console.log(index);
        return (
            <div style={button}>
                <Paper style={paper}>
                    <div>
                        <Box letterSpacing={8} m={1}>
                            SELECT A QUIZ
                        </Box>
                    </div>
                    {title.map((q, i) => {
                        return (

                            <QuestionSelector
                                index={i}
                                key={i}
                                data={title[i]}
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

const button = {
    padding: '20%',
    width: '100%',
    position: 'fixed'
}
const paper = {
    padding: '5% 10%',
    width: '100%',
    marginLeft: '.5rem'
}