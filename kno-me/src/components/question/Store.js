import React from 'react';

//Socket.io in Store more related to data not how data is rendered
//import Socket.io-client
import io from 'socket.io-client';

//Context Provider
export const CTX = React.createContext();

//Initate state
const initState = {
    general: [
    ],
    Andysdick: [

    ]
}

//Reducer
function reducer(state, action) {
    //destructor reducer state and set each to action.payload
    const { from, msg, topic } = action.payload;

    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                //takes old messages
                ...state,
                [topic]: [
                    //pushes new messsages to array in topics
                    ...state[topic],
                    {
                        //RECEIVE_MESSAGE will get back from and msg
                        from: from,
                        msg: msg
                    }
                ]
            }
        default:
            return state
    }


}
//send action passing in message value (user input)
function sendChatAction(value) {
    //emit key: chat message value: value
    socket.emit('chat message', value)
}
//user
const user = 'Greg' + Math.random(100).toFixed(2)

//Init Socket outside func component so it does not render everytime Store reloads
let socket;

export default function Store(props) {

    //SOCKET
    //reducer takes in reducer and initState 
    const [allChats, dispatch] = React.useReducer(reducer, initState)

    //check for socket, if there is none then set manually to port number defined in server
    if (!socket) {
        //client connection 
        socket = io(':3001')
        //listener on client broadcasting
        socket.on('chat message', function (msg) {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });

        })
    }

    return (
        //now we pass in reducerHook in value of CTX.Provider
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}
