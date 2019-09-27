import React from 'react';
//MUI
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


//START FUNCTIONAL COMPONENT
const QuestionSelector = (props) => {

    const button = {
        position: '100% 100%',
        padding: '1rem',
        width: '100%',
        margin: '2% 0'
    }
    // console.log(props[]);
    const handleClick = () => {
        // console.log('clcik ', props.data.questions);
        // console.log('Click ', props.index)
        // props.quizSelect(props.index)
        props.quizSelect(props.index);
        console.log(props.data);
        console.log(props.data.questions);
        // props.data.questions.map((data, index) => {
        //     console.log(data);
        //     quest = data;
        // })
        // console.log(quest)
    }
    // props.data.questions.map((data, index) => {
    //     quest = data[];
    //     console.log(quest);
    // })
    return (
        <Link style={{ textDecoration: 'none' }}
            to={{
                pathname: '/question',
                state: {
                    data: props.data.questions,
                    stateQuizSelect: props.stateQuizSelect
                }
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
    );
}

export default QuestionSelector
