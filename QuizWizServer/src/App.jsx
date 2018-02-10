import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from './store/reduxstore';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
