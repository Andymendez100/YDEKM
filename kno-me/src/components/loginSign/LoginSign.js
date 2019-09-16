import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import image from '../../Images/KnowMe.png';
import './LoginSign.css';

export default function Login() {
  const signUp = event => {
    event.preventDefault();
  };

  const signIn = event => {
    event.preventDefault();
    console.log(event);

    const test = {
      username: 'joe123',
      password: 'mypass123',
    };

    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(test),
    }).then(res => {
      console.log(res);
    });
    console.log('working');
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
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="enter your username"
                    name="username"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" id="button">
                  Submit
                </Button>
              </form>
            </div>

            <div className="col-6-lg ml-3" id="signUp">
              <h5>Sign Up</h5>
              <form onSubmit={signUp}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formPlaintext">
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter your name"
                      name="name"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="enter your email"
                      name="email"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formPlaintext">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter your username"
                      name="username"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="enter a password"
                      name="password"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm your password"
                      name="password2"
                    />
                  </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" id="button">
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
