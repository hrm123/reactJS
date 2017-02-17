import React, { Component } from 'react';
import './App.css';
import  Root  from './containers/root';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Root />
      </div>
    );
  }
}

export default App;
