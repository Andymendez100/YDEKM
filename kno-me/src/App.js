import React from 'react';

//import components
import './App.css';
import Sidebar from './containers/Sidebar';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Header/>
    </div>
  );
}

export default App;
