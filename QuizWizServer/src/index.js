import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  React.createElement(AppContainer),
  document.getElementById('root'),
);

registerServiceWorker();
