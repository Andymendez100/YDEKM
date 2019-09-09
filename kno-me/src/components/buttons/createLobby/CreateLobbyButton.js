import React from 'react';
import './CreateLobbyButton.css';
import { Link } from 'react-router-dom';
//This component links to CreateLobbyPage
export default function CreateLobbyButton() {
    return (
        <Link to="/createlobby" className="button">Create Lobby</Link>
    )
}
