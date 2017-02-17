import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { Provider, connect  } from 'react-redux'
import configureStore from './configureStore'; 

// creates our Redux store (elsewhere)
const store = configureStore();


/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
