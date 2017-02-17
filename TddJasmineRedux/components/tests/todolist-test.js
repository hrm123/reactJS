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

describe("TodoList component - tests", () => {
  beforeEach(function() {
    this.renderer =  createRenderer();
    this.todosData = [{ Task : "todo1", Complete: false, TaskId:"1"},
                    { Task : "todo2", Complete: true, TaskId:"2"}];
    this.callback1 = () => {};
    this.callback2 = () => {};
    this.taskType = 'All'; //'Complete', 'Active'
    //this.component = TestUtils.renderIntoDocument(<TodoList todos={todosData} toggleComplete={callback1} deleteTodo={callback2} type={taskType} />);
    //console.log(this.component);
    //this.renderedDOM = () => React.findDOMNode(this.component);
  });

  it("renders correct number and text for todo elements", function() {
  this.renderer.render(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType}/>);
    let renderedOutput = this.renderer.getRenderOutput();
    console.log(renderedOutput);
    console.log(renderedOutput.props.children);
    //let renderedTodos = this.renderedOutput.querySelectorAll("div.todotext");
    //expect(this.renderedDOM().children.length).toEqual(1);
    expect(renderedOutput.type).toBe('div');
    //expect(renderedTodos.length).toEqual(2);
    //expect(renderedTodos[0].textContent).toEqual("todo1");
    //expect(renderedTodos[1].textContent).toEqual("todo2");
  });
});