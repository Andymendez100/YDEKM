import React from 'react';
import {Container,Row,Col } from 'react-bootstrap';

//Buttons
import CreateLobbyButton from '../buttons/createLobby/CreateLobbyButton';
import JoinButton from '../buttons/join/JoinButton';
import './Indexpage.css';

export default function Indexpage() {
    return (

        <Container>
            <Row>
                <Col></Col>
                {/* logo image */}
                <Col xs={6} className='logo'></Col>
                <Col></Col>
            </Row>

            <Row>
                <Col></Col>
                <Col xs={6} className='Slogan'>Lorem Ipsum is simply dummy text for people</Col>
                <Col></Col>
            </Row>

            <Row>
                <Col></Col>
                <Col xs={6} className='Statement'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's more writing more writing</Col>
                <Col></Col>
            </Row>

            <Row>
                <Col><CreateLobbyButton /></Col>
            </Row>

            <Row>
                <Col><JoinButton /></Col>
            </Row>
        </Container>
    );
}
