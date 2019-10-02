import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Proptypes from 'prop-types';

// MUI
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
  // MUI CSS
  const classes = useStyles();
  const theme = useTheme();

  // Active States for active index of props.location.state.data array
  // NEED TO DO: Set timer for next step
  const [activeStep, setActiveStep] = React.useState(0);

  // Limit the length of question array elements
  const maxSteps = props.location.state.data.length;

  // Handles the next button by setting new active step
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  // Handles the active step
  const handleStepChange = step => {
    setActiveStep(step);
  };

  const [sockets, setSocket] = useState();
  const [player, setPlayer] = useState();
  // const [hostAnswer, setHost] = useState();

  useEffect(() => {
    const socket = io(':3001');

    const hostAnswer = [];
    const guestAnswer = [];
    let score = 0;

    setSocket(socket);

    // Creating variable to save whichever user is logged in
    let currentPlayer;

    // intaniate variables from props
    const stringIndex = JSON.stringify(props.location.state.index);

    // Sending what quiz the Host picked
    socket.emit('quiz', stringIndex);

    // Getting the host
    socket.on('player', res => {
      currentPlayer = res.player.name;
      setPlayer(currentPlayer);
      console.log(currentPlayer);
    });

    // Getting the answer from the guest and host
    socket.on('answer', res => {
      // Taking out the spaces and capitals
      let host = res.host.answer.toLowerCase();
      let guest = res.guest.answer.toLowerCase();
      host = host.replace(/\s+/g, '');
      guest = guest.replace(/\s+/g, '');
      // If the answer matches both score go up
      if (host === guest) {
        score += 1;
      }
      console.log(score);
      // Saving each answer into an array
      hostAnswer.push(res.host.answer);
      guestAnswer.push(res.guest.answer);
    });

    socket.on('chatbox', res => {
      console.log(res.input.test);
      // document.getElementById('answer').value = res.input.test;
    });
  }, [props.location.state]);

  // Send to socket.io
  function sendToServer(input) {
    sockets.emit('chatbox', {
      test: input,
    });
  }

  // On submit for questions
  const submitAnswer = event => {
    event.preventDefault();
    const answer = event.target.answer.value;
    console.log(player);

    // Sending the answer as well as who's answer it is
    sockets.emit('questionDone', {
      player,
      answer,
    });
    event.target.answer.value = '';
  };

  // Function to send whatever the user types to the sever
  const playerInput = e => {
    sendToServer(e.target.value);
  };

  // JSX
  return (
    <Paper className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
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
        <Grid container spacing={1}>
          <Grid item xs={8} className={classes.container}>
            {/* Contains the input to store in answer variable */}
            <TextField
              id="answer"
              // label="Enter Your Answer"
              placeholder="Enter Your Answer"
              className={classes.textArea}
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
                </Button>
              }
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

QuestionPage.propTypes = {
  location: Proptypes.object,
};

export default QuestionPage;
