import React from 'react';

export default function Question2Render() {
  return (
    <Paper className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={this.state.activeStep}
        onChangeIndex={this.handleStepChange}
      >
        {question2.map((step, index) => (
          <div key={index}>
            {Math.abs(this.state.activeStep - index) <= 2 ? (
              // Image background: NEED TO FIND IMAGES AND STORE IN SEEDS DATA

              // Displays props.location.state.data individually. If it reaches the maxstep then null
              <Typography className={classes.img}>
                {question2[this.state.activeStep]}
              </Typography>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <form>
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
              // onChange={this.playerInput}
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
              steps={question2.length}
              position="static"
              variant="text"
              activeStep={this.state.activeStep}
              // Button to toggle to next step. No need for back button
              nextButton={
                <Button
                  type="submit"
                  id="sendAnswer"
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={this.handleNext}
                  disabled={this.state.activeStep === question2.length - 1}
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
