import React from 'react';
// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import components
import Homepage from './components/homepage/Homepage';
import CreateLobbyPage from './components/createLobby/CreateLobbyPage';
import JoinPage from './components/join/JoinPage';
import LoginSign from './components/loginSign/LoginSign';
import Footer from './components/footer/Footer';
import PersistentDrawerLeft from './components/drawer/Drawer';
import Game from './components/question/Game';

function App() {
  return (
    <Router>
      {/* Home route */}
      <PersistentDrawerLeft />
      <Route exact path="/" render={props => <Homepage />} />

      {/* Routes */}
      <Route path="/createlobby" component={CreateLobbyPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/login" component={LoginSign} />
      <Route path="/game" component={Game} />
      <Footer />
    </Router>
  );
}

export default App;
