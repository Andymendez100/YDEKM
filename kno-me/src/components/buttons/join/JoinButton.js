import React from 'react';
import './JoinButton.css';
import { Link } from 'react-router-dom';

//This component links to JoinButton Page
export default function JoinButton() {
    return (
        <Link to="/join" className="button">Join Game</Link>
    )
}
