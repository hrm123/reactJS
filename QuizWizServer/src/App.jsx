import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import store from './store/reduxstore';
import Root from './containers/root';

const App = () => (
  <div>
    <Provider store={store}>
      <Root />
    </Provider>
  </div>
);

export default App;
