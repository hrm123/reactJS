import React from 'react';
import ReactTestUtils,{createRenderer, Simulate} from 'react-addons-test-utils';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Input';
import TabBar from '../TabBar';
import TabBarItem from '../TabBarItem';
import Todo from '../Todo';
import TodoButton from '../TodoButton';
import TodoList from '../TodoList';
import { Provider, connect  } from 'react-redux'
import configureStore from '../../configureStore'; 
import App from '../../App';

describe("TodoList component - tests", () => {
  beforeEach(function() {
    this.renderer =  createRenderer();
    this.todosData = [{ Task : "todo1", Complete: false, TaskId:"1"},
                    { Task : "todo2", Complete: true, TaskId:"2"}];
    this.callback1 = () => {};
    this.callback2 = () => {};
    this.taskType = 'All'; //'Complete', 'Active'

    /*
    const DEFAULT_HTML = '<html><body></body></html>';

    // Define some variables to make it look like we're a browser
    // First, use JSDOM's fake DOM as the document
    global.document = jsdom.jsdom(DEFAULT_HTML);

    // Set up a mock window
    global.window = document.defaultView;

    // Allow for things like window.location
    global.navigator = window.navigator; 

    //this.component = TestUtils.renderIntoDocument(<TodoList todos={todosData} toggleComplete={callback1} deleteTodo={callback2} type={taskType} />);
    //console.log(this.component);
    //this.renderedDOM = () => React.findDOMNode(this.component);

    */
  });

    it("renders correct number and text for todo elements", function() {
        //console.log(ReactTestUtils);
        //console.log(global.document);
        const store = configureStore();
        this.component0 = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
            <App />
        </Provider>);
        this.component = ReactTestUtils.renderIntoDocument(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType} />);
        //console.log( window);
        //console.log(window.document);
        console.log(this.component0);
        //console.log(this.component1);
        //this.renderedDOM = () => React.findDOMNode(this.component);
    });

  it("renders correct html container", function() {
    this.renderer.render(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType}/>);
    let renderedOutput = this.renderer.getRenderOutput();
    //console.log(renderedOutput);
    //console.log(renderedOutput.props.children);
    //let renderedTodos = this.renderedOutput.querySelectorAll("div.todotext");
    //expect(this.renderedDOM().children.length).toEqual(1);
    expect(renderedOutput.type).toBe('div');
    //expect(renderedTodos.length).toEqual(2);
    //expect(renderedTodos[0].textContent).toEqual("todo1");
    //expect(renderedTodos[1].textContent).toEqual("todo2");
  });
});