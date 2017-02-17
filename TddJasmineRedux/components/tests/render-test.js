import React from 'react';
import TestUtils,{createRenderer} from 'react-addons-test-utils';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Input';
import TabBar from '../TabBar';
import TabBarItem from '../TabBarItem';
import Todo from '../Todo';
import TodoButton from '../TodoButton';
import TodoList from '../TodoList';

describe('<Button>', function () {
  beforeEach(function() {
    this.renderer =  createRenderer();
  });

  it('Button renders without problems', function () {
    this.renderer.render(<Button/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('Heading renders without problems', function () {
    this.renderer.render(<Heading/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('Input without problems', function () {
    this.renderer.render(<Input/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('TabBar renders without problems', function () {
    this.renderer.render(<TabBar/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('TabBarItem renders without problems', function () {
    this.renderer.render(<TabBarItem/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('Todo renders without problems', function () {
    let todoData = { Task : "todo1", Complete: false, TaskId:"1"};
    var callback1 = () => {};
    var callback2 = () => {};
    this.renderer.render(<Todo todo={todoData} toggleComplete={callback1} deleteTodo={callback2}/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('TodoButton renders without problems', function () {
    this.renderer.render(<TodoButton/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
  });

  it('TodoList renders without problems', function () {
    let todosData = [{ Task : "todo1", Complete: false, TaskId:"1"},
                    { Task : "todo2", Complete: true, TaskId:"2"}];
    var callback1 = () => {};
    var callback2 = () => {};
    this.renderer.render(<TodoList todos={todosData} toggleComplete={callback1} deleteTodo={callback2} type="All"/>);
    let rendered = this.renderer.getRenderOutput();
    expect(rendered).toBeDefined();
    expect(rendered).toBeTruthy();
    expect(rendered).not.toEqual(null);
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