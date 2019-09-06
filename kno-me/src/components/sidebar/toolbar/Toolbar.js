import React from 'react';
import './Toolbar.css';
import '../side-drawer/DrawerToggleButton';
import DrawerToggleButton from '../side-drawer/DrawerToggleButton';

//Route for href links

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar-nav">
            { /*hamburger*/ } 
            <div className="toolbar-hamburger">

                {/* pass props drawerClickHandler from Sidebar and set it to click */}
                <DrawerToggleButton click={ props.drawerClickHandler }/>
                {/* now, pass the click props to DrawerToggleButton */}
            </div> 
            <div className="toolbar-logo">iHeart</div>
            <h1>Andy</h1>
        </nav>
    </header>
)

export default Toolbar