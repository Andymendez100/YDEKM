import React from 'react';
import io from 'socket.io-client';
// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import {
  TextField,
  Grid,
  Button,
  Typography,
  Paper,
  MobileStepper,
} from '@material-ui/core';
// import { Link } from 'react-router-dom';

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

// START FUNCTIONAL COMPONENT
const QuestionPage = props => {
  // //MUI CSS
  // console.log('Data: ' + props)
  const classes = useStyles();
  const theme = useTheme();

  // Active States for active index of props.location.state.data array
  // NEED TO DO: Set timer for next step
  const [activeStep, setActiveStep] = React.useState(0);

  // NEED TO DO : Get values of input to store in answer array
  // const [values, setValues] = React.useState({
  //   answer: [],
  //   index: [],
  // });

  // Limit the length of question array elements
  console.log("PROPS", props);
  const maxSteps = props.location.state.data.length;
  // console.log(maxSteps)

  // Handles the next button by setting new active step
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  // Handles the active step
  const handleStepChange = step => {
    setActiveStep(step);
  };

  // NEED TO DO: handles the change in textarea value
  // const handleChange = answer => event => {
  //   setValues({ ...values, [answer]: event.target.value });
  //   console.log(values);
  // };

  // Socket.io Stuff
  const socket = io(':3001/chat');
  // console.log('text string')
  // Creating variable to save whichever user is logged in
  let currentPlayer;

  // Send to socket.io

  function sendToServer(input) {
    socket.emit('chatbox', {
      test: input,
    });
  }

  // Get from socket

  socket.on('player', res => {
    // console.log(res);
    currentPlayer = res.player.name;
    console.log(currentPlayer);
  });

  socket.on('answer', res => {
    console.log(res);

    console.log('host' + res.host.answer);
    console.log('guest' + res.guest.answer);
  });

  // On submit for questions
  const submitAnswer = event => {
    event.preventDefault();
    const answer = event.target.answer.value;
    socket.emit('questionDone', {
      currentPlayer,
      answer,
    });
    event.target.answer.value = '';
  };
  const playerInput = e => {
    // console.log(e.target.value);
    sendToServer(e.target.value);
  };
  return (
    <Paper className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
      // enableMouseEvents
      >
        {props.location.state.data.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              // Image background: NEED TO FIND IMAGES AND STORE IN SEEDS DATA
              // <img className={classes.img} src={step.imgPath} alt={step.label} />

              // Displays props.location.state.data individually. If it reaches the maxstep then null
              <Typography className={classes.img}>
                {props.location.state.data[activeStep]}
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
              steps={maxSteps}
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
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {/* Right to Left direction of props.location.state.data being displayed
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )} */}
                </Button>
              }
            />
          </Grid>
        </Grid>
      </form>
      {/* </Paper> */}
    </Paper>
  );
};

export default QuestionPage;
