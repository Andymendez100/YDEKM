import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  TextField,
  Grid,
  Button,
  Typography,
  Paper,
  MobileStepper,
} from '@material-ui/core';

export default function Question2Render(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      // margin: '15% 15%', smallest size
      margin: '20% 10%',
      position: '100% 100%',
      boxShadow: '0 5px 10px 0 ',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#3f51b5',
    },
    img: {
      postion: 'fixed',
      textAlign: 'center',
      fontWeight: 'bold',
      height: 200,
      display: 'block',
      maxWidth: '100%',
      overflow: 'hidden',
      width: '100%',
      padding: '2rem 1rem',
      backgroundColor: 'white',
    },
    container: {
      display: 'grid',
      padding: theme.spacing(1),
    },
    button: {
      width: '70%',
      padding: '.9rem',
      marginTop: theme.spacing(1),
    },
    textArea: {
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(2),
    },
  }));

  const {
    activeStep,
    handleStepChange,
    handleNext,
    question,
    submitAnswer,
    playerInput,
  } = props;

  // const { question2 } = question;
  console.log('QUESTION IS HERE', question, 'test');

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {question.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              // Image background: NEED TO FIND IMAGES AND STORE IN SEEDS DATA

              // Displays props.location.state.data individually. If it reaches the maxstep then null
              <Typography className={classes.img}>
                {question[activeStep]}
              </Typography>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <form onSubmit={submitAnswer}>
        {/* <Paper className={classes.paper}> */}
        <Grid container spacing={1}>
          <Grid item xs={8} className={classes.container}>
            {/* Contains the input to store in answer variable */}

            <TextField
              id="answer"
              label="Enter Your Answer"
              className={classes.textArea}
              // value={values.answer}
              // onChange={handleChange('answer')}
              onChange={playerInput}
              fullWidth
              name="answer"
              type="text"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            {/* Handles the next step */}
            <MobileStepper
              steps={question.length}
              position="static"
              variant="text"
              activeStep={activeStep}
              // Button to toggle to next step. No need for back button
              nextButton={
                <Button
                  type="submit"
                  id="sendAnswer"
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === question.length - 1}
                >
                  Next
                </Button>
              }
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
