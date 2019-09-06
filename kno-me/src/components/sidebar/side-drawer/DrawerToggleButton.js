import React from 'react';

//CSS
import './DrawerToggleButton.css';

const DrawerToggleButton = props => (
    //add onClick listener
    //when onClick is fired, execute the click props from Toolbar
    <button className="toggle-button" onClick={ props.click }>
        <div className="toggle-button-line"/>
        <div className="toggle-button-line"/>
        <div className="toggle-button-line"/>
    </button>
)

export default DrawerToggleButton
