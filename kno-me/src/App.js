import React from 'react';
// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import components
import './App.css';
import Sidebar from './components/Sidebar';
import Wrapper from './components/wrapper/Wrapper';
import CreateLobbyPage from './components/createLobby/CreateLobbyPage';
import JoinPage from './components/join/JoinPage';
import LoginSign from './components/loginSign/LoginSign';

function App() {
  return (
    <Router>
      {/* Home route */}
      <Route exact path="/" render={props => (
        <Wrapper>
          <Sidebar />
        </Wrapper>
      )}
      />

      {/* Routes */}
      <Route path="/createlobby" component={CreateLobbyPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/login" component={LoginSign} />
    </Router>
  );
}

export default App;
