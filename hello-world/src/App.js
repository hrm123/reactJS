import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Courses from './courses';
import Courses1 from './courses1'
import Courses2 from './courses2'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Courses date={new Date()}/>
        <Courses1 date={new Date()}/>
        <Courses2 date={new Date()}/>
      </div>
    );
  }
}



export default App;
