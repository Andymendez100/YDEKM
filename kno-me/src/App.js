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
import Guidelines from './components/guideLines/Guidelines';
import Video from './components/video/video';
import { GoToRoomInput } from './components/video/goToRoomInput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: ''
    };
  }

  changeJwt = jwt => this.setState({ jwt });

  render() {
    return (
      <Router>
        {/* Video with Room */}
        <Route path="/" exact component={GoToRoomInput} />
        <Route path="/:roomId" exact component={Video} />
      </Router>
    );
  }
}

export default App;
