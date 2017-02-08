const types =  require('../actions/actionTypes');  
import initialState from './initialState';

export default function todosReducer(currentState = initialState, action) {  
  switch(action.type) {
    case types.LOAD_TODOS_SUCCESS:
      return action.todos
    case types.TASK_TITLE_CHANGED:
      return Object.assign({},currentState, {"inputValue" : action.newTitle});
    case types.ADD_TODOS:
        // { "Task" : todoText, "TaskType" : "General", "TaskId":  ownProps.maxTodoIndex++}
      return Object.assign({},currentState, { maxTodoIndex :action.todo.TaskId }, { todos : currentState.todos.concat( action.todo ) });
    case types.EDIT_TODOS:
      var editedIndex = currentState.todos.map(function(x) {return x.TaskId; }).indexOf(action.todo.TaskId);
      var changedTodo = Object.assign({}, currentState.todos.filter( (td) => td.TaskId === action.todo.TaskId )[0], {Complete: action.todo.Complete });
      var clonedArray = JSON.parse(JSON.stringify(currentState.todos));
      clonedArray.splice(editedIndex, 1, changedTodo );
      return Object.assign({},currentState, { todos :  clonedArray });
    case types.DELETE_TODOS:
      return Object.assign({},currentState, { todos : currentState.todos.filter( (td) => td.TaskId !== action.todo.TaskId ) });
    case types.CHANGE_TODO_TYPE:
      return Object.assign({},currentState, { taskStatus: action.taskStatus });
    default: 
      return currentState;
  }
}