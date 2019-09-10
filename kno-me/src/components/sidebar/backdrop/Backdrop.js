import React from 'react'

import './Backdrop.css';
const Backdrop = props => (
    //pass in props from Sidebar backDropClickHandler and pass it to onClick listener
    <div className="backdrop" onClick={ props.click }/>
)

export default Backdrop