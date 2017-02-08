import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import {jsdom} from 'jsdom';
import * as actions from '../actions/todosActions'
import * as types from '../actions/actionTypes'
import {assert} from 'chai';

chai.use(chaiEnzyme());
chai.use(chaiJsx);

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

describe('actions-add todo', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish unittests'
    const expectedAction = {
      type: types.ADD_TODOS,
      text
    }
    assert.isFunction(actions.addTodos(text));
    //expect(actions.addTodos(text)).toBeA('function');
  });

  it('dispatch a add todo action', () => {
    let inputTodo = {
        "Task": "todo1",
        "Complete": false,
        "taskType": "General",
        "TaskId": -1 
    };
    let expectedTodo = {
        "Task": "todo1",
        "Complete": false,
        "taskType": "General",
        "TaskId": 1 // shold be updated in tthe action method as maxTodoindex + 1
    };

    const getState = () => ({todos : {'maxTodoIndex' : 0} });
    const dispatch = jest.fn();
    actions.addTodos(inputTodo)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({type: 'ADD_TODOS', 'todo': expectedTodo});
  });
})