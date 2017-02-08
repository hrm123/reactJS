import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Root from '../containers/Root';
import Heading from '../components/Heading';
import { Provider, connect  } from 'react-redux';
import configureStore from '../configureStore'; 
import { shallow } from 'enzyme';

describe('Rendering tests', () => {
  it('renders without crashing', () => {
    const store = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
  });

  it('shallow renders "Root" without crashing', () => {
    const store = configureStore();
    const wrapper = shallow(<Provider store={store}><Root /></Provider>);
  });
});

describe('Content tests', () => {
  it('Heading renders My todos', () => {
    const hdng = shallow(<Heading />);
    expect(hdng.find('div.header').text()).toEqual('My todos');
  });

});