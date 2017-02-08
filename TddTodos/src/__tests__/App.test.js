import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Provider, connect  } from 'react-redux';
import configureStore from '../configureStore'; 

describe('MyApp', () => {
  it('renders without crashing', () => {
    const store = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
  });
});
