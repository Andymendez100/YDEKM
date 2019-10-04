import React from 'react';
import { Link } from 'react-router-dom';
import './CreateLobbyButton.css';
//This component links to CreateLobbyPage
export default function CreateLobbyButton() {
    return (
        <Link to="/createlobby" className="button">Create Lobby</Link>
    )
}