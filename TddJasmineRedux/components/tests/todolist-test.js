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
import { mount, shallow } from 'enzyme';

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

  xit("todoslist should render eith correct text",function(){
    const wrapper = mount(<App />); // mount(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType}/>);
    console.log("test1");
    console.log(wrapper.find('div.todotext').map( e => e.text()).join(","));
    expect(wrapper.find('div.todotext').length).toequal(2);
    expect(wrapper.find('div.todotext').map( e => e.text()).join(",").toequal('asdas'));
  });

    it("test for stateful component - uses DOM nodes", function() {
        //console.log(ReactTestUtils);
        //console.log(global.document);
        const store1 = configureStore();
        const storeFake = (state) => ({
          default: () => {},
          subscribe: () => {},
          dispatch: () => {},
          getState: () => ({ ...state })
        });

        /*
        let component0 = ReactTestUtils.renderIntoDocument(
        <Provider store={storeFake}>
            <App />
        </Provider>);
        */

        const wrapper = mount (<Provider store={store1}>
            <App />
        </Provider>);
        console.log(wrapper);
        //console.log(wrapper.store.getState());
        //console.log(wrapper.find('div.todotext'));
        expect(wrapper.find(TodoList).length).toEqual(1);
        expect(wrapper.find(Todo).length).toEqual(2);
        expect(wrapper.find("div.todoText").map( e => e.text()).join(",")).toEqual('todo1,todo2');
        //expect(wrapper.state().maxTodoIndex).to.equal(2);
        
        //console.log(wrapper);
        //console.log(wrapper.find(App).text());
   

        /*
        //this.component = ReactTestUtils.renderIntoDocument(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType} />);
        let renderedDOM0 = () => React.findDOMNode(component0);
        expect(renderedDOM0).toBeDefined();
        expect(renderedDOM0).toBeTruthy();
        expect(renderedDOM0).not.toEqual(null);
        console.log(renderedDOM0());
        //console.log(component0.store.getState());
        let header1 = ReactTestUtils.findRenderedDOMComponentWithTag(
          component0, 'Root'
        );
        expect(header1).toBeDefined();
        expect(header1).toBeTruthy();
        expect(header1).not.toEqual(null);
        //console.log( window);
        //console.log(window.document);
        //console.log(this.component0);
        //console.log(this.component1);
        //this.renderedDOM = () => React.findDOMNode(this.component);
        */
    });

  xit("tests for stateless component - without DOM", function() {
    this.renderer.render(<TodoList todos={this.todosData} toggleComplete={this.callback1} deleteTodo={this.callback2} type={this.taskType}/>);
    let renderedOutput = this.renderer.getRenderOutput();
    //console.log('stateless comp');
    //console.log(renderedOutput);
   // console.log(renderedOutput.props.children[0]);
    //console.log(renderedOutput.props.children[1]);
    //console.log(renderedOutput.props.children);
    //let renderedTodos = this.renderedOutput.querySelectorAll("div.todotext");
    //expect(this.renderedDOM().children.length).toEqual(1);
    expect(renderedOutput.type).toBe('div');
    expect(renderedOutput.props.children.length).toEqual(2);

    console.log("test2");
 

    //expect(renderedTodos[0].textContent).toEqual("todo1");
    //expect(renderedTodos[1].textContent).toEqual("todo2");
  });
});