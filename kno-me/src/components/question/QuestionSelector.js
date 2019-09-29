import React from 'react';
//MUI
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import Join from '../join/JoinPage';


//START FUNCTIONAL COMPONENT
const QuestionSelector = (props) => {
    console.log(props.data.questions);
    console.log(props.index)
    const button = {
        position: '100% 100%',
        padding: '1rem',
        width: '100%',
        margin: '2% 0'
    }
    const handleClick = () => {
        props.quizSelect(props.index);
    }

    return (
        <div>
            <Link style={{ textDecoration: 'none' }}
                to={{
                    pathname: '/question',
                    state: {
                        data: props.data.questions,
                        index: props.index
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
        </div>
    );
}

export default QuestionSelector
