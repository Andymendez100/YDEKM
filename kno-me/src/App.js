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
import Store from './components/question/Store';
import QuestionPage from './components/question/QuestionPage';
import ChooseQuiz from './components/question/ChooseQuiz';
import GuideLines from './components/guideLines/Guidelines';
// import Game from './components/question/Game';
import Guidelines from './components/guideLines/Guidelines'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
    };
  }

  changeJwt = jwt => this.setState({ jwt });

  render() {
    return (
      <Router>
        {/* Home route */}
        <PersistentDrawerLeft />
        <Route exact path="/" render={props => <Homepage />} />

        {/* Routes */}
        <Route path="/createlobby" component={CreateLobbyPage} />
        <Route path="/join" component={JoinPage} />
        <Route
          path="/login"
          render={() => <LoginSign changeJwt={this.changeJwt} />}
        />
        <Route path="/game" render={() => <Store Jwt={this.state.jwt} />} />
        <Route path="/question" component={QuestionPage} />
        <Route path="/quiz" component={ChooseQuiz} />
        <Route path="/guidelines" component={Guidelines} />
        <Footer />
      </Router>
    );
  }
}

export default App;
