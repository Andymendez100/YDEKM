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

    const handleClick = () => {
        console.log('clcik ', props.data.questions);
        console.log('Click ', props.data)
    }
    return (
        <Link style={{ textDecoration: 'none' }}
            to={{
                pathname: '/question',
                state: {
                    data: props.data.questions
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
