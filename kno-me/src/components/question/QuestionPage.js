import React from 'react';
//MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { TextField, Grid, Button, Typography, Paper, MobileStepper } from '@material-ui/core';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // margin: '15% 15%', smallest size
    margin: '20% 10%',
    position: '100% 100%',
    boxShadow: '0 5px 10px 0 '

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
    backgroundColor: 'white'
  },
  container: {
    display: 'grid',
    padding: theme.spacing(1)
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
    marginBottom: theme.spacing(2)
  }
}));

let ar = [];
//START FUNCTIONAL COMPONENT
const QuestionPage = (props) => {

  // //MUI CSS
  const classes = useStyles();
  const theme = useTheme();


  //Active States for active index of props.location.state.data array
  //NEED TO DO: Set timer for next step 
  const [activeStep, setActiveStep] = React.useState(0);

  //NEED TO DO : Get values of input to store in answer array
  const [values, setValues] = React.useState({
    answer: [],
    // newAnswer: []
    // index: []
  });

  //Limit the length of question array elements
  const maxSteps = props.location.state.data.length;

  //Handles the next button by setting new active step
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    const test = document.getElementById('outlined-name');
    console.log(test.value)
    ar += test.value
    console.log(ar)
    test.value = '';
    test.innerHTML = '';
    console.log("test", test.value);


    // e.preventDefault();
    // setValues({ values: '' });
    console.log('working');
  };

  //Handles the active step
  const handleStepChange = step => {
    setActiveStep(step);
  };

  //Handles if enter is pressed instead of Next. Call next func
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  }
  //NEED TO DO: handles the change in textarea value
  const handleChange = answer => event => {
    setValues({ values, [answer]: event.target.value });
    // console.log(event.target.value);
  };
  //OnSubmit
  // const handleSubmit = e => {
  //   // e.preventDefault();
  //   console.log(e)
  //   // const test = document.getElementById('outlined-name')
  //   console.log('working: ', e.answer)
  // }

  // console.log("THIS IS DATA", props.location.state.data);
  // console.log(values.answer)
  // console.log(values.answer)

  return (
    <Paper className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {props.location.state.data.map((step, index) => (
          <div key={step}>
            {Math.abs(activeStep - index) <= 2 ? (
              //Image background: NEED TO FIND IMAGES AND STORE IN SEEDS DATA
              // <img className={classes.img} src={step.imgPath} alt={step.label} />

              //Displays props.location.state.data individually. If it reaches the maxstep then null
              <Typography className={classes.img}>{props.location.state.data[activeStep]}</Typography>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      {/* <Paper className={classes.paper}> */}
      <Grid container spacing={1}>
        <Grid item xs={8} className={classes.container}>
          {/* Contains the input to store in answer variable*/}
          <form ></form>
          <TextField
            onKeyPress={handleKeyPress}
            id="outlined-name"
            label="Enter Your Answer"
            className={classes.textArea}
            // value={values.answer}
            onChange={handleChange('answer')}
            fullWidth
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
                className={classes.button}
                color="primary"
                variant="contained"
                //=========== Final Step go to score ======
                onClick={handleNext} disabled={activeStep === maxSteps}
              >
                Next
                    {/* Right to Left direction of props.location.state.data being displayed */}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
          />
        </Grid>
      </Grid>
      {/* </Paper> */}
    </Paper>
  );
}

export default QuestionPage
