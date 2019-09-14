import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import image from './KnowMe.png';
import "./LoginSign.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    // this needs to be corrected for backend submission
    this.state = {
      email: "",
      password: ""
    
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {

    return (
      <div className="container d-flex justify-content-center mt-5">
          <div className="card card-default" id="cardUI">
            <div className="card-header d-flex justify-content-center" id="header">
              <img src={image} alt="logo.png" id="logo"></img>
            </div>
           <div className="card-body" id="body">
              <div className="row">
                <div className="col-lg-6" id="signIn">
                  <h5>Sign In</h5>
                  <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="enter your username" />
                    <Form.Text className="text-muted">
                      
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" />
                    </Form.Group>
          
                    <Button variant="primary" type="submit" id="button">
                      Submit
                    </Button>
                  </form>
                </div>
           

              <div className="col-6-lg ml-3" id="signUp">
                <h5>Sign Up</h5>
                <form onSubmit={this.handleSubmit}>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formPlaintext">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="enter first name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formPlaintext">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="enter last name" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="enter your email" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formPlaintext">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="enter your username" />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="enter a password"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="confirm your password" />
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
}

