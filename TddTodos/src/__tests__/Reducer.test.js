import * as actions from '../actions/todosActions';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';
import reducer from '../reducers/todosReducer';


describe('todos reducer tests', () => {
    it('should return the initial state', () => {
        expect(
        reducer(undefined, {})
        ).toEqual(initialState)
    });

    it('should handle ADD_TODO', () => {
        let addedTodo = {
            "todo": {
            "Task": "todo1",
            "Complete": false,
            "taskType": "General",
            "TaskId": 1
            },
            type: "ADD_TODOS"
        };

        let expectedState = {  
            inputValue: "My first todo",
            todos: [{
            "Task": "todo1",
            "Complete": false,
            "taskType": "General",
            "TaskId": 1
            }],
            taskType: 'General',
            taskStatus:'All',
            maxTodoIndex: 1
        };
        //console.log(initialState);
        //console.log(addedTodo);
        let reduOut = reducer(initialState, addedTodo);
        //console.log(reduOut);
        expect(
            reduOut
        ).toEqual(expectedState);
    });

});