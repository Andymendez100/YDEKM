import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: '10% 20%',
        boxShadow: '0 5px 10px 0 '
    },

    title: {
        letterSpacing: '8px',
        textAlign: "center",
        paddingBottom: '10px',
    },
    list: {
        listStyleType: 'none',
    }
}));

//Guideline list
const guideLines = [
    {
        list: [
            "The purpose of the game KnowMe is to see how well the players know each other.",
            "This is a 2 player game so one of the players will first have to create a lobby by choosing which quiz they would like to play.",
            "Once a quiz has been selected PLAYER 2 will then navigate to the join lobby page and join PLAYER 1's lobby",
            "Now both players will answer the questions given to them.",
            "To make the game not so hard for the other please try to keep the answer to a single word that comes to mind."
        ]
    }
]
console.log(guideLines[0].list)

const GuideLines = () => {
    const classes = useStyles();
    const guideList = guideLines[0].list;

    return (
        <Paper className={classes.root}>
            <Typography
                className={classes.title}
                variant="h3"
            >
                Guidelines
        </Typography>
            {guideList.map((g, i) => {
                return (
                    <ul className={classes.list} key={i}>
                        <li>
                            <div>{g}</div>
                        </li>
                    </ul>
                )
            })}
        </Paper>

    );
}

export default GuideLines
