import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './content/css/riliwan-rabo.css';
import './content/css/style.css';

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root'),
);

registerServiceWorker();
