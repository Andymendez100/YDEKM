import React from 'react'
import io from 'socket.io-client';
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

let questionData;
let thrillers = [];
export default class Question2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            activeStep: 0,
            setActiveStep: 0
        }
    }

    // Creating variable to save whichever user is logged in
    //   let currentPlayer;
    //   //intaniate variables from props
    //   let passedData = props.location.state;
    componentDidMount() {
        let stringIndex = JSON.stringify(this.state.question.index)

        const socket = io(':3001/chat');
        let currentPlayer;

        socket.on('testing', data => {
            console.log(data)
        })

        socket.on('Guest', res => {
            console.log(res);
            //res = int
            questionData = parseInt(res);
            this.setState({
                question: this.props.location.state.data[questionData].questions
            })

        })

        // Send to socket.io
        function sendToServer(input) {
            socket.emit('chatbox', {
                test: input,
            });
        }

        socket.emit('quiz', stringIndex)
        socket.on('testing', data => {
            console.log(data)
        })

        // Get from socket
        socket.on('player', res => {
            // console.log(res);
            currentPlayer = res.player.name;
            console.log(currentPlayer);
            if (currentPlayer === 'Host') {
                return (
                    console.log('waiting for player two')
                )
            } else {
                return (
                    console.log('Guest')
                )
            }
        })
        socket.on('answer', res => {
            console.log(res);

            console.log(res.host.answer);
            console.log(res.guest.answer);
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
    }
    handleNext = () => {
        this.state.setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    // Handles the active step
    handleStepChange = step => {
        this.state.setActiveStep(step);
    };




    // //MUI CSS
    //   const classes = useStyles();
    //   const theme = useTheme();

    // Active States for active index of props.location.state.data array
    // NEED TO DO: Set timer for next step
    // const [activeStep, setActiveStep] = React.useState(0);

    // NEED TO DO : Get values of input to store in answer array
    // const [values, setValues] = React.useState({
    //   answer: [],
    //   index: [],
    // });

    // Limit the length of question array elements
    // const maxSteps = props.location.state.data.length;

    // Handles the next button by setting new active step

    render() {
        const classes = {
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
                // padding: theme.spacing(1),
            },
            button: {
                width: '70%',
                padding: '.9rem',
                // marginTop: theme.spacing(1),
            },
            textArea: {
                // margin: theme.spacing(1),
            },
            paper: {
                // padding: theme.spacing(1),
                textAlign: 'center',
                color: 'blue',
                whiteSpace: 'nowrap',
                // marginBottom: theme.spacing(2),
            },
        };
        console.log(this.state)
        const maxSteps = props.location.state.data.length;

        // const [activeStep, setActiveStep] = React.useState(0);

        const { question2 } = this.state.question;
        return (

            <Paper style={classes.root}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                >
                    {question2.map((step, index) => (
                        <div key={index}>
                            {Math.abs(this.state.activeStep - index) <= 2 ? (
                                // Image background: NEED TO FIND IMAGES AND STORE IN SEEDS DATA
                                // <img className={classes.img} src={step.imgPath} alt={step.label} />

                                // Displays props.location.state.data individually. If it reaches the maxstep then null
                                <Typography style={classes.img}>
                                    {question2[this.state.activeStep]}
                                </Typography>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <form onSubmit={this.submitAnswer}>
                    {/* <Paper className={classes.paper}> */}
                    <Grid container spacing={1}>
                        <Grid item xs={8} style={classes.container}>
                            {/* Contains the input to store in answer variable */}

                            <TextField
                                id="answer"
                                label="Enter Your Answer"
                                style={classes.textArea}
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
                                activeStep={this.state.activeStep}
                                // Button to toggle to next step. No need for back button
                                nextButton={
                                    <Button
                                        type="submit"
                                        id="sendAnswer"
                                        style={classes.button}
                                        color="primary"
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={this.state.activeStep === maxSteps - 1}
                                    >
                                        Next
                </Button>
                                }
                            />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        )
    }

}