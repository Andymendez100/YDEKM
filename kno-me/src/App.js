import React from "react";
// router
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import components
// import './App.css';
// import Sidebar from './containers/Sidebar';
// import Wrapper from './components/wrapper/Wrapper';
import Indexpage from './components/index/Indexpage';
// import Homepage from "./components/homepage/Homepage";
import CreateLobbyPage from "./components/createLobby/CreateLobbyPage";
import JoinPage from "./components/join/JoinPage";
import LoginSign from "./containers/loginSign/LoginSign";
import Footer from "./components/footer/Footer";
import PersistentDrawerLeft from "./components/drawer/Drawer";

function App() {
  return (
    <Router>
      <PersistentDrawerLeft />
      <Route
        exact
        path="/"
        render={props => (
          <Indexpage/>
          // <Homepage />
        )}
      />

      {/* Routes */}
      <Route path="/createlobby" component={CreateLobbyPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/login" component={LoginSign} />

      <Footer />
    </Router>
  );
}

export default App;
