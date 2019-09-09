import React from 'react';
// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import components
import './App.css';
import Sidebar from './containers/Sidebar';
import Wrapper from './components/wrapper/Wrapper';
import CreateLobbyPage from './components/createLobby/CreateLobbyPage';
import JoinPage from './components/join/JoinPage';


function App() {
  return (
    <Router>
      {/* Home route */}
      <Route exact path="/" render={props => (
        <Wrapper>
          <Sidebar />
        </Wrapper>
      )} />

      {/* Routes */}
      <Route path="/createlobby" component={CreateLobbyPage} />
      <Route path="/join" component={JoinPage} />
    </Router>
  );
}

export default App;