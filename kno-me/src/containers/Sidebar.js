//Class Component is for all functional components associated with sidebar

import React, { Component } from 'react';
//Router

//import components
import SideDrawer from '../components/sidebar/side-drawer/SideDrawer';
import Toolbar from '../components/sidebar/toolbar/Toolbar';
import Backdrop from '../components/sidebar/backdrop/Backdrop';

export class Sidebar extends Component {
    state = {
        sideDrawerOpen: false
    }

    //======================= Handles ============================

    //Handles the state of sideDrawer
    drawerToggleClickHandler = () => {
        this.setState(prevState => {

            //if sideDrawer is true will not be saved as false and visa versa
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    //Handles for closing the sideDrawer by clicking on backdrop
    //false will always close
    backDropClickHandler = () => {
        this.setState({ sideDrawerOpen: false })
    }

    //Handles exit button
    exitClickHandler = (e) => {
        console.log(e.target);
        this.setState({ sideDrawerOpen: false })
    }

    render() {

        //variable backdrop to store new state
        let backdrop;

        //if sideDrawer true set components to variable 
        if (this.state.sideDrawerOpen) {
            //passed click props and point to backDropClickHandler function
            backdrop = <Backdrop click={this.backDropClickHandler} />
            //now add onClick listener to Backdrop
        }

        return (
            <div>
                {/* trigger button which handles sideDrawer */}
                {/* pass a prop to Toolbar drawerClickHandler and point to drawerToggleClickHandler */}
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />

                {/* pass in info to see if we want this to be open or not to use in SideDrawer.js*/}
                <SideDrawer show={this.state.sideDrawerOpen} />

                {/* referenced variable  */}
                {backdrop}
            </div>
        )
    }
}

export default Sidebar
