
import {combineReducers} from 'redux';  
import todos from './todosReducer';

const rootReducer = combineReducers({  
  // short hand property names
  todos
})

export default rootReducer;  