import React from 'react';

import './SideDrawer.css';

const SideDrawer = props => {

    //construct classes to attach to attach in side-drawer
    let drawerClasses = ['side-drawer'];

    //if true, add another class and pushing to array manually
    if(props.show) {
        drawerClasses = ['side-drawer', 'open']
    }
    return (
        //now join the elements with a space between them
        <nav className={ drawerClasses.join(' ') }>
            <ul>
                <li>
                    {/* need to change anchor tags to Links */}
                    <a href="/">Game</a>
                </li>
                <li>
                    <a href="/">Lobby</a>
                </li>
                <li>
                    <a href="/">Login/Sign Up</a>
                </li>
            </ul>
        </nav>
    )
}

export default SideDrawer