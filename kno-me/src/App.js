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
// import Store from './components/question/Store';
import QuestionPage from './components/question/QuestionPage';
import ChooseQuiz from './components/question/ChooseQuiz';
import Guidelines from './components/guideLines/Guidelines';
import { data } from './components/question/seeds';
import Question2 from './components/question/Question2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
      quizSelect: null,
    };
  }

  changeJwt = jwt => this.setState({ jwt });

  changeQuiz = quiz => {
    this.setState({ quizSelect: quiz });
    // console.log(quiz);
  };

  render() {
    // console.log(this.state.quizSelect)

    return (
      <Router>
        {/* Home route */}
        <PersistentDrawerLeft />
        <Route exact path="/" render={() => <Homepage data={data} />} />

        {/* Routes */}
        <Route path="/createlobby" component={CreateLobbyPage} />
        <Route path="/join" component={JoinPage} quizSelect={this.changeQuiz} />
        <Route
          path="/login"
          render={() => <LoginSign changeJwt={this.changeJwt} />}
        />
        <Route
          path="/quiz"
          render={() => (
            <ChooseQuiz
              Jwt={this.state.jwt}
              quizSelect={this.changeQuiz}
              quiz={data}
            />
          )}
        />
        <Route path="/question" component={QuestionPage} />
        <Route path="/guidelines" component={Guidelines} />
        <Route path="/question2" component={Question2} quiz={data} />
        <Footer />
      </Router>
    );
  }
}

export default App;
