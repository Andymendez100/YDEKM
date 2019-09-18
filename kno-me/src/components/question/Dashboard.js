import React from 'react';

//CONTEXT.PROVIDER exported. import to pull out of store
import { CTX } from './Store';
// import { Link } from 'react-router-dom';

//Material UI Main
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, List, ListItem, ListItemText, Chip, Button, TextField } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

//SIMPLE LIST
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
//USER MESSAGE
// import Chip from '@material-ui/core/Chip';
//BUTTON
// import Button from '@material-ui/core/Button';
//TEXTFIELD
// import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: '50px',
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        width: '90%'
    },
    videoBox: {
        padding: theme.spacing(3, 2),
        margin: '50px',
        width: '40%',
        top: '50%',
        position: 'relative',
        left: '20%'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '40%',
        height: '200px',
        borderRight: '1px solid grey',
        position: 'relative'
    },
    chatWindow: {
        width: '70%',
        height: '50px',
        padding: '20px'
    },
    chatBox: {
        width: '85%',
        alignItems: 'left'
    },
    button: {
        width: '15%'
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    //CTX store
    const { allChats, sendChatAction, user } = React.useContext(CTX);
    console.log(allChats);

    //get list of topics from state
    const topics = Object.keys(allChats);

    //LOCAL STATE w/ STATEHOOK
    //initializing state then pass empty to textValue and update string value we pass in changeTextValue
    const [textValue, changeTextValue] = React.useState('');
    //active topics
    const [activeTopic, changeActiveTopic] = React.useState(topics[0])


    return (
        <div>
            <Paper className={classes.videoBox}>
                <div>
                    Hello
                </div>
            </Paper>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Answer box
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>

                {/* Main container */}
                <div className={classes.flex}>

                    {/* MATERIAL UI:SIMPLE LIST FOR TOPICS WINDOW*/}
                    <div className={classes.topicsWindow}>
                        <List>
                            { //Inside array is what we are going to be mapping out 
                                topics.map(topic => (
                                    // onClick changes the topics 
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        {/* In primary= is what rooms is going to be displayed */}
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>

                    <div className={classes.chatWindow}>
                        <List>
                            { //Render allChats with what topics the user is in
                                allChats[activeTopic].map((chat, index) => (
                                    <div className={classes.flex} key={index}>
                                        {/* USER MESSAGE */}
                                        <Chip label={chat.from} className={classes.chip} />
                                        <Typography variant='body1'>{chat.msg}</Typography>
                                    </div>
                                ))
                            }
                        </List>
                    </div>
                </div>
                <div className={classes.flex}>
                    {/* TEXTFIELD */}
                    <TextField
                        // id="standard-name"
                        label="Send your answer"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    {/* BUTTON */}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                            changeTextValue('');
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}