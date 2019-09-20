import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Button } from '@material-ui/core';

import QuestionList from './seeds.json';
// import { data } from './seeds';

console.log(QuestionList)
//TODO
//onclick function to pass in the question[index] 
//to increment everytime an answer is given
//put each in a card
//need to pass down questionlist title to go to createlobby page
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '20%',
  },
  paper: {
    margin: '20px',
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#3f51b5',
    fontSize: '1rem',
    width: '100%'
  }
}));

export default function QuestionPage() {
  // const [set, setOpen] = React.useState(true);

  const classes = useStyles();

  const handleChange = event => {

    console.log(event.target);
  }

  return (
    <div className={classes.root}>

      <Grid container spacing={3}>
        <Grid item xs>
          {QuestionList.map((question, index) => (
            <Grid key={index} item>
              <Button
                className={classes.paper}
                variant="contained"
                color="primary"
                onClick={handleChange}
              >
                {question.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  )

}
//create onclick function to show the index of seeds object
