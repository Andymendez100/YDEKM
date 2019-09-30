import React from 'react';
import PropTypes from 'prop-types';
// import image from '../../Images/KnowMe.png';
// import './LoginSign.css';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Avatar, Button, Typography, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // margin: '15% 15%', smallest size
    margin: '20% 10%',
    position: '100% 100%',
    boxShadow: '0 5px 10px 0 ',
  },
  labelText: {
    color: '#3f51b5',
  },
  label: {
    marginLeft: '25%'
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: '25%',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    paddingLeft: '15px'
  },
  submit: {
    margin: theme.spacing(2, 0, 2, 2),
    paddingLeft: '15px'
  },
}));

export default function LoginSign(props) {
  const classes = useStyles();

  //JWT
  const signUp = e => {
    e.preventDefault();

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const password2 = document.getElementById('signUpPassword2').value;

    const userSignUp = {
      name,
      email,
      username,
      password,
      password2,
    };

    fetch('/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userSignUp),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.changeJwt(data.token);
      });
  };

  const signIn = event => {
    event.preventDefault();

    const Username = document.getElementById('loginUsername').value;
    const Password = document.getElementById('loginPassword').value;

    const userLogin = {
      username: Username,
      password: Password,
    };

    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const userToken = data.token;
        console.log(userToken);

        props.changeJwt(userToken);
      });
  };

  return (
    <Paper className={classes.root}>
      {/* Sign In */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid>
          <Grid>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.label}>
              Sign In
          </Typography>
          </Grid>
          <form onSubmit={signIn}>
            <Grid item sm={12}>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Typography className={classes.labelText}>
                  Username
               </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="loginUsername"
                  type="text"
                  label="enter your username"
                />
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid
                container
                justify="center"
                alignItems="center"
              >
                <Typography className={classes.labelText}>
                  Password
              </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="loginPassword"
                  type="password"
                  label="enter your password"
                />
              </Grid>
            </Grid>
            <Button
              // className={classes.submit}
              color="primary"
              variant="contained"
              type="submit"
              id="loginButton"
              className={classes.submit}
            >
              Login
          </Button>
          </form>
        </Grid>



        {/* Sign Up */}
        <Grid>
          <Grid>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.label}>
              Sign Up
          </Typography>
          </Grid>
          <Grid>
            <form onSubmit={signUp}>
              <Grid item sm={12}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.labelText}>
                    Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="signUpName"
                    type="text"
                    label="enter your name"
                    name="name"
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.labelText}>
                    Email
              </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="signUpEmail"
                    type="email"
                    label="enter your email"
                    name="email"
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.labelText}>
                    Username
              </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="signUpUsername"
                    type="text"
                    label="enter your username"
                    name="username"
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.labelText}>
                    Password
              </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="signUpPassword"
                    type="password"
                    label="enter a password"
                    name="password"
                  />
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.labelText}>
                    Confirm Password
              </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="signUpPassword2"
                    type="password"
                    label="confirm your password"
                    name="password2"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                id="signUpButton"
                className={classes.submit}
              >
                Sign Up
            </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

LoginSign.propTypes = {
  changeJwt: PropTypes.func,
};
