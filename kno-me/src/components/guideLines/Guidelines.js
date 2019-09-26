import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './GuideLines.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "10%",
  },

  title:{
      textAlign: "center",
      paddingBottom: 30,
  }
}));

export default function GuideLines() {
  const classes = useStyles();

  return (
    <container>
      <Paper className={classes.root}>
        <Typography className={classes.title} variant="h3" component="h3">
          Guide Lines
        </Typography>
        <Typography component="ul">
          <ul>
            <div>
              <li class="list"> The purpose of the game KnowMe is to see how well the players know each other.</li>
              <li class="list"> This is a 2 player game so one of the players will first have to create a lobby by choosing which quiz they would like to play. </li>
              <li class="list"> Once a quiz has been selected PLAYER 2 will then navigate to the join lobby page and join PLAYER 1's lobby.</li>
              <li class="list"> Now both players will answer the questions given to them.</li>
              <li class="list"> To make the game not so hard for the other please try to keep the answer to a single word that comes to mind.</li>
            </div>          
          </ul>
        </Typography>
      </Paper>
    </container>
  );
}