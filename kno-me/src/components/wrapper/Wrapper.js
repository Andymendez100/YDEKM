import React from 'react';

export default function Wrapper(props) {
    return (
        //props.children will capture all components inside it
        <div className="wrapper">{props.children}</div>
    )
}
