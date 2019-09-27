import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            "To make the game easier for the other player please try to keep the answer to a single word that comes to mind.",
            "After both players have answered their questions they will then have to answer what the other player would answer for that question.",
            "Once you have finished it is now time to see how well you know the other player.",
            "For each answer you have answered correctly you will get a point and whoever has the most points WINS.",
            "Lastly have fun and dont stress out. If you didnt know the answer to a question before now you know.",
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
