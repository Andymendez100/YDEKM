import React from 'react';
import './Header.css';


//Buttons
import CreateLobbyButton from '../buttons/createLobby/CreateLobbyButton';
import JoinButton from '../buttons/join/JoinButton';
import QuestionPage from '../question/QuestionPage';
import QuestionLogo from '../../Images/question.png';

export default function Homepage() {
    return (
        <div className="container" img src={QuestionLogo}>
            <div className="logo">
            </div>
            <div className="one-line-header">
                <p>Lorem Ipsum is simply dummy text for people</p>
            </div>
            <div className="mission-statement">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's more writing more writing</p>
            </div>
            <div className="buttons">
                <CreateLobbyButton />
            </div>
            <div className="buttons">
                <JoinButton />
            </div>
        </div>
    )
}