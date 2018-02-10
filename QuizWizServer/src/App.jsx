import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/reduxstore';
// import Root from './containers/root';
import AppRoutes from './AppRoutes';

const App = () => (
  <div>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </div>
);

export default App;
