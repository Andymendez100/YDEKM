import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import image from '../../Images/KnowMe.png';
import './LoginSign.css';

export default function Login(props) {
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
        props.changeJwt(data.token);
      });
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card card-default" id="cardUI">
        <div className="card-header d-flex justify-content-center" id="header">
          <img src={image} alt="logo.png" id="logo" />
        </div>
        <div className="card-body" id="body">
          <div className="row">
            <div className="col-lg-6" id="signIn">
              <h5>Sign In</h5>
              <form onSubmit={signIn}>
                <Form.Group controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="enter your username" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group>

                <Button variant="primary" type="submit" id="loginButton">
                  Submit
                </Button>
              </form>
            </div>

            <div className="col-6-lg ml-3" id="signUp">
              <h5>Sign Up</h5>
              <form onSubmit={signUp}>
                <Form.Row>
                  <Form.Group as={Col} controlId="signUpName">
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter your name"
                      name="name"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="signUpEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="enter your email"
                      name="email"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="signUpUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter your username"
                      name="username"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="signUpPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="enter a password"
                      name="password"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="signUpPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm your password"
                      name="password2"
                    />
                  </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" id="signUpButton">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  changeJwt: PropTypes.func,
};
