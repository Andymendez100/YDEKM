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
            "The purpose of the game KnowMe is to see how well you know your trivia.",
            "This is a multiplayer player game so every player will have to sign up to play.",
            "Once signed up and logged in the players must press START GAME.",
            "Once START GAME has been pressed you will need to FIND GAME.",
            "Once in the the lobby of the game you will need to wait for other players to join.",
            "After the minimum amount of players(2) have joined the lobby the host will have to start game.",
            "Once the game started you will be required to select an answer for the multiple choice question within the allotted time.",
            "For each question you have answered correctly you will get a point and whoever has the most points WINS.",
            "Lastly have fun and dont stress out. If you didnt know the answer to a question before now you know.",
        ]
    }
]
// console.log(guideLines[0].list)

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
