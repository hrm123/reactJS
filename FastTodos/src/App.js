import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(){
    super();
    this.onClick  = this.onClick.bind(this);
    this.state = { "Caption" : "Before Click" };
  }

  onClick(evnt){
    this.setState({ "Caption" : "After Click" });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
            <Button bsStyle="primary" onClick={this.onClick}>{this.state.Caption}</Button>
        </p>
      </div>
    );
  }
}

export default App;
