import React from 'react';

var style = {
    backgroundColor: "#3f51b5",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "absolute",
    left: "0",
    // bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}


export default function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children } <div>LoX Entertainment</div>
            </div>
        </div>
        
    )
}