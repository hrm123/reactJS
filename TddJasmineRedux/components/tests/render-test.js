import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Input';
import TabBar from '../TabBar';
import TabBarItem from '../TabBarItem';
import Todo from '../Todo';
import TodoButton from '../TodoButton';
import TodoList from '../TodoList';

describe('<Button>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<Button/>);
    expect(rendered).toBeDefined();
  });
});

describe('<Heading>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<Heading/>);
    expect(rendered).toBeDefined();
  });
});


describe('<Input>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<Input/>);
    expect(rendered).toBeDefined();
  });
});


describe('<TabBar>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<TabBar/>);
    expect(rendered).toBeDefined();
  });
});


describe('<TabBarItem>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<TabBarItem/>);
    expect(rendered).toBeDefined();
  });
});


describe('<Todo>', function () {
  it('renders without problems', function () {
    let todoData = { Task : "todo1", Complete: false, TaskId:"1"};
    var callback1 = () => {};
    var callback2 = () => {};
    var rendered = TestUtils.renderIntoDocument(<Todo todo={todoData} toggleComplete={callback1} deleteTodo={callback2}/>);
    expect(rendered).toBeDefined();
  });
});


describe('<TodoButton>', function () {
  it('renders without problems', function () {
    var rendered = TestUtils.renderIntoDocument(<TodoButton/>);
    expect(rendered).toBeDefined();
  });
});


describe('<TodoList>', function () {
  it('renders without problems', function () {
    let todosData = [{ Task : "todo1", Complete: false, TaskId:"1"},
                    { Task : "todo2", Complete: true, TaskId:"2"}];
    var callback1 = () => {};
    var callback2 = () => {};
    var rendered = TestUtils.renderIntoDocument(<TodoList todos={todosData} toggleComplete={callback1} deleteTodo={callback2} type="All"/>);
    expect(rendered).toBeDefined();
  });
});


/*
it('should render a component with a function as a prop', function() {
  var CallbackComponent = React.createClass({
    componentDidMount: function() {
      this.props.callback();
    },
    render: function() { return <div />; }
  });

  var callback = mocks.getMockFunction();
  var renderedComponent = ReactTestUtils.renderIntoDocument(
    <CallbackComponent callback={callback}/>
  );

  expect(callback).toBeCalled();
});
*/